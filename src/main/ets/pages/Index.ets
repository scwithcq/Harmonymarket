import { AppStorageV2 } from '@kit.ArkUI';

@Entry
@Component
struct Index {
  // pathStack : NavPathStack = new NavPathStack();
  pathStack : NavPathStack = AppStorageV2.connect(NavPathStack,'navStack',() => new NavPathStack())!

  build() {
    Navigation(this.pathStack){
    }.onAppear(() => {
      // 组件生效，首先显示的是：软件启动页面 没有广告
      // this.pathStack.pushPathByName("Start", null, false);
      this.pathStack.pushPathByName("Layout",null,false);
    })

    .hideNavBar(true) //不会把自己放到控制跳转到对象里面，点返回的时候不会返回到这个导航页

  }

}