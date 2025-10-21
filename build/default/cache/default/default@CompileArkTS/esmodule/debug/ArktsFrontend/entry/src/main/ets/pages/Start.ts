if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Start_Params {
    //控制跳转到对象
    pathStack?: NavPathStack;
}
// 跳转页面入口函数
// 广告页面
export function StartBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new Start(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "ArktsFrontend/entry/src/main/ets/pages/Start.ets", line: 5, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "Start" });
    }
}
class Start extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.pathStack = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Start_Params) {
        if (params.pathStack !== undefined) {
            this.pathStack = params.pathStack;
        }
    }
    updateStateVars(params: Start_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    //控制跳转到对象
    private pathStack: NavPathStack;
    /*  // 定义定时器（用于自动跳转）
      private timer: number | undefined = undefined
      // 定义标志位，防止重复跳转
      private hasNavigated: boolean = false
    
      // aboutToAppear()是程序启动后自动加载的程序
      // 说明：过3秒钟自动跳转到 Layout -> Start页面打开并开始计时3秒钟后跳转
      aboutToAppear(): void { //生命周期
        this.hasNavigated = false // 每次进入页面时重置
        this.timer = setTimeout(() => {
          // 若已跳转过（点击跳过或执行过一次），则不再执行
          if (this.hasNavigated) {
            return
          }
          this.hasNavigated = true
          //得用replacepathbyname 不能使用pushpathbyname，不然等自动跳转的时间到了，顶部的安全区域还是会出现
          this.pathStack.replacePathByName("Layout", null, false)
        }, 3000) //以毫秒为单位
      }
    
      // 页面销毁时清除定时器（防止重复跳转或内存泄漏）
      aboutToDisappear(): void {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = undefined
        }
      }*/
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    //子页内容放这处
                    Button.createWithLabel('点击跳转到布局页面');
                    //子页内容放这处
                    Button.onClick(() => {
                        // this.pathStack.pushPathByName("Layout",null,false)
                        this.pathStack.replacePathByName("Layout", null, false);
                    });
                    //子页内容放这处
                    Button.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
                }, Button);
                //子页内容放这处
                Button.pop();
            }, { moduleName: "entry", pagePath: "ArktsFrontend/entry/src/main/ets/pages/Start" });
            NavDestination.onReady((context: NavDestinationContext) => {
                this.pathStack = context.pathStack;
            });
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("Start", wrapBuilder(StartBuilder));
    }
})();
