import http from '@ohos.net.http';
import prompt from '@ohos.prompt';

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

@Component
export struct RecipePage {
  @State messages: Array<ChatMessage> = [];
  @State inputText: string = '';
  @State isLoading: boolean = false;

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
        'http://tf76667a.natappfree.cc/api/ask',
        {
          method: http.RequestMethod.POST,
          extraData: JSON.stringify(reqData),
          header: { 'Content-Type': 'application/json' },
          expectDataType: http.HttpDataType.STRING,
          connectTimeout: 8000,
          readTimeout: 15000
        }
      );

      if (response.responseCode === 200 && response.result) {
        const data: AskResponse = JSON.parse(response.result as string);
        this.messages.push({ role: 'assistant', content: data.answer });
      } else {
        prompt.showToast({ message: '请求失败，请检查服务器' });
      }

      httpRequest.destroy();
    } catch (err) {
      console.error('请求出错: ', JSON.stringify(err));
      prompt.showToast({ message: '网络错误，请稍后重试' });
    } finally {
      this.isLoading = false;
    }
  }

  build() {
    Column({ space: 12 }) {
      // 顶部标题栏
      Text('菜谱助手')
        .fontSize(26)
        .fontWeight(FontWeight.Bold)
        .padding(12)
        .backgroundColor('#4CAF50')
        .fontColor(Color.White)
        .width('100%')
        .textAlign(TextAlign.Center)

      // 聊天内容显示区
      Scroll() {
        Column({ space: 10 }) {
          ForEach(this.messages, (msg: ChatMessage, index: number) => {
            if (msg.role === 'user') {
              Row() {
                Blank() // 占位让用户消息靠右
                Text(msg.content)
                  .padding(10)
                  .backgroundColor('#DCF8C6')
                  .borderRadius(10)
                  .width('70%')
              }.width('100%')
            } else {
              Row() {
                Text(msg.content)
                  .padding(10)
                  .backgroundColor('#FFFFFF')
                  .borderRadius(10)
                  .width('70%')
                Blank()
              }.width('100%')
            }
          }, (msg: ChatMessage) => msg.content)
        }
        .padding(12)
      }.height('80%')

      // 加载提示
      if (this.isLoading) {
        Text('正在生成菜谱...')
          .fontSize(16)
          .fontColor('#888888')
      }

      // 底部输入栏
      Row({ space: 8 }) {
        TextInput({ placeholder: '请输入食材或问题' })
          .width('75%')
          .height(40)
          .borderRadius(8)
          .backgroundColor('#F5F5F5')
          .padding({ left: 10 })
          .onChange((value: string) => {
            this.inputText = value;
          })

        Button('发送')
          .width('20%')
          .height(40)
          .backgroundColor('#4CAF50')
          .fontColor(Color.White)
          .borderRadius(8)
          .onClick(() =>
          {
            this.sendQuestion()
            this.inputText = ''
          }
          )
      }
      .padding(10)
    }
    .backgroundColor('#EFEFEF')
    .height('100%')
    .width('100%')
  }
}
