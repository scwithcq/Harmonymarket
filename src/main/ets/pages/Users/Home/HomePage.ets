// File: entry/src/main/ets/pages/Users/Home/HomePage.ets
import router from '@ohos.router';
import { promptAction } from '@kit.ArkUI';
// 后期在这里设置统一颜色
import { app_color } from '../../../utils/Colors'
import { SearchParams } from '../../../common/Params/SearchParams/SearchParams';

// 文章数据定义
export interface Article {
  image: string
  title: string
  test: string
}

// 文章数据 -- 静态
export const ArticleList: Article[] = [
  {
    image: 'https://picsum.photos/200/120?random=4',
    title: '宫保鸡丁',
    test: '鲜嫩鸡肉与花生的完美搭配'
  },
  {
    image: 'https://picsum.photos/200/120?random=5',
    title: '西红柿炒蛋',
    test: '家常必备，简单美味'
  },
  {
    image: 'https://picsum.photos/200/120?random=6',
    title: '麻婆豆腐',
    test: '川味代表，香麻下饭'
  },
  {
    image: "https://picsum.photos/200/120?random=11",
    title: "糖醋里脊",
    test: "酸甜酥脆，老少皆宜"
  },
  {
    image: "https://picsum.photos/200/120?random=22",
    title: "清蒸鲈鱼",
    test: "鲜嫩无腥味，广式经典"
  },
  {
    image: "https://picsum.photos/200/120?random=33",
    title: "宫保鸡丁",
    test: "麻辣微甜，花生脆香"
  },
  {
    image: "https://picsum.photos/200/120?random=44",
    title: "红烧肉",
    test: "肥而不腻，入口即化"
  },
  {
    image: "https://picsum.photos/200/120?random=55",
    title: "西红柿鸡蛋",
    test: "家常快手菜，百吃不厌"
  }
]


@Component
export struct HomePage {
  // 这里做防止被导航栏遮挡
  readonly TABBAR_HEIGHT: number = 350
  @State articles: Article[] = ArticleList
  @State productName: string = '';
  @State cartVisible: Visibility = Visibility.Visible
  // 声明 pathStack
  pathStack: NavPathStack = new NavPathStack();

  // 在页面 ready 时获取上层 NavDestination 的 pathStack
  onReady(context: NavDestinationContext) {
    this.pathStack = context.pathStack;
  }

  build() {
    Scroll() {
      Column() {
        // 顶部搜索栏
        Row() {
          // 用户头像
          // Image('https://picsum.photos/40/40')
          //   .width(44)
          //   .height(44)
          //   .borderRadius(22)
          //   .shadow({radius: 4, color: 'rgba(0,0,0,0.08)', offsetX: 0, offsetY: 2})

          // 搜索框
          Row() {
            Image($r('app.media.ic_search'))
              .width(16)
              .height(16)
              .margin({ right: 8 })
            TextInput({
              placeholder: '请输入商品名称'
            })
              .backgroundColor('#FEC4DF')
              .width('70%')
              .onChange((value: string) => {
                this.productName = value;
              })// Text('搜索菜谱 / 食材 / 商户...')
              .fontSize(14)
              .fontColor('#9E9E9E')
            Button('搜索')
              .width('20%')
              .height(40)
              .margin({ left: 10 })
              .backgroundColor('#4CAF50')
              .fontColor('#FFFFFF')
              .onClick(() => {
                if (!this.productName?.trim()) {
                  promptAction.showToast({ message: '请输入商品名称' });
                  return;
                }

                // const params = new SearchParams(this.productName);
                router.pushUrl({
                  url: 'pages/Users/Home/SearchProductPage',
                  params: { keyword: this.productName, animateCart: true }
                });
              });


          }
          .width('100%')
          .height(44)
          // .backgroundColor('#F8F9FA')
          .borderRadius(20)
          .margin({ left: 12 })
          .justifyContent(FlexAlign.SpaceBetween)
          .padding({ left: 16 })
          .border({ width: 1, color: '#E9ECEF' })
        }
        .backgroundColor('#FEC4DF')
        .padding({
          right: 10,
          top: 10,
          bottom: 10
        })
        .height(64)
        .justifyContent(FlexAlign.SpaceBetween)

        // 今日推荐标题
        Row() {
          Text('🍳 今日推荐')
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
          Blank()
          Text('更多 >')
            .fontSize(14)
            .fontColor('#888')
        }
        .backgroundColor('#27AE60')
        .width('100%')
        .padding({
          left: 16,
          right: 16,
          top: 10,
          bottom: 10
        })

        // 今日推荐横向卡片
        Scroll() {
          Row() {
            Column() {
              Image('https://picsum.photos/200/120?random=1')
                .width(150)
                .height(110)
                .borderRadius(12)
              Text('宫保鸡丁')
                .fontSize(16)
                .fontWeight(FontWeight.Bold)
                .margin({ top: 8 })
              Text('鲜嫩鸡肉与花生的完美搭配')
                .fontSize(12)
                .fontColor('#888')
                .margin({ top: 4 })
            }
            .margin({ right: 12 })

            Column() {
              Image('https://picsum.photos/200/120?random=2')
                .width(150)
                .height(110)
                .borderRadius(12)
              Text('西红柿炒蛋')
                .fontSize(16)
                .fontWeight(FontWeight.Bold)
                .margin({ top: 8 })
              Text('家常必备，简单美味')
                .fontSize(12)
                .fontColor('#888')
                .margin({ top: 4 })
            }
            .margin({ right: 12 })

            Column() {
              Image('https://picsum.photos/200/120?random=9')
                .width(150)
                .height(110)
                .borderRadius(12)

              Text('麻婆豆腐')
                .fontSize(16)
                .fontWeight(FontWeight.Bold)
                .margin({ top: 8 })

              Text('麻辣鲜香，下饭神器')
                .fontSize(12)
                .fontColor('#888')
                .margin({ top: 4 })
            }
            .margin({ right: 12 })

            Column() {
              Image('https://picsum.photos/200/120?random=7')
                .width(150)
                .height(110)
                .borderRadius(12)

              Text('糖醋里脊')
                .fontSize(16)
                .fontWeight(FontWeight.Bold)
                .margin({ top: 8 })

              Text('酸甜开胃，老少皆宜')
                .fontSize(12)
                .fontColor('#888')
                .margin({ top: 4 })
            }
            .margin({ right: 12 })

            Column() {
              Image('https://picsum.photos/200/120?random=5')
                .width(150)
                .height(110)
                .borderRadius(12)

              Text('蒜蓉西兰花')
                .fontSize(16)
                .fontWeight(FontWeight.Bold)
                .margin({ top: 8 })

              Text('清爽低脂，十分钟上桌')
                .fontSize(12)
                .fontColor('#888')
                .margin({ top: 4 })
            }
            .margin({ right: 12 })

            Column() {
              Image('https://picsum.photos/200/120?random=3')
                .width(150)
                .height(110)
                .borderRadius(12)
              Text('麻婆豆腐')
                .fontSize(16)
                .fontWeight(FontWeight.Bold)
                .margin({ top: 8 })
              Text('川味代表，香麻下饭')
                .fontSize(12)
                .fontColor('#888')
                .margin({ top: 4 })
            }
          }
          .padding({ left: 16, right: 16 })
        }
        .scrollable(ScrollDirection.Horizontal)
        .scrollBar(BarState.Off)
        .height(200)
        .padding({ top: 12 })

        // AI智能推荐标题
        Row() {
          Text('🤖 AI 智能推荐')
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
          Blank()
          Text('换一批')
            .fontSize(14)
            .fontColor('#888')
        }
        .backgroundColor('#27AE60') //高饱和度暖绿色
        .width('100%')
        .padding({
          left: 16,
          right: 16,
          top: 10,
          bottom: 10
        })

        // 菜谱列表
        List() {
          ForEach(this.articles, (item: Article) => {
            ListItem() {
              Row() {
                Image(item.image.trim())
                  .width(106)
                  .height(82)
                  .borderRadius(8)

                Column() {
                  Text(item.title)
                    .fontSize(16)
                    .fontWeight(FontWeight.Bold)
                  Text(item.test)
                    .fontSize(12)
                    .fontColor('#666')
                    .margin({ top: 4 })
                }
                .alignItems(HorizontalAlign.Start)
                .margin({ left: 12 })
                .layoutWeight(1)
              }
              .width('100%')
              .padding({
                left: 16,
                right: 16,
                top: 8,
                bottom: 8
              })
            }
          })
        }
        .padding({ bottom: this.TABBAR_HEIGHT })

      }
      .width('100%')
      .height('100%')
      .backgroundColor('#F8F9FA')
    }

  }

  // 设置一个搜索框点击搜索跳转到新页面的方法
  goToSearchPage() {
    if (!this.productName || this.productName.trim() === '') {
      promptAction.showToast({ message: '请输入商品名称' });
      return
    }

    // 使用 router.push 跳转到结果页，并传递参数
    router.pushUrl({
      url: 'pages/Users/Home/SearchProductPage',
      params: {
        productName: this.productName
      }
    })
  }
}
