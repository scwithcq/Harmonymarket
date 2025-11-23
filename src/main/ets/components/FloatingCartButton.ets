// File: src/main/ets/components/FloatingCartButton.ets
import { CartService } from '../services/CartService';

/**
 * 全局悬浮购物车按钮组件
 * 固定在屏幕右下角，显示购物车商品数量角标
 */
@Component
export struct FloatingCartButton {
  @State cartCount: number = 0;
  @Prop @Watch('onPageStackChange') pageStack?: NavPathStack; // 从父组件传入,可选
  private currentUserId: number = 1; // TODO: 从登录状态获取
  private timer: number = -1;
  
  // 监听 pageStack 变化
  onPageStackChange() {
    console.info('[FloatingCartButton] pageStack 已更新');
  }

  aboutToAppear() {
    // 初始加载购物车数量
    this.loadCartCount();
    
    // 每5秒自动刷新购物车数量
    this.timer = setInterval(() => {
      this.loadCartCount();
    }, 5000);
  }

  aboutToDisappear() {
    // 清理定时器
    if (this.timer !== -1) {
      clearInterval(this.timer);
    }
  }

  /**
   * 加载购物车商品数量
   */
  async loadCartCount() {
    const cartList = await CartService.getCartList(this.currentUserId);
    // 按 productId 去重统计商品种类数
    const uniqueProductIds = new Set<number>();
    cartList.forEach(item => {
      uniqueProductIds.add(item.productId);
    });
    this.cartCount = uniqueProductIds.size;
    console.info(`[FloatingCartButton] 购物车商品种类数: ${this.cartCount}`);
  }

  /**
   * 点击购物车图标
   */
  onCartClick() {
    console.info('[FloatingCartButton] 点击购物车，当前商品数:', this.cartCount);
    
    // 刷新购物车数量
    this.loadCartCount();
    
    // 直接从 AppStorage 获取最新的 pageStack
    const pageStack = AppStorage.get<NavPathStack>('globalPageStack');
    if (pageStack) {
      console.info('[FloatingCartButton] 成功获取 pageStack，准备跳转');
      pageStack.pushPathByName('CartPage', null);
    } else {
      console.error('[FloatingCartButton] AppStorage 中未找到 globalPageStack');
    }
  }

  /**
   * 手动刷新购物车数量（供外部调用）
   */
  refresh() {
    this.loadCartCount();
  }

  build() {
    Stack() {
      // 购物车图标
      Image($r('app.media.Shopping'))
        .width(60)
        .height(60)
        .borderRadius(30)
        .backgroundColor('#FF6B35')
        .padding(10)
        .shadow({
          radius: 12,
          color: '#40000000',
          offsetX: 0,
          offsetY: 4
        })

      // 商品数量角标
      if (this.cartCount > 0) {
        Text(this.cartCount > 99 ? '99+' : this.cartCount.toString())
          .fontSize(12)
          .fontColor(Color.White)
          .fontWeight(FontWeight.Bold)
          .backgroundColor('#FF3B30')
          .borderRadius(10)
          .padding({ left: 6, right: 6, top: 2, bottom: 2 })
          .position({ x: '65%', y: '5%' })
          .zIndex(1)
      }
    }
    .width(60)
    .height(60)
    .position({ x: '85%', y: '85%' })
    .zIndex(999)
    .onClick(() => this.onCartClick())
  }
}
