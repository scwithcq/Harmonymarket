import ProductDataItem from '../../../common/bean/ProductDataItem'
import { http } from '@kit.NetworkKit';
import ProductData from '../../../common/bean/ProductData'
import ProductResultData from '../../../common/bean/ProductResultData'



@Preview
@Entry
@Component
struct SearchProductPage {
  private httpReq = http.createHttp()
  @State listData: Array<ProductDataItem> = []

  aboutToAppear(): void {
    // 调用接口
    this.httpReq.request('http://localhost:8080/api/products').then((resp) => {
      //console.info("---调用后台接口返回---", JSON.stringify(resp))
      if (resp !== undefined && resp !== null) {
        if (resp.responseCode == 200) {
          //console.info("---resp.result---", resp.result)
          let productResult: ProductResultData = JSON.parse(resp.result.toString())
          //console.info("---newsData---", newsResult.code)
          if (productResult !== undefined && resp !== null) {
            let productData: ProductData = productResult.data
            this.listData = productData.list
          }
        }
      }
    }).catch((reason: object) => {
      console.info("---接口错误信息---", JSON.stringify(reason))
    })
  }

  build() {
    Column() {
      List({ space: 10 }) {
        ForEach(this.listData, (item: ProductDataItem) => {
          ListItem() {
            Text(`${item.name}`)
              .width('100%')
              .height(100)
              .fontSize(20)
              .fontColor(Color.White)
              .textAlign(TextAlign.Center)
              .borderRadius(10)
              .backgroundColor(0x007DFF)
          }
        })
      }
      // 分割线
      .divider({
        strokeWidth: 5,
        color: Color.Red,
        startMargin: 10,
        endMargin: 10
      })
      // 设置成水平方向
      // .listDirection(Axis.Horizontal)
      // 滑动事件
      .onScrollIndex((firstIndex: number, lastIndex: number) => {
        console.info('滑动起始位置索引值' + firstIndex)
        console.info('滑动结束位置索引值' + lastIndex)
      })
      .onDidScroll((scrollOffset: number, scrollState: ScrollState) => {
        console.info('滑动偏移量' + scrollOffset)
        console.info('当前滑动状态' + scrollState)
      })
      .onReachStart(() => {
        console.info('列表起始位置到达')
      })
      .onReachEnd(() => {
        console.info('列表末尾位置到达')
      })
      .onScrollStop(() => {
        console.info('列表滑动停止')
      })
    }
    .padding(12)
    .height('100%')
    .backgroundColor(0xF1F3F5)

  }
}
