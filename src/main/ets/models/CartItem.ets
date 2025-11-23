// File: src/main/ets/models/CartItem.ets

/**
 * 购物车商品项接口
 */
export interface CartItem {
  cartId: number;          // 购物车项ID
  userId?: number;         // 用户ID（可选）
  productId: number;       // 商品ID
  productName: string;     // 商品名称
  imageUrl: string;        // 商品图片URL（后端返回字段名）
  productImage?: string;   // 兼容旧字段名
  price: number;           // 单价
  quantity: number;        // 数量
  unit: string;            // 单位（如：斤、个）
  selected: boolean;       // 是否选中（前端状态）
  stock?: number;          // 库存（可选）
  subtotal?: number;       // 小计（后端返回）
  status?: string;         // 商品状态（后端返回）
  createTime?: string;     // 加入购物车时间
}

/**
 * 购物车数据对象（后端返回的 data 字段内容）
 */
export interface CartData {
  items: CartItem[];
}

/**
 * 购物车列表响应接口
 */
export interface CartResponse {
  success: boolean;
  data: CartData;  // 注意：后端返回的是 {items: []} 结构
  code: number;
  message: string;
}

/**
 * 添加商品到购物车请求接口
 */
export interface AddCartRequest {
  userId: number;
  productId: number;
  quantity: number;
}

/**
 * 更新购物车数量请求接口
 */
export interface UpdateQuantityRequest {
  quantity: number;
}

/**
 * 批量删除请求接口
 */
export interface BatchDeleteRequest {
  cartIds: number[];
}

/**
 * 通用API响应接口
 */
export interface ApiResponse {
  success: boolean;
  data?: Object;
  code: number;
  message: string;
}
