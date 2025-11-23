import { FloatingCartButton } from '../../../components/FloatingCartButton';

// 商品数据定义
export interface product {
  image: string
  productName: string
  unit: string //单位
  price: number //价钱
}

// 商家数据定义
export interface merchant {
  image: string
  merchantName: string
  introduction: string
  positiveFeedbackRate: number
}

// 静态商品数据
export const productList: product[] = [
  {
    image: 'https://picsum.photos/200/200?random=7',
    productName: '新鲜白菜',
    unit: '斤',
    price: 1.5,
  },
  {
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&h=200&fit=crop',
    productName: '新鲜胡萝卜',
    unit: '斤',
    price: 2.5
  },
  {
    image: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=200&h=200&fit=crop',
    productName: '新鲜土豆',
    unit: '斤',
    price: 3.0
  },
  {
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&h=200&fit=crop',
    productName: '新鲜西红柿',
    unit: '斤',
    price: 4.0
  },
  {
    image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=200&h=200&fit=crop',
    productName: '新鲜黄瓜',
    unit: '个',
    price: 3.5
  },
  {
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=200&h=200&fit=crop',
    productName: '新鲜茄子',
    unit: '斤',
    price: 2.8
  }
]

// 静态商家数据
export const merchantList: merchant[] = [
  {
    image: 'https://picsum.photos/200/160?random=1',
    merchantName: '老王蔬菜店',
    introduction: '新鲜蔬菜，每日直供，价格实惠',
    positiveFeedbackRate: 98
  }, {
  image: 'https://images.unsplash.com/photo-1506484381205-f7945653044d?w=200&h=160&fit=crop',
  merchantName: '老李果园',
  introduction: '产地直采，水果新鲜，甜度高',
  positiveFeedbackRate: 97
},
  {
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=160&fit=crop',
    merchantName: '阿姨烘焙屋',
    introduction: '手工现烤，低糖健康，当日配送',
    positiveFeedbackRate: 99
  },
  {
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=160&fit=crop',
    merchantName: '渔夫海鲜铺',
    introduction: '凌晨码头直发，鲜活到家，冰袋保鲜',
    positiveFeedbackRate: 96
  },
  {
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784c38?w=200&h=160&fit=crop',
    merchantName: '牧场鲜奶站',
    introduction: '当日牧场冷萃，无添加，玻璃瓶可退',
    positiveFeedbackRate: 98
  },
  {
    image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=200&h=160&fit=crop',
    merchantName: '山野菌菇坊',
    introduction: '深山采摘，自然晾晒，无硫熏',
    positiveFeedbackRate: 97
  }
]


@Component
export struct MarketPage {
  @State selectedCategory: string = '全部'
  readonly TABBAR_HEIGHT: number = 220
  @State products: product[] = productList
  @State merchants: merchant[] = merchantList
  @StorageProp('globalPageStack') pageStack: NavPathStack = new NavPathStack();

  // 市场
  // @State selectedTab: number = 1 // 菜市场tab选中


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
            .margin({ left: 12 })
        }
      }
      .width('100%')
      .height(50)
      .padding({ left: 16, right: 16 })
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
              .padding({
                left: 16,
                right: 16,
                top: 8,
                bottom: 8
              })
              .margin({ right: 10 })
              .onClick(() => {
                this.selectedCategory = category
              })
          })
        }
        .padding({
          left: 16,
          right: 16,
          top: 12,
          bottom: 6
        })
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
          .margin({ left: 16, top: 16, bottom: 12 })

        List() {
          ForEach(this.merchants, (item: merchant) => {
            ListItem() {
              Row() {
                Image(item.image)
                  .width(100)
                  .height(80)
                  .borderRadius(8)

                Column() {
                  Text(item.merchantName)
                    .fontSize(16)
                    .fontWeight(FontWeight.Bold)
                    .fontColor('#333')
                    .alignSelf(ItemAlign.Start)

                  Text(item.introduction)
                    .fontSize(12)
                    .fontColor('#666')
                    .margin({ top: 4 })
                    .alignSelf(ItemAlign.Start)

                  Text('好评率' + item.positiveFeedbackRate + '%')
                    .fontSize(12)
                    .fontColor('#4CAF50')
                    .margin({ top: 8 })
                    .alignSelf(ItemAlign.Start)
                }
                .alignItems(HorizontalAlign.Start)
                .margin({ left: 12 })
                .layoutWeight(1)
              }
              .width('100%')
              .height(100)
              .backgroundColor('#FFFFFF')
              .borderRadius(8)
              .padding(12)
              .margin({ left: 16, right: 16, bottom: 10 })
              .shadow({
                radius: 4,
                color: '#E0E0E0',
                offsetX: 0,
                offsetY: 2
              })
            }
          }
          )
        }
        .height(350)

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
        .padding({ left: 16, right: 16, top: 16 })

        // 商品网格（包裹为可滚动列表，保留原卡片样式）
        Scroll() {
          Flex({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceBetween }) {
            ForEach(this.products, (item: product) => {

              // 商品1
              Column() {
                Image(item.image)
                  .width('100%')
                  .aspectRatio(1)
                  .borderRadius(8)

                Text(item.productName)
                  .fontSize(14)
                  .fontColor('#333')
                  .margin({ top: 8 })
                  .alignSelf(ItemAlign.Start)

                Text('¥' + item.price + '/' + item.unit)
                  .fontSize(14)
                  .fontWeight(FontWeight.Bold)
                  .fontColor('#E53935')
                  .margin({ top: 4 })
                  .alignSelf(ItemAlign.Start)

                Button('购买')
                  .fontSize(12)
                  .fontColor('#FFFFFF')
                  .backgroundColor('#4CAF50')
                  .borderRadius(6)
                  .width('100%')
                  .height(32)
                  .margin({ top: 8 })
              }
              .width('45%')
              .backgroundColor('#FFFFFF')
              .borderRadius(8)
              .padding(12)
              .margin({ bottom: 16 })
              .shadow({
                radius: 4,
                color: '#E0E0E0',
                offsetX: 0,
                offsetY: 2
              })
            }

            )
          }
          .width('100%')
          .padding({ left: 16, right: 16 })
        }
        .padding({ bottom: this.TABBAR_HEIGHT })
        .height(420)
        .scrollable(ScrollDirection.Vertical)
        .scrollBar(BarState.Off)
      }
      
      // 悬浮购物车按钮
      FloatingCartButton({ pageStack: this.pageStack })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#FFFFFF')
  }
}