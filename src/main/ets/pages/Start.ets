// 跳转页面入口函数
// 广告页面
@Builder
export function StartBuilder() {
  Start()
}

@Component
struct Start {
  //控制跳转到对象
  pathStack: NavPathStack = new NavPathStack()
/*  // 定义定时器（用于自动跳转）
  private timer: number | undefined = undefined
  // 定义标志位，防止重复跳转
  private hasNavigated: boolean = false

  // aboutToAppear()是程序启动后自动加载的程序
  // 说明：过3秒钟自动跳转到 Layout -> Start页面打开并开始计时3秒钟后跳转
  aboutToAppear(): void { //生命周期
    this.hasNavigated = false // 每次进入页面时重置
    this.timer = setTimeout(() => {
      // 若已跳转过（点击跳过或执行过一次），则不再执行
      if (this.hasNavigated) {
        return
      }
      this.hasNavigated = true
      //得用replacepathbyname 不能使用pushpathbyname，不然等自动跳转的时间到了，顶部的安全区域还是会出现
      this.pathStack.replacePathByName("Layout", null, false)
    }, 3000) //以毫秒为单位
  }

  // 页面销毁时清除定时器（防止重复跳转或内存泄漏）
  aboutToDisappear(): void {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = undefined
    }
  }*/

  build() {
    NavDestination() {
      //子页内容放这处
      Button('点击跳转到布局页面')
        .onClick(()=>
        {
          // this.pathStack.pushPathByName("Layout",null,false)
          this.pathStack.replacePathByName("Layout", null, false)
        })
        .expandSafeArea(
          [SafeAreaType.SYSTEM],
          [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])

      /*Stack({ alignContent: Alignment.TopEnd }) {
        Image($r('app.media.ad'))
          .width('100%')
          .height('100%')
          .expandSafeArea(
            [SafeAreaType.SYSTEM],
            [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]
          )

        Button('跳过')
          .backgroundColor(Color.Gray)
          .margin(15)
          .onClick(() => {
            // 如果已经跳转过则直接返回，防止多次执行
            if (this.hasNavigated) {
              return
            }
            this.hasNavigated = true
            // 点击“跳过”时先清除定时器，防止计时结束后再次跳转
            if (this.timer) {
              clearTimeout(this.timer)
              this.timer = undefined
            }
            this.pathStack.replacePathByName("Layout", null, false)
          })
      }*/

    }
    // .title('广告页面')
    .onReady((context: NavDestinationContext) => {
      this.pathStack = context.pathStack
    })
  }
}
