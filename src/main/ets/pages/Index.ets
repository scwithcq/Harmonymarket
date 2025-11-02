import { RoleSelectPageBuilder } from './RoleSelectPage'
import { UserHomePageBuilder } from './Users/Home/UserHomePage'
import { MerchantHomePageBuilder } from './Merchant/Home/MerchantHomePage'
import dataPreferences from '@ohos.data.preferences'

const PREF_NAME = 'role_pref'
const KEY_ROLE = 'role'


@Entry
@Component
struct Index {
  // 导航栏实例
  pageStack: NavPathStack = new NavPathStack()

  // 生命周期
  // aboutToAppear(): void {
  //   this.loadRole()
  // }

  // 监听路径变化 → 立即跳转
  // onPathReady(info: NavPathInfo): void {
  //   if (info.name === 'RoleSelectPage') return   // 初始页不处理
  //   this.jumpByRole()
  // }
  //
  // private jumpByRole(): void {
  //   dataPreferences.getPreferences(getContext(this), PREF_NAME)
  //     .then(pref => pref.get(KEY_ROLE, ''))
  //     .then(last => {
  //       if (last === 'user') this.pageStack.replacePathByName('Layout', null)
  //       else if (last === 'merchant') this.pageStack.replacePathByName('MerchantHomePage', null)
  //     })
  // }

  // 角色加载逻辑
  // private async loadRole(): Promise<void> {
  //   const pref = await dataPreferences.getPreferences(getContext(this), PREF_NAME)
  //   const last = await pref.get(KEY_ROLE, '') as string
  //   // this.pageStack.replacePathByName("RoleSelectPage", null)
  //   if (last === 'user') {
  //     this.pageStack.replacePathByName('Layout', null)
  //   } else if (last === 'merchant') {
  //     this.pageStack.replacePathByName('MerchantHomePage', null)
  //   } else {
  //     this.pageStack.replacePathByName("RoleSelectPage", null)
  //   }
  // }

  //ui构建
  build() {
    Navigation(this.pageStack) {


    }
    .onAppear(()=>{
      this.pageStack.replacePathByName("RoleSelectPage", null)
    })
    .hideNavBar(true)

    .mode(NavigationMode.Stack)
    .title('MarketApp')
    .width('100%')
  }
}