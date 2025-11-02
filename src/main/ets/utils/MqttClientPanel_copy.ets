import { MqttAsync, MqttClient, MqttClientOptions, MqttConnectOptions, MqttSubscribeOptions, MqttPublishOptions, MqttMessage, MqttResponse } from '@ohos/mqtt';
import prompt from '@ohos.prompt';
import buffer from '@ohos.buffer';

@Entry
@Component
struct MqttClientPanel {
  @State brokerUrl: string = 'tcp://8.130.212.116:1883';
  @State topic: string = 'Test';
  @State message: string = 'Hello from HarmonyOS MQTT!';
  @State logText: string = '等待连接...';
  @State isConnected: boolean = false;

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
          .width('40%');

        Button('发布消息')
          .onClick(() => this.publishMessage())
          .width('40%')
          .enabled(this.isConnected);
      }

      Button('清空日志')
        .onClick(() => this.logText = '日志已清空')
        .backgroundColor('#E0E0E0')
        .fontColor('#333');

      Scroll() {
        Text(this.logText)
          .fontSize(14)
          .fontColor('#212121')
          .padding(12)
          .width('90%');
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

  // ---------- 连接 MQTT ----------
  async connectMqtt() {
    try {
      // 如果客户端未初始化，先创建
      if (!this.client) {
        const options: MqttClientOptions = {
          url: this.brokerUrl,
          clientId: 'HarmonyOS-MQTT3-Demo',
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
      } else {
        this.logText += `\n[连接失败] code=${result.code}`;
        return;
      }

      // 订阅主题
      const subOpts: MqttSubscribeOptions = { topic: this.topic, qos: 1 };
      await this.client.subscribe(subOpts);
      this.logText += `\n[订阅成功] 主题：${this.topic}`;

      // 消息监听
      this.client.messageArrived((err: Error, msg: MqttMessage) => {
        if (!err) {
          const msgStr: string = buffer.from(msg.payloadBinary).toString();
          this.logText += `\n[接收] ${msg.topic} → ${msgStr}`;
        } else {
          this.logText += `\n[接收错误] ${err.message}`;
        }
      });

    } catch (err) {
      this.logText += `\n[错误] ${(err as Error).message}`;
      prompt.showToast({ message: '连接失败' });
    }
  }

  // ---------- 发布消息 ----------
  async publishMessage() {
    if (!this.client) {
      prompt.showToast({ message: '尚未连接' });
      return;
    }

    try {
      const pubOpts: MqttPublishOptions = {
        topic: this.topic,
        payload: this.message,
        qos: 1,
        retained: false
      };

      const res: MqttResponse = await this.client.publish(pubOpts);
      if (res.code === 0) {
        this.logText += `\n[发布] ${this.message}`;
      } else {
        this.logText += `\n[发布失败] code=${res.code}`;
      }
    } catch (err) {
      this.logText += `\n[发布失败] ${(err as Error).message}`;
    }
  }

  // ---------- 断开连接 ----------
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
