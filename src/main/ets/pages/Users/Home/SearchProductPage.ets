// File: src/main/ets/pages/Users/Home/SearchResultPage.ets
import router from '@ohos.router';
import http from '@ohos.net.http';
import { app_color } from '../../../utils/Colors'
import { LayoutBuilder } from '../../Layout';
import { promptAction } from '@kit.ArkUI';
import display from '@ohos.display';
import { CartService } from '../../../services/CartService';
import { AddCartRequest } from '../../../models/CartItem';
import { FloatingCartButton } from '../../../components/FloatingCartButton';

// 商品数据类型
export interface ProductDataItem {
  id?: number;              // 商品ID（可能是 id）
  productId?: number;       // 商品ID（可能是 productId）
  product_id?: number;      // 商品ID（可能是 product_id）
  name: string;
  price: number;
  unit: string;
  imageUrl: string;
  isRecommend?: number;
  isNew?: number;
  status?: string;          // 商品状态：on_sale 在售，off_sale 已售罄
}

interface GeneratedTypeLiteralInterface_1 {
  item: ProductDataItem[];
}

export interface ProductResultData {
  success: boolean;
  data: GeneratedTypeLiteralInterface_1;
  code: number;
  message: string;
}

// 模拟器访问宿主机地址
// const BASE_URL = 'http://10.0.2.2:8080/api';  //这个用来模拟机测试
const BASE_URL = 'http://192.168.85.10:8080/api'; //这个在连接我的热点70测试
// const BASE_URL = 'http://s49b7b66.natappfree.cc/api'; //这个为短暂（3天）公网测试 映射到后端的localhost:8080


@Builder
export function SearchProductPageBuilder() {
  SearchProductPage()
}


@Component
struct SearchProductPage {
  private animateCart: boolean = false
  @State keyword: string = '';
  @State productList: ProductDataItem[] = [];
  @State isLoading: boolean = true;
  @State cartVisible: Visibility = Visibility.Visible
  @State offsetX: number = 0
  @State offsetY: number = 0  // 用于垂直跳跃动画
  //这里用来渲染商品图片的放大
  @State showBig: boolean = false // 是否处于放大态
  @State bigUrl: string = '' // 要放大哪张图
  @State bigShown: boolean = false
  @State productName: string = '';
  
  // 购物车数量映射：key=productId, value=数量
  @State cartQuantityMap: Map<number, number> = new Map();
  
  // 当前用户ID（TODO: 后续从登录状态获取）
  private currentUserId: number = 1;

  // null! 表示"外部会马上赋值"
  @State pageStack: NavPathStack = null!;// 先占位，等 onReady 赋值
  
  // 悬浮购物车按钮引用
  private floatingCartButton: FloatingCartButton | null = null;

  // 页面显示前获取路由参数
/*  aboutToAppear() {
    const params = router.getParams() as Record<string, string>;
    this.keyword = params?.keyword ?? '';
    if (this.keyword) {
      this.fetchProductData();
    }
    if (this.animateCart) {
      this.startState()
    } else {
      this.cartVisible = Visibility.None
    }

  }*/

  // onAppear(event: () => void): CommonAttribute {
  // 	return this.startState();
  // }

  /**
   * 加载购物车中的商品数量
   */
  async loadCartQuantities() {
    const cartList = await CartService.getCartList(this.currentUserId);
    this.cartQuantityMap.clear();
    cartList.forEach(item => {
      const existingQty = this.cartQuantityMap.get(item.productId) || 0;
      this.cartQuantityMap.set(item.productId, existingQty + item.quantity);
    });
    console.info('[购物车数量] 已加载:', Array.from(this.cartQuantityMap.entries()));
  }
  
  /**
   * 获取商品在购物车中的数量
   */
  getCartQuantity(productId: number): number {
    return this.cartQuantityMap.get(productId) || 0;
  }

  // 调用后端接口获取商品数据
  async fetchProductData() {
    this.isLoading = true;
    const httpReq = http.createHttp();
    const url = `${BASE_URL}/products?keyword=${encodeURIComponent(this.keyword)}`;

    try {
      const resp = await httpReq.request(url, { method: http.RequestMethod.GET });
      if (resp.responseCode === 200) {
        const result: ProductResultData = JSON.parse(resp.result.toString());
        console.info('[搜索结果] 原始数据:', resp.result.toString().substring(0, 500));
        
        if (result.success && result.data?.item) {
          this.productList = result.data.item;
          console.info(`[搜索结果] 商品数量: ${this.productList.length}`);
          if (this.productList.length > 0) {
            console.info('[搜索结果] 第一个商品:', JSON.stringify(this.productList[0]));
            // 打印所有商品的status状态
            this.productList.forEach((item, index) => {
              console.info(`[商品${index}] 名称: ${item.name}, status: ${item.status}`);
            });
          }
          // 加载购物车数量
          await this.loadCartQuantities();
        } else {
          this.productList = [];
        }
      } else {
        console.error(`请求失败，状态码: ${resp.responseCode}`);
        this.productList = [];
      }
    } catch (err) {
      console.error('请求异常:', err);
      this.productList = [];
    } finally {
      httpReq.destroy();
      this.isLoading = false;
    }
  }

  //定义一个购物车从左到右的平移方法
  private startState(): void {
    this.offsetX = this.offsetX === 0 ? 70 : 70
    this.offsetY === 0
  }
  
  /**
   * 显示数量选择对话框
   */
  private showQuantityDialog(item: ProductDataItem, productId: number) {
    promptAction.showDialog({
      title: '选择数量',
      message: `请输入要添加到购物车的${item.name}数量`,
      buttons: [
        { text: '取消', color: '#999999' },
        { text: '添加1件', color: '#4CAF50' },
        { text: '添加5件', color: '#4CAF50' },
        { text: '自定义', color: '#FF6B35' }
      ]
    }).then(async (result) => {
      let quantity = 0;
      
      if (result.index === 1) {
        quantity = 1;
      } else if (result.index === 2) {
        quantity = 5;
      } else if (result.index === 3) {
        // 自定义数量：再次弹出输入框
        promptAction.showDialog({
          title: '自定义数量',
          message: '请输入数量（1-99）',
          buttons: [
            { text: '取消', color: '#999999' },
            { text: '确定', color: '#4CAF50' }
          ]
        }).then(async (customResult) => {
          if (customResult.index === 1) {
            // 这里简化处理，默认添加10件
            // 实际应该有TextInput输入框，但promptAction.showDialog不支持输入
            promptAction.showToast({ message: '请使用快捷数量选项' });
          }
        });
        return;
      } else {
        return; // 取消
      }
      
      // 执行加入购物车
      if (quantity > 0) {
        await this.addToCartWithQuantity(productId, item.name, quantity);
      }
    });
  }
  
  /**
   * 添加商品到购物车（指定数量）
   */
  private async addToCartWithQuantity(productId: number, productName: string, quantity: number) {
    console.info('[准备加车] 商品ID:', productId, ', 商品名称:', productName, ', 数量:', quantity);
    
    const success = await CartService.addToCart({
      userId: this.currentUserId,
      productId: productId,
      quantity: quantity
    } as AddCartRequest);
    
    if (success) {
      // 触发向上跳跃动画
      this.offsetY = -20;
      promptAction.showToast({ message: `已加入购物车 ${quantity} 件 ✓` });
      await this.loadCartQuantities();
      if (this.floatingCartButton) {
        this.floatingCartButton.refresh();
      }
      // 400ms后回落
      setTimeout(() => { this.offsetY = 0; }, 400);
    } else {
      promptAction.showToast({ message: '加入失败，请重试' });
    }
  }
  
  /**
   * 购物车控制组件
   */
  @Builder
  CartControlBuilder(item: ProductDataItem) {
    Column({ space: 4 }) {
      // 检查商品状态
      if (item.status === 'off_sale') {
        // 已售罄状态
        Text('已售罄')
          .fontSize(14)
          .fontColor('#999999')
          .backgroundColor('#F0F0F0')
          .padding({ left: 12, right: 12, top: 6, bottom: 6 })
          .borderRadius(4)
      } else if (this.getCartQuantity(item.id || item.productId || item.product_id || 0) > 0) {
        // 已加入购物车：显示数量和增减按钮
        Row({ space: 8 }) {
          // 减少按钮
          Button('-')
            .width(30)
            .height(30)
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .backgroundColor('#FF6B35')
            .fontColor(Color.White)
            .onClick(async () => {
              const pid = item.id || item.productId || item.product_id;
              if (!pid) return;
              
              // 找到购物车中的该商品项
              const cartList = await CartService.getCartList(this.currentUserId);
              const cartItem = cartList.find(c => c.productId === pid);
              if (cartItem) {
                if (cartItem.quantity > 1) {
                  await CartService.updateQuantity(cartItem.cartId, cartItem.quantity - 1);
                } else {
                  await CartService.deleteCartItem(cartItem.cartId);
                }
                await this.loadCartQuantities();
                if (this.floatingCartButton) {
                  this.floatingCartButton.refresh();
                }
              }
            })
          
          // 显示数量
          Text(this.getCartQuantity(item.id || item.productId || item.product_id || 0).toString())
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .width(40)
            .textAlign(TextAlign.Center)
            .backgroundColor('#FFF8DC')
            .borderRadius(4)
            .padding({ top: 4, bottom: 4 })
            .onClick(() => {
              promptAction.showToast({ 
                message: `当前数量: ${this.getCartQuantity(item.id || item.productId || item.product_id || 0)}` 
              });
            })
          
          // 增加按钮
          Button('+')
            .width(30)
            .height(30)
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .backgroundColor('#4CAF50')
            .fontColor(Color.White)
            .onClick(async () => {
              const pid = item.id || item.productId || item.product_id;
              if (!pid) return;
              
              const cartList = await CartService.getCartList(this.currentUserId);
              const cartItem = cartList.find(c => c.productId === pid);
              if (cartItem) {
                await CartService.updateQuantity(cartItem.cartId, cartItem.quantity + 1);
                await this.loadCartQuantities();
                if (this.floatingCartButton) {
                  this.floatingCartButton.refresh();
                }
              }
            })
        }
      } else {
        // 未加入购物车：显示加入按钮
        Row() {
          Image($r('app.media.Shopping'))
            .width(50)
            .height(50)
            .translate({ x: 0, y: this.offsetY })
            .animation({ duration: 400, curve: Curve.FastOutSlowIn })
            .onClick(async () => {
              const pid = item.id || item.productId || item.product_id;
              console.info('[DEBUG] 商品信息:', JSON.stringify(item));
              console.info('[DEBUG] 提取的 productId:', pid);
              
              if (!pid) {
                console.error('[加车失败] 商品ID为空');
                promptAction.showToast({ message: '商品信息异常' });
                return;
              }
              
              // 弹出数量选择对话框
              this.showQuantityDialog(item, pid);
            })
        }
        .justifyContent(FlexAlign.End)
      }
    }
    .width(100)
  }
  
  build() {
    // 子类页面，不需要跳转的时候使用
    NavDestination() {
      Column({ space: 12 }) {
        // 1. 顶部搜索栏（通栏卡片版）
        Row() {
          // 1.1 图标式返回（轻量、不占文字空间）
          Image($r('app.media.ic_back'))
            .fillColor(Color.Black)
            .width('10%')
            .height(30)
            .onClick(()=>{this.pageStack.pop() //返回上一页
            })
          /*          Text('搜索结果')
                      .fontSize(12)
                      .fontColor(app_color.text2)
                      .lineHeight(14)
                    Text(this.keyword)
                      .fontSize(16)
                      .fontWeight(FontWeight.Medium)
                      .fontColor(app_color.primary)
                      .maxLines(1)
                      .textOverflow({ overflow: TextOverflow.Ellipsis })*/
          //当我点击搜索的结果的时候，可以进行修改
          TextInput({
            placeholder: this.keyword
          })
            .layoutWeight(1)
            .textAlign(TextAlign.Center)// .backgroundColor('#FEC4DF')
            .onChange((value: string) => {
              this.productName = value;
            })// Text('搜索菜谱 / 食材 / 商户...')
            .fontSize(14)
            .fontColor('#9E9E9E')
          Button('搜索')
            .width('20%')
            .height(40)
            .margin({ left: 10 })
            .backgroundColor('#4CAF50')
            .fontColor('#FFFFFF')
            .onClick(() => {
              if (!this.productName?.trim()) {
                promptAction.showToast({ message: '请输入商品名称' });
                return;
              }

              // const params = new SearchParams(this.productName);
              // this.pageStack.pushPath({name:"SearchProductPage",param : this.productName })
/*              router.pushUrl({
                url: 'pages/Users/Home/SearchProductPage',
                params: { keyword: this.productName, animateCart: true }
              });*/
              this.pageStack.pushPathByName("SearchProductPage",this.productName)
            });
        }
        .width('100%')
        .justifyContent(FlexAlign.SpaceBetween)
        .border({ width: 3, radius: 4, color: Color.Green })
        .height(56)
        .padding({ left: 16, right: 16 })
        .borderRadius(24)
        .margin({ top: 24, left: 16, right: 16 }) // 与屏幕两侧留呼吸距离
        /*      // 1. 顶部标题栏
              Row() {
                Button('返回')
                  .width(60)
                  .height(36)
                  .backgroundColor(app_color.primary)
                  .fontColor(Color.White)
                  .borderRadius(18)
                  .onClick(() => router.back())

                Text(`搜索结果：${this.keyword}`)
                  .fontSize(20)
                  .fontWeight(FontWeight.Bold)
                  .fontColor(app_color.text1)
              }
              .width('100%')
              .border({width:3,color:Color.Black,radius:3})
              .justifyContent(FlexAlign.SpaceBetween)
              .padding({ top: 20, left: 16 })
              .backgroundColor(app_color.card)*/

        // 加载状态
        if (this.isLoading) {
          Text('正在加载中...')
            .fontSize(16)
            .margin({ top: 40 });
        }
        // 3. 空数据
        else if (this.productList.length === 0) {
          Column() {
            Image($r('app.media.ic_empty'))
              .width(120).height(120).opacity(0.6)
            Text('暂无相关商品')
              .fontSize(16)
              .fontColor(app_color.text2)
              .margin({ top: 12 })
          }
          .width('100%')
          .margin({ top: 60 })
        }
        // 4. 商品列表
        else {
          Scroll() {
            Stack() {
              List({ space: 12 }) {
                ForEach(this.productList, (item: ProductDataItem) => {
                  ListItem() {
                    Row() {
                      Image(item.imageUrl)
                        .width(80)
                        .height(80)
                        .borderRadius(12)
                        .shadow({
                          radius: 6,
                          color: app_color.shadow,
                          offsetX: 0,
                          offsetY: 2
                        })
                        .onClick(() => {
                          this.bigUrl = item.imageUrl;
                          this.bigShown = true
                        })

                      Column({ space: 6 }) {
                        Text(item.name)
                          .fontSize(17)
                          .fontWeight(FontWeight.Medium)
                          .fontColor(Color.Black)
                        Text(`￥${item.price} / ${item.unit}`)
                          .fontSize(15)
                          .fontColor(app_color.primary)
                          .fontWeight(FontWeight.Bold)
                        Row({ space: 6 }) {
                          if (item.isRecommend === 1) {
                            Text('🔥 推荐')
                              .fontSize(11)
                              .backgroundColor(app_color.accentLight)
                              .fontColor(Color.White)
                              .padding({
                                left: 6,
                                right: 6,
                                top: 2,
                                bottom: 2
                              })
                              .borderRadius(4)
                          }
                          if (item.isNew === 1) {
                            Text('🆕 新品')
                              .fontSize(11)
                              .backgroundColor(app_color.success)
                              .fontColor(Color.White)
                              .padding({
                                left: 6,
                                right: 6,
                                top: 2,
                                bottom: 2
                              })
                              .borderRadius(4)
                          }
                        }
                      }
                      .layoutWeight(1)
                      .margin({ left: 12 })

                      // 购物车数量控制区域
                      this.CartControlBuilder(item)

                    }
                    .width('100%').padding(12)

                  }
                  .border({ radius: 10 })
                  .backgroundColor('#FFEFD5')
                })

              }

              .width('100%')

              /* ---------------- 放大态 ---------------- */
              // if (this.showBig) {
              //   Column() {
              //     Image(this.bigUrl)
              //       .width(300)
              //       .height(300)
              //       .borderRadius(16)
              //       .shadow({ radius: 20, color: '#80000000' })
              //       .onClick(() => { // 再点一次 -> 缩小
              //         this.showBig = false
              //       })
              //   }
              //   .width('100%')
              //   .height('100%')
              //   .backgroundColor('#80000000') // 半透明遮罩
              //   .justifyContent(FlexAlign.Center)
              //   .position({ x: 0, y: 0 }) // 悬浮全屏
              //   .zIndex(999) // 保证在最上层
              //   .transition({
              //     type: TransitionType.Insert, // 出现时的动画
              //     scale: {
              //       x: 0,
              //       y: 0,
              //       centerX: 0.5,
              //       centerY: 0.5
              //     }   // 从 0 → 1
              //   })
              //   .transition({
              //     type: TransitionType.Delete, // 消失时的动画
              //     scale: {
              //       x: 0,
              //       y: 0,
              //       centerX: 0.5,
              //       centerY: 0.5
              //     }   // 从 1 → 0
              //   })
              // }

            }

          }
          .padding({ bottom: 100 })
        }
      }
      .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])

      .bindContentCover(
        $$this.bigShown, // 绑定的“开关”变量
        this.BigCoverBuilder(), // 真正的放大 UI
        {
          modalTransition: ModalTransition.ALPHA, // 淡入淡出
          backgroundColor: Color.Transparent,
          onDisappear: () => {
            this.bigUrl = ''; // 清理状态
            this.bigShown = false;

          }
        }
      )
      
      // 悬浮购物车按钮
      FloatingCartButton({ pageStack: this.pageStack })
    }
    // 隐藏搜索页面的导航栏
    .hideTitleBar(true)
    .onReady((context: NavDestinationContext)=>{
      this.pageStack= context.pathStack;
      this.keyword = context.pathInfo.param as string ?? '';
      if (this.keyword) this.fetchProductData();
    })


  }


  @Builder
  BigCoverBuilder() {
    Stack() {
      // 黑色半透明遮罩
      Column()
        .width('100%')
        .height('100%')
        .backgroundColor(Color.Black)
        .shadow({ radius: 20, color: '#40000000' })
        .onClick(() => this.bigUrl = '') // 点遮罩关闭

      // 大图：按屏幕短边自适应
      Image(this.bigUrl)
        .width(this.bigImageSize())
        .height(this.bigImageSize())
        .borderRadius(16)
        .shadow({ radius: 20, color: '#80000000' })
        .objectFit(ImageFit.Contain)
        .onClick(() => {
          this.bigUrl = '';
          this.bigShown = false
        }) // 点图本身也关闭
    }
    .width('100%')
    .height('100%')
    .alignContent(Alignment.Center)
    .animation({ duration: 250, curve: Curve.Friction })
  }

  // 辅助：手机/平板自适应大小
  private bigImageSize(): number {
    const dsp = display.getDefaultDisplaySync() as display.Display;
    const short = Math.min(px2vp(dsp.width), px2vp(dsp.height));
    return Math.min(short * 0.78, 480); // 最大 480vp
  }
}
