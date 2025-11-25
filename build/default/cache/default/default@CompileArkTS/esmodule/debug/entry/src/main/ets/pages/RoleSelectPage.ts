if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface RoleSelectPage_Params {
    pageStack?: NavPathStack;
}
const PREF_NAME = 'role_pref';
const KEY_ROLE = 'role';
export function RoleSelectPageBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new RoleSelectPage(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/RoleSelectPage.ets", line: 8, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "RoleSelectPage" });
    }
}
class RoleSelectPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__pageStack = new ObservedPropertyObjectPU(null!, this, "pageStack");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: RoleSelectPage_Params) {
        if (params.pageStack !== undefined) {
            this.pageStack = params.pageStack;
        }
    }
    updateStateVars(params: RoleSelectPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__pageStack.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__pageStack.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // // 导航栏实例
    // pageStack: NavPathStack = new NavPathStack()
    private __pageStack: ObservedPropertyObjectPU<NavPathStack>;
    get pageStack() {
        return this.__pageStack.get();
    }
    set pageStack(newValue: NavPathStack) {
        this.__pageStack.set(newValue);
    }
    // private pref: dataPreferences.Preferences | null = null
    // @Consume('pageStack') nav: NavPathStack   // ✅ 官方方式取栈
    //
    // async aboutToAppear() {
    //   this.pref = await dataPreferences.getPreferences(getContext(this), PREF_NAME)
    // }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create({ space: 40 });
                    Column.width('100%');
                    Column.height('100%');
                    Column.justifyContent(FlexAlign.Center);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('请选择身份');
                    Text.fontSize(24);
                    Text.fontWeight(FontWeight.Bold);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel('用户端');
                    Button.width(200);
                    Button.height(48);
                    Button.backgroundColor('#4CAF50');
                    Button.onClick(() => {
                        this.pageStack.replacePathByName("Layout", null, false);
                    });
                }, Button);
                Button.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel('商家端');
                    Button.width(200);
                    Button.height(48);
                    Button.backgroundColor('#000000');
                    Button.onClick(() => {
                        this.pageStack.replacePathByName("MerchantHomePage", null, false);
                    });
                }, Button);
                Button.pop();
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/RoleSelectPage" });
            NavDestination.onReady((context: NavDestinationContext) => {
                this.pageStack = context.pathStack;
            });
            NavDestination.title('选择身份');
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("RoleSelectPage", wrapBuilder(RoleSelectPageBuilder));
    }
})();
