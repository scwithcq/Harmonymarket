if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CartPage_Params {
    cartList?: CartItem[];
    isLoading?: boolean;
    allSelected?: boolean;
    totalPrice?: number;
    selectedCount?: number;
    isEditMode?: boolean;
    currentUserId?: number;
    pageStack?: NavPathStack;
}
import type { CartItem } from '../../../models/CartItem';
import { CartService } from "@normalized:N&&&entry/src/main/ets/services/CartService&";
import promptAction from "@ohos:promptAction";
import { app_color } from "@normalized:N&&&entry/src/main/ets/utils/Colors&";
export function CartPageBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new CartPage(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Users/Cart/CartPage.ets", line: 9, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "CartPage" });
    }
}
class CartPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__cartList = new ObservedPropertyObjectPU([], this, "cartList");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.__allSelected = new ObservedPropertySimplePU(false, this, "allSelected");
        this.__totalPrice = new ObservedPropertySimplePU(0, this, "totalPrice");
        this.__selectedCount = new ObservedPropertySimplePU(0, this, "selectedCount");
        this.__isEditMode = new ObservedPropertySimplePU(false, this, "isEditMode");
        this.currentUserId = 1;
        this.__pageStack = new ObservedPropertyObjectPU(null!, this, "pageStack");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CartPage_Params) {
        if (params.cartList !== undefined) {
            this.cartList = params.cartList;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.allSelected !== undefined) {
            this.allSelected = params.allSelected;
        }
        if (params.totalPrice !== undefined) {
            this.totalPrice = params.totalPrice;
        }
        if (params.selectedCount !== undefined) {
            this.selectedCount = params.selectedCount;
        }
        if (params.isEditMode !== undefined) {
            this.isEditMode = params.isEditMode;
        }
        if (params.currentUserId !== undefined) {
            this.currentUserId = params.currentUserId;
        }
        if (params.pageStack !== undefined) {
            this.pageStack = params.pageStack;
        }
    }
    updateStateVars(params: CartPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__cartList.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__allSelected.purgeDependencyOnElmtId(rmElmtId);
        this.__totalPrice.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedCount.purgeDependencyOnElmtId(rmElmtId);
        this.__isEditMode.purgeDependencyOnElmtId(rmElmtId);
        this.__pageStack.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__cartList.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__allSelected.aboutToBeDeleted();
        this.__totalPrice.aboutToBeDeleted();
        this.__selectedCount.aboutToBeDeleted();
        this.__isEditMode.aboutToBeDeleted();
        this.__pageStack.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __cartList: ObservedPropertyObjectPU<CartItem[]>;
    get cartList() {
        return this.__cartList.get();
    }
    set cartList(newValue: CartItem[]) {
        this.__cartList.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    private __allSelected: ObservedPropertySimplePU<boolean>;
    get allSelected() {
        return this.__allSelected.get();
    }
    set allSelected(newValue: boolean) {
        this.__allSelected.set(newValue);
    }
    private __totalPrice: ObservedPropertySimplePU<number>;
    get totalPrice() {
        return this.__totalPrice.get();
    }
    set totalPrice(newValue: number) {
        this.__totalPrice.set(newValue);
    }
    private __selectedCount: ObservedPropertySimplePU<number>;
    get selectedCount() {
        return this.__selectedCount.get();
    }
    set selectedCount(newValue: number) {
        this.__selectedCount.set(newValue);
    }
    private __isEditMode: ObservedPropertySimplePU<boolean>; // 是否处于编辑模式
    get isEditMode() {
        return this.__isEditMode.get();
    }
    set isEditMode(newValue: boolean) {
        this.__isEditMode.set(newValue);
    }
    private currentUserId: number; // TODO: 从登录状态获取
    private __pageStack: ObservedPropertyObjectPU<NavPathStack>;
    get pageStack() {
        return this.__pageStack.get();
    }
    set pageStack(newValue: NavPathStack) {
        this.__pageStack.set(newValue);
    }
    aboutToAppear() {
        console.info('[CartPage] aboutToAppear 被调用');
        // 尝试在这里也加载数据
        setTimeout(() => {
            console.info('[CartPage] setTimeout 延迟加载数据');
            this.loadCartData();
        }, 100);
    }
    /**
     * 加载购物车数据
     */
    async loadCartData() {
        console.info('[CartPage] 开始加载购物车数据, userId:', this.currentUserId);
        this.isLoading = true;
        this.cartList = await CartService.getCartList(this.currentUserId);
        console.info('[CartPage] 获取到购物车商品数量:', this.cartList.length);
        if (this.cartList.length > 0) {
            console.info('[CartPage] 第一个商品:', JSON.stringify(this.cartList[0]));
        }
        this.isLoading = false;
        this.calculateTotal();
    }
    /**
     * 计算总价和选中数量
     */
    calculateTotal() {
        this.selectedCount = this.cartList.filter(item => item.selected).length;
        this.totalPrice = this.cartList
            .filter(item => item.selected)
            .reduce((sum, item) => sum + item.price * item.quantity, 0);
        this.allSelected = this.cartList.length > 0 &&
            this.cartList.every(item => item.selected);
    }
    /**
     * 全选/取消全选
     */
    toggleAllSelect() {
        this.allSelected = !this.allSelected;
        this.cartList.forEach(item => item.selected = this.allSelected);
        this.calculateTotal();
    }
    /**
     * 单个商品选中
     */
    toggleItemSelect(index: number) {
        this.cartList[index].selected = !this.cartList[index].selected;
        this.calculateTotal();
    }
    /**
     * 更新商品数量
     */
    async updateQuantity(item: CartItem, delta: number) {
        const newQuantity = item.quantity + delta;
        // 数量校验
        if (newQuantity < 1) {
            promptAction.showToast({ message: '数量不能少于1' });
            return;
        }
        const stock = item.stock || 999;
        if (newQuantity > stock) {
            promptAction.showToast({ message: `库存不足，仅剩 ${stock} ${item.unit}` });
            return;
        }
        // 调用接口更新
        const success = await CartService.updateQuantity(item.cartId, newQuantity);
        if (success) {
            item.quantity = newQuantity;
            this.calculateTotal();
        }
        else {
            promptAction.showToast({ message: '更新失败，请重试' });
        }
    }
    /**
     * 删除单个商品
     */
    async deleteItem(cartId: number, productName: string) {
        // 二次确认
        promptAction.showDialog({
            title: '确认删除',
            message: `确定要删除 "${productName}" 吗？`,
            buttons: [
                { text: '取消', color: '#999999' },
                { text: '删除', color: '#FF6B6B' }
            ]
        }).then(async (result) => {
            if (result.index === 1) {
                const success = await CartService.deleteCartItem(cartId);
                if (success) {
                    this.cartList = this.cartList.filter(item => item.cartId !== cartId);
                    this.calculateTotal();
                    promptAction.showToast({ message: '删除成功' });
                }
                else {
                    promptAction.showToast({ message: '删除失败，请重试' });
                }
            }
        });
    }
    /**
     * 批量删除选中商品
     */
    async batchDeleteSelected() {
        const selectedIds = this.cartList
            .filter(item => item.selected)
            .map(item => item.cartId);
        if (selectedIds.length === 0) {
            promptAction.showToast({ message: '请先选择要删除的商品' });
            return;
        }
        // 二次确认
        promptAction.showDialog({
            title: '确认删除',
            message: `确定要删除选中的 ${selectedIds.length} 件商品吗？`,
            buttons: [
                { text: '取消', color: '#999999' },
                { text: '删除', color: '#FF6B6B' }
            ]
        }).then(async (result) => {
            if (result.index === 1) {
                const success = await CartService.batchDelete(selectedIds);
                if (success) {
                    this.cartList = this.cartList.filter(item => !item.selected);
                    this.calculateTotal();
                    this.isEditMode = false;
                    promptAction.showToast({ message: '删除成功' });
                }
                else {
                    promptAction.showToast({ message: '删除失败，请重试' });
                }
            }
        });
    }
    /**
     * 清空购物车
     */
    async clearAllCart() {
        if (this.cartList.length === 0) {
            promptAction.showToast({ message: '购物车已是空的' });
            return;
        }
        promptAction.showDialog({
            title: '清空购物车',
            message: '确定要清空购物车的所有商品吗？',
            buttons: [
                { text: '取消', color: '#999999' },
                { text: '清空', color: '#FF6B6B' }
            ]
        }).then(async (result) => {
            if (result.index === 1) {
                const success = await CartService.clearCart(this.currentUserId);
                if (success) {
                    this.cartList = [];
                    this.calculateTotal();
                    this.isEditMode = false;
                    promptAction.showToast({ message: '已清空购物车' });
                }
                else {
                    promptAction.showToast({ message: '清空失败，请重试' });
                }
            }
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.height('100%');
                    Column.backgroundColor('#F5F5F5');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 顶部标题栏
                    Row.create();
                    // 顶部标题栏
                    Row.width('100%');
                    // 顶部标题栏
                    Row.justifyContent(FlexAlign.SpaceBetween);
                    // 顶部标题栏
                    Row.padding(16);
                    // 顶部标题栏
                    Row.backgroundColor(Color.White);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 返回按钮
                    Image.create({ "id": 16777246, "type": 20000, params: [], "bundleName": "com.example.marketapp", "moduleName": "entry" });
                    // 返回按钮
                    Image.width(24);
                    // 返回按钮
                    Image.height(24);
                    // 返回按钮
                    Image.fillColor(app_color.text1);
                    // 返回按钮
                    Image.onClick(() => {
                        this.pageStack.pop();
                    });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('购物车');
                    Text.fontSize(20);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor(app_color.text1);
                    Text.layoutWeight(1);
                    Text.margin({ left: 12 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create({ space: 12 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.isEditMode) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('完成');
                                Text.fontSize(14);
                                Text.fontColor(app_color.primary);
                                Text.onClick(() => {
                                    this.isEditMode = false;
                                });
                            }, Text);
                            Text.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('编辑');
                                Text.fontSize(14);
                                Text.fontColor(app_color.primary);
                                Text.onClick(() => {
                                    if (this.cartList.length === 0) {
                                        promptAction.showToast({ message: '购物车是空的' });
                                        return;
                                    }
                                    this.isEditMode = true;
                                });
                            }, Text);
                            Text.pop();
                        });
                    }
                }, If);
                If.pop();
                Row.pop();
                // 顶部标题栏
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    // 加载状态
                    if (this.isLoading) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width('100%');
                                Column.height('60%');
                                Column.justifyContent(FlexAlign.Center);
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                LoadingProgress.create();
                                LoadingProgress.width(50);
                                LoadingProgress.height(50);
                                LoadingProgress.color(app_color.primary);
                            }, LoadingProgress);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('加载中...');
                                Text.fontSize(14);
                                Text.fontColor(app_color.text2);
                                Text.margin({ top: 12 });
                            }, Text);
                            Text.pop();
                            Column.pop();
                        });
                    }
                    // 空数据状态
                    else if (this.cartList.length === 0) {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width('100%');
                                Column.height('60%');
                                Column.justifyContent(FlexAlign.Center);
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create({ "id": 16777257, "type": 20000, params: [], "bundleName": "com.example.marketapp", "moduleName": "entry" });
                                Image.width(120);
                                Image.height(120);
                                Image.opacity(0.6);
                            }, Image);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('购物车空空如也');
                                Text.fontSize(16);
                                Text.fontColor(app_color.text2);
                                Text.margin({ top: 12 });
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('快去挑选喜欢的商品吧~');
                                Text.fontSize(14);
                                Text.fontColor(app_color.text3);
                                Text.margin({ top: 8 });
                            }, Text);
                            Text.pop();
                            Column.pop();
                        });
                    }
                    // 购物车列表
                    else {
                        this.ifElseBranchUpdateFunction(2, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Scroll.create();
                                Scroll.layoutWeight(1);
                                Scroll.backgroundColor('#F5F5F5');
                            }, Scroll);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                List.create({ space: 12 });
                                List.width('100%');
                                List.padding({ left: 16, right: 16, top: 12 });
                            }, List);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                ForEach.create();
                                const forEachItemGenFunction = (_item, index: number) => {
                                    const item = _item;
                                    {
                                        const itemCreation = (elmtId, isInitialRender) => {
                                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                            itemCreation2(elmtId, isInitialRender);
                                            if (!isInitialRender) {
                                                ListItem.pop();
                                            }
                                            ViewStackProcessor.StopGetAccessRecording();
                                        };
                                        const itemCreation2 = (elmtId, isInitialRender) => {
                                            ListItem.create(deepRenderFunction, true);
                                        };
                                        const deepRenderFunction = (elmtId, isInitialRender) => {
                                            itemCreation(elmtId, isInitialRender);
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Row.create();
                                                Row.width('100%');
                                                Row.padding(12);
                                                Row.borderRadius(8);
                                                Row.backgroundColor(Color.White);
                                            }, Row);
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                // 复选框
                                                Checkbox.create();
                                                // 复选框
                                                Checkbox.select(item.selected);
                                                // 复选框
                                                Checkbox.selectedColor(app_color.primary);
                                                // 复选框
                                                Checkbox.onChange(() => this.toggleItemSelect(index));
                                            }, Checkbox);
                                            // 复选框
                                            Checkbox.pop();
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                // 商品图片
                                                Image.create(item.imageUrl || item.productImage);
                                                // 商品图片
                                                Image.width(80);
                                                // 商品图片
                                                Image.height(80);
                                                // 商品图片
                                                Image.borderRadius(8);
                                                // 商品图片
                                                Image.margin({ left: 12 });
                                                // 商品图片
                                                Image.objectFit(ImageFit.Cover);
                                            }, Image);
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                // 商品信息
                                                Column.create({ space: 6 });
                                                // 商品信息
                                                Column.layoutWeight(1);
                                                // 商品信息
                                                Column.margin({ left: 12, right: 8 });
                                                // 商品信息
                                                Column.alignItems(HorizontalAlign.Start);
                                            }, Column);
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Text.create(item.productName);
                                                Text.fontSize(16);
                                                Text.fontWeight(FontWeight.Medium);
                                                Text.fontColor(app_color.text1);
                                                Text.maxLines(2);
                                                Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                                            }, Text);
                                            Text.pop();
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Text.create(`￥${item.price} / ${item.unit}`);
                                                Text.fontSize(14);
                                                Text.fontColor(app_color.primary);
                                                Text.fontWeight(FontWeight.Bold);
                                            }, Text);
                                            Text.pop();
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                If.create();
                                                // 非编辑模式：数量控制器
                                                if (!this.isEditMode) {
                                                    this.ifElseBranchUpdateFunction(0, () => {
                                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                            Row.create({ space: 10 });
                                                        }, Row);
                                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                            Button.createWithLabel('-');
                                                            Button.width(30);
                                                            Button.height(30);
                                                            Button.fontSize(18);
                                                            Button.backgroundColor(item.quantity <= 1 ? '#E0E0E0' : app_color.primary);
                                                            Button.fontColor(Color.White);
                                                            Button.borderRadius(15);
                                                            Button.enabled(item.quantity > 1);
                                                            Button.onClick(() => this.updateQuantity(item, -1));
                                                        }, Button);
                                                        Button.pop();
                                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                            Text.create(`${item.quantity}`);
                                                            Text.fontSize(16);
                                                            Text.fontColor(app_color.text1);
                                                            Text.width(40);
                                                            Text.textAlign(TextAlign.Center);
                                                        }, Text);
                                                        Text.pop();
                                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                            Button.createWithLabel('+');
                                                            Button.width(30);
                                                            Button.height(30);
                                                            Button.fontSize(18);
                                                            Button.backgroundColor(item.quantity >= (item.stock || 999) ? '#E0E0E0' : app_color.primary);
                                                            Button.fontColor(Color.White);
                                                            Button.borderRadius(15);
                                                            Button.enabled(item.quantity < (item.stock || 999));
                                                            Button.onClick(() => this.updateQuantity(item, 1));
                                                        }, Button);
                                                        Button.pop();
                                                        Row.pop();
                                                    });
                                                }
                                                // 编辑模式：显示数量
                                                else {
                                                    this.ifElseBranchUpdateFunction(1, () => {
                                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                            Text.create(`数量：${item.quantity} ${item.unit}`);
                                                            Text.fontSize(14);
                                                            Text.fontColor(app_color.text2);
                                                        }, Text);
                                                        Text.pop();
                                                    });
                                                }
                                            }, If);
                                            If.pop();
                                            // 商品信息
                                            Column.pop();
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                If.create();
                                                // 删除按钮
                                                if (this.isEditMode) {
                                                    this.ifElseBranchUpdateFunction(0, () => {
                                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                            Button.createWithLabel('删除');
                                                            Button.fontSize(13);
                                                            Button.backgroundColor(Color.Transparent);
                                                            Button.fontColor('#FF6B6B');
                                                            Button.onClick(() => this.deleteItem(item.cartId, item.productName));
                                                        }, Button);
                                                        Button.pop();
                                                    });
                                                }
                                                else {
                                                    this.ifElseBranchUpdateFunction(1, () => {
                                                    });
                                                }
                                            }, If);
                                            If.pop();
                                            Row.pop();
                                            ListItem.pop();
                                        };
                                        this.observeComponentCreation2(itemCreation2, ListItem);
                                        ListItem.pop();
                                    }
                                };
                                this.forEachUpdateFunction(elmtId, this.cartList, forEachItemGenFunction, undefined, true, false);
                            }, ForEach);
                            ForEach.pop();
                            List.pop();
                            Scroll.pop();
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    // 底部结算栏
                    if (this.cartList.length > 0) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.width('100%');
                                Row.padding(16);
                                Row.backgroundColor(Color.White);
                                Row.justifyContent(FlexAlign.SpaceBetween);
                                Row.shadow({
                                    radius: 8,
                                    color: app_color.shadow,
                                    offsetY: -2
                                });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                // 全选
                                Row.create();
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Checkbox.create();
                                Checkbox.select(this.allSelected);
                                Checkbox.selectedColor(app_color.primary);
                                Checkbox.onChange(() => this.toggleAllSelect());
                            }, Checkbox);
                            Checkbox.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('全选');
                                Text.fontSize(14);
                                Text.fontColor(app_color.text1);
                                Text.margin({ left: 8 });
                            }, Text);
                            Text.pop();
                            // 全选
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Blank.create();
                            }, Blank);
                            Blank.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                If.create();
                                // 非编辑模式：显示价格和结算按钮
                                if (!this.isEditMode) {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Column.create({ space: 4 });
                                            Column.alignItems(HorizontalAlign.End);
                                        }, Column);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create(`已选 ${this.selectedCount} 件`);
                                            Text.fontSize(12);
                                            Text.fontColor(app_color.text2);
                                            Text.textAlign(TextAlign.End);
                                        }, Text);
                                        Text.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create(`￥${this.totalPrice.toFixed(2)}`);
                                            Text.fontSize(18);
                                            Text.fontColor(app_color.primary);
                                            Text.fontWeight(FontWeight.Bold);
                                        }, Text);
                                        Text.pop();
                                        Column.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Button.createWithLabel('去结算');
                                            Button.height(44);
                                            Button.padding({ left: 24, right: 24 });
                                            Button.backgroundColor(app_color.primary);
                                            Button.fontColor(Color.White);
                                            Button.fontSize(16);
                                            Button.borderRadius(22);
                                            Button.margin({ left: 16 });
                                            Button.onClick(() => {
                                                if (this.selectedCount === 0) {
                                                    promptAction.showToast({ message: '请选择要结算的商品' });
                                                    return;
                                                }
                                                // TODO: 跳转到确认订单页
                                                const selectedItems = this.cartList.filter(item => item.selected);
                                                promptAction.showToast({
                                                    message: `准备结算 ${this.selectedCount} 件商品（订单页面开发中）`
                                                });
                                                // this.pageStack.pushPathByName('ConfirmOrderPage', selectedItems);
                                            });
                                        }, Button);
                                        Button.pop();
                                    });
                                }
                                // 编辑模式：删除和清空按钮
                                else {
                                    this.ifElseBranchUpdateFunction(1, () => {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Row.create({ space: 12 });
                                        }, Row);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Button.createWithLabel('批量删除');
                                            Button.height(40);
                                            Button.padding({ left: 20, right: 20 });
                                            Button.backgroundColor('#FF6B6B');
                                            Button.fontColor(Color.White);
                                            Button.fontSize(14);
                                            Button.borderRadius(20);
                                            Button.onClick(() => this.batchDeleteSelected());
                                        }, Button);
                                        Button.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Button.createWithLabel('清空购物车');
                                            Button.height(40);
                                            Button.padding({ left: 20, right: 20 });
                                            Button.backgroundColor('#FFA500');
                                            Button.fontColor(Color.White);
                                            Button.fontSize(14);
                                            Button.borderRadius(20);
                                            Button.onClick(() => this.clearAllCart());
                                        }, Button);
                                        Button.pop();
                                        Row.pop();
                                    });
                                }
                            }, If);
                            If.pop();
                            Row.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Users/Cart/CartPage" });
            NavDestination.hideTitleBar(true);
            NavDestination.onReady((context: NavDestinationContext) => {
                this.pageStack = context.pathStack;
                // 页面准备就绪后加载购物车数据
                console.info('[CartPage] 页面加载，开始获取购物车数据');
                this.loadCartData();
            });
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
