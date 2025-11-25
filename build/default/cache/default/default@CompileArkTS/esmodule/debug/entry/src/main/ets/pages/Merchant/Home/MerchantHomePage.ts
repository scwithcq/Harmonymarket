if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MerchantHomePage_Params {
    pageStack?: NavPathStack;
    selectedTab?: string;
    capturedImage?: Resource | null;
}
import prompt from "@ohos:prompt";
import { MqttClientPanel } from "@normalized:N&&&entry/src/main/ets/utils/MqttClientPanel&";
export function MerchantHomePageBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new MerchantHomePage(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Merchant/Home/MerchantHomePage.ets", line: 7, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "MerchantHomePage" });
    }
}
export class MerchantHomePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__pageStack = new ObservedPropertyObjectPU(null!, this, "pageStack");
        this.__selectedTab = new ObservedPropertySimplePU('拍照上传', this, "selectedTab");
        this.__capturedImage = new ObservedPropertyObjectPU(null // 模拟用 Resource 类型
        // 模拟拍照
        , this, "capturedImage");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MerchantHomePage_Params) {
        if (params.pageStack !== undefined) {
            this.pageStack = params.pageStack;
        }
        if (params.selectedTab !== undefined) {
            this.selectedTab = params.selectedTab;
        }
        if (params.capturedImage !== undefined) {
            this.capturedImage = params.capturedImage;
        }
    }
    updateStateVars(params: MerchantHomePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__pageStack.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedTab.purgeDependencyOnElmtId(rmElmtId);
        this.__capturedImage.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__pageStack.aboutToBeDeleted();
        this.__selectedTab.aboutToBeDeleted();
        this.__capturedImage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __pageStack: ObservedPropertyObjectPU<NavPathStack>;
    get pageStack() {
        return this.__pageStack.get();
    }
    set pageStack(newValue: NavPathStack) {
        this.__pageStack.set(newValue);
    }
    private __selectedTab: ObservedPropertySimplePU<string>;
    get selectedTab() {
        return this.__selectedTab.get();
    }
    set selectedTab(newValue: string) {
        this.__selectedTab.set(newValue);
    }
    private __capturedImage: ObservedPropertyObjectPU<Resource | null>; // 模拟用 Resource 类型
    get capturedImage() {
        return this.__capturedImage.get();
    }
    set capturedImage(newValue: Resource | null) {
        this.__capturedImage.set(newValue);
    }
    // 模拟拍照
    takePhoto() {
        prompt.showToast({ message: '模拟拍照成功！' });
        this.capturedImage = { "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.marketapp", "moduleName": "entry" };
    }
    // 返回到拍照上传
    backToCamera() {
        this.selectedTab = '拍照上传';
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create({ space: 15 });
                    Column.width('100%');
                    Column.height('100%');
                    Column.justifyContent(FlexAlign.SpaceBetween);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 顶部标题区
                    Row.create();
                }, Row);
                // 顶部标题区
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.justifyContent(FlexAlign.SpaceBetween);
                    Row.padding({ left: 15, right: 15, top: 10 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.selectedTab !== '拍照上传') {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                // ✅ 当不是拍照上传页时显示返回按钮
                                Button.createWithLabel('← 返回拍照上传');
                                // ✅ 当不是拍照上传页时显示返回按钮
                                Button.onClick(() => this.backToCamera());
                                // ✅ 当不是拍照上传页时显示返回按钮
                                Button.fontSize(14);
                                // ✅ 当不是拍照上传页时显示返回按钮
                                Button.backgroundColor('#E0E0E0');
                                // ✅ 当不是拍照上传页时显示返回按钮
                                Button.borderRadius(8);
                                // ✅ 当不是拍照上传页时显示返回按钮
                                Button.padding(6);
                            }, Button);
                            // ✅ 当不是拍照上传页时显示返回按钮
                            Button.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Blank.create();
                            }, Blank);
                            Blank.pop();
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('商家工作台');
                    Text.fontSize(24);
                    Text.fontWeight(FontWeight.Bold);
                    Text.margin({ top: 5 });
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    // 中间主要内容区
                    if (this.selectedTab === '拍照上传') {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.buildCameraPage.bind(this)();
                        });
                    }
                    else if (this.selectedTab === '商品管理') {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.buildPlaceholderPage.bind(this)('商品管理');
                        });
                    }
                    else if (this.selectedTab === '订单管理') {
                        this.ifElseBranchUpdateFunction(2, () => {
                            this.buildPlaceholderPage.bind(this)('订单管理');
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(3, () => {
                            this.buildPlaceholderPage.bind(this)('我的');
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 底部导航栏
                    Row.create({ space: 20 });
                    // 底部导航栏
                    Row.justifyContent(FlexAlign.SpaceEvenly);
                    // 底部导航栏
                    Row.padding(10);
                    // 底部导航栏
                    Row.backgroundColor(Color.White);
                }, Row);
                this.buildNavButton.bind(this)('拍照上传', '📸');
                this.buildNavButton.bind(this)('商品管理', '🛒');
                this.buildNavButton.bind(this)('订单管理', '📦');
                this.buildNavButton.bind(this)('我的', '👤');
                // 底部导航栏
                Row.pop();
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Merchant/Home/MerchantHomePage" });
            NavDestination.onReady((context: NavDestinationContext) => {
                this.pageStack = context.pathStack;
            });
        }, NavDestination);
        NavDestination.pop();
    }
    // 拍照上传页面
    buildCameraPage(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.height('80%');
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new MqttClientPanel(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Merchant/Home/MerchantHomePage.ets", line: 91, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "MqttClientPanel" });
        }
        __Common__.pop();
    }
    // 其他模块页面
    buildPlaceholderPage(title: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(22);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('该功能正在开发中...');
            Text.fontColor(Color.Grey);
            Text.fontSize(16);
            Text.margin({ top: 10 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    // 底部导航按钮
    buildNavButton(title: string, icon: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.onClick(() => {
                this.selectedTab = title;
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(icon);
            Text.fontSize(20);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(14);
            Text.fontColor(this.selectedTab === title ? '#4CAF50' : Color.Black);
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("MerchantHomePage", wrapBuilder(MerchantHomePageBuilder));
    }
})();
