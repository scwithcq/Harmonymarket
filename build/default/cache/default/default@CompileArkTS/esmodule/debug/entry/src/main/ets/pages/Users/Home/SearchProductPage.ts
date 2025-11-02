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
    showBig?: boolean;
    bigUrl?: string;
    bigShown?: boolean;
    productName?: string;
    pageStack?: NavPathStack;
}
import http from "@ohos:net.http";
import { app_color } from "@normalized:N&&&entry/src/main/ets/utils/Colors&";
import promptAction from "@ohos:promptAction";
import display from "@ohos:display";
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
// const BASE_URL = 'http://10.0.2.2:8080/api';  //这个用来模拟机测试
const BASE_URL = 'http://192.168.85.10:8080/api'; //这个在连接我的热点70测试
export function SearchProductPageBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new SearchProductPage(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Users/Home/SearchProductPage.ets", line: 38, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "SearchProductPage" });
    }
}
class SearchProductPage extends ViewPU {
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
        //这里用来渲染商品图片的放大
        , this, "offsetY");
        this.__showBig = new ObservedPropertySimplePU(false // 是否处于放大态
        , this, "showBig");
        this.__bigUrl = new ObservedPropertySimplePU('' // 要放大哪张图
        , this, "bigUrl");
        this.__bigShown = new ObservedPropertySimplePU(false, this, "bigShown");
        this.__productName = new ObservedPropertySimplePU('', this, "productName");
        this.__pageStack = new ObservedPropertyObjectPU(null!, this, "pageStack");
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
        if (params.showBig !== undefined) {
            this.showBig = params.showBig;
        }
        if (params.bigUrl !== undefined) {
            this.bigUrl = params.bigUrl;
        }
        if (params.bigShown !== undefined) {
            this.bigShown = params.bigShown;
        }
        if (params.productName !== undefined) {
            this.productName = params.productName;
        }
        if (params.pageStack !== undefined) {
            this.pageStack = params.pageStack;
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
        this.__showBig.purgeDependencyOnElmtId(rmElmtId);
        this.__bigUrl.purgeDependencyOnElmtId(rmElmtId);
        this.__bigShown.purgeDependencyOnElmtId(rmElmtId);
        this.__productName.purgeDependencyOnElmtId(rmElmtId);
        this.__pageStack.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__keyword.aboutToBeDeleted();
        this.__productList.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__cartVisible.aboutToBeDeleted();
        this.__offsetX.aboutToBeDeleted();
        this.__offsetY.aboutToBeDeleted();
        this.__showBig.aboutToBeDeleted();
        this.__bigUrl.aboutToBeDeleted();
        this.__bigShown.aboutToBeDeleted();
        this.__productName.aboutToBeDeleted();
        this.__pageStack.aboutToBeDeleted();
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
    //这里用来渲染商品图片的放大
    private __showBig: ObservedPropertySimplePU<boolean>; // 是否处于放大态
    get showBig() {
        return this.__showBig.get();
    }
    set showBig(newValue: boolean) {
        this.__showBig.set(newValue);
    }
    private __bigUrl: ObservedPropertySimplePU<string>; // 要放大哪张图
    get bigUrl() {
        return this.__bigUrl.get();
    }
    set bigUrl(newValue: string) {
        this.__bigUrl.set(newValue);
    }
    private __bigShown: ObservedPropertySimplePU<boolean>;
    get bigShown() {
        return this.__bigShown.get();
    }
    set bigShown(newValue: boolean) {
        this.__bigShown.set(newValue);
    }
    private __productName: ObservedPropertySimplePU<string>;
    get productName() {
        return this.__productName.get();
    }
    set productName(newValue: string) {
        this.__productName.set(newValue);
    }
    // null! 表示“外部会马上赋值”
    private __pageStack: ObservedPropertyObjectPU<NavPathStack>; // 先占位，等 onReady 赋值
    get pageStack() {
        return this.__pageStack.get();
    }
    set pageStack(newValue: NavPathStack) {
        this.__pageStack.set(newValue);
    }
    // 页面显示前获取路由参数
    /*  aboutToAppear() {
        const params = router.getParams() as Record<string, string>;
        this.keyword = params?.keyword ?? '';
        if (this.keyword) {
          this.fetchProductData();
        }
        if (this.animateCart) {
          this.startState()
        } else {
          this.cartVisible = Visibility.None
        }
    
      }*/
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
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create({ space: 12 });
                    Column.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
                    Column.bindContentCover({ value: this.bigShown, changeEvent: newValue => { this.bigShown = newValue; } }, { builder: () => {
                            this.BigCoverBuilder.call(this);
                        } }, // 真正的放大 UI
                    {
                        modalTransition: ModalTransition.ALPHA,
                        backgroundColor: Color.Transparent,
                        onDisappear: () => {
                            this.bigUrl = ''; // 清理状态
                            this.bigShown = false;
                        }
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 1. 顶部搜索栏（通栏卡片版）
                    Row.create();
                    // 1. 顶部搜索栏（通栏卡片版）
                    Row.width('100%');
                    // 1. 顶部搜索栏（通栏卡片版）
                    Row.justifyContent(FlexAlign.SpaceBetween);
                    // 1. 顶部搜索栏（通栏卡片版）
                    Row.border({ width: 3, radius: 4, color: Color.Green });
                    // 1. 顶部搜索栏（通栏卡片版）
                    Row.height(56);
                    // 1. 顶部搜索栏（通栏卡片版）
                    Row.padding({ left: 16, right: 16 });
                    // 1. 顶部搜索栏（通栏卡片版）
                    Row.borderRadius(24);
                    // 1. 顶部搜索栏（通栏卡片版）
                    Row.margin({ top: 24, left: 16, right: 16 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 1.1 图标式返回（轻量、不占文字空间）
                    Image.create({ "id": 16777246, "type": 20000, params: [], "bundleName": "com.example.marketapp", "moduleName": "entry" });
                    // 1.1 图标式返回（轻量、不占文字空间）
                    Image.fillColor(Color.Black);
                    // 1.1 图标式返回（轻量、不占文字空间）
                    Image.width('10%');
                    // 1.1 图标式返回（轻量、不占文字空间）
                    Image.height(30);
                    // 1.1 图标式返回（轻量、不占文字空间）
                    Image.onClick(() => {
                        this.pageStack.pop(); //返回上一页
                    });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    /*          Text('搜索结果')
                                .fontSize(12)
                                .fontColor(app_color.text2)
                                .lineHeight(14)
                              Text(this.keyword)
                                .fontSize(16)
                                .fontWeight(FontWeight.Medium)
                                .fontColor(app_color.primary)
                                .maxLines(1)
                                .textOverflow({ overflow: TextOverflow.Ellipsis })*/
                    //当我点击搜索的结果的时候，可以进行修改
                    TextInput.create({
                        placeholder: this.keyword
                    });
                    /*          Text('搜索结果')
                                .fontSize(12)
                                .fontColor(app_color.text2)
                                .lineHeight(14)
                              Text(this.keyword)
                                .fontSize(16)
                                .fontWeight(FontWeight.Medium)
                                .fontColor(app_color.primary)
                                .maxLines(1)
                                .textOverflow({ overflow: TextOverflow.Ellipsis })*/
                    //当我点击搜索的结果的时候，可以进行修改
                    TextInput.layoutWeight(1);
                    /*          Text('搜索结果')
                                .fontSize(12)
                                .fontColor(app_color.text2)
                                .lineHeight(14)
                              Text(this.keyword)
                                .fontSize(16)
                                .fontWeight(FontWeight.Medium)
                                .fontColor(app_color.primary)
                                .maxLines(1)
                                .textOverflow({ overflow: TextOverflow.Ellipsis })*/
                    //当我点击搜索的结果的时候，可以进行修改
                    TextInput.textAlign(TextAlign.Center);
                    /*          Text('搜索结果')
                                .fontSize(12)
                                .fontColor(app_color.text2)
                                .lineHeight(14)
                              Text(this.keyword)
                                .fontSize(16)
                                .fontWeight(FontWeight.Medium)
                                .fontColor(app_color.primary)
                                .maxLines(1)
                                .textOverflow({ overflow: TextOverflow.Ellipsis })*/
                    //当我点击搜索的结果的时候，可以进行修改
                    TextInput.onChange((value: string) => {
                        this.productName = value;
                    });
                    /*          Text('搜索结果')
                                .fontSize(12)
                                .fontColor(app_color.text2)
                                .lineHeight(14)
                              Text(this.keyword)
                                .fontSize(16)
                                .fontWeight(FontWeight.Medium)
                                .fontColor(app_color.primary)
                                .maxLines(1)
                                .textOverflow({ overflow: TextOverflow.Ellipsis })*/
                    //当我点击搜索的结果的时候，可以进行修改
                    TextInput.fontSize(14);
                    /*          Text('搜索结果')
                                .fontSize(12)
                                .fontColor(app_color.text2)
                                .lineHeight(14)
                              Text(this.keyword)
                                .fontSize(16)
                                .fontWeight(FontWeight.Medium)
                                .fontColor(app_color.primary)
                                .maxLines(1)
                                .textOverflow({ overflow: TextOverflow.Ellipsis })*/
                    //当我点击搜索的结果的时候，可以进行修改
                    TextInput.fontColor('#9E9E9E');
                }, TextInput);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel('搜索');
                    Button.width('20%');
                    Button.height(40);
                    Button.margin({ left: 10 });
                    Button.backgroundColor('#4CAF50');
                    Button.fontColor('#FFFFFF');
                    Button.onClick(() => {
                        if (!this.productName?.trim()) {
                            promptAction.showToast({ message: '请输入商品名称' });
                            return;
                        }
                        // const params = new SearchParams(this.productName);
                        // this.pageStack.pushPath({name:"SearchProductPage",param : this.productName })
                        /*              router.pushUrl({
                                        url: 'pages/Users/Home/SearchProductPage',
                                        params: { keyword: this.productName, animateCart: true }
                                      });*/
                        this.pageStack.pushPathByName("SearchProductPage", this.productName);
                    });
                }, Button);
                Button.pop();
                // 1. 顶部搜索栏（通栏卡片版）
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    /*      // 1. 顶部标题栏
                          Row() {
                            Button('返回')
                              .width(60)
                              .height(36)
                              .backgroundColor(app_color.primary)
                              .fontColor(Color.White)
                              .borderRadius(18)
                              .onClick(() => router.back())
            
                            Text(`搜索结果：${this.keyword}`)
                              .fontSize(20)
                              .fontWeight(FontWeight.Bold)
                              .fontColor(app_color.text1)
                          }
                          .width('100%')
                          .border({width:3,color:Color.Black,radius:3})
                          .justifyContent(FlexAlign.SpaceBetween)
                          .padding({ top: 20, left: 16 })
                          .backgroundColor(app_color.card)*/
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
                                Image.create({ "id": 16777257, "type": 20000, params: [], "bundleName": "com.example.marketapp", "moduleName": "entry" });
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
                                Scroll.padding({ bottom: 100 });
                            }, Scroll);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Stack.create();
                            }, Stack);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                List.create({ space: 12 });
                                List.width('100%');
                            }, List);
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
                                            ListItem.border({ radius: 10 });
                                            ListItem.backgroundColor('#FFEFD5');
                                        };
                                        const deepRenderFunction = (elmtId, isInitialRender) => {
                                            itemCreation(elmtId, isInitialRender);
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Row.create();
                                                Row.width('100%');
                                                Row.padding(12);
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
                                                Image.onClick(() => {
                                                    this.bigUrl = item.imageUrl;
                                                    this.bigShown = true;
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
                                                Text.fontColor(Color.Black);
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
                                                Row.justifyContent(FlexAlign.End);
                                            }, Row);
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Image.create({ "id": 16777235, "type": 20000, params: [], "bundleName": "com.example.marketapp", "moduleName": "entry" });
                                                Context.animation({ duration: 600, curve: Curve.EaseInOut });
                                                Image.width(50);
                                                Image.height(50);
                                                Image.translate({ x: this.offsetX, y: this.offsetY });
                                                Context.animation(null);
                                            }, Image);
                                            // 后续开发加入购物车选项
                                            Row.pop();
                                            Row.pop();
                                            ListItem.pop();
                                        };
                                        this.observeComponentCreation2(itemCreation2, ListItem);
                                        ListItem.pop();
                                    }
                                };
                                this.forEachUpdateFunction(elmtId, this.productList, forEachItemGenFunction);
                            }, ForEach);
                            ForEach.pop();
                            List.pop();
                            Stack.pop();
                            Scroll.pop();
                        });
                    }
                }, If);
                If.pop();
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Users/Home/SearchProductPage" });
            NavDestination.hideTitleBar(true);
            NavDestination.onReady((context: NavDestinationContext) => {
                this.pageStack = context.pathStack;
                this.keyword = context.pathInfo.param as string ?? '';
                if (this.keyword)
                    this.fetchProductData();
            });
        }, NavDestination);
        NavDestination.pop();
    }
    BigCoverBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Context.animation({ duration: 250, curve: Curve.Friction });
            Stack.width('100%');
            Stack.height('100%');
            Stack.alignContent(Alignment.Center);
            Context.animation(null);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 黑色半透明遮罩
            Column.create();
            // 黑色半透明遮罩
            Column.width('100%');
            // 黑色半透明遮罩
            Column.height('100%');
            // 黑色半透明遮罩
            Column.backgroundColor(Color.Black);
            // 黑色半透明遮罩
            Column.shadow({ radius: 20, color: '#40000000' });
            // 黑色半透明遮罩
            Column.onClick(() => this.bigUrl = '');
        }, Column);
        // 黑色半透明遮罩
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 大图：按屏幕短边自适应
            Image.create(this.bigUrl);
            // 大图：按屏幕短边自适应
            Image.width(this.bigImageSize());
            // 大图：按屏幕短边自适应
            Image.height(this.bigImageSize());
            // 大图：按屏幕短边自适应
            Image.borderRadius(16);
            // 大图：按屏幕短边自适应
            Image.shadow({ radius: 20, color: '#80000000' });
            // 大图：按屏幕短边自适应
            Image.objectFit(ImageFit.Contain);
            // 大图：按屏幕短边自适应
            Image.onClick(() => {
                this.bigUrl = '';
                this.bigShown = false;
            });
        }, Image);
        Stack.pop();
    }
    // 辅助：手机/平板自适应大小
    private bigImageSize(): number {
        const dsp = display.getDefaultDisplaySync() as display.Display;
        const short = Math.min(px2vp(dsp.width), px2vp(dsp.height));
        return Math.min(short * 0.78, 480); // 最大 480vp
    }
    rerender() {
        this.updateDirtyElements();
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("SearchProductPage", wrapBuilder(SearchProductPageBuilder));
    }
})();
