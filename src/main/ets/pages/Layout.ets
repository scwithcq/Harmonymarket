import { it } from "@ohos/hypium"
import { RecipePage } from "./Users/Recipe/RecipePage"
import { MarketPage } from "./Users/Market/MarketPage"
import { UserHomePage } from "./Users/Home/UserHomePage"
import {UserPage} from "./Users/User/UserPage"

interface TabClass {
  text: string
  icon: ResourceStr
}


// 跳转页面入口函数
@Builder
export function LayoutBuilder() {
  Layout()
}

@ComponentV2
struct Layout {
  @Local currentIndex: number = 0
  // 导航栏实例
  pageStack: NavPathStack = new NavPathStack()
  // pathStack: NavPathStack = new NavPathStack()
  tabData: TabClass[] = [
    // HomePage 首页 含今日推荐菜谱  AI推荐卡片  跳转-》菜谱详情
    //
    { text: '首页', icon: $r('app.media.ic_recommend') },
    // RecipePage 菜谱 含分类筛选  搜索栏  跳转 -》 菜谱详情
    { text: '菜谱', icon: $r('app.media.ic_find') },
    // MarketPage 市场 含商户分类列表  地图定位  跳转-》商户详情-》商品购买
    { text: '市场', icon: $r('app.media.ic_moment') },
    // UserPage 我的 含用户资料  收藏菜谱 订单列表 设置 跳转->修改基本信息 修改密码
    { text: '我的', icon: $r('app.media.ic_mine') }
  ]

  @Builder tabBuilder(item: TabClass, index: number) {
    Column({ space: 5 }) {
      Image(item.icon)
        .width(25)
        .fillColor(this.currentIndex === index ? Color.Pink : Color.Green)
      Text(item.text)
        .fontSize(14)
        .fontColor(this.currentIndex === index ? Color.Pink : Color.Green)
    }
  }

  build() {
    NavDestination() {
      Tabs({ barPosition: BarPosition.End }) {
        ForEach(this.tabData, (item: TabClass, index: number) => {
          TabContent() {
            if (this.currentIndex === 0) {
              UserHomePage()
            } else if (this.currentIndex === 1) {
              RecipePage()
            }else if (this.currentIndex === 2){
              MarketPage()
            }else if (this.currentIndex ===3 ){
              UserPage()
            }
          }
          .tabBar(this.tabBuilder(item, index))
          .backgroundColor(Color.Black)
          .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])

        })
      }
      .backgroundColor('#3B4043')
      .onChange((index: number) => {
        this.currentIndex = index
      })
      .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])
    }

    // .title('布局页面')
    .onReady((context: NavDestinationContext) => {
      this.pageStack = context.pathStack
    })

  }


}
