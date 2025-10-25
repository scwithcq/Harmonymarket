/**
 * 定义用于接收后台返回的json最外层数据
 * {
 *    success:true,
 *    code: 0,
 *    message:"成功"
 *    data: {}
 * }
 */
import NewsData from './ProductData';


export default class NewsResultData extends Object{
  public success:string;
  public code: number;
  public message:string;
  public data: NewsData;

  constructor(success:string,code: number,message:string,data: NewsData) {
    super();
    this.success = success;
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
