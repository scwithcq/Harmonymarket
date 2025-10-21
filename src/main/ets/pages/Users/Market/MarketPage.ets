@Component
export struct MarketPage {
  @State selectedCategory: string = '全部'
  @State selectedTab: number = 1 // 菜市场tab选中

  build() {
    Column() {
      // 顶部安全区域
      // Blank()
      //   .height(44)

      // 顶部导航栏
      Row() {
        Text('菜市场导购')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333')
        
        Blank()
        
        Row() {
          Image($r('app.media.ic_market_search'))
            .width(24)
            .height(24)
            .fillColor('#666')
          Image($r('sys.media.ohos_ic_public_more'))
            .width(24)
            .height(24)
            .fillColor('#666')
            .margin({left: 12})
        }
      }
      .width('100%')
      .height(50)
      .padding({left: 16, right: 16})
      .backgroundColor('#FFFFFF')
      
      // 分隔线
      Divider()
        .color('#E0E0E0')
        .strokeWidth(1)

      // 分类筛选区
      Scroll() {
        Row() {
          ForEach(['全部', '蔬菜', '水果', '肉类', '海鲜', '调料', '粮油', '豆制品'], (category: string) => {
            Text(category)
              .fontSize(14)
              .fontColor(this.selectedCategory === category ? '#FFFFFF' : '#333')
              .backgroundColor(this.selectedCategory === category ? '#4CAF50' : '#F5F5F5')
              .borderRadius(16)
              .padding({left: 16, right: 16, top: 8, bottom: 8})
              .margin({right: 10})
              .onClick(() => {
                this.selectedCategory = category
              })
          })
        }
        .padding({left: 16, right: 16, top: 12, bottom: 6})
      }
      .scrollable(ScrollDirection.Horizontal)
      .scrollBar(BarState.Off)

      // 商户推荐区
      Column() {
        Text('🏪 推荐商户')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333')
          .alignSelf(ItemAlign.Start)
          .margin({left: 16, top: 16, bottom: 12})

        Column() {
          // 商户卡片1
          Row() {
            Image('https://picsum.photos/200/160?random=1')
              .width(100)
              .height(80)
              .borderRadius(8)
            
            Column() {
              Text('老王蔬菜店')
                .fontSize(16)
                .fontWeight(FontWeight.Bold)
                .fontColor('#333')
                .alignSelf(ItemAlign.Start)
              
              Text('新鲜蔬菜，每日直供，价格实惠')
                .fontSize(12)
                .fontColor('#666')
                .margin({top: 4})
                .alignSelf(ItemAlign.Start)
              
              Text('好评率98%')
                .fontSize(12)
                .fontColor('#4CAF50')
                .margin({top: 8})
                .alignSelf(ItemAlign.Start)
            }
            .alignItems(HorizontalAlign.Start)
            .margin({left: 12})
            .layoutWeight(1)
          }
          .width('100%')
          .height(100)
          .backgroundColor('#FFFFFF')
          .borderRadius(8)
          .padding(12)
          .margin({left: 16, right: 16, bottom: 10})
          .shadow({
            radius: 4,
            color: '#E0E0E0',
            offsetX: 0,
            offsetY: 2
          })

          // 商户卡片2
          Row() {
            Image('https://picsum.photos/200/160?random=2')
              .width(100)
              .height(80)
              .borderRadius(8)
            
            Column() {
              Text('海鲜批发市场')
                .fontSize(16)
                .fontWeight(FontWeight.Bold)
                .fontColor('#333')
                .alignSelf(ItemAlign.Start)
              
              Text('新鲜海鲜，活鱼活虾，品质保证')
                .fontSize(12)
                .fontColor('#666')
                .margin({top: 4})
                .alignSelf(ItemAlign.Start)
              
              Text('好评率95%')
                .fontSize(12)
                .fontColor('#4CAF50')
                .margin({top: 8})
                .alignSelf(ItemAlign.Start)
            }
            .alignItems(HorizontalAlign.Start)
            .margin({left: 12})
            .layoutWeight(1)
          }
          .width('100%')
          .height(100)
          .backgroundColor('#FFFFFF')
          .borderRadius(8)
          .padding(12)
          .margin({left: 16, right: 16, bottom: 10})
          .shadow({
            radius: 4,
            color: '#E0E0E0',
            offsetX: 0,
            offsetY: 2
          })

          // 商户卡片3
          Row() {
            Image('https://picsum.photos/200/160?random=3')
              .width(100)
              .height(80)
              .borderRadius(8)
            
            Column() {
              Text('水果精品店')
                .fontSize(16)
                .fontWeight(FontWeight.Bold)
                .fontColor('#333')
                .alignSelf(ItemAlign.Start)
              
              Text('进口水果，精品水果，新鲜直达')
                .fontSize(12)
                .fontColor('#666')
                .margin({top: 4})
                .alignSelf(ItemAlign.Start)
              
              Text('好评率96%')
                .fontSize(12)
                .fontColor('#4CAF50')
                .margin({top: 8})
                .alignSelf(ItemAlign.Start)
            }
            .alignItems(HorizontalAlign.Start)
            .margin({left: 12})
            .layoutWeight(1)
          }
          .width('100%')
          .height(100)
          .backgroundColor('#FFFFFF')
          .borderRadius(8)
          .padding(12)
          .margin({left: 16, right: 16})
          .shadow({
            radius: 4,
            color: '#E0E0E0',
            offsetX: 0,
            offsetY: 2
          })
        }
      }

      Blank()

      // 热门商品推荐区
      Column() {
        Row() {
          Text('🔥 热门商品')
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333')
          Blank()
          Text('查看更多 >')
            .fontSize(14)
            .fontColor('#888')
        }
        .width('100%')
        .padding({left: 16, right: 16, top: 16})

        // 商品网格（包裹为可滚动列表，保留原卡片样式）
        Scroll() {
          Flex({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceBetween }) {
            // 商品1
            Column() {
              Image('https://picsum.photos/200/200?random=4')
                .width('100%')
                .aspectRatio(1)
                .borderRadius(8)
              
              Text('新鲜西红柿')
                .fontSize(14)
                .fontColor('#333')
                .margin({top: 8})
                .alignSelf(ItemAlign.Start)
              
              Text('¥3.50/斤')
                .fontSize(14)
                .fontWeight(FontWeight.Bold)
                .fontColor('#E53935')
                .margin({top: 4})
                .alignSelf(ItemAlign.Start)
              
              Button('购买')
                .fontSize(12)
                .fontColor('#FFFFFF')
                .backgroundColor('#4CAF50')
                .borderRadius(6)
                .width('100%')
                .height(32)
                .margin({top: 8})
            }
            .width('45%')
            .backgroundColor('#FFFFFF')
            .borderRadius(8)
            .padding(12)
            .margin({bottom: 16})
            .shadow({
              radius: 4,
              color: '#E0E0E0',
              offsetX: 0,
              offsetY: 2
            })

            // 商品2
            Column() {
              Image('https://picsum.photos/200/200?random=5')
                .width('100%')
                .aspectRatio(1)
                .borderRadius(8)
              
              Text('有机胡萝卜')
                .fontSize(14)
                .fontColor('#333')
                .margin({top: 8})
                .alignSelf(ItemAlign.Start)
              
              Text('¥4.20/斤')
                .fontSize(14)
                .fontWeight(FontWeight.Bold)
                .fontColor('#E53935')
                .margin({top: 4})
                .alignSelf(ItemAlign.Start)
              
              Button('购买')
                .fontSize(12)
                .fontColor('#FFFFFF')
                .backgroundColor('#4CAF50')
                .borderRadius(6)
                .width('100%')
                .height(32)
                .margin({top: 8})
            }
            .width('45%')
            .backgroundColor('#FFFFFF')
            .borderRadius(8)
            .padding(12)
            .margin({bottom: 16})
            .shadow({
              radius: 4,
              color: '#E0E0E0',
              offsetX: 0,
              offsetY: 2
            })

            // 商品3
            Column() {
              Image('https://picsum.photos/200/200?random=6')
                .width('100%')
                .aspectRatio(1)
                .borderRadius(8)
              
              Text('新鲜土豆')
                .fontSize(14)
                .fontColor('#333')
                .margin({top: 8})
                .alignSelf(ItemAlign.Start)
              
              Text('¥2.80/斤')
                .fontSize(14)
                .fontWeight(FontWeight.Bold)
                .fontColor('#E53935')
                .margin({top: 4})
                .alignSelf(ItemAlign.Start)
              
              Button('购买')
                .fontSize(12)
                .fontColor('#FFFFFF')
                .backgroundColor('#4CAF50')
                .borderRadius(6)
                .width('100%')
                .height(32)
                .margin({top: 8})
            }
            .width('45%')
            .backgroundColor('#FFFFFF')
            .borderRadius(8)
            .padding(12)
            .margin({bottom: 16})
            .shadow({
              radius: 4,
              color: '#E0E0E0',
              offsetX: 0,
              offsetY: 2
            })

            // 商品4
            Column() {
              Image('https://picsum.photos/200/200?random=7')
                .width('100%')
                .aspectRatio(1)
                .borderRadius(8)
              
              Text('新鲜白菜')
                .fontSize(14)
                .fontColor('#333')
                .margin({top: 8})
                .alignSelf(ItemAlign.Start)
              
              Text('¥1.50/斤')
                .fontSize(14)
                .fontWeight(FontWeight.Bold)
                .fontColor('#E53935')
                .margin({top: 4})
                .alignSelf(ItemAlign.Start)
              
              Button('购买')
                .fontSize(12)
                .fontColor('#FFFFFF')
                .backgroundColor('#4CAF50')
                .borderRadius(6)
                .width('100%')
                .height(32)
                .margin({top: 8})
            }
            .width('45%')
            .backgroundColor('#FFFFFF')
            .borderRadius(8)
            .padding(12)
            .margin({bottom: 16})
            .shadow({
              radius: 4,
              color: '#E0E0E0',
              offsetX: 0,
              offsetY: 2
            })
          }
          .width('100%')
          .padding({left: 16, right: 16})
        }
        .height(420)
        .scrollable(ScrollDirection.Vertical)
        .scrollBar(BarState.Off)
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#FFFFFF')
  }
}