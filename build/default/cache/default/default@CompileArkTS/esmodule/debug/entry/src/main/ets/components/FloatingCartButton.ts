if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FloatingCartButton_Params {
    cartCount?: number;
    pageStack?: NavPathStack;
    currentUserId?: number;
    timer?: number;
    positionX?: number;
    positionY?: number;
    screenWidth?: number;
    screenHeight?: number;
    buttonSize?: number;
    startX?: number;
    startY?: number;
}
import { CartService } from "@normalized:N&&&entry/src/main/ets/services/CartService&";
export class FloatingCartButton extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__cartCount = new ObservedPropertySimplePU(0, this, "cartCount");
        this.__pageStack = new SynchedPropertyObjectOneWayPU(params.pageStack, this, "pageStack");
        this.currentUserId = 1;
        this.timer = -1;
        this.__positionX = new ObservedPropertySimplePU(0, this, "positionX");
        this.__positionY = new ObservedPropertySimplePU(0, this, "positionY");
        this.screenWidth = 360;
        this.screenHeight = 780;
        this.buttonSize = 60;
        this.startX = 0;
        this.startY = 0;
        this.setInitiallyProvidedValue(params);
        this.declareWatch("pageStack", this.onPageStackChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FloatingCartButton_Params) {
        if (params.cartCount !== undefined) {
            this.cartCount = params.cartCount;
        }
        if (params.currentUserId !== undefined) {
            this.currentUserId = params.currentUserId;
        }
        if (params.timer !== undefined) {
            this.timer = params.timer;
        }
        if (params.positionX !== undefined) {
            this.positionX = params.positionX;
        }
        if (params.positionY !== undefined) {
            this.positionY = params.positionY;
        }
        if (params.screenWidth !== undefined) {
            this.screenWidth = params.screenWidth;
        }
        if (params.screenHeight !== undefined) {
            this.screenHeight = params.screenHeight;
        }
        if (params.buttonSize !== undefined) {
            this.buttonSize = params.buttonSize;
        }
        if (params.startX !== undefined) {
            this.startX = params.startX;
        }
        if (params.startY !== undefined) {
            this.startY = params.startY;
        }
    }
    updateStateVars(params: FloatingCartButton_Params) {
        this.__pageStack.reset(params.pageStack);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__cartCount.purgeDependencyOnElmtId(rmElmtId);
        this.__pageStack.purgeDependencyOnElmtId(rmElmtId);
        this.__positionX.purgeDependencyOnElmtId(rmElmtId);
        this.__positionY.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__cartCount.aboutToBeDeleted();
        this.__pageStack.aboutToBeDeleted();
        this.__positionX.aboutToBeDeleted();
        this.__positionY.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __cartCount: ObservedPropertySimplePU<number>;
    get cartCount() {
        return this.__cartCount.get();
    }
    set cartCount(newValue: number) {
        this.__cartCount.set(newValue);
    }
    private __pageStack?: SynchedPropertySimpleOneWayPU<NavPathStack>; // 从父组件传入,可选
    get pageStack() {
        return this.__pageStack.get();
    }
    set pageStack(newValue: NavPathStack) {
        this.__pageStack.set(newValue);
    }
    private currentUserId: number; // TODO: 从登录状态获取
    private timer: number;
    // 拖拽位置状态
    private __positionX: ObservedPropertySimplePU<number>;
    get positionX() {
        return this.__positionX.get();
    }
    set positionX(newValue: number) {
        this.__positionX.set(newValue);
    }
    private __positionY: ObservedPropertySimplePU<number>;
    get positionY() {
        return this.__positionY.get();
    }
    set positionY(newValue: number) {
        this.__positionY.set(newValue);
    }
    // 屏幕边界限制
    private screenWidth: number;
    private screenHeight: number;
    private buttonSize: number;
    // 拖拽起始位置
    private startX: number;
    private startY: number;
    // 监听 pageStack 变化
    onPageStackChange() {
        console.info('[FloatingCartButton] pageStack 已更新');
    }
    aboutToAppear() {
        // 初始加载购物车数量
        this.loadCartCount();
        // 每5秒自动刷新购物车数量
        this.timer = setInterval(() => {
            this.loadCartCount();
        }, 5000);
    }
    aboutToDisappear() {
        // 清理定时器
        if (this.timer !== -1) {
            clearInterval(this.timer);
        }
    }
    /**
     * 加载购物车商品数量
     */
    async loadCartCount() {
        const cartList = await CartService.getCartList(this.currentUserId);
        // 按 productId 去重统计商品种类数
        const uniqueProductIds = new Set<number>();
        cartList.forEach(item => {
            uniqueProductIds.add(item.productId);
        });
        this.cartCount = uniqueProductIds.size;
        console.info(`[FloatingCartButton] 购物车商品种类数: ${this.cartCount}`);
    }
    /**
     * 点击购物车图标
     */
    onCartClick() {
        console.info('[FloatingCartButton] 点击购物车，当前商品数:', this.cartCount);
        // 刷新购物车数量
        this.loadCartCount();
        // 直接从 AppStorage 获取最新的 pageStack
        const pageStack = AppStorage.get<NavPathStack>('globalPageStack');
        if (pageStack) {
            console.info('[FloatingCartButton] 成功获取 pageStack，准备跳转');
            pageStack.pushPathByName('CartPage', null);
        }
        else {
            console.error('[FloatingCartButton] AppStorage 中未找到 globalPageStack');
        }
    }
    /**
     * 手动刷新购物车数量（供外部调用）
     */
    refresh() {
        this.loadCartCount();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width(60);
            Stack.height(60);
            Stack.position({ x: '85%', y: '80%' });
            Stack.zIndex(999);
            Stack.onClick(() => this.onCartClick());
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 购物车图标
            Image.create({ "id": 16777235, "type": 20000, params: [], "bundleName": "com.example.marketapp", "moduleName": "entry" });
            // 购物车图标
            Image.width(60);
            // 购物车图标
            Image.height(60);
            // 购物车图标
            Image.borderRadius(30);
            // 购物车图标
            Image.backgroundColor('#4CAF50');
            // 购物车图标
            Image.padding(10);
            // 购物车图标
            Image.shadow({
                radius: 12,
                color: '#40000000',
                offsetX: 0,
                offsetY: 4
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 商品数量角标
            if (this.cartCount > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.cartCount > 99 ? '99+' : this.cartCount.toString());
                        Text.fontSize(12);
                        Text.fontColor(Color.White);
                        Text.fontWeight(FontWeight.Bold);
                        Text.backgroundColor('#FF3B30');
                        Text.borderRadius(10);
                        Text.padding({ left: 6, right: 6, top: 2, bottom: 2 });
                        Text.position({ x: '65%', y: '5%' });
                        Text.zIndex(1);
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
