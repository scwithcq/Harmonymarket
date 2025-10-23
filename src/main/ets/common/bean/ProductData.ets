/**
 * 定义用于接收后台返回的json中间层数据
 * "data": {
 "total": 6,
 "pageSize": 10,
 "totalPage": 1,
 "currPage": 1,
 "list": []
 */
import NewsDataItem from './ProductDataItem'

export default class NewsData{
  public  total: number
  public  pageSize: number
  public  totalPage: number
  public  currPage: number
  public  list: Array<NewsDataItem>

  constructor(total: number, pageSize: number, totalPage: number, currPage: number, list: Array<NewsDataItem>) {
    this.total = total
    this.pageSize = pageSize
    this.totalPage = totalPage
    this.currPage = currPage
    this.list = list
  }
}
