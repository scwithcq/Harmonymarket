if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface UserPage_Params {
    userName?: string;
    phone?: string;
    email?: string;
    address?: string;
    avatarUrl?: string;
    isEditing?: boolean;
    pageStack?: NavPathStack;
}
/*
@Component
export struct UserPage {
  build() {
    Column() {
      Text('首页')
        .fontSize(50)
        .fontColor(Color.Black)
        .backgroundColor(Color.White)
    }
  }
}*/
export function UserPageBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new UserPage(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Users/User/UserPage.ets", line: 18, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "UserPage" });
    }
}
export class UserPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__userName = new ObservedPropertySimplePU('张三', this, "userName");
        this.__phone = new ObservedPropertySimplePU('138****8888', this, "phone");
        this.__email = new ObservedPropertySimplePU('zhangsan@example.com', this, "email");
        this.__address = new ObservedPropertySimplePU('北京市 海淀区', this, "address");
        this.__avatarUrl = new ObservedPropertySimplePU('https://img.icons8.com/color/96/user-male-circle--v1.png', this, "avatarUrl");
        this.__isEditing = new ObservedPropertySimplePU(false, this, "isEditing");
        this.__pageStack = new ObservedPropertyObjectPU(null!, this, "pageStack");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: UserPage_Params) {
        if (params.userName !== undefined) {
            this.userName = params.userName;
        }
        if (params.phone !== undefined) {
            this.phone = params.phone;
        }
        if (params.email !== undefined) {
            this.email = params.email;
        }
        if (params.address !== undefined) {
            this.address = params.address;
        }
        if (params.avatarUrl !== undefined) {
            this.avatarUrl = params.avatarUrl;
        }
        if (params.isEditing !== undefined) {
            this.isEditing = params.isEditing;
        }
        if (params.pageStack !== undefined) {
            this.pageStack = params.pageStack;
        }
    }
    updateStateVars(params: UserPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__userName.purgeDependencyOnElmtId(rmElmtId);
        this.__phone.purgeDependencyOnElmtId(rmElmtId);
        this.__email.purgeDependencyOnElmtId(rmElmtId);
        this.__address.purgeDependencyOnElmtId(rmElmtId);
        this.__avatarUrl.purgeDependencyOnElmtId(rmElmtId);
        this.__isEditing.purgeDependencyOnElmtId(rmElmtId);
        this.__pageStack.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__userName.aboutToBeDeleted();
        this.__phone.aboutToBeDeleted();
        this.__email.aboutToBeDeleted();
        this.__address.aboutToBeDeleted();
        this.__avatarUrl.aboutToBeDeleted();
        this.__isEditing.aboutToBeDeleted();
        this.__pageStack.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __userName: ObservedPropertySimplePU<string>;
    get userName() {
        return this.__userName.get();
    }
    set userName(newValue: string) {
        this.__userName.set(newValue);
    }
    private __phone: ObservedPropertySimplePU<string>;
    get phone() {
        return this.__phone.get();
    }
    set phone(newValue: string) {
        this.__phone.set(newValue);
    }
    private __email: ObservedPropertySimplePU<string>;
    get email() {
        return this.__email.get();
    }
    set email(newValue: string) {
        this.__email.set(newValue);
    }
    private __address: ObservedPropertySimplePU<string>;
    get address() {
        return this.__address.get();
    }
    set address(newValue: string) {
        this.__address.set(newValue);
    }
    private __avatarUrl: ObservedPropertySimplePU<string>;
    get avatarUrl() {
        return this.__avatarUrl.get();
    }
    set avatarUrl(newValue: string) {
        this.__avatarUrl.set(newValue);
    }
    private __isEditing: ObservedPropertySimplePU<boolean>;
    get isEditing() {
        return this.__isEditing.get();
    }
    set isEditing(newValue: boolean) {
        this.__isEditing.set(newValue);
    }
    private __pageStack: ObservedPropertyObjectPU<NavPathStack>;
    get pageStack() {
        return this.__pageStack.get();
    }
    set pageStack(newValue: NavPathStack) {
        this.__pageStack.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Scroll.create();
                    Scroll.width('100%');
                    Scroll.height('100%');
                    Scroll.backgroundColor('#F2F4F7');
                }, Scroll);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.padding({ bottom: 50 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // -----------顶部-----------
                    Row.create();
                    // -----------顶部-----------
                    Row.border({ radius: 20 });
                    // -----------顶部-----------
                    Row.width('100%');
                    // -----------顶部-----------
                    Row.layoutWeight(1);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('个人信息');
                    Text.fontSize(25);
                    Text.fontColor('#2E8B57');
                    Text.fontWeight(FontWeight.Medium);
                    Text.letterSpacing(1);
                    Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                    Text.maxLines(1);
                    Text.textAlign(TextAlign.Center);
                    Text.width('100%');
                    Text.borderRadius(4);
                }, Text);
                Text.pop();
                // -----------顶部-----------
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // ---------- 用户卡片 ----------
                    Column.create();
                    // ---------- 用户卡片 ----------
                    Column.width('100%');
                    // ---------- 用户卡片 ----------
                    Column.backgroundColor('#4CAF50');
                    // ---------- 用户卡片 ----------
                    Column.borderRadius(20);
                    // ---------- 用户卡片 ----------
                    Column.shadow({ radius: 10, color: '#00000020', offsetY: 2 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.border({ radius: 14 });
                    Row.width('100%');
                    Row.padding({ left: 20, right: 20, top: 50, bottom: 30 });
                    Row.alignItems(VerticalAlign.Center);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(this.avatarUrl);
                    Image.width(90);
                    Image.height(90);
                    Image.borderRadius(45);
                    Image.objectFit(ImageFit.Cover);
                    Image.border({ width: 2, color: '#ffffff' });
                    Image.shadow({ radius: 4, color: '#00000030' });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.margin({ left: 16 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.userName);
                    Text.fontSize(22);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor('#ffffff');
                    Text.margin({ bottom: 4 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.phone);
                    Text.fontSize(16);
                    Text.fontColor('#f0f0f0');
                }, Text);
                Text.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Blank.create();
                }, Blank);
                Blank.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(this.isEditing ? '完成' : '编辑');
                    Button.type(ButtonType.Capsule);
                    Button.backgroundColor('#ffffff');
                    Button.fontColor('#2E8B57');
                    Button.onClick(() => {
                        this.isEditing = !this.isEditing;
                    });
                }, Button);
                Button.pop();
                Row.pop();
                // ---------- 用户卡片 ----------
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // ---------- 信息卡片 ----------
                    Column.create();
                    // ---------- 信息卡片 ----------
                    Column.padding(20);
                    // ---------- 信息卡片 ----------
                    Column.backgroundColor('#ffffff');
                    // ---------- 信息卡片 ----------
                    Column.borderRadius(16);
                    // ---------- 信息卡片 ----------
                    Column.shadow({ radius: 4, color: '#00000010', offsetY: 2 });
                    // ---------- 信息卡片 ----------
                    Column.margin({ left: 16, right: 16, top: 40 });
                }, Column);
                this.infoItem.bind(this)('邮箱', this.email, (v: string) => this.email = v);
                this.infoItem.bind(this)('地址', this.address, (v: string) => this.address = v);
                // ---------- 信息卡片 ----------
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // ---------- 菜单卡片 ----------
                    Column.create();
                    // ---------- 菜单卡片 ----------
                    Column.backgroundColor('#ffffff');
                    // ---------- 菜单卡片 ----------
                    Column.borderRadius(16);
                    // ---------- 菜单卡片 ----------
                    Column.shadow({ radius: 4, color: '#00000010', offsetY: 2 });
                    // ---------- 菜单卡片 ----------
                    Column.margin({ left: 16, right: 16, top: 40, bottom: 25 });
                }, Column);
                this.menuItem.bind(this)('我的订单');
                this.menuItem.bind(this)('我的收藏');
                this.menuItem.bind(this)('设置');
                this.menuItem.bind(this)('退出登录');
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('返回角色选择（测试）');
                    Text.fontSize(17);
                    Text.fontColor('#333333');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Blank.create();
                }, Blank);
                Blank.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 16777237, "type": 20000, params: [], "bundleName": "com.example.marketapp", "moduleName": "entry" });
                    Image.width(20);
                    Image.height(20);
                    Image.objectFit(ImageFit.Contain);
                    Image.onClick(() => this.pageStack.replacePathByName("RoleSelectPage", null, false));
                }, Image);
                Row.pop();
                // ---------- 菜单卡片 ----------
                Column.pop();
                Column.pop();
                Scroll.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Users/User/UserPage" });
            NavDestination.onReady((context: NavDestinationContext) => {
                this.pageStack = context.pathStack;
            });
        }, NavDestination);
        NavDestination.pop();
    }
    // ---------- 子组件 ----------
    private infoItem(label: string, value: string, onChange: (v: string) => void, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ top: 8, bottom: 8 });
            Row.alignItems(VerticalAlign.Center);
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.fontSize(16);
            Text.width(70);
            Text.fontColor('#444444');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isEditing) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ placeholder: '请输入', text: value });
                        TextInput.onChange((val: string) => onChange(val));
                        TextInput.width('70%');
                        TextInput.fontSize(16);
                        TextInput.border({ width: 1, color: '#cccccc', radius: 8 });
                        TextInput.padding({ left: 8, right: 8 });
                    }, TextInput);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(value);
                        Text.fontSize(16);
                        Text.fontColor('#666666');
                        Text.width('70%');
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    private menuItem(title: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 18, right: 18, top: 14, bottom: 14 });
            Row.alignItems(VerticalAlign.Center);
            Row.border({ width: 0.5, color: '#eeeeee', style: BorderStyle.Solid });
            Row.onClick(() => {
                console.log(`点击了 ${title}`);
            });
            Row.backgroundColor('#ffffff');
            Row.hoverEffect(HoverEffect.Highlight);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(17);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777237, "type": 20000, params: [], "bundleName": "com.example.marketapp", "moduleName": "entry" });
            Image.width(20);
            Image.height(20);
            Image.objectFit(ImageFit.Contain);
        }, Image);
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("UserPage", wrapBuilder(UserPageBuilder));
    }
})();
