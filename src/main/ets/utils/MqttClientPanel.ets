import { MqttAsync, MqttClient, MqttClientOptions, MqttConnectOptions, MqttSubscribeOptions, MqttPublishOptions, MqttMessage, MqttResponse } from '@ohos/mqtt';
import prompt from '@ohos.prompt';
import buffer from '@ohos.buffer';

// 定义接收到的 JSON 数据结构
interface Item {
  productId: number;
  name: string;
  price: number;
  unit: string;
  image: string[];           // base64 图片数组
  original_image: string[];  // 原始图片数组
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

@Entry
@Component
struct MqttClientPanel {
  @State brokerUrl: string = 'tcp://8.130.212.116:1883';
  @State topic: string = 'mqtt_test';
  @State message: string = 'Hello from HarmonyOS MQTT!';
  @State logText: string = '等待连接...';
  @State isConnected: boolean = false;

  @State receivedItems: ItemData[] = [];

  private client: MqttClient | undefined;

  build() {
    Column({ space: 16 }) {
      Text('MQTT 3.1.1 通信测试')
        .fontSize(26)
        .fontWeight(FontWeight.Bold)
        .fontColor('#2E7D32')
        .margin({ top: 20 });

      TextInput({ placeholder: 'Broker地址', text: this.brokerUrl })
        .onChange(v => this.brokerUrl = v)
        .border({ width: 1, color: Color.Grey })
        .width('90%');

      TextInput({ placeholder: '主题', text: this.topic })
        .onChange(v => this.topic = v)
        .border({ width: 1, color: Color.Grey })
        .width('90%');

      TextInput({ placeholder: '消息内容', text: this.message })
        .onChange(v => this.message = v)
        .border({ width: 1, color: Color.Grey })
        .width('90%');

      Row({ space: 12 }) {
        Button(this.isConnected ? '断开连接' : '连接')
          .onClick(() => this.isConnected ? this.disconnectMqtt() : this.connectMqtt())
          .width('30%');

        Button('发布消息')
          .onClick(() => this.publishMessage())
          .width('30%')
          .enabled(this.isConnected);

        Button('RUN')
          .onClick(() => this.runCommand())
          .width('30%')
          .enabled(this.isConnected);
      }

      Button('清空日志')
        .onClick(() => {
          this.logText = '日志已清空';
          this.receivedItems = [];
        })
        .backgroundColor('#E0E0E0')
        .fontColor('#333');

      Scroll() {
        Column({ space: 12 }) {
          Text(this.logText)
            .fontSize(14)
            .fontColor('#212121')
            .padding(12)
            .width('90%')
            .alignSelf(ItemAlign.Center);

          ForEach(this.receivedItems, (item: ItemData) => {
            Column({ space: 4 }) {
              Text(`名称: ${item.name} 价格: ${item.price}`)
                .fontSize(14)
                .fontColor('#000');

              Image(`data:image/png;base64,${item.imageBase64}`)
                .width(150)
                .height(150)
                .borderRadius(12);
            }
            .key(item.id) // 使用唯一 id
            .alignItems(HorizontalAlign.Start);
          });
        }
      }
      .height('45%')
      .backgroundColor('#F5F5F5')
      .borderRadius(12)
      .margin({ top: 10, bottom: 10 });
    }
    .width('100%')
    .height('100%')
    .alignItems(HorizontalAlign.Center)
    .backgroundColor('#FAFAFA');
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
              this.receivedItems = items;   // 现在类型完全匹配
            }
          } catch (parseErr) {
            console.error('JSON解析失败', parseErr);
          }
        } else {
          this.logText += `\n[接收错误] ${err.message}`;
        }
      });


    } catch (err) {
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
      } else {
        this.logText += `\n[发布失败] code=${res.code}`;
      }
    } catch (err) {
      this.logText += `\n[发布失败] ${(err as Error).message}`;
    }
  }

  async runCommand() {
    this.publishMessage('/*RUN');
  }

  async disconnectMqtt() {
    if (!this.client) return;

    try {
      const res: MqttResponse = await this.client.disconnect();
      if (res.code === 0) {
        this.isConnected = false;
        this.logText += '\n[断开连接]';
      } else {
        this.logText += `\n[断开失败] code=${res.code}`;
      }
    } catch (err) {
      this.logText += `\n[断开失败] ${(err as Error).message}`;
    }
  }
}

export { MqttClientPanel };
