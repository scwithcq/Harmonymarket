if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SearchProductPage_Params {
    animateCart?: boolean;
    keyword?: string;
    productList?: ProductDataItem[];
    isLoading?: boolean;
    cartVisible?: Visibility;
    offsetX?: number;
    offsetY?: number;
}
import router from "@ohos:router";
import http from "@ohos:net.http";
import { app_color } from "@normalized:N&&&entry/src/main/ets/utils/Colors&";
// 商品数据类型
export interface ProductDataItem {
    id: number;
    name: string;
    price: number;
    unit: string;
    imageUrl: string;
    isRecommend?: number;
    isNew?: number;
}
interface GeneratedTypeLiteralInterface_1 {
    item: ProductDataItem[];
}
export interface ProductResultData {
    success: boolean;
    data: GeneratedTypeLiteralInterface_1;
    code: number;
    message: string;
}
// 模拟器访问宿主机地址
const BASE_URL = 'http://10.0.2.2:8080/api';
export class SearchProductPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.animateCart = false;
        this.__keyword = new ObservedPropertySimplePU('', this, "keyword");
        this.__productList = new ObservedPropertyObjectPU([], this, "productList");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.__cartVisible = new ObservedPropertySimplePU(Visibility.Visible, this, "cartVisible");
        this.__offsetX = new ObservedPropertySimplePU(0, this, "offsetX");
        this.__offsetY = new ObservedPropertySimplePU(0
        // 页面显示前获取路由参数
        , this, "offsetY");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SearchProductPage_Params) {
        if (params.animateCart !== undefined) {
            this.animateCart = params.animateCart;
        }
        if (params.keyword !== undefined) {
            this.keyword = params.keyword;
        }
        if (params.productList !== undefined) {
            this.productList = params.productList;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.cartVisible !== undefined) {
            this.cartVisible = params.cartVisible;
        }
        if (params.offsetX !== undefined) {
            this.offsetX = params.offsetX;
        }
        if (params.offsetY !== undefined) {
            this.offsetY = params.offsetY;
        }
    }
    updateStateVars(params: SearchProductPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__keyword.purgeDependencyOnElmtId(rmElmtId);
        this.__productList.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__cartVisible.purgeDependencyOnElmtId(rmElmtId);
        this.__offsetX.purgeDependencyOnElmtId(rmElmtId);
        this.__offsetY.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__keyword.aboutToBeDeleted();
        this.__productList.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__cartVisible.aboutToBeDeleted();
        this.__offsetX.aboutToBeDeleted();
        this.__offsetY.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private animateCart: boolean;
    private __keyword: ObservedPropertySimplePU<string>;
    get keyword() {
        return this.__keyword.get();
    }
    set keyword(newValue: string) {
        this.__keyword.set(newValue);
    }
    private __productList: ObservedPropertyObjectPU<ProductDataItem[]>;
    get productList() {
        return this.__productList.get();
    }
    set productList(newValue: ProductDataItem[]) {
        this.__productList.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    private __cartVisible: ObservedPropertySimplePU<Visibility>;
    get cartVisible() {
        return this.__cartVisible.get();
    }
    set cartVisible(newValue: Visibility) {
        this.__cartVisible.set(newValue);
    }
    private __offsetX: ObservedPropertySimplePU<number>;
    get offsetX() {
        return this.__offsetX.get();
    }
    set offsetX(newValue: number) {
        this.__offsetX.set(newValue);
    }
    private __offsetY: ObservedPropertySimplePU<number>;
    get offsetY() {
        return this.__offsetY.get();
    }
    set offsetY(newValue: number) {
        this.__offsetY.set(newValue);
    }
    // 页面显示前获取路由参数
    aboutToAppear() {
        const params = router.getParams() as Record<string, string>;
        this.keyword = params?.keyword ?? '';
        if (this.keyword) {
            this.fetchProductData();
        }
        if (this.animateCart) {
            this.startState();
        }
        else {
            this.cartVisible = Visibility.None;
        }
    }
    // onAppear(event: () => void): CommonAttribute {
    // 	return this.startState();
    // }
    // 调用后端接口获取商品数据
    async fetchProductData() {
        this.isLoading = true;
        const httpReq = http.createHttp();
        const url = `${BASE_URL}/products?keyword=${encodeURIComponent(this.keyword)}`;
        try {
            const resp = await httpReq.request(url, { method: http.RequestMethod.GET });
            if (resp.responseCode === 200) {
                const result: ProductResultData = JSON.parse(resp.result.toString());
                if (result.success && result.data?.item) {
                    this.productList = result.data.item;
                }
                else {
                    this.productList = [];
                }
            }
            else {
                console.error(`请求失败，状态码: ${resp.responseCode}`);
                this.productList = [];
            }
        }
        catch (err) {
            console.error('请求异常:', err);
            this.productList = [];
        }
        finally {
            httpReq.destroy();
            this.isLoading = false;
        }
    }
    //定义一个购物车从左到右的平移方法
    private startState(): void {
        this.offsetX = this.offsetX === 0 ? 70 : 70;
        this.offsetY === 0;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor(app_color.bg);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 1. 顶部标题栏
            Row.create();
            // 1. 顶部标题栏
            Row.padding({ top: 20, left: 16 });
            // 1. 顶部标题栏
            Row.backgroundColor(app_color.card);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('返回');
            Button.width(60);
            Button.height(36);
            Button.backgroundColor(app_color.primary);
            Button.fontColor(Color.White);
            Button.borderRadius(18);
            Button.onClick(() => router.back());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`搜索结果：${this.keyword}`);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(app_color.text1);
        }, Text);
        Text.pop();
        // 1. 顶部标题栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 加载状态
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('正在加载中...');
                        Text.fontSize(16);
                        Text.margin({ top: 40 });
                    }, Text);
                    Text.pop();
                });
            }
            // 3. 空数据
            else if (this.productList.length === 0) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.margin({ top: 60 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777297, "type": 20000, params: [], "bundleName": "com.example.marketapp", "moduleName": "entry" });
                        Image.width(120);
                        Image.height(120);
                        Image.opacity(0.6);
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('暂无相关商品');
                        Text.fontSize(16);
                        Text.fontColor(app_color.text2);
                        Text.margin({ top: 12 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            // 4. 商品列表
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Scroll.create();
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create({ space: 12 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
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
                                    Context.animation(null);
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Column.create();
                                        Column.backgroundColor(app_color.card);
                                        Column.borderRadius(16);
                                        Column.shadow({
                                            radius: 8,
                                            color: app_color.shadow,
                                            offsetX: 0,
                                            offsetY: 4
                                        });
                                        Column.padding(16);
                                        Column.margin({
                                            left: 16,
                                            right: 16,
                                            top: 6,
                                            bottom: 6
                                        });
                                    }, Column);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Image.create(item.imageUrl);
                                        Image.width(80);
                                        Image.height(80);
                                        Image.borderRadius(12);
                                        Image.shadow({
                                            radius: 6,
                                            color: app_color.shadow,
                                            offsetX: 0,
                                            offsetY: 2
                                        });
                                    }, Image);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Column.create({ space: 6 });
                                        Column.layoutWeight(1);
                                        Column.margin({ left: 12 });
                                    }, Column);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(item.name);
                                        Text.fontSize(17);
                                        Text.fontWeight(FontWeight.Medium);
                                        Text.fontColor(app_color.text1);
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(`￥${item.price} / ${item.unit}`);
                                        Text.fontSize(15);
                                        Text.fontColor(app_color.primary);
                                        Text.fontWeight(FontWeight.Bold);
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create({ space: 6 });
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        If.create();
                                        if (item.isRecommend === 1) {
                                            this.ifElseBranchUpdateFunction(0, () => {
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Text.create('🔥 推荐');
                                                    Text.fontSize(11);
                                                    Text.backgroundColor(app_color.accentLight);
                                                    Text.fontColor(Color.White);
                                                    Text.padding({
                                                        left: 6,
                                                        right: 6,
                                                        top: 2,
                                                        bottom: 2
                                                    });
                                                    Text.borderRadius(4);
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
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        If.create();
                                        if (item.isNew === 1) {
                                            this.ifElseBranchUpdateFunction(0, () => {
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Text.create('🆕 新品');
                                                    Text.fontSize(11);
                                                    Text.backgroundColor(app_color.success);
                                                    Text.fontColor(Color.White);
                                                    Text.padding({
                                                        left: 6,
                                                        right: 6,
                                                        top: 2,
                                                        bottom: 2
                                                    });
                                                    Text.borderRadius(4);
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
                                    Row.pop();
                                    Column.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        // 后续开发加入购物车选项
                                        Row.create();
                                        // 后续开发加入购物车选项
                                        Row.layoutWeight(1);
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Image.create({ "id": 16777298, "type": 20000, params: [], "bundleName": "com.example.marketapp", "moduleName": "entry" });
                                        Context.animation({ duration: 600, curve: Curve.EaseInOut });
                                        Image.width(50);
                                        Image.height(50);
                                        Image.translate({ x: this.offsetX, y: this.offsetY });
                                        Context.animation(null);
                                        Image.onClick(() => {
                                            this.offsetX = this.offsetX === 0 ? 70 : 0;
                                            this.offsetY === 0;
                                        });
                                    }, Image);
                                    // 后续开发加入购物车选项
                                    Row.pop();
                                    Row.pop();
                                    Column.pop();
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.productList, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    Column.pop();
                    Scroll.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "SearchProductPage";
    }
}
registerNamedRoute(() => new SearchProductPage(undefined, {}), "", { bundleName: "com.example.marketapp", moduleName: "entry", pagePath: "pages/Users/Home/SearchProductPage", pageFullPath: "entry/src/main/ets/pages/Users/Home/SearchProductPage", integratedHsp: "false" });
