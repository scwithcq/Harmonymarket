// File: src/main/ets/pages/Users/Home/SearchResultPage.ets
import router from '@ohos.router';
import http from '@ohos.net.http';
import { app_color } from '../../../utils/Colors'

// 商品数据类型
export interface ProductDataItem {
  id: number;
  name: string;
  price: number;
  unit: string;
  imageUrl: string;
  isRecommend?: number;
  isNew?: number;
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
const BASE_URL = 'http://10.0.2.2:8080/api';

@Entry
@Component
export struct SearchProductPage {
  private animateCart: boolean = false
  @State keyword: string = '';
  @State productList: ProductDataItem[] = [];
  @State isLoading: boolean = true;
  @State cartVisible: Visibility = Visibility.Visible
  @State offsetX: number = 0
  @State offsetY: number = 0

  // 页面显示前获取路由参数
  aboutToAppear() {
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

  }

  // onAppear(event: () => void): CommonAttribute {
	// 	return this.startState();
	// }

  // 调用后端接口获取商品数据
  async fetchProductData() {
    this.isLoading = true;
    const httpReq = http.createHttp();
    const url = `${BASE_URL}/products?keyword=${encodeURIComponent(this.keyword)}`;

    try {
      const resp = await httpReq.request(url, { method: http.RequestMethod.GET });
      if (resp.responseCode === 200) {
        const result: ProductResultData = JSON.parse(resp.result.toString());
        if (result.success && result.data?.item) {
          this.productList = result.data.item;
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
  private startState():void {
    this.offsetX = this.offsetX === 0 ? 70 : 70
    this.offsetY === 0
  }

  build() {
    Column({ space: 12 }) {
      // 1. 顶部标题栏
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
      .padding({ top: 20, left: 16 })
      .backgroundColor(app_color.card)

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
          Column({ space: 12 }) {
            ForEach(this.productList, (item: ProductDataItem) => {
              ListItem() {
                Column() {
                  Row() {
                    Image(item.imageUrl)
                      .width(80).height(80)
                      .borderRadius(12)
                      .shadow({
                        radius: 6,
                        color: app_color.shadow,
                        offsetX: 0,
                        offsetY: 2
                      })

                    Column({ space: 6 }) {
                      Text(item.name)
                        .fontSize(17)
                        .fontWeight(FontWeight.Medium)
                        .fontColor(app_color.text1)
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

                    // 后续开发加入购物车选项

                    Row() {
                      Image($r('app.media.Shopping'))
                        .width(50)
                        .height(50)
                        .translate({ x: this.offsetX, y: this.offsetY })
                        .animation({ duration: 600, curve: Curve.EaseInOut })
                        .onClick(() => {
                            this.offsetX = this.offsetX === 0 ? 70 : 0
                            this.offsetY === 0
                        })
                    }
                    .layoutWeight(1)

                  }
                }
                .backgroundColor(app_color.card)
                .borderRadius(16)
                .shadow({
                  radius: 8,
                  color: app_color.shadow,
                  offsetX: 0,
                  offsetY: 4
                })
                .padding(16)
                .margin({
                  left: 16,
                  right: 16,
                  top: 6,
                  bottom: 6
                })
              }
              .animation({ duration: 300, curve: Curve.EaseOut })
            })
          }
        }
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor(app_color.bg)
  }
}
