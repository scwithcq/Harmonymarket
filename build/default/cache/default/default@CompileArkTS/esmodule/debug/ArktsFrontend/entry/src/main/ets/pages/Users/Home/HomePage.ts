if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HomePage_Params {
}
export class HomePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HomePage_Params) {
    }
    updateStateVars(params: HomePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#FFFFFF');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部搜索栏
            Row.create();
            // 顶部搜索栏
            Row.padding({ left: 16, right: 16, top: 20 });
            // 顶部搜索栏
            Row.height(64);
            // 顶部搜索栏
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 用户头像
            Image.create('https://picsum.photos/40/40');
            // 用户头像
            Image.width(44);
            // 用户头像
            Image.height(44);
            // 用户头像
            Image.borderRadius(22);
            // 用户头像
            Image.shadow({ radius: 4, color: 'rgba(0,0,0,0.08)', offsetX: 0, offsetY: 2 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 搜索框
            Row.create();
            // 搜索框
            Row.width('72%');
            // 搜索框
            Row.height(44);
            // 搜索框
            Row.backgroundColor('#F8F9FA');
            // 搜索框
            Row.borderRadius(20);
            // 搜索框
            Row.margin({ left: 12 });
            // 搜索框
            Row.justifyContent(FlexAlign.Start);
            // 搜索框
            Row.padding({ left: 16 });
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
            Text.create('搜索菜谱 / 食材 / 商户...');
            Text.fontSize(14);
            Text.fontColor('#9E9E9E');
        }, Text);
        Text.pop();
        // 搜索框
        Row.pop();
        // 顶部搜索栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 今日推荐标题
            Row.create();
            // 今日推荐标题
            Row.width('100%');
            // 今日推荐标题
            Row.padding({ left: 16, right: 16, top: 20 });
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
            Row.width('100%');
            // AI智能推荐标题
            Row.padding({ left: 16, right: 16, top: 24 });
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
            Column.create();
            // 菜谱列表
            Column.padding({ bottom: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('https://picsum.photos/200/120?random=4');
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
            Text.create('宫保鸡丁');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('鲜嫩鸡肉与花生的完美搭配');
            Text.fontSize(12);
            Text.fontColor('#666');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('https://picsum.photos/200/120?random=5');
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
            Text.create('西红柿炒蛋');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('家常必备，简单美味');
            Text.fontSize(12);
            Text.fontColor('#666');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('https://picsum.photos/200/120?random=6');
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
            Text.create('麻婆豆腐');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('川味代表，香麻下饭');
            Text.fontSize(12);
            Text.fontColor('#666');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        // 菜谱列表
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
