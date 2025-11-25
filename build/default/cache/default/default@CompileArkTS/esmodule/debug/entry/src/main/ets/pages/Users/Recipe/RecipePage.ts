if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface RecipePage_Params {
    messages?: Array<ChatMessage>;
    inputText?: string;
    isLoading?: boolean;
    pageStack?: NavPathStack;
    scroller?: Scroller;
}
import http from "@ohos:net.http";
import promptAction from "@ohos:promptAction";
import { FloatingCartButton } from "@normalized:N&&&entry/src/main/ets/components/FloatingCartButton&";
interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}
interface AskRequest {
    question: string;
    use_rag: boolean;
}
interface RetrievedDoc {
    content: string;
    score?: number;
    distance?: number;
}
interface AskResponse {
    answer: string;
    retrieved_docs: Array<RetrievedDoc>;
    timestamp: string;
}
export function RecipePageBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new RecipePage(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Users/Recipe/RecipePage.ets", line: 29, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "RecipePage" });
    }
}
class RecipePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__messages = new ObservedPropertyObjectPU([], this, "messages");
        this.__inputText = new ObservedPropertySimplePU('', this, "inputText");
        this.__isLoading = new ObservedPropertySimplePU(false, this, "isLoading");
        this.__pageStack = this.createStorageProp('globalPageStack', new NavPathStack(), "pageStack");
        this.scroller = new Scroller();
        this.setInitiallyProvidedValue(params);
        this.declareWatch("pageStack", this.onPageStackChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: RecipePage_Params) {
        if (params.messages !== undefined) {
            this.messages = params.messages;
        }
        if (params.inputText !== undefined) {
            this.inputText = params.inputText;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    updateStateVars(params: RecipePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__messages.purgeDependencyOnElmtId(rmElmtId);
        this.__inputText.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__pageStack.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__messages.aboutToBeDeleted();
        this.__inputText.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__pageStack.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __messages: ObservedPropertyObjectPU<Array<ChatMessage>>;
    get messages() {
        return this.__messages.get();
    }
    set messages(newValue: Array<ChatMessage>) {
        this.__messages.set(newValue);
    }
    private __inputText: ObservedPropertySimplePU<string>;
    get inputText() {
        return this.__inputText.get();
    }
    set inputText(newValue: string) {
        this.__inputText.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    private __pageStack: ObservedPropertyAbstractPU<NavPathStack>;
    get pageStack() {
        return this.__pageStack.get();
    }
    set pageStack(newValue: NavPathStack) {
        this.__pageStack.set(newValue);
    }
    private scroller: Scroller;
    aboutToAppear() {
        // 添加欢迎消息
        this.messages.push({
            role: 'assistant',
            content: '你好！我是菜谱助手，很高兴为您服务😊\n\n您可以：\n• 输入食材名称，我会推荐相关菜谱\n• 询问烹饪技巧和步骤\n• 咨询食材搭配建议\n\n请问有什么可以帮您的吗？'
        });
    }
    // 监听 pageStack 变化
    onPageStackChange() {
        console.info('[RecipePage] pageStack 已更新');
    }
    private async sendQuestion() {
        if (this.inputText.trim() === '') {
            promptAction.showToast({ message: '请输入问题' });
            return;
        }
        // 添加用户消息
        this.messages.push({ role: 'user', content: this.inputText });
        const questionText = this.inputText;
        this.inputText = '';
        this.isLoading = true;
        try {
            const reqData: AskRequest = {
                question: questionText,
                use_rag: true
            };
            const httpRequest = http.createHttp();
            const response = await httpRequest.request(
            // 'http://172.17.136.7:8080/api/ask',
            'http://tf76667a.natappfree.cc/api/ask', {
                method: http.RequestMethod.POST,
                extraData: JSON.stringify(reqData),
                header: { 'Content-Type': 'application/json' },
                expectDataType: http.HttpDataType.STRING,
                connectTimeout: 8000,
                readTimeout: 15000
            });
            if (response.responseCode === 200 && response.result) {
                const data: AskResponse = JSON.parse(response.result as string);
                this.messages.push({ role: 'assistant', content: data.answer });
                // 滚动到底部
                this.scroller.scrollEdge(Edge.Bottom);
            }
            else {
                promptAction.showToast({ message: '请求失败，请检查服务器' });
            }
            httpRequest.destroy();
        }
        catch (err) {
            console.error('请求出错: ', JSON.stringify(err));
            promptAction.showToast({ message: '网络错误，请稍后重试' });
        }
        finally {
            this.isLoading = false;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create({ space: 12 });
                    Column.backgroundColor(Color.White);
                    Column.height('100%');
                    Column.width('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 顶部标题栏
                    Text.create('菜谱助手');
                    // 顶部标题栏
                    Text.fontSize(26);
                    // 顶部标题栏
                    Text.fontWeight(FontWeight.Bold);
                    // 顶部标题栏
                    Text.padding(12);
                    // 顶部标题栏
                    Text.backgroundColor(Color.White);
                    // 顶部标题栏
                    Text.fontColor(Color.Black);
                    // 顶部标题栏
                    Text.width('100%');
                    // 顶部标题栏
                    Text.textAlign(TextAlign.Center);
                }, Text);
                // 顶部标题栏
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 聊天内容显示区
                    Scroll.create(this.scroller);
                    // 聊天内容显示区
                    Scroll.height('80%');
                }, Scroll);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create({ space: 10 });
                    Column.padding(12);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = (_item, index: number) => {
                        const msg = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (msg.role === 'user') {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.width('100%');
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Blank.create();
                                    }, Blank);
                                    Blank.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(msg.content);
                                        Text.padding(10);
                                        Text.backgroundColor('#4CAF50');
                                        Text.fontColor(Color.White);
                                        Text.borderRadius(10);
                                        Text.width('70%');
                                    }, Text);
                                    Text.pop();
                                    Row.pop();
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.width('100%');
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(msg.content);
                                        Text.padding(10);
                                        Text.backgroundColor('#F5F5F5');
                                        Text.fontColor(Color.Black);
                                        Text.borderRadius(10);
                                        Text.width('70%');
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Blank.create();
                                    }, Blank);
                                    Blank.pop();
                                    Row.pop();
                                });
                            }
                        }, If);
                        If.pop();
                    };
                    this.forEachUpdateFunction(elmtId, this.messages, forEachItemGenFunction, (msg: ChatMessage) => msg.content, true, false);
                }, ForEach);
                ForEach.pop();
                Column.pop();
                // 聊天内容显示区
                Scroll.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    // 加载提示
                    if (this.isLoading) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('正在生成菜谱...');
                                Text.fontSize(16);
                                Text.fontColor('#888888');
                            }, Text);
                            Text.pop();
                        });
                    }
                    // 底部输入栏
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 底部输入栏
                    Row.create({ space: 8 });
                    // 底部输入栏
                    Row.padding(10);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TextInput.create({ placeholder: '请输入食材或问题', text: { value: this.inputText, changeEvent: newValue => { this.inputText = newValue; } } });
                    TextInput.width('75%');
                    TextInput.height(40);
                    TextInput.borderRadius(8);
                    TextInput.backgroundColor('#F5F5F5');
                    TextInput.padding({ left: 10 });
                }, TextInput);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel('发送');
                    Button.width('20%');
                    Button.height(40);
                    Button.backgroundColor('#4CAF50');
                    Button.fontColor(Color.White);
                    Button.borderRadius(8);
                    Button.enabled(!this.isLoading);
                    Button.opacity(this.isLoading ? 0.5 : 1);
                    Button.onClick(() => {
                        this.sendQuestion();
                    });
                }, Button);
                Button.pop();
                // 底部输入栏
                Row.pop();
                Column.pop();
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new 
                            // 悬浮购物车按钮
                            FloatingCartButton(this, { pageStack: this.pageStack }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Users/Recipe/RecipePage.ets", line: 182, col: 7 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    pageStack: this.pageStack
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                pageStack: this.pageStack
                            });
                        }
                    }, { name: "FloatingCartButton" });
                }
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Users/Recipe/RecipePage" });
            NavDestination.hideTitleBar(true);
            NavDestination.onReady((context: NavDestinationContext) => {
                // 也可以从 context 获取，作为备用
                if (!this.pageStack) {
                    this.pageStack = context.pathStack;
                }
            });
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export { RecipePage };
