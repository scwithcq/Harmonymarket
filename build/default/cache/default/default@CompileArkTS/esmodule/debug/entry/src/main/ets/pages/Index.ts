if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    // 导航栏实例
    pageStack?: NavPathStack;
}
const PREF_NAME = 'role_pref';
const KEY_ROLE = 'role';
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.pageStack = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.pageStack !== undefined) {
            this.pageStack = params.pageStack;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // 导航栏实例
    private pageStack: NavPathStack;
    // 生命周期
    // aboutToAppear(): void {
    //   this.loadRole()
    // }
    // 监听路径变化 → 立即跳转
    // onPathReady(info: NavPathInfo): void {
    //   if (info.name === 'RoleSelectPage') return   // 初始页不处理
    //   this.jumpByRole()
    // }
    //
    // private jumpByRole(): void {
    //   dataPreferences.getPreferences(getContext(this), PREF_NAME)
    //     .then(pref => pref.get(KEY_ROLE, ''))
    //     .then(last => {
    //       if (last === 'user') this.pageStack.replacePathByName('Layout', null)
    //       else if (last === 'merchant') this.pageStack.replacePathByName('MerchantHomePage', null)
    //     })
    // }
    // 角色加载逻辑
    // private async loadRole(): Promise<void> {
    //   const pref = await dataPreferences.getPreferences(getContext(this), PREF_NAME)
    //   const last = await pref.get(KEY_ROLE, '') as string
    //   // this.pageStack.replacePathByName("RoleSelectPage", null)
    //   if (last === 'user') {
    //     this.pageStack.replacePathByName('Layout', null)
    //   } else if (last === 'merchant') {
    //     this.pageStack.replacePathByName('MerchantHomePage', null)
    //   } else {
    //     this.pageStack.replacePathByName("RoleSelectPage", null)
    //   }
    // }
    //ui构建
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.pageStack, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Index", isUserCreateStack: true });
            Navigation.onAppear(() => {
                this.pageStack.replacePathByName("RoleSelectPage", null);
            });
            Navigation.hideNavBar(true);
            Navigation.mode(NavigationMode.Stack);
            Navigation.title('MarketApp');
            Navigation.width('100%');
        }, Navigation);
        Navigation.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.marketapp", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false" });
