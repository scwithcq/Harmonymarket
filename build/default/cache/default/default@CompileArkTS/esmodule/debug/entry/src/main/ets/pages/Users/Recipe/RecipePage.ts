if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface RecipePage_Params {
    messages?: Array<ChatMessage>;
    inputText?: string;
    isLoading?: boolean;
}
import http from "@ohos:net.http";
import prompt from "@ohos:prompt";
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
export class RecipePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__messages = new ObservedPropertyObjectPU([], this, "messages");
        this.__inputText = new ObservedPropertySimplePU('', this, "inputText");
        this.__isLoading = new ObservedPropertySimplePU(false, this, "isLoading");
        this.setInitiallyProvidedValue(params);
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
    }
    updateStateVars(params: RecipePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__messages.purgeDependencyOnElmtId(rmElmtId);
        this.__inputText.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__messages.aboutToBeDeleted();
        this.__inputText.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
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
    private async sendQuestion() {
        if (this.inputText.trim() === '') {
            prompt.showToast({ message: '请输入问题' });
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
            }
            else {
                prompt.showToast({ message: '请求失败，请检查服务器' });
            }
            httpRequest.destroy();
        }
        catch (err) {
            console.error('请求出错: ', JSON.stringify(err));
            prompt.showToast({ message: '网络错误，请稍后重试' });
        }
        finally {
            this.isLoading = false;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.backgroundColor('#EFEFEF');
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
            Text.backgroundColor('#4CAF50');
            // 顶部标题栏
            Text.fontColor(Color.White);
            // 顶部标题栏
            Text.width('100%');
            // 顶部标题栏
            Text.textAlign(TextAlign.Center);
        }, Text);
        // 顶部标题栏
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 聊天内容显示区
            Scroll.create();
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
                                Text.backgroundColor('#DCF8C6');
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
                                Text.backgroundColor('#FFFFFF');
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
            TextInput.create({ placeholder: '请输入食材或问题' });
            TextInput.width('75%');
            TextInput.height(40);
            TextInput.borderRadius(8);
            TextInput.backgroundColor('#F5F5F5');
            TextInput.padding({ left: 10 });
            TextInput.onChange((value: string) => {
                this.inputText = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('发送');
            Button.width('20%');
            Button.height(40);
            Button.backgroundColor('#4CAF50');
            Button.fontColor(Color.White);
            Button.borderRadius(8);
            Button.onClick(() => {
                this.sendQuestion();
                this.inputText = '';
            });
        }, Button);
        Button.pop();
        // 底部输入栏
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
