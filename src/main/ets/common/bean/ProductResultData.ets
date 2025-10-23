/**
 * 定义用于接收后台返回的json最外层数据
 * {
 *    code: 0,
 *    data: {}
 * }
 */
import NewsData from './ProductData';

export default class NewsResultData extends Object{
  public code: number;
  public data: NewsData;

  constructor(code: number,data: NewsData) {
    super();
    this.code = code;
    this.data = data;
  }
}
