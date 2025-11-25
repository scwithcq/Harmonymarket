import { router } from "@kit.ArkUI";

/*
@Component
export struct UserPage {
  build() {
    Column() {
      Text('首页')
        .fontSize(50)
        .fontColor(Color.Black)
        .backgroundColor(Color.White)
    }
  }
}*/

@Builder
export function UserPageBuilder() {
  UserPage()
}

@Component
export struct UserPage {
  @State userName: string = '张三';
  @State phone: string = '138****8888';
  @State email: string = 'zhangsan@example.com';
  @State address: string = '北京市 海淀区';
  @State avatarUrl: string = 'https://img.icons8.com/color/96/user-male-circle--v1.png';
  @State isEditing: boolean = false;
  @State pageStack:NavPathStack = null!
  
  // 临时编辑数据
  @State tempEmail: string = '';
  @State tempAddress: string = '';
  
  // 保存编辑
  saveChanges() {
    this.email = this.tempEmail;
    this.address = this.tempAddress;
    this.isEditing = false;
  }
  
  // 取消编辑
  cancelEdit() {
    this.tempEmail = this.email;
    this.tempAddress = this.address;
    this.isEditing = false;
  }
  
  // 进入编辑模式
  startEdit() {
    this.tempEmail = this.email;
    this.tempAddress = this.address;
    this.isEditing = true;
  }
  
  // 返回角色选择页
  goToRoleSelect() {
    if (this.pageStack) {
      this.pageStack.replacePathByName("RoleSelectPage", null, false);
    }
  }


  build() {
    NavDestination(){
      Scroll() {

        Column() {
          // -----------顶部-----------
          Row(){
            Text('个人信息')
              .fontSize(25)
              .fontColor('#000000') // 黑白简约
              .fontWeight(FontWeight.Medium)
              .letterSpacing(1)
              .textOverflow({ overflow: TextOverflow.Ellipsis })
              .maxLines(1)
              .textAlign(TextAlign.Center)

                // .backgroundColor(Color.Orange)
              .width('100%')
              .borderRadius(4)
          }
          .border({radius:20})
          .width('100%')
          .layoutWeight(1)


          // ---------- 用户卡片 ----------
          Column() {
            Row() {
              Image(this.avatarUrl)
                .width(90)
                .height(90)
                .borderRadius(45)
                .objectFit(ImageFit.Cover)
                .border({ width: 2, color: '#ffffff' })
                .shadow({ radius: 4, color: '#00000030' })

              Column() {
                Text(this.userName)
                  .fontSize(22)
                  .fontWeight(FontWeight.Bold)
                  .fontColor('#ffffff')
                  .margin({ bottom: 4 })
                Text(this.phone)
                  .fontSize(16)
                  .fontColor('#f0f0f0')
              }
              .margin({ left: 16 })

              Blank()

              Row({ space: 8 }) {
                if (this.isEditing) {
                  Button('取消')
                    .type(ButtonType.Capsule)
                    .backgroundColor('#ffffff')
                    .fontColor('#666666')
                    .onClick(() => {
                      this.cancelEdit();
                    })
                  Button('保存')
                    .type(ButtonType.Capsule)
                    .backgroundColor('#4CAF50')
                    .fontColor('#ffffff')
                    .onClick(() => {
                      this.saveChanges();
                    })
                } else {
                  Button('编辑')
                    .type(ButtonType.Capsule)
                    .backgroundColor('#ffffff')
                    .fontColor('#000000')
                    .onClick(() => {
                      this.startEdit();
                    })
                }
              }
            }
            .border({radius:14})
            .width('100%')
            .padding({ left: 20, right: 20, top: 50, bottom: 30 })
            .alignItems(VerticalAlign.Center)
          }
          .width('100%')
          .backgroundColor('#000000') // 黑白简约：卡片背景黑色
          .borderRadius(20)
          .shadow({ radius: 10, color: '#00000020', offsetY: 2 })

          // ---------- 信息卡片 ----------
          Column() {
            this.infoItem('邮箱', this.isEditing ? this.tempEmail : this.email, (v: string) => this.tempEmail = v)
            this.infoItem('地址', this.isEditing ? this.tempAddress : this.address, (v: string) => this.tempAddress = v)
          }
          .padding(20)
          .backgroundColor('#ffffff')
          .borderRadius(16)
          .shadow({ radius: 4, color: '#00000010', offsetY: 2 })
          .margin({ left: 16, right: 16, top: 40 })

          // ---------- 菜单卡片 ----------
          Column() {
            this.menuItem('我的订单')
            this.menuItem('我的收藏')
            this.menuItem('设置')
            this.menuItem('退出登录')
            Row(){
              Text('返回角色选择（测试）')
                .fontSize(17)
                .fontColor('#333333')

              Blank()

              Image($r('app.media.arrow_right'))
                .width(20)
                .height(20)
                .objectFit(ImageFit.Contain)
            }
            .width('100%')
            .padding({ left: 18, right: 18, top: 14, bottom: 14 })
            .alignItems(VerticalAlign.Center)
            .border({ width: 0.5, color: '#eeeeee', style: BorderStyle.Solid })
            .backgroundColor('#ffffff')
            .hoverEffect(HoverEffect.Highlight)
            .onClick(() => {
              this.goToRoleSelect();
            })
          }
          .backgroundColor('#ffffff')
          .borderRadius(16)
          .shadow({ radius: 4, color: '#00000010', offsetY: 2 })
          .margin({ left: 16, right: 16, top: 40, bottom: 25 })
        }
        .width('100%')
        .padding({ bottom: 50 })
      }
      .width('100%')
      .height('100%') // ✅ 关键：填满屏幕

      .backgroundColor(Color.White) // 页面背景白色
    }
    .onReady((context: NavDestinationContext)=>{
      this.pageStack= context.pathStack
    })


  }


  // ---------- 子组件 ----------
  @Builder
  private infoItem(label: string, value: string, onChange: (v: string) => void) {
    Row() {
      Text(label)
        .fontSize(16)
        .width(70)
        .fontColor('#444444')

      if (this.isEditing) {
        TextInput({ placeholder: '请输入', text: value })
          .onChange((val: string) => onChange(val))
          .width('70%')
          .fontSize(16)
          .border({ width: 1, color: '#cccccc', radius: 8 })
          .padding({ left: 8, right: 8 })
      } else {
        Text(value)
          .fontSize(16)
          .fontColor('#666666')
          .width('70%')
      }
    }
    .width('100%')
    .padding({ top: 8, bottom: 8 })
    .alignItems(VerticalAlign.Center)
    .justifyContent(FlexAlign.SpaceBetween)
  }

  @Builder
  private menuItem(title: string) {
    Row() {
      Text(title)
        .fontSize(17)
        .fontColor('#333333')

      Blank()

      Image($r('app.media.arrow_right'))
        .width(20)
        .height(20)
        .objectFit(ImageFit.Contain)

    }
    .width('100%')
    .padding({ left: 18, right: 18, top: 14, bottom: 14 })
    .alignItems(VerticalAlign.Center)
    .border({ width: 0.5, color: '#eeeeee', style: BorderStyle.Solid })
    .onClick(() => {
      console.log('点击了 ' + title);
    })
    .backgroundColor('#ffffff')
    .hoverEffect(HoverEffect.Highlight)
  }
}