// File: entry/src/main/ets/pages/Users/Home/HomePage.ets

@Component
export struct HomePage {
  build() {
    Column() {
      // 顶部搜索栏
      Row() {
        // 用户头像
        Image('https://picsum.photos/40/40')
          .width(44)
          .height(44)
          .borderRadius(22)
          .shadow({radius: 4, color: 'rgba(0,0,0,0.08)', offsetX: 0, offsetY: 2})

        // 搜索框
        Row() {
          Image($r('app.media.ic_search'))
            .width(16)
            .height(16)
            .margin({right: 8})
          Text('搜索菜谱 / 食材 / 商户...')
            .fontSize(14)
            .fontColor('#9E9E9E')
        }
  .width('72%')
  .height(44)
        .backgroundColor('#F8F9FA')
        .borderRadius(20)
        .margin({left: 12})
        .justifyContent(FlexAlign.Start)
        .padding({left: 16})
        .border({width: 1, color: '#E9ECEF'})
      }
      .padding({ left: 16, right: 16, top: 20 })
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
      .width('100%')
      .padding({ left: 16, right: 16, top: 20 })

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
              .margin({top: 8})
            Text('鲜嫩鸡肉与花生的完美搭配')
              .fontSize(12)
              .fontColor('#888')
              .margin({top: 4})
          }
          .margin({right: 12})

          Column() {
            Image('https://picsum.photos/200/120?random=2')
              .width(150)
              .height(110)
              .borderRadius(12)
            Text('西红柿炒蛋')
              .fontSize(16)
              .fontWeight(FontWeight.Bold)
              .margin({top: 8})
            Text('家常必备，简单美味')
              .fontSize(12)
              .fontColor('#888')
              .margin({top: 4})
          }
          .margin({right: 12})

          Column() {
            Image('https://picsum.photos/200/120?random=3')
              .width(150)
              .height(110)
              .borderRadius(12)
            Text('麻婆豆腐')
              .fontSize(16)
              .fontWeight(FontWeight.Bold)
              .margin({top: 8})
            Text('川味代表，香麻下饭')
              .fontSize(12)
              .fontColor('#888')
              .margin({top: 4})
          }
        }
        .padding({left: 16, right: 16})
      }
  .scrollable(ScrollDirection.Horizontal)
  .scrollBar(BarState.Off)
  .height(200)
      .padding({top: 12})

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
      .width('100%')
      .padding({ left: 16, right: 16, top: 24 })

      // 菜谱列表
      Column() {
        Row() {
          Image('https://picsum.photos/200/120?random=4')
            .width(106)
            .height(82)
            .borderRadius(8)

          Column() {
            Text('宫保鸡丁')
              .fontSize(16)
              .fontWeight(FontWeight.Bold)
            Text('鲜嫩鸡肉与花生的完美搭配')
              .fontSize(12)
              .fontColor('#666')
              .margin({top: 4})
          }
          .alignItems(HorizontalAlign.Start)
          .margin({left: 12})
          .layoutWeight(1)
        }
        .width('100%')
        .padding({left: 16, right: 16, top: 8, bottom: 8})

        Row() {
          Image('https://picsum.photos/200/120?random=5')
            .width(106)
            .height(82)
            .borderRadius(8)

          Column() {
            Text('西红柿炒蛋')
              .fontSize(16)
              .fontWeight(FontWeight.Bold)
            Text('家常必备，简单美味')
              .fontSize(12)
              .fontColor('#666')
              .margin({top: 4})
          }
          .alignItems(HorizontalAlign.Start)
          .margin({left: 12})
          .layoutWeight(1)
        }
        .width('100%')
        .padding({left: 16, right: 16, top: 8, bottom: 8})

        Row() {
          Image('https://picsum.photos/200/120?random=6')
            .width(106)
            .height(82)
            .borderRadius(8)

          Column() {
            Text('麻婆豆腐')
              .fontSize(16)
              .fontWeight(FontWeight.Bold)
            Text('川味代表，香麻下饭')
              .fontSize(12)
              .fontColor('#666')
              .margin({top: 4})
          }
          .alignItems(HorizontalAlign.Start)
          .margin({left: 12})
          .layoutWeight(1)
        }
        .width('100%')
        .padding({left: 16, right: 16, top: 8, bottom: 8})
      }
      .padding({bottom: 24})
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#FFFFFF')
  }
}
