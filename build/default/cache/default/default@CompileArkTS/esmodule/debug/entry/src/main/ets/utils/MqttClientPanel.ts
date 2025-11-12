if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MqttClientPanel_Params {
    brokerUrl?: string;
    topic?: string;
    message?: string;
    logText?: string;
    isConnected?: boolean;
    receivedItems?: ItemData[];
    client?: MqttClient | undefined;
}
import { MqttAsync } from "@normalized:N&&&@ohos/mqtt/index&2.0.24";
import type { MqttClient, MqttClientOptions, MqttConnectOptions, MqttSubscribeOptions, MqttPublishOptions, MqttMessage, MqttResponse } from "@normalized:N&&&@ohos/mqtt/index&2.0.24";
import prompt from "@ohos:prompt";
import buffer from "@ohos:buffer";
// 定义接收到的 JSON 数据结构
interface Item {
    productId: number;
    name: string;
    price: number;
    unit: string;
    image: string[]; // base64 图片数组
    original_image: string[]; // 原始图片数组
    instant_weight?: number;
    weight_unit: string;
    weight_time: string;
    isRecommend: number;
    isNew: number;
    confidence: number;
}
interface Data {
    total: number;
    pageSize: number;
    totalPage: number;
    currPage: number;
    item: Item[];
}
interface ReceivedJson {
    success: boolean;
    code: number;
    message: string;
    data?: Data;
}
// 页面上显示的结构
interface ItemData {
    id: string;
    name: string;
    price: number;
    imageBase64: string;
}
class MqttClientPanel extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__brokerUrl = new ObservedPropertySimplePU('tcp://8.130.212.116:1883', this, "brokerUrl");
        this.__topic = new ObservedPropertySimplePU('mqtt_test', this, "topic");
        this.__message = new ObservedPropertySimplePU('Hello from HarmonyOS MQTT!', this, "message");
        this.__logText = new ObservedPropertySimplePU('等待连接...', this, "logText");
        this.__isConnected = new ObservedPropertySimplePU(false, this, "isConnected");
        this.__receivedItems = new ObservedPropertyObjectPU([], this, "receivedItems");
        this.client = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MqttClientPanel_Params) {
        if (params.brokerUrl !== undefined) {
            this.brokerUrl = params.brokerUrl;
        }
        if (params.topic !== undefined) {
            this.topic = params.topic;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.logText !== undefined) {
            this.logText = params.logText;
        }
        if (params.isConnected !== undefined) {
            this.isConnected = params.isConnected;
        }
        if (params.receivedItems !== undefined) {
            this.receivedItems = params.receivedItems;
        }
        if (params.client !== undefined) {
            this.client = params.client;
        }
    }
    updateStateVars(params: MqttClientPanel_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__brokerUrl.purgeDependencyOnElmtId(rmElmtId);
        this.__topic.purgeDependencyOnElmtId(rmElmtId);
        this.__message.purgeDependencyOnElmtId(rmElmtId);
        this.__logText.purgeDependencyOnElmtId(rmElmtId);
        this.__isConnected.purgeDependencyOnElmtId(rmElmtId);
        this.__receivedItems.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__brokerUrl.aboutToBeDeleted();
        this.__topic.aboutToBeDeleted();
        this.__message.aboutToBeDeleted();
        this.__logText.aboutToBeDeleted();
        this.__isConnected.aboutToBeDeleted();
        this.__receivedItems.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __brokerUrl: ObservedPropertySimplePU<string>;
    get brokerUrl() {
        return this.__brokerUrl.get();
    }
    set brokerUrl(newValue: string) {
        this.__brokerUrl.set(newValue);
    }
    private __topic: ObservedPropertySimplePU<string>;
    get topic() {
        return this.__topic.get();
    }
    set topic(newValue: string) {
        this.__topic.set(newValue);
    }
    private __message: ObservedPropertySimplePU<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __logText: ObservedPropertySimplePU<string>;
    get logText() {
        return this.__logText.get();
    }
    set logText(newValue: string) {
        this.__logText.set(newValue);
    }
    private __isConnected: ObservedPropertySimplePU<boolean>;
    get isConnected() {
        return this.__isConnected.get();
    }
    set isConnected(newValue: boolean) {
        this.__isConnected.set(newValue);
    }
    private __receivedItems: ObservedPropertyObjectPU<ItemData[]>;
    get receivedItems() {
        return this.__receivedItems.get();
    }
    set receivedItems(newValue: ItemData[]) {
        this.__receivedItems.set(newValue);
    }
    private client: MqttClient | undefined;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 16 });
            Column.width('100%');
            Column.height('100%');
            Column.alignItems(HorizontalAlign.Center);
            Column.backgroundColor('#FAFAFA');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('MQTT 3.1.1 通信测试');
            Text.fontSize(26);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2E7D32');
            Text.margin({ top: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: 'Broker地址', text: this.brokerUrl });
            TextInput.onChange(v => this.brokerUrl = v);
            TextInput.border({ width: 1, color: Color.Grey });
            TextInput.width('90%');
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '主题', text: this.topic });
            TextInput.onChange(v => this.topic = v);
            TextInput.border({ width: 1, color: Color.Grey });
            TextInput.width('90%');
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '消息内容', text: this.message });
            TextInput.onChange(v => this.message = v);
            TextInput.border({ width: 1, color: Color.Grey });
            TextInput.width('90%');
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.isConnected ? '断开连接' : '连接');
            Button.onClick(() => this.isConnected ? this.disconnectMqtt() : this.connectMqtt());
            Button.width('30%');
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('发布消息');
            Button.onClick(() => this.publishMessage());
            Button.width('30%');
            Button.enabled(this.isConnected);
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('RUN');
            Button.onClick(() => this.runCommand());
            Button.width('30%');
            Button.enabled(this.isConnected);
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('清空日志');
            Button.onClick(() => {
                this.logText = '日志已清空';
                this.receivedItems = [];
            });
            Button.backgroundColor('#E0E0E0');
            Button.fontColor('#333');
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.height('45%');
            Scroll.backgroundColor('#F5F5F5');
            Scroll.borderRadius(12);
            Scroll.margin({ top: 10, bottom: 10 });
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.logText);
            Text.fontSize(14);
            Text.fontColor('#212121');
            Text.padding(12);
            Text.width('90%');
            Text.alignSelf(ItemAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create({ space: 4 });
                    Column.key(item.id);
                    Column.alignItems(HorizontalAlign.Start);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`名称: ${item.name} 价格: ${item.price}`);
                    Text.fontSize(14);
                    Text.fontColor('#000');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(`data:image/png;base64,${item.imageBase64}`);
                    Image.width(150);
                    Image.height(150);
                    Image.borderRadius(12);
                }, Image);
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.receivedItems, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    async connectMqtt() {
        try {
            if (!this.client) {
                const options: MqttClientOptions = {
                    url: this.brokerUrl,
                    clientId: 'lj',
                    persistenceType: 1
                };
                this.client = MqttAsync.createMqtt(options);
            }
            const connectOpts: MqttConnectOptions = {
                cleanSession: true,
                keepAliveInterval: 60,
                connectTimeout: 30
            };
            const result: MqttResponse = await this.client.connect(connectOpts);
            if (result.code === 0) {
                this.isConnected = true;
                this.logText += `\n[连接成功] ${this.brokerUrl}`;
                prompt.showToast({ message: 'MQTT连接成功' });
            }
            const subOpts: MqttSubscribeOptions = { topic: this.topic, qos: 1 };
            await this.client.subscribe(subOpts);
            this.logText += `\n[订阅成功] 主题：${this.topic}`;
            this.client.messageArrived((err: Error, msg: MqttMessage) => {
                if (!err) {
                    const payloadStr = buffer.from(msg.payloadBinary).toString();
                    this.logText += `\n[接收] ${msg.topic} → ${payloadStr}`;
                    try {
                        const json: ReceivedJson = JSON.parse(payloadStr);
                        if (json.success && json.code === 20000 && json.data) {
                            const items: ItemData[] = json.data.item.map((i: Item, idx: number) => ({
                                id: i.productId?.toString() ?? idx.toString(),
                                name: i.name,
                                price: i.price,
                                imageBase64: i.image[0] ?? ''
                            } as ItemData));
                            this.receivedItems = items; // 现在类型完全匹配
                        }
                    }
                    catch (parseErr) {
                        console.error('JSON解析失败', parseErr);
                    }
                }
                else {
                    this.logText += `\n[接收错误] ${err.message}`;
                }
            });
        }
        catch (err) {
            this.logText += `\n[错误] ${(err as Error).message}`;
            prompt.showToast({ message: '连接失败' });
        }
    }
    async publishMessage(payload?: string) {
        if (!this.client) {
            prompt.showToast({ message: '尚未连接' });
            return;
        }
        try {
            const pubOpts: MqttPublishOptions = {
                topic: this.topic,
                payload: payload || this.message,
                qos: 1,
                retained: false
            };
            const res: MqttResponse = await this.client.publish(pubOpts);
            if (res.code === 0) {
                this.logText += `\n[发布] ${payload || this.message}`;
            }
            else {
                this.logText += `\n[发布失败] code=${res.code}`;
            }
        }
        catch (err) {
            this.logText += `\n[发布失败] ${(err as Error).message}`;
        }
    }
    async runCommand() {
        this.publishMessage('/*RUN');
    }
    async disconnectMqtt() {
        if (!this.client)
            return;
        try {
            const res: MqttResponse = await this.client.disconnect();
            if (res.code === 0) {
                this.isConnected = false;
                this.logText += '\n[断开连接]';
            }
            else {
                this.logText += `\n[断开失败] code=${res.code}`;
            }
        }
        catch (err) {
            this.logText += `\n[断开失败] ${(err as Error).message}`;
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MqttClientPanel";
    }
}
export { MqttClientPanel };
registerNamedRoute(() => new MqttClientPanel(undefined, {}), "", { bundleName: "com.example.marketapp", moduleName: "entry", pagePath: "utils/MqttClientPanel", pageFullPath: "entry/src/main/ets/utils/MqttClientPanel", integratedHsp: "false" });
