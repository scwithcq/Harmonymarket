if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { RecipePage } from "@normalized:N&&&entry/src/main/ets/pages/Users/Recipe/RecipePage&";
import { UserPage } from "@normalized:N&&&entry/src/main/ets/pages/Users/User/UserPage&";
import { MarketPage } from "@normalized:N&&&entry/src/main/ets/pages/Users/Market/MarketPage&";
import { HomePage } from "@normalized:N&&&entry/src/main/ets/pages/Users/Home/HomePage&";
interface TabClass {
    text: string;
    icon: ResourceStr;
}
// 跳转页面入口函数
export function LayoutBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new Layout(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Layout.ets", line: 16, col: 3 });
                ViewV2.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "Layout" });
    }
}
class Layout extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.currentIndex = 0;
        this.pathStack = new NavPathStack();
        this.tabData = [
            // HomePage 首页 含今日推荐菜谱  AI推荐卡片  跳转-》菜谱详情
            //
            { text: '首页', icon: { "id": 16777275, "type": 20000, params: [], "bundleName": "com.example.marketapp", "moduleName": "entry" } },
            // RecipePage 菜谱 含分类筛选  搜索栏  跳转 -》 菜谱详情
            { text: '菜谱', icon: { "id": 16777259, "type": 20000, params: [], "bundleName": "com.example.marketapp", "moduleName": "entry" } },
            // MarketPage 市场 含商户分类列表  地图定位  跳转-》商户详情-》商品购买
            { text: '市场', icon: { "id": 16777266, "type": 20000, params: [], "bundleName": "com.example.marketapp", "moduleName": "entry" } },
            // UserPage 我的 含用户资料  收藏菜谱 订单列表 设置 跳转->修改基本信息 修改密码
            { text: '我的', icon: { "id": 16777265, "type": 20000, params: [], "bundleName": "com.example.marketapp", "moduleName": "entry" } }
        ];
        this.finalizeConstruction();
    }
    @Local
    currentIndex: number;
    pathStack: NavPathStack;
    tabData: TabClass[];
    tabBuilder(item: TabClass, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 5 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(item.icon);
            Image.width(25);
            Image.fillColor(this.currentIndex === index ? Color.Pink : Color.Green);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.text);
            Text.fontSize(14);
            Text.fontColor(this.currentIndex === index ? Color.Pink : Color.Green);
        }, Text);
        Text.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Tabs.create({ barPosition: BarPosition.End });
                    Tabs.backgroundColor('#3B4043');
                    Tabs.onChange((index: number) => {
                        this.currentIndex = index;
                    });
                    Tabs.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
                }, Tabs);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = (_item, index: number) => {
                        const item = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            TabContent.create(() => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    If.create();
                                    if (this.currentIndex === 0) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            {
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    if (isInitialRender) {
                                                        let componentCall = new HomePage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Layout.ets", line: 52, col: 15 });
                                                        ViewPU.create(componentCall);
                                                        let paramsLambda = () => {
                                                            return {};
                                                        };
                                                        componentCall.paramsGenerator_ = paramsLambda;
                                                    }
                                                    else {
                                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                                    }
                                                }, { name: "HomePage" });
                                            }
                                        });
                                    }
                                    else if (this.currentIndex === 1) {
                                        this.ifElseBranchUpdateFunction(1, () => {
                                            {
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    if (isInitialRender) {
                                                        let componentCall = new RecipePage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Layout.ets", line: 54, col: 15 });
                                                        ViewPU.create(componentCall);
                                                        let paramsLambda = () => {
                                                            return {};
                                                        };
                                                        componentCall.paramsGenerator_ = paramsLambda;
                                                    }
                                                    else {
                                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                                    }
                                                }, { name: "RecipePage" });
                                            }
                                        });
                                    }
                                    else if (this.currentIndex === 2) {
                                        this.ifElseBranchUpdateFunction(2, () => {
                                            {
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    if (isInitialRender) {
                                                        let componentCall = new MarketPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Layout.ets", line: 56, col: 15 });
                                                        ViewPU.create(componentCall);
                                                        let paramsLambda = () => {
                                                            return {};
                                                        };
                                                        componentCall.paramsGenerator_ = paramsLambda;
                                                    }
                                                    else {
                                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                                    }
                                                }, { name: "MarketPage" });
                                            }
                                        });
                                    }
                                    else if (this.currentIndex === 3) {
                                        this.ifElseBranchUpdateFunction(3, () => {
                                            {
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    if (isInitialRender) {
                                                        let componentCall = new UserPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Layout.ets", line: 58, col: 15 });
                                                        ViewPU.create(componentCall);
                                                        let paramsLambda = () => {
                                                            return {};
                                                        };
                                                        componentCall.paramsGenerator_ = paramsLambda;
                                                    }
                                                    else {
                                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                                    }
                                                }, { name: "UserPage" });
                                            }
                                        });
                                    }
                                    else {
                                        this.ifElseBranchUpdateFunction(4, () => {
                                        });
                                    }
                                }, If);
                                If.pop();
                            });
                            TabContent.tabBar({ builder: () => {
                                    this.tabBuilder.call(this, item, index);
                                } });
                            TabContent.backgroundColor(Color.Black);
                            TabContent.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
                        }, TabContent);
                        TabContent.pop();
                    };
                    this.forEachUpdateFunction(elmtId, this.tabData, forEachItemGenFunction, undefined, true, false);
                }, ForEach);
                ForEach.pop();
                Tabs.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Layout" });
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
        NavigationBuilderRegister("Layout", wrapBuilder(LayoutBuilder));
    }
})();
