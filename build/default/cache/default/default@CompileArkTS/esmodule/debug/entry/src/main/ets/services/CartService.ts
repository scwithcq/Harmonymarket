import http from "@ohos:net.http";
import type { CartItem, CartResponse, AddCartRequest, UpdateQuantityRequest, BatchDeleteRequest, ApiResponse } from '../models/CartItem';
// 模拟器访问宿主机地址
// const BASE_URL = 'http://10.0.2.2:8080/api';  // 模拟机测试
const BASE_URL = 'http://192.168.85.10:8080/api'; // 连接热点测试
// const BASE_URL = 'http://s49b7b66.natappfree.cc/api'; // 公网测试
/**
 * 购物车服务类 - 封装所有购物车相关的API调用
 */
export class CartService {
    /**
     * 添加商品到购物车
     * @param request 包含 userId, productId, quantity
     * @returns 是否添加成功
     */
    static async addToCart(request: AddCartRequest): Promise<boolean> {
        const httpReq = http.createHttp();
        try {
            console.info('[CartService] 添加到购物车:', JSON.stringify(request));
            const resp = await httpReq.request(`${BASE_URL}/cart/add`, {
                method: http.RequestMethod.POST,
                header: { 'Content-Type': 'application/json' },
                extraData: JSON.stringify(request)
            });
            console.info(`[CartService] 响应状态码: ${resp.responseCode}`);
            if (resp.responseCode === 200) {
                const result: ApiResponse = JSON.parse(resp.result.toString());
                console.info('[CartService] 添加结果:', JSON.stringify(result));
                return result.success;
            }
            return false;
        }
        catch (err) {
            console.error('[CartService] 加入购物车失败:', JSON.stringify(err));
            return false;
        }
        finally {
            httpReq.destroy();
        }
    }
    /**
     * 获取用户购物车列表
     * @param userId 用户ID
     * @returns 购物车商品列表
     */
    static async getCartList(userId: number): Promise<CartItem[]> {
        const httpReq = http.createHttp();
        try {
            const url = `${BASE_URL}/cart/${userId}`;
            console.info(`[CartService] 获取购物车列表, userId: ${userId}`);
            console.info(`[CartService] 请求URL: ${url}`);
            const resp = await httpReq.request(url, {
                method: http.RequestMethod.GET
            });
            console.info(`[CartService] 响应状态码: ${resp.responseCode}`);
            console.info(`[CartService] 响应内容: ${resp.result.toString().substring(0, 500)}`);
            if (resp.responseCode === 200) {
                const result: CartResponse = JSON.parse(resp.result.toString());
                console.info(`[CartService] success: ${result.success}, data存在: ${!!result.data}`);
                console.info(`[CartService] items数量: ${result.data?.items?.length || 0}`);
                if (result.success && result.data && result.data.items) {
                    // 为每个商品添加 selected 状态（默认不选中）和兼容字段
                    return result.data.items.map(item => {
                        return {
                            cartId: item.cartId,
                            userId: item.userId,
                            productId: item.productId,
                            productName: item.productName,
                            productImage: item.imageUrl || item.productImage || '',
                            imageUrl: item.imageUrl,
                            price: item.price,
                            quantity: item.quantity,
                            unit: item.unit,
                            selected: false,
                            stock: item.stock || 999,
                            subtotal: item.subtotal,
                            status: item.status,
                            createTime: item.createTime
                        } as CartItem;
                    });
                }
                else {
                    console.warn('[CartService] 数据格式不正确或success为false');
                }
            }
            return [];
        }
        catch (err) {
            console.error('[CartService] 获取购物车失败:', JSON.stringify(err));
            return [];
        }
        finally {
            httpReq.destroy();
        }
    }
    /**
     * 更新购物车商品数量
     * @param cartId 购物车项ID
     * @param quantity 新数量
     * @returns 是否更新成功
     */
    static async updateQuantity(cartId: number, quantity: number): Promise<boolean> {
        const httpReq = http.createHttp();
        try {
            console.info(`[CartService] 更新数量, cartId: ${cartId}, quantity: ${quantity}`);
            const resp = await httpReq.request(`${BASE_URL}/cart/${cartId}`, {
                method: http.RequestMethod.PUT,
                header: { 'Content-Type': 'application/json' },
                extraData: JSON.stringify({ quantity } as UpdateQuantityRequest)
            });
            const success = resp.responseCode === 200;
            console.info(`[CartService] 更新数量结果: ${success}`);
            return success;
        }
        catch (err) {
            console.error('[CartService] 更新数量失败:', JSON.stringify(err));
            return false;
        }
        finally {
            httpReq.destroy();
        }
    }
    /**
     * 删除单个购物车项
     * @param cartId 购物车项ID
     * @returns 是否删除成功
     */
    static async deleteCartItem(cartId: number): Promise<boolean> {
        const httpReq = http.createHttp();
        try {
            console.info(`[CartService] 删除购物车项, cartId: ${cartId}`);
            const resp = await httpReq.request(`${BASE_URL}/cart/${cartId}`, {
                method: http.RequestMethod.DELETE
            });
            const success = resp.responseCode === 200;
            console.info(`[CartService] 删除结果: ${success}`);
            return success;
        }
        catch (err) {
            console.error('[CartService] 删除失败:', JSON.stringify(err));
            return false;
        }
        finally {
            httpReq.destroy();
        }
    }
    /**
     * 批量删除购物车项
     * @param cartIds 购物车项ID数组
     * @returns 是否删除成功
     */
    static async batchDelete(cartIds: number[]): Promise<boolean> {
        const httpReq = http.createHttp();
        try {
            console.info(`[CartService] 批量删除, cartIds: ${JSON.stringify(cartIds)}`);
            const resp = await httpReq.request(`${BASE_URL}/cart/batch`, {
                method: http.RequestMethod.DELETE,
                header: { 'Content-Type': 'application/json' },
                extraData: JSON.stringify({ cartIds } as BatchDeleteRequest)
            });
            const success = resp.responseCode === 200;
            console.info(`[CartService] 批量删除结果: ${success}`);
            return success;
        }
        catch (err) {
            console.error('[CartService] 批量删除失败:', JSON.stringify(err));
            return false;
        }
        finally {
            httpReq.destroy();
        }
    }
    /**
     * 清空用户购物车
     * @param userId 用户ID
     * @returns 是否清空成功
     */
    static async clearCart(userId: number): Promise<boolean> {
        const httpReq = http.createHttp();
        try {
            console.info(`[CartService] 清空购物车, userId: ${userId}`);
            const resp = await httpReq.request(`${BASE_URL}/cart/user/${userId}`, {
                method: http.RequestMethod.DELETE
            });
            const success = resp.responseCode === 200;
            console.info(`[CartService] 清空购物车结果: ${success}`);
            return success;
        }
        catch (err) {
            console.error('[CartService] 清空购物车失败:', JSON.stringify(err));
            return false;
        }
        finally {
            httpReq.destroy();
        }
    }
}
