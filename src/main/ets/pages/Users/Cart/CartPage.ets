// File: src/main/ets/pages/Users/Cart/CartPage.ets
import { CartItem } from '../../../models/CartItem';
import { CartService } from '../../../services/CartService';
import { promptAction } from '@kit.ArkUI';
import { app_color } from '../../../utils/Colors';

@Builder
export function CartPageBuilder() {
  CartPage()
}

/**
 * 购物车页面
 * 功能：展示购物车商品、增减数量、删除商品、全选/单选、结算
 */
@Component
struct CartPage {
  @State cartList: CartItem[] = [];
  @State isLoading: boolean = true;
  @State allSelected: boolean = false;
  @State totalPrice: number = 0;
  @State selectedCount: number = 0;
  @State isEditMode: boolean = false; // 是否处于编辑模式
  
  private currentUserId: number = 1; // TODO: 从登录状态获取
  @State pageStack: NavPathStack = null!;

  aboutToAppear() {
    console.info('[CartPage] aboutToAppear 被调用');
    // 尝试在这里也加载数据
    setTimeout(() => {
      console.info('[CartPage] setTimeout 延迟加载数据');
      this.loadCartData();
    }, 100);
  }

  /**
   * 加载购物车数据
   */
  async loadCartData() {
    console.info('[CartPage] 开始加载购物车数据, userId:', this.currentUserId);
    this.isLoading = true;
    this.cartList = await CartService.getCartList(this.currentUserId);
    console.info('[CartPage] 获取到购物车商品数量:', this.cartList.length);
    if (this.cartList.length > 0) {
      console.info('[CartPage] 第一个商品:', JSON.stringify(this.cartList[0]));
    }
    this.isLoading = false;
    this.calculateTotal();
  }

  /**
   * 计算总价和选中数量
   */
  calculateTotal() {
    this.selectedCount = this.cartList.filter(item => item.selected).length;
    this.totalPrice = this.cartList
      .filter(item => item.selected)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.allSelected = this.cartList.length > 0 && 
                       this.cartList.every(item => item.selected);
  }

  /**
   * 全选/取消全选
   */
  toggleAllSelect() {
    this.allSelected = !this.allSelected;
    this.cartList.forEach(item => item.selected = this.allSelected);
    this.calculateTotal();
  }

  /**
   * 单个商品选中
   */
  toggleItemSelect(index: number) {
    this.cartList[index].selected = !this.cartList[index].selected;
    this.calculateTotal();
  }

  /**
   * 更新商品数量
   */
  async updateQuantity(item: CartItem, delta: number) {
    const newQuantity = item.quantity + delta;
    
    // 数量校验
    if (newQuantity < 1) {
      promptAction.showToast({ message: '数量不能少于1' });
      return;
    }
    const stock = item.stock || 999;
    if (newQuantity > stock) {
      promptAction.showToast({ message: '库存不足，仅剩 ' + stock + ' ' + item.unit });
      return;
    }

    // 调用接口更新
    const success = await CartService.updateQuantity(item.cartId, newQuantity);
    if (success) {
      // 重新加载购物车数据以触发界面更新
      await this.loadCartData();
      promptAction.showToast({ message: '数量已更新' });
    } else {
      promptAction.showToast({ message: '更新失败，请重试' });
    }
  }

  /**
   * 自定义输入商品数量
   */
  showCustomQuantityDialog(item: CartItem) {
    const stock = item.stock || 999;
    promptAction.showDialog({
      title: '修改数量',
      message: '请输入数量（库存: ' + stock + ' ' + item.unit + '）',
      buttons: [
        { text: '取消', color: '#999999' },
        { text: '1', color: '#4CAF50' },
        { text: '5', color: '#4CAF50' },
        { text: '10', color: '#4CAF50' },
        { text: '自定义', color: '#000000' }
      ]
    }).then(async (result) => {
      let newQuantity = 0;
      
      if (result.index === 1) {
        newQuantity = 1;
      } else if (result.index === 2) {
        newQuantity = 5;
      } else if (result.index === 3) {
        newQuantity = 10;
      } else if (result.index === 4) {
        // 自定义数量：显示二级对话框
        this.showCustomInputDialog(item);
        return;
      } else {
        return; // 取消
      }
      
      // 库存校验
      if (newQuantity > stock) {
        promptAction.showToast({ message: '库存不足，仅剩 ' + stock + ' ' + item.unit });
        return;
      }
      
      // 更新数量
      const success = await CartService.updateQuantity(item.cartId, newQuantity);
      if (success) {
        // 重新加载购物车数据以触发界面更新
        await this.loadCartData();
        promptAction.showToast({ message: '数量已更新为 ' + newQuantity });
      } else {
        promptAction.showToast({ message: '更新失败，请重试' });
      }
    });
  }

  /**
   * 显示自定义输入对话框（简化版：使用预设值）
   */
  showCustomInputDialog(item: CartItem) {
    const stock = item.stock || 999;
    promptAction.showDialog({
      title: '自定义数量',
      message: '请选择数量（库存: ' + stock + ' ' + item.unit + '）',
      buttons: [
        { text: '取消', color: '#999999' },
        { text: '20', color: '#4CAF50' },
        { text: '50', color: '#4CAF50' },
        { text: '100', color: '#4CAF50' }
      ]
    }).then(async (result) => {
      let newQuantity = 0;
      
      if (result.index === 1) {
        newQuantity = 20;
      } else if (result.index === 2) {
        newQuantity = 50;
      } else if (result.index === 3) {
        newQuantity = 100;
      } else {
        return; // 取消
      }
      
      // 库存校验
      if (newQuantity > stock) {
        promptAction.showToast({ message: '库存不足，仅剩 ' + stock + ' ' + item.unit });
        return;
      }
      
      // 更新数量
      const success = await CartService.updateQuantity(item.cartId, newQuantity);
      if (success) {
        // 重新加载购物车数据以触发界面更新
        await this.loadCartData();
        promptAction.showToast({ message: '数量已更新为 ' + newQuantity });
      } else {
        promptAction.showToast({ message: '更新失败，请重试' });
      }
    });
  }

  /**
   * 删除单个商品
   */
  async deleteItem(cartId: number, productName: string) {
    // 二次确认
    promptAction.showDialog({
      title: '确认删除',
      message: `确定要删除 "${productName}" 吗？`,
      buttons: [
        { text: '取消', color: '#999999' },
        { text: '删除', color: '#FF6B6B' }
      ]
    }).then(async (result) => {
      if (result.index === 1) {
        const success = await CartService.deleteCartItem(cartId);
        if (success) {
          this.cartList = this.cartList.filter(item => item.cartId !== cartId);
          this.calculateTotal();
          promptAction.showToast({ message: '删除成功' });
        } else {
          promptAction.showToast({ message: '删除失败，请重试' });
        }
      }
    });
  }

  /**
   * 批量删除选中商品
   */
  async batchDeleteSelected() {
    const selectedIds = this.cartList
      .filter(item => item.selected)
      .map(item => item.cartId);
    
    if (selectedIds.length === 0) {
      promptAction.showToast({ message: '请先选择要删除的商品' });
      return;
    }

    // 二次确认
    promptAction.showDialog({
      title: '确认删除',
      message: `确定要删除选中的 ${selectedIds.length} 件商品吗？`,
      buttons: [
        { text: '取消', color: '#999999' },
        { text: '删除', color: '#FF6B6B' }
      ]
    }).then(async (result) => {
      if (result.index === 1) {
        const success = await CartService.batchDelete(selectedIds);
        if (success) {
          this.cartList = this.cartList.filter(item => !item.selected);
          this.calculateTotal();
          this.isEditMode = false;
          promptAction.showToast({ message: '删除成功' });
        } else {
          promptAction.showToast({ message: '删除失败，请重试' });
        }
      }
    });
  }

  /**
   * 清空购物车
   */
  async clearAllCart() {
    if (this.cartList.length === 0) {
      promptAction.showToast({ message: '购物车已是空的' });
      return;
    }

    promptAction.showDialog({
      title: '清空购物车',
      message: '确定要清空购物车的所有商品吗？',
      buttons: [
        { text: '取消', color: '#999999' },
        { text: '清空', color: '#FF6B6B' }
      ]
    }).then(async (result) => {
      if (result.index === 1) {
        const success = await CartService.clearCart(this.currentUserId);
        if (success) {
          this.cartList = [];
          this.calculateTotal();
          this.isEditMode = false;
          promptAction.showToast({ message: '已清空购物车' });
        } else {
          promptAction.showToast({ message: '清空失败，请重试' });
        }
      }
    });
  }

  build() {
    NavDestination() {
      Column() {
        // 顶部标题栏
        Row() {
          // 返回按钮
          Image($r('app.media.ic_back'))
            .width(24)
            .height(24)
            .fillColor(app_color.text1)
            .onClick(() => {
              this.pageStack.pop();
            })
          
          Text('购物车')
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor(app_color.text1)
            .layoutWeight(1)
            .margin({ left: 12 })
          
          Row({ space: 12 }) {
            if (this.isEditMode) {
              Text('完成')
                .fontSize(14)
                .fontColor(app_color.primary)
                .onClick(() => {
                  this.isEditMode = false;
                })
            } else {
              Text('编辑')
                .fontSize(14)
                .fontColor(app_color.primary)
                .onClick(() => {
                  if (this.cartList.length === 0) {
                    promptAction.showToast({ message: '购物车是空的' });
                    return;
                  }
                  this.isEditMode = true;
                })
            }
          }
        }
        .width('100%')
        .justifyContent(FlexAlign.SpaceBetween)
        .padding(16)
        .backgroundColor(Color.White)

        // 加载状态
        if (this.isLoading) {
          Column() {
            LoadingProgress()
              .width(50)
              .height(50)
              .color(app_color.primary)
            Text('加载中...')
              .fontSize(14)
              .fontColor(app_color.text2)
              .margin({ top: 12 })
          }
          .width('100%')
          .height('60%')
          .justifyContent(FlexAlign.Center)
        }
        // 空数据状态
        else if (this.cartList.length === 0) {
          Column() {
            Image($r('app.media.ic_empty'))
              .width(120)
              .height(120)
              .opacity(0.6)
            Text('购物车空空如也')
              .fontSize(16)
              .fontColor(app_color.text2)
              .margin({ top: 12 })
            Text('快去挑选喜欢的商品吧~')
              .fontSize(14)
              .fontColor(app_color.text3)
              .margin({ top: 8 })
          }
          .width('100%')
          .height('60%')
          .justifyContent(FlexAlign.Center)
        }
        // 购物车列表
        else {
          Scroll() {
            List({ space: 12 }) {
              ForEach(this.cartList, (item: CartItem, index: number) => {
                ListItem() {
                  Row() {
                    // 复选框
                    Checkbox()
                      .select(item.selected)
                      .selectedColor(app_color.primary)
                      .onChange(() => this.toggleItemSelect(index))

                    // 商品图片
                    Image(item.imageUrl || item.productImage)
                      .width(80)
                      .height(80)
                      .borderRadius(8)
                      .margin({ left: 12 })
                      .objectFit(ImageFit.Cover)

                    // 商品信息
                    Column({ space: 6 }) {
                      Text(item.productName)
                        .fontSize(16)
                        .fontWeight(FontWeight.Medium)
                        .fontColor(app_color.text1)
                        .maxLines(2)
                        .textOverflow({ overflow: TextOverflow.Ellipsis })
                      
                      Text(`￥${item.price} / ${item.unit}`)
                        .fontSize(14)
                        .fontColor(app_color.primary)
                        .fontWeight(FontWeight.Bold)
                      
                      // 非编辑模式：数量控制器
                      if (!this.isEditMode) {
                        Row({ space: 10 }) {
                          Button('-')
                            .width(30)
                            .height(30)
                            .fontSize(18)
                            .backgroundColor(item.quantity <= 1 ? '#E0E0E0' : '#000000')
                            .fontColor(Color.White)
                            .borderRadius(15)
                            .enabled(item.quantity > 1)
                            .onClick(() => this.updateQuantity(item, -1))
                          
                          Text(`${item.quantity}`)
                            .fontSize(16)
                            .fontColor(app_color.text1)
                            .width(40)
                            .textAlign(TextAlign.Center)
                            .onClick(() => {
                              // 点击数量可以弹出自定义数量对话框
                              this.showCustomQuantityDialog(item);
                            })
                          
                          Button('+')
                            .width(30)
                            .height(30)
                            .fontSize(18)
                            .backgroundColor(item.quantity >= (item.stock || 999) ? '#E0E0E0' : app_color.primary)
                            .fontColor(Color.White)
                            .borderRadius(15)
                            .enabled(item.quantity < (item.stock || 999))
                            .onClick(() => this.updateQuantity(item, 1))
                        }
                      }
                      // 编辑模式：显示数量
                      else {
                        Text(`数量：${item.quantity} ${item.unit}`)
                          .fontSize(14)
                          .fontColor(app_color.text2)
                      }
                    }
                    .layoutWeight(1)
                    .margin({ left: 12, right: 8 })
                    .alignItems(HorizontalAlign.Start)

                    // 删除按钮
                    if (this.isEditMode) {
                      Button('删除')
                        .fontSize(13)
                        .backgroundColor(Color.Transparent)
                        .fontColor('#FF6B6B')
                        .onClick(() => this.deleteItem(item.cartId, item.productName))
                    }
                  }
                  .width('100%')
                  .padding(12)
                  .borderRadius(8)
                  .backgroundColor(Color.White)
                }
              })
            }
            .width('100%')
            .padding({ left: 16, right: 16, top: 12 })
          }
          .layoutWeight(1)
          .backgroundColor(Color.White) // 黑白简约：背景白色
        }

        // 底部结算栏
        if (this.cartList.length > 0) {
          Row() {
            // 全选
            Row() {
              Checkbox()
                .select(this.allSelected)
                .selectedColor(app_color.primary)
                .onChange(() => this.toggleAllSelect())
              Text('全选')
                .fontSize(14)
                .fontColor(app_color.text1)
                .margin({ left: 8 })
            }

            Blank()

            // 非编辑模式：显示价格和结算按钮
            if (!this.isEditMode) {
              Column({ space: 4 }) {
                Text(`已选 ${this.selectedCount} 件`)
                  .fontSize(12)
                  .fontColor(app_color.text2)
                  .textAlign(TextAlign.End)
                Text(`￥${this.totalPrice.toFixed(2)}`)
                  .fontSize(18)
                  .fontColor(app_color.primary)
                  .fontWeight(FontWeight.Bold)
              }
              .alignItems(HorizontalAlign.End)

              Button('去结算')
                .height(44)
                .padding({ left: 24, right: 24 })
                .backgroundColor(app_color.primary)
                .fontColor(Color.White)
                .fontSize(16)
                .borderRadius(22)
                .margin({ left: 16 })
                .onClick(() => {
                  if (this.selectedCount === 0) {
                    promptAction.showToast({ message: '请选择要结算的商品' });
                    return;
                  }
                  // TODO: 跳转到确认订单页
                  const selectedItems = this.cartList.filter(item => item.selected);
                  promptAction.showToast({ 
                    message: `准备结算 ${this.selectedCount} 件商品（订单页面开发中）` 
                  });
                  // this.pageStack.pushPathByName('ConfirmOrderPage', selectedItems);
                })
            }
            // 编辑模式：删除和清空按钮
            else {
              Row({ space: 12 }) {
                Button('批量删除')
                  .height(40)
                  .padding({ left: 20, right: 20 })
                  .backgroundColor('#000000') // 黑白简约
                  .fontColor(Color.White)
                  .fontSize(14)
                  .borderRadius(20)
                  .onClick(() => this.batchDeleteSelected())
                
                Button('清空购物车')
                  .height(40)
                  .padding({ left: 20, right: 20 })
                  .backgroundColor(Color.White) // 黑白简约
                  .fontColor('#000000')
                  .border({ width: 1, color: '#000000' })
                  .fontSize(14)
                  .borderRadius(20)
                  .onClick(() => this.clearAllCart())
              }
            }
          }
          .width('100%')
          .padding(16)
          .backgroundColor(Color.White)
          .justifyContent(FlexAlign.SpaceBetween)
          .shadow({
            radius: 8,
            color: app_color.shadow,
            offsetY: -2
          })
        }
      }
      .width('100%')
      .height('100%')
      .backgroundColor(Color.White) // 黑白简约：背景白色
    }
    .hideTitleBar(true)
    .onReady((context: NavDestinationContext) => {
      this.pageStack = context.pathStack;
      // 页面准备就绪后加载购物车数据
      console.info('[CartPage] 页面加载，开始获取购物车数据');
      this.loadCartData();
    })
  }
}
