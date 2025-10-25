if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HomePage_Params {
    TABBAR_HEIGHT?: number;
    articles?: Article[];
    productName?: string;
    cartVisible?: Visibility;
    // 声明 pathStack
    pathStack?: NavPathStack;
}
import router from "@ohos:router";
import promptAction from "@ohos:promptAction";
// 文章数据定义
export interface Article {
    image: string;
    title: string;
    test: string;
}
// 文章数据 -- 静态
export const ArticleList: Article[] = [
    {
        image: 'https://picsum.photos/200/120?random=4',
        title: '宫保鸡丁',
        test: '鲜嫩鸡肉与花生的完美搭配'
    },
    {
        image: 'https://picsum.photos/200/120?random=5',
        title: '西红柿炒蛋',
        test: '家常必备，简单美味'
    },
    {
        image: 'https://picsum.photos/200/120?random=6',
        title: '麻婆豆腐',
        test: '川味代表，香麻下饭'
    },
    {
        image: "https://picsum.photos/200/120?random=11",
        title: "糖醋里脊",
        test: "酸甜酥脆，老少皆宜"
    },
    {
        image: "https://picsum.photos/200/120?random=22",
        title: "清蒸鲈鱼",
        test: "鲜嫩无腥味，广式经典"
    },
    {
        image: "https://picsum.photos/200/120?random=33",
        title: "宫保鸡丁",
        test: "麻辣微甜，花生脆香"
    },
    {
        image: "https://picsum.photos/200/120?random=44",
        title: "红烧肉",
        test: "肥而不腻，入口即化"
    },
    {
        image: "https://picsum.photos/200/120?random=55",
        title: "西红柿鸡蛋",
        test: "家常快手菜，百吃不厌"
    }
];
export class HomePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.TABBAR_HEIGHT = 350;
        this.__articles = new ObservedPropertyObjectPU(ArticleList, this, "articles");
        this.__productName = new ObservedPropertySimplePU('', this, "productName");
        this.__cartVisible = new ObservedPropertySimplePU(Visibility.Visible
        // 声明 pathStack
        , this, "cartVisible");
        this.pathStack = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HomePage_Params) {
        if (params.TABBAR_HEIGHT !== undefined) {
            this.TABBAR_HEIGHT = params.TABBAR_HEIGHT;
        }
        if (params.articles !== undefined) {
            this.articles = params.articles;
        }
        if (params.productName !== undefined) {
            this.productName = params.productName;
        }
        if (params.cartVisible !== undefined) {
            this.cartVisible = params.cartVisible;
        }
        if (params.pathStack !== undefined) {
            this.pathStack = params.pathStack;
        }
    }
    updateStateVars(params: HomePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__articles.purgeDependencyOnElmtId(rmElmtId);
        this.__productName.purgeDependencyOnElmtId(rmElmtId);
        this.__cartVisible.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__articles.aboutToBeDeleted();
        this.__productName.aboutToBeDeleted();
        this.__cartVisible.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // 这里做防止被导航栏遮挡
    readonly TABBAR_HEIGHT: number;
    private __articles: ObservedPropertyObjectPU<Article[]>;
    get articles() {
        return this.__articles.get();
    }
    set articles(newValue: Article[]) {
        this.__articles.set(newValue);
    }
    private __productName: ObservedPropertySimplePU<string>;
    get productName() {
        return this.__productName.get();
    }
    set productName(newValue: string) {
        this.__productName.set(newValue);
    }
    private __cartVisible: ObservedPropertySimplePU<Visibility>;
    get cartVisible() {
        return this.__cartVisible.get();
    }
    set cartVisible(newValue: Visibility) {
        this.__cartVisible.set(newValue);
    }
    // 声明 pathStack
    private pathStack: NavPathStack;
    // 在页面 ready 时获取上层 NavDestination 的 pathStack
    onReady(context: NavDestinationContext) {
        this.pathStack = context.pathStack;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F8F9FA');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部搜索栏
            Row.create();
            // 顶部搜索栏
            Row.backgroundColor('#FEC4DF');
            // 顶部搜索栏
            Row.padding({
                right: 10,
                top: 10,
                bottom: 10
            });
            // 顶部搜索栏
            Row.height(64);
            // 顶部搜索栏
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 用户头像
            // Image('https://picsum.photos/40/40')
            //   .width(44)
            //   .height(44)
            //   .borderRadius(22)
            //   .shadow({radius: 4, color: 'rgba(0,0,0,0.08)', offsetX: 0, offsetY: 2})
            // 搜索框
            Row.create();
            // 用户头像
            // Image('https://picsum.photos/40/40')
            //   .width(44)
            //   .height(44)
            //   .borderRadius(22)
            //   .shadow({radius: 4, color: 'rgba(0,0,0,0.08)', offsetX: 0, offsetY: 2})
            // 搜索框
            Row.width('100%');
            // 用户头像
            // Image('https://picsum.photos/40/40')
            //   .width(44)
            //   .height(44)
            //   .borderRadius(22)
            //   .shadow({radius: 4, color: 'rgba(0,0,0,0.08)', offsetX: 0, offsetY: 2})
            // 搜索框
            Row.height(44);
            // 用户头像
            // Image('https://picsum.photos/40/40')
            //   .width(44)
            //   .height(44)
            //   .borderRadius(22)
            //   .shadow({radius: 4, color: 'rgba(0,0,0,0.08)', offsetX: 0, offsetY: 2})
            // 搜索框
            Row.borderRadius(20);
            // 用户头像
            // Image('https://picsum.photos/40/40')
            //   .width(44)
            //   .height(44)
            //   .borderRadius(22)
            //   .shadow({radius: 4, color: 'rgba(0,0,0,0.08)', offsetX: 0, offsetY: 2})
            // 搜索框
            Row.margin({ left: 12 });
            // 用户头像
            // Image('https://picsum.photos/40/40')
            //   .width(44)
            //   .height(44)
            //   .borderRadius(22)
            //   .shadow({radius: 4, color: 'rgba(0,0,0,0.08)', offsetX: 0, offsetY: 2})
            // 搜索框
            Row.justifyContent(FlexAlign.Start);
            // 用户头像
            // Image('https://picsum.photos/40/40')
            //   .width(44)
            //   .height(44)
            //   .borderRadius(22)
            //   .shadow({radius: 4, color: 'rgba(0,0,0,0.08)', offsetX: 0, offsetY: 2})
            // 搜索框
            Row.padding({ left: 16 });
            // 用户头像
            // Image('https://picsum.photos/40/40')
            //   .width(44)
            //   .height(44)
            //   .borderRadius(22)
            //   .shadow({radius: 4, color: 'rgba(0,0,0,0.08)', offsetX: 0, offsetY: 2})
            // 搜索框
            Row.border({ width: 1, color: '#E9ECEF' });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777274, "type": 20000, params: [], "bundleName": "com.example.marketapp", "moduleName": "entry" });
            Image.width(16);
            Image.height(16);
            Image.margin({ right: 8 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({
                placeholder: '请输入商品名称'
            });
            TextInput.backgroundColor('#FEC4DF');
            TextInput.width('70%');
            TextInput.onChange((value: string) => {
                this.productName = value;
            });
            TextInput.fontSize(14);
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
                router.pushUrl({
                    url: 'pages/Users/Home/SearchProductPage',
                    params: { keyword: this.productName, animateCart: true }
                });
            });
        }, Button);
        Button.pop();
        // 用户头像
        // Image('https://picsum.photos/40/40')
        //   .width(44)
        //   .height(44)
        //   .borderRadius(22)
        //   .shadow({radius: 4, color: 'rgba(0,0,0,0.08)', offsetX: 0, offsetY: 2})
        // 搜索框
        Row.pop();
        // 顶部搜索栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 今日推荐标题
            Row.create();
            // 今日推荐标题
            Row.backgroundColor('#27AE60');
            // 今日推荐标题
            Row.width('100%');
            // 今日推荐标题
            Row.padding({
                left: 16,
                right: 16,
                top: 10,
                bottom: 10
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🍳 今日推荐');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('更多 >');
            Text.fontSize(14);
            Text.fontColor('#888');
        }, Text);
        Text.pop();
        // 今日推荐标题
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 今日推荐横向卡片
            Scroll.create();
            // 今日推荐横向卡片
            Scroll.scrollable(ScrollDirection.Horizontal);
            // 今日推荐横向卡片
            Scroll.scrollBar(BarState.Off);
            // 今日推荐横向卡片
            Scroll.height(200);
            // 今日推荐横向卡片
            Scroll.padding({ top: 12 });
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding({ left: 16, right: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.margin({ right: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('https://picsum.photos/200/120?random=1');
            Image.width(150);
            Image.height(110);
            Image.borderRadius(12);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('宫保鸡丁');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('鲜嫩鸡肉与花生的完美搭配');
            Text.fontSize(12);
            Text.fontColor('#888');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.margin({ right: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('https://picsum.photos/200/120?random=2');
            Image.width(150);
            Image.height(110);
            Image.borderRadius(12);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('西红柿炒蛋');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('家常必备，简单美味');
            Text.fontSize(12);
            Text.fontColor('#888');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('https://picsum.photos/200/120?random=3');
            Image.width(150);
            Image.height(110);
            Image.borderRadius(12);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('麻婆豆腐');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('川味代表，香麻下饭');
            Text.fontSize(12);
            Text.fontColor('#888');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        // 今日推荐横向卡片
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // AI智能推荐标题
            Row.create();
            // AI智能推荐标题
            Row.backgroundColor('#27AE60');
            // AI智能推荐标题
            Row.width('100%');
            // AI智能推荐标题
            Row.padding({
                left: 16,
                right: 16,
                top: 10,
                bottom: 10
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🤖 AI 智能推荐');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('换一批');
            Text.fontSize(14);
            Text.fontColor('#888');
        }, Text);
        Text.pop();
        // AI智能推荐标题
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 菜谱列表
            List.create();
            // 菜谱列表
            List.padding({ bottom: this.TABBAR_HEIGHT });
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
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.padding({
                                left: 16,
                                right: 16,
                                top: 8,
                                bottom: 8
                            });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(item.image.trim());
                            Image.width(106);
                            Image.height(82);
                            Image.borderRadius(8);
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.alignItems(HorizontalAlign.Start);
                            Column.margin({ left: 12 });
                            Column.layoutWeight(1);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.title);
                            Text.fontSize(16);
                            Text.fontWeight(FontWeight.Bold);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.test);
                            Text.fontSize(12);
                            Text.fontColor('#666');
                            Text.margin({ top: 4 });
                        }, Text);
                        Text.pop();
                        Column.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.articles, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 菜谱列表
        List.pop();
        Column.pop();
    }
    // 设置一个搜索框点击搜索跳转到新页面的方法
    goToSearchPage() {
        if (!this.productName || this.productName.trim() === '') {
            promptAction.showToast({ message: '请输入商品名称' });
            return;
        }
        // 使用 router.push 跳转到结果页，并传递参数
        router.pushUrl({
            url: 'pages/Users/Home/SearchProductPage',
            params: {
                productName: this.productName
            }
        });
    }
    rerender() {
        this.updateDirtyElements();
    }
}
