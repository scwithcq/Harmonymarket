import { prompt } from "@kit.ArkUI"

import {MqttClientPanel} from "../../../utils/MqttClientPanel"

@Builder
export function MerchantHomePageBuilder() {
  MerchantHomePage()
}

@Component
export struct MerchantHomePage {
  @State pageStack: NavPathStack = null!
  @State selectedTab: string = '拍照上传'
  @State capturedImage: Resource | null = null // 模拟用 Resource 类型

  // 模拟拍照
  takePhoto() {
    prompt.showToast({ message: '模拟拍照成功！' })
    this.capturedImage = $r('app.media.recommend4')
  }

  // 返回到拍照上传
  backToCamera() {
    this.selectedTab = '拍照上传'
  }

  build() {
    NavDestination() {
      Column({ space: 15 }) {

        // 顶部标题区
        Row(){

        }
        Row() {
          if (this.selectedTab !== '拍照上传') {
            // ✅ 当不是拍照上传页时显示返回按钮
            Button('← 返回拍照上传')
              .onClick(() => this.backToCamera())
              .fontSize(14)
              .backgroundColor('#E0E0E0')
              .borderRadius(8)
              .padding(6)
          } else {
            Blank() // 占位，保持布局稳定
          }

          Text('商家工作台')
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .margin({ top: 5 })
        }
        .width('100%')
        .justifyContent(FlexAlign.SpaceBetween)
        .padding({ left: 15, right: 15, top: 10 })

        // 中间主要内容区
        if (this.selectedTab === '拍照上传') {
          this.buildCameraPage()
        } else if (this.selectedTab === '商品管理') {
          this.buildPlaceholderPage('商品管理')
        } else if (this.selectedTab === '订单管理') {
          this.buildPlaceholderPage('订单管理')
        } else {
          this.buildPlaceholderPage('我的')
        }

        // 底部导航栏
        Row({ space: 20 }) {
          this.buildNavButton('拍照上传', '📸')
          this.buildNavButton('商品管理', '🛒')
          this.buildNavButton('订单管理', '📦')
          this.buildNavButton('我的', '👤')
        }
        .justifyContent(FlexAlign.SpaceEvenly)
        .padding(10)
        .backgroundColor(Color.White) // 底部导航背景白色
      }
      .width('100%')
      .height('100%')
      .justifyContent(FlexAlign.SpaceBetween)
    }
    .onReady((context: NavDestinationContext) => {
      this.pageStack = context.pathStack
    })
  }

  // 拍照上传页面
  @Builder
  buildCameraPage() {
    MqttClientPanel()
      .height('80%')
    // Column({ space: 10 }) {
    //   Text('拍照上传')
    //     .fontSize(22)
    //     .fontWeight(FontWeight.Medium)
    //
    //   Button('拍照')
    //     .width('80%')
    //     .height(45)
    //     .fontSize(18)
    //     .onClick(() => this.takePhoto())
    //
    //   if (this.capturedImage != null) {
    //     Image(this.capturedImage)
    //       .width('80%')
    //       .height(200)
    //       .objectFit(ImageFit.Cover)
    //       .borderRadius(10)
    //       .margin({ top: 10 })
    //   } else {
    //     Text('未拍摄照片')
    //       .fontSize(16)
    //       .fontColor(Color.Grey)
    //   }
    // }
    // .justifyContent(FlexAlign.Center)
    // .alignItems(HorizontalAlign.Center)
  }

  // 其他模块页面
  @Builder
  buildPlaceholderPage(title: string) {
    Column() {
      Text(title)
        .fontSize(22)
        .fontWeight(FontWeight.Medium)
      Text('该功能正在开发中...')
        .fontColor(Color.Grey)
        .fontSize(16)
        .margin({ top: 10 })
    }
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)
    .height('100%')
  }

  // 底部导航按钮
  @Builder
  buildNavButton(title: string, icon: string) {
    Column() {
      Text(icon).fontSize(20)
      Text(title)
        .fontSize(14)
        .fontColor(this.selectedTab === title ? '#4CAF50' : Color.Black) // 选中绿色
    }
    .onClick(() => {
      this.selectedTab = title
    })
  }
}
