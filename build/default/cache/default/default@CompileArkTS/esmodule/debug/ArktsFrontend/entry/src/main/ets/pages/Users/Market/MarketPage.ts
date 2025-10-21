if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MarketPage_Params {
    selectedCategory?: string;
    selectedTab?: number;
}
export class MarketPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__selectedCategory = new ObservedPropertySimplePU('全部', this, "selectedCategory");
        this.__selectedTab = new ObservedPropertySimplePU(1 // 菜市场tab选中
        , this, "selectedTab");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MarketPage_Params) {
        if (params.selectedCategory !== undefined) {
            this.selectedCategory = params.selectedCategory;
        }
        if (params.selectedTab !== undefined) {
            this.selectedTab = params.selectedTab;
        }
    }
    updateStateVars(params: MarketPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectedCategory.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedTab.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectedCategory.aboutToBeDeleted();
        this.__selectedTab.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __selectedCategory: ObservedPropertySimplePU<string>;
    get selectedCategory() {
        return this.__selectedCategory.get();
    }
    set selectedCategory(newValue: string) {
        this.__selectedCategory.set(newValue);
    }
    private __selectedTab: ObservedPropertySimplePU<number>; // 菜市场tab选中
    get selectedTab() {
        return this.__selectedTab.get();
    }
    set selectedTab(newValue: number) {
        this.__selectedTab.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#FFFFFF');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部安全区域
            // Blank()
            //   .height(44)
            // 顶部导航栏
            Row.create();
            // 顶部安全区域
            // Blank()
            //   .height(44)
            // 顶部导航栏
            Row.width('100%');
            // 顶部安全区域
            // Blank()
            //   .height(44)
            // 顶部导航栏
            Row.height(50);
            // 顶部安全区域
            // Blank()
            //   .height(44)
            // 顶部导航栏
            Row.padding({ left: 16, right: 16 });
            // 顶部安全区域
            // Blank()
            //   .height(44)
            // 顶部导航栏
            Row.backgroundColor('#FFFFFF');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('菜市场导购');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777261, "type": 20000, params: [], "bundleName": "com.example.marketapp", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.fillColor('#666');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125830217, "type": 20000, params: [], "bundleName": "com.example.marketapp", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.fillColor('#666');
            Image.margin({ left: 12 });
        }, Image);
        Row.pop();
        // 顶部安全区域
        // Blank()
        //   .height(44)
        // 顶部导航栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 分隔线
            Divider.create();
            // 分隔线
            Divider.color('#E0E0E0');
            // 分隔线
            Divider.strokeWidth(1);
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 分类筛选区
            Scroll.create();
            // 分类筛选区
            Scroll.scrollable(ScrollDirection.Horizontal);
            // 分类筛选区
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding({ left: 16, right: 16, top: 12, bottom: 6 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const category = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(category);
                    Text.fontSize(14);
                    Text.fontColor(this.selectedCategory === category ? '#FFFFFF' : '#333');
                    Text.backgroundColor(this.selectedCategory === category ? '#4CAF50' : '#F5F5F5');
                    Text.borderRadius(16);
                    Text.padding({ left: 16, right: 16, top: 8, bottom: 8 });
                    Text.margin({ right: 10 });
                    Text.onClick(() => {
                        this.selectedCategory = category;
                    });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, ['全部', '蔬菜', '水果', '肉类', '海鲜', '调料', '粮油', '豆制品'], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        // 分类筛选区
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 商户推荐区
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🏪 推荐商户');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333');
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ left: 16, top: 16, bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 商户卡片1
            Row.create();
            // 商户卡片1
            Row.width('100%');
            // 商户卡片1
            Row.height(100);
            // 商户卡片1
            Row.backgroundColor('#FFFFFF');
            // 商户卡片1
            Row.borderRadius(8);
            // 商户卡片1
            Row.padding(12);
            // 商户卡片1
            Row.margin({ left: 16, right: 16, bottom: 10 });
            // 商户卡片1
            Row.shadow({
                radius: 4,
                color: '#E0E0E0',
                offsetX: 0,
                offsetY: 2
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('https://picsum.photos/200/160?random=1');
            Image.width(100);
            Image.height(80);
            Image.borderRadius(8);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 12 });
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('老王蔬菜店');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333');
            Text.alignSelf(ItemAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('新鲜蔬菜，每日直供，价格实惠');
            Text.fontSize(12);
            Text.fontColor('#666');
            Text.margin({ top: 4 });
            Text.alignSelf(ItemAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('好评率98%');
            Text.fontSize(12);
            Text.fontColor('#4CAF50');
            Text.margin({ top: 8 });
            Text.alignSelf(ItemAlign.Start);
        }, Text);
        Text.pop();
        Column.pop();
        // 商户卡片1
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 商户卡片2
            Row.create();
            // 商户卡片2
            Row.width('100%');
            // 商户卡片2
            Row.height(100);
            // 商户卡片2
            Row.backgroundColor('#FFFFFF');
            // 商户卡片2
            Row.borderRadius(8);
            // 商户卡片2
            Row.padding(12);
            // 商户卡片2
            Row.margin({ left: 16, right: 16, bottom: 10 });
            // 商户卡片2
            Row.shadow({
                radius: 4,
                color: '#E0E0E0',
                offsetX: 0,
                offsetY: 2
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('https://picsum.photos/200/160?random=2');
            Image.width(100);
            Image.height(80);
            Image.borderRadius(8);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 12 });
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('海鲜批发市场');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333');
            Text.alignSelf(ItemAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('新鲜海鲜，活鱼活虾，品质保证');
            Text.fontSize(12);
            Text.fontColor('#666');
            Text.margin({ top: 4 });
            Text.alignSelf(ItemAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('好评率95%');
            Text.fontSize(12);
            Text.fontColor('#4CAF50');
            Text.margin({ top: 8 });
            Text.alignSelf(ItemAlign.Start);
        }, Text);
        Text.pop();
        Column.pop();
        // 商户卡片2
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 商户卡片3
            Row.create();
            // 商户卡片3
            Row.width('100%');
            // 商户卡片3
            Row.height(100);
            // 商户卡片3
            Row.backgroundColor('#FFFFFF');
            // 商户卡片3
            Row.borderRadius(8);
            // 商户卡片3
            Row.padding(12);
            // 商户卡片3
            Row.margin({ left: 16, right: 16 });
            // 商户卡片3
            Row.shadow({
                radius: 4,
                color: '#E0E0E0',
                offsetX: 0,
                offsetY: 2
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('https://picsum.photos/200/160?random=3');
            Image.width(100);
            Image.height(80);
            Image.borderRadius(8);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 12 });
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('水果精品店');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333');
            Text.alignSelf(ItemAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('进口水果，精品水果，新鲜直达');
            Text.fontSize(12);
            Text.fontColor('#666');
            Text.margin({ top: 4 });
            Text.alignSelf(ItemAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('好评率96%');
            Text.fontSize(12);
            Text.fontColor('#4CAF50');
            Text.margin({ top: 8 });
            Text.alignSelf(ItemAlign.Start);
        }, Text);
        Text.pop();
        Column.pop();
        // 商户卡片3
        Row.pop();
        Column.pop();
        // 商户推荐区
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 热门商品推荐区
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🔥 热门商品');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('查看更多 >');
            Text.fontSize(14);
            Text.fontColor('#888');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 商品网格（包裹为可滚动列表，保留原卡片样式）
            Scroll.create();
            // 商品网格（包裹为可滚动列表，保留原卡片样式）
            Scroll.height(420);
            // 商品网格（包裹为可滚动列表，保留原卡片样式）
            Scroll.scrollable(ScrollDirection.Vertical);
            // 商品网格（包裹为可滚动列表，保留原卡片样式）
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceBetween });
            Flex.width('100%');
            Flex.padding({ left: 16, right: 16 });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 商品1
            Column.create();
            // 商品1
            Column.width('45%');
            // 商品1
            Column.backgroundColor('#FFFFFF');
            // 商品1
            Column.borderRadius(8);
            // 商品1
            Column.padding(12);
            // 商品1
            Column.margin({ bottom: 16 });
            // 商品1
            Column.shadow({
                radius: 4,
                color: '#E0E0E0',
                offsetX: 0,
                offsetY: 2
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('https://picsum.photos/200/200?random=4');
            Image.width('100%');
            Image.aspectRatio(1);
            Image.borderRadius(8);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('新鲜西红柿');
            Text.fontSize(14);
            Text.fontColor('#333');
            Text.margin({ top: 8 });
            Text.alignSelf(ItemAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('¥3.50/斤');
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#E53935');
            Text.margin({ top: 4 });
            Text.alignSelf(ItemAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('购买');
            Button.fontSize(12);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor('#4CAF50');
            Button.borderRadius(6);
            Button.width('100%');
            Button.height(32);
            Button.margin({ top: 8 });
        }, Button);
        Button.pop();
        // 商品1
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 商品2
            Column.create();
            // 商品2
            Column.width('45%');
            // 商品2
            Column.backgroundColor('#FFFFFF');
            // 商品2
            Column.borderRadius(8);
            // 商品2
            Column.padding(12);
            // 商品2
            Column.margin({ bottom: 16 });
            // 商品2
            Column.shadow({
                radius: 4,
                color: '#E0E0E0',
                offsetX: 0,
                offsetY: 2
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('https://picsum.photos/200/200?random=5');
            Image.width('100%');
            Image.aspectRatio(1);
            Image.borderRadius(8);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('有机胡萝卜');
            Text.fontSize(14);
            Text.fontColor('#333');
            Text.margin({ top: 8 });
            Text.alignSelf(ItemAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('¥4.20/斤');
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#E53935');
            Text.margin({ top: 4 });
            Text.alignSelf(ItemAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('购买');
            Button.fontSize(12);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor('#4CAF50');
            Button.borderRadius(6);
            Button.width('100%');
            Button.height(32);
            Button.margin({ top: 8 });
        }, Button);
        Button.pop();
        // 商品2
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 商品3
            Column.create();
            // 商品3
            Column.width('45%');
            // 商品3
            Column.backgroundColor('#FFFFFF');
            // 商品3
            Column.borderRadius(8);
            // 商品3
            Column.padding(12);
            // 商品3
            Column.margin({ bottom: 16 });
            // 商品3
            Column.shadow({
                radius: 4,
                color: '#E0E0E0',
                offsetX: 0,
                offsetY: 2
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('https://picsum.photos/200/200?random=6');
            Image.width('100%');
            Image.aspectRatio(1);
            Image.borderRadius(8);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('新鲜土豆');
            Text.fontSize(14);
            Text.fontColor('#333');
            Text.margin({ top: 8 });
            Text.alignSelf(ItemAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('¥2.80/斤');
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#E53935');
            Text.margin({ top: 4 });
            Text.alignSelf(ItemAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('购买');
            Button.fontSize(12);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor('#4CAF50');
            Button.borderRadius(6);
            Button.width('100%');
            Button.height(32);
            Button.margin({ top: 8 });
        }, Button);
        Button.pop();
        // 商品3
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 商品4
            Column.create();
            // 商品4
            Column.width('45%');
            // 商品4
            Column.backgroundColor('#FFFFFF');
            // 商品4
            Column.borderRadius(8);
            // 商品4
            Column.padding(12);
            // 商品4
            Column.margin({ bottom: 16 });
            // 商品4
            Column.shadow({
                radius: 4,
                color: '#E0E0E0',
                offsetX: 0,
                offsetY: 2
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('https://picsum.photos/200/200?random=7');
            Image.width('100%');
            Image.aspectRatio(1);
            Image.borderRadius(8);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('新鲜白菜');
            Text.fontSize(14);
            Text.fontColor('#333');
            Text.margin({ top: 8 });
            Text.alignSelf(ItemAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('¥1.50/斤');
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#E53935');
            Text.margin({ top: 4 });
            Text.alignSelf(ItemAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('购买');
            Button.fontSize(12);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor('#4CAF50');
            Button.borderRadius(6);
            Button.width('100%');
            Button.height(32);
            Button.margin({ top: 8 });
        }, Button);
        Button.pop();
        // 商品4
        Column.pop();
        Flex.pop();
        // 商品网格（包裹为可滚动列表，保留原卡片样式）
        Scroll.pop();
        // 热门商品推荐区
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
