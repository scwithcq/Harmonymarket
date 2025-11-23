import { RoleSelectPageBuilder } from './RoleSelectPage'
import { UserHomePageBuilder } from './Users/Home/UserHomePage'
import { MerchantHomePageBuilder } from './Merchant/Home/MerchantHomePage'
import { CartPageBuilder } from './Users/Cart/CartPage'
import { SearchProductPageBuilder } from './Users/Home/SearchProductPage'
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
      // 空内容，NavDestination会通过navDestination动态创建
    }
    .navDestination(this.PageMap)
    .onAppear(()=>{
      // 跳转到角色选择页
      this.pageStack.pushPathByName("RoleSelectPage", null)
    })
    .hideNavBar(true)
    .mode(NavigationMode.Stack)
    .title('MarketApp')
    .width('100%')
  }
  
  // 路由映射表
  @Builder
  PageMap(name: string, param: Object) {
    if (name === 'RoleSelectPage') {
      RoleSelectPageBuilder()
    } else if (name === 'CartPage') {
      CartPageBuilder()
    } else if (name === 'SearchProductPage') {
      SearchProductPageBuilder()
    }
  }
}