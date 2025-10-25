/**
 * 菜品商品数据模型类
 * 用于封装从 /api/products 接口返回的商品信息
 */
export default class ProductDataItem {
  public productId: number
  public name: string
  public categoryId: number
  public price: number
  public unit: string
  public imageUrl: string
  public rgbJson: string
  public status: string
  public confidence: number
  public isRecommend: number
  public isNew: number
  public recommendDate: string
  public createdAt: string
  public updatedAt: string
  public creator: number
  public updator: number
  public isDeleted: number
  public deletedAt: string | null

  /**
   * 构造函数
   * @param productId 商品ID
   * @param name 商品名称
   * @param categoryId 分类ID
   * @param price 价格
   * @param unit 单位（如斤、个）
   * @param imageUrl 商品图片URL
   * @param rgbJson RGB颜色信息（JSON字符串）
   * @param status 商品状态（on_sale / off_sale）
   * @param confidence 识别置信度
   * @param isRecommend 是否推荐（1=推荐，0=否）
   * @param isNew 是否新品（1=新品，0=否）
   * @param recommendDate 推荐日期
   * @param createdAt 创建时间
   * @param updatedAt 更新时间
   * @param creator 创建人ID
   * @param updator 更新人ID
   * @param isDeleted 是否删除标志（0=正常，1=已删除）
   * @param deletedAt 删除时间（若未删除则为null）
   */
  constructor(
    productId: number,
    name: string,
    categoryId: number,
    price: number,
    unit: string,
    imageUrl: string,
    rgbJson: string,
    status: string,
    confidence: number,
    isRecommend: number,
    isNew: number,
    recommendDate: string,
    createdAt: string,
    updatedAt: string,
    creator: number,
    updator: number,
    isDeleted: number,
    deletedAt: string | null
  ) {
    this.productId = productId
    this.name = name
    this.categoryId = categoryId
    this.price = price
    this.unit = unit
    this.imageUrl = imageUrl
    this.rgbJson = rgbJson
    this.status = status
    this.confidence = confidence
    this.isRecommend = isRecommend
    this.isNew = isNew
    this.recommendDate = recommendDate
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.creator = creator
    this.updator = updator
    this.isDeleted = isDeleted
    this.deletedAt = deletedAt
  }
}
