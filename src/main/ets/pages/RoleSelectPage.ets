import dataPreferences from '@ohos.data.preferences'

const PREF_NAME = 'role_pref'
const KEY_ROLE = 'role'

@Builder
export function RoleSelectPageBuilder() {
  RoleSelectPage()
}


@Component
struct RoleSelectPage {
  // // 导航栏实例
  // pageStack: NavPathStack = new NavPathStack()
  @State pageStack:NavPathStack = null!;

  // private pref: dataPreferences.Preferences | null = null
  // @Consume('pageStack') nav: NavPathStack   // ✅ 官方方式取栈
  //
  // async aboutToAppear() {
  //   this.pref = await dataPreferences.getPreferences(getContext(this), PREF_NAME)
  // }

  build() {
    // 主页
    NavDestination() {
      Column({ space: 40 }) {
        Text('请选择身份').fontSize(24).fontWeight(FontWeight.Bold)
        Button('用户端')
          .width(200)
          .height(48)
          .backgroundColor('#4CAF50') // 绿色
          .onClick(() => {
          this.pageStack.replacePathByName("Layout", null, false)
        })
        Button('商家端')
          .width(200)
          .height(48)
          .backgroundColor('#000000') // 黑色
          .onClick(() => {
          this.pageStack.replacePathByName("MerchantHomePage", null, false)
        })


        // Button('用户端').width(200).height(48).onClick(async () => {
        //   await this.pref?.put(KEY_ROLE, 'user')
        //   await this.pref?.flush()
        //   this.pageStack.replacePathByName('Layout', null,false)
        // })
        // Button('商家端').width(200).height(48).backgroundColor('#FF5722').onClick(async () => {
        //   await this.pref?.put(KEY_ROLE, 'merchant')
        //   await this.pref?.flush()
        //   this.pageStack.replacePathByName('MerchantHomePage', null,false)
        // })
      }
      .width('100%').height('100%').justifyContent(FlexAlign.Center)
    }
    .onReady((context: NavDestinationContext)=>{
      this.pageStack= context.pathStack
    })
    .title('选择身份')
  }
}