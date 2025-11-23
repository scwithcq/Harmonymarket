if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MarketPage_Params {
    selectedCategory?: string;
    TABBAR_HEIGHT?: number;
    products?: product[];
    merchants?: merchant[];
    pageStack?: NavPathStack;
}
import { FloatingCartButton } from "@normalized:N&&&entry/src/main/ets/components/FloatingCartButton&";
// 商品数据定义
export interface product {
    image: string;
    productName: string;
    unit: string; //单位
    price: number; //价钱
}
// 商家数据定义
export interface merchant {
    image: string;
    merchantName: string;
    introduction: string;
    positiveFeedbackRate: number;
}
// 静态商品数据
export const productList: product[] = [
    {
        image: 'https://picsum.photos/200/200?random=7',
        productName: '新鲜白菜',
        unit: '斤',
        price: 1.5,
    },
    {
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&h=200&fit=crop',
        productName: '新鲜胡萝卜',
        unit: '斤',
        price: 2.5
    },
    {
        image: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=200&h=200&fit=crop',
        productName: '新鲜土豆',
        unit: '斤',
        price: 3.0
    },
    {
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&h=200&fit=crop',
        productName: '新鲜西红柿',
        unit: '斤',
        price: 4.0
    },
    {
        image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=200&h=200&fit=crop',
        productName: '新鲜黄瓜',
        unit: '个',
        price: 3.5
    },
    {
        image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=200&h=200&fit=crop',
        productName: '新鲜茄子',
        unit: '斤',
        price: 2.8
    }
];
// 静态商家数据
export const merchantList: merchant[] = [
    {
        image: 'https://picsum.photos/200/160?random=1',
        merchantName: '老王蔬菜店',
        introduction: '新鲜蔬菜，每日直供，价格实惠',
        positiveFeedbackRate: 98
    }, {
        image: 'https://images.unsplash.com/photo-1506484381205-f7945653044d?w=200&h=160&fit=crop',
        merchantName: '老李果园',
        introduction: '产地直采，水果新鲜，甜度高',
        positiveFeedbackRate: 97
    },
    {
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=160&fit=crop',
        merchantName: '阿姨烘焙屋',
        introduction: '手工现烤，低糖健康，当日配送',
        positiveFeedbackRate: 99
    },
    {
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=160&fit=crop',
        merchantName: '渔夫海鲜铺',
        introduction: '凌晨码头直发，鲜活到家，冰袋保鲜',
        positiveFeedbackRate: 96
    },
    {
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784c38?w=200&h=160&fit=crop',
        merchantName: '牧场鲜奶站',
        introduction: '当日牧场冷萃，无添加，玻璃瓶可退',
        positiveFeedbackRate: 98
    },
    {
        image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=200&h=160&fit=crop',
        merchantName: '山野菌菇坊',
        introduction: '深山采摘，自然晾晒，无硫熏',
        positiveFeedbackRate: 97
    }
];
export class MarketPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__selectedCategory = new ObservedPropertySimplePU('全部', this, "selectedCategory");
        this.TABBAR_HEIGHT = 220;
        this.__products = new ObservedPropertyObjectPU(productList, this, "products");
        this.__merchants = new ObservedPropertyObjectPU(merchantList, this, "merchants");
        this.__pageStack = this.createStorageProp('globalPageStack', new NavPathStack(), "pageStack");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MarketPage_Params) {
        if (params.selectedCategory !== undefined) {
            this.selectedCategory = params.selectedCategory;
        }
        if (params.TABBAR_HEIGHT !== undefined) {
            this.TABBAR_HEIGHT = params.TABBAR_HEIGHT;
        }
        if (params.products !== undefined) {
            this.products = params.products;
        }
        if (params.merchants !== undefined) {
            this.merchants = params.merchants;
        }
    }
    updateStateVars(params: MarketPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectedCategory.purgeDependencyOnElmtId(rmElmtId);
        this.__products.purgeDependencyOnElmtId(rmElmtId);
        this.__merchants.purgeDependencyOnElmtId(rmElmtId);
        this.__pageStack.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectedCategory.aboutToBeDeleted();
        this.__products.aboutToBeDeleted();
        this.__merchants.aboutToBeDeleted();
        this.__pageStack.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __selectedCategory: ObservedPropertySimplePU<string>;
    get selectedCategory() {
        return this.__selectedCategory.get();
    }
    set selectedCategory(newValue: string) {
        this.__selectedCategory.set(newValue);
    }
    readonly TABBAR_HEIGHT: number;
    private __products: ObservedPropertyObjectPU<product[]>;
    get products() {
        return this.__products.get();
    }
    set products(newValue: product[]) {
        this.__products.set(newValue);
    }
    private __merchants: ObservedPropertyObjectPU<merchant[]>;
    get merchants() {
        return this.__merchants.get();
    }
    set merchants(newValue: merchant[]) {
        this.__merchants.set(newValue);
    }
    private __pageStack: ObservedPropertyAbstractPU<NavPathStack>;
    get pageStack() {
        return this.__pageStack.get();
    }
    set pageStack(newValue: NavPathStack) {
        this.__pageStack.set(newValue);
    }
    // 市场
    // @State selectedTab: number = 1 // 菜市场tab选中
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#FFFFFF');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部安全区域
            // Blank()
            //   .height(44)
            // 顶部导航栏
            Row.create();
            // 顶部安全区域
            // Blank()
            //   .height(44)
            // 顶部导航栏
            Row.width('100%');
            // 顶部安全区域
            // Blank()
            //   .height(44)
            // 顶部导航栏
            Row.height(50);
            // 顶部安全区域
            // Blank()
            //   .height(44)
            // 顶部导航栏
            Row.padding({ left: 16, right: 16 });
            // 顶部安全区域
            // Blank()
            //   .height(44)
            // 顶部导航栏
            Row.backgroundColor('#FFFFFF');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('菜市场导购');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777264, "type": 20000, params: [], "bundleName": "com.example.marketapp", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.fillColor('#666');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125830217, "type": 20000, params: [], "bundleName": "com.example.marketapp", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.fillColor('#666');
            Image.margin({ left: 12 });
        }, Image);
        Row.pop();
        // 顶部安全区域
        // Blank()
        //   .height(44)
        // 顶部导航栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 分隔线
            Divider.create();
            // 分隔线
            Divider.color('#E0E0E0');
            // 分隔线
            Divider.strokeWidth(1);
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 分类筛选区
            Scroll.create();
            // 分类筛选区
            Scroll.scrollable(ScrollDirection.Horizontal);
            // 分类筛选区
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding({
                left: 16,
                right: 16,
                top: 12,
                bottom: 6
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const category = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(category);
                    Text.fontSize(14);
                    Text.fontColor(this.selectedCategory === category ? '#FFFFFF' : '#333');
                    Text.backgroundColor(this.selectedCategory === category ? '#4CAF50' : '#F5F5F5');
                    Text.borderRadius(16);
                    Text.padding({
                        left: 16,
                        right: 16,
                        top: 8,
                        bottom: 8
                    });
                    Text.margin({ right: 10 });
                    Text.onClick(() => {
                        this.selectedCategory = category;
                    });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, ['全部', '蔬菜', '水果', '肉类', '海鲜', '调料', '粮油', '豆制品'], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        // 分类筛选区
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 商户推荐区
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🏪 推荐商户');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333');
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ left: 16, top: 16, bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.height(350);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        itemCreation2(elmtId, isInitialRender);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.height(100);
                            Row.backgroundColor('#FFFFFF');
                            Row.borderRadius(8);
                            Row.padding(12);
                            Row.margin({ left: 16, right: 16, bottom: 10 });
                            Row.shadow({
                                radius: 4,
                                color: '#E0E0E0',
                                offsetX: 0,
                                offsetY: 2
                            });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(item.image);
                            Image.width(100);
                            Image.height(80);
                            Image.borderRadius(8);
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.alignItems(HorizontalAlign.Start);
                            Column.margin({ left: 12 });
                            Column.layoutWeight(1);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.merchantName);
                            Text.fontSize(16);
                            Text.fontWeight(FontWeight.Bold);
                            Text.fontColor('#333');
                            Text.alignSelf(ItemAlign.Start);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.introduction);
                            Text.fontSize(12);
                            Text.fontColor('#666');
                            Text.margin({ top: 4 });
                            Text.alignSelf(ItemAlign.Start);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('好评率' + item.positiveFeedbackRate + '%');
                            Text.fontSize(12);
                            Text.fontColor('#4CAF50');
                            Text.margin({ top: 8 });
                            Text.alignSelf(ItemAlign.Start);
                        }, Text);
                        Text.pop();
                        Column.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.merchants, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        List.pop();
        // 商户推荐区
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 热门商品推荐区
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🔥 热门商品');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('查看更多 >');
            Text.fontSize(14);
            Text.fontColor('#888');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 商品网格（包裹为可滚动列表，保留原卡片样式）
            Scroll.create();
            // 商品网格（包裹为可滚动列表，保留原卡片样式）
            Scroll.padding({ bottom: this.TABBAR_HEIGHT });
            // 商品网格（包裹为可滚动列表，保留原卡片样式）
            Scroll.height(420);
            // 商品网格（包裹为可滚动列表，保留原卡片样式）
            Scroll.scrollable(ScrollDirection.Vertical);
            // 商品网格（包裹为可滚动列表，保留原卡片样式）
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceBetween });
            Flex.width('100%');
            Flex.padding({ left: 16, right: 16 });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 商品1
                    Column.create();
                    // 商品1
                    Column.width('45%');
                    // 商品1
                    Column.backgroundColor('#FFFFFF');
                    // 商品1
                    Column.borderRadius(8);
                    // 商品1
                    Column.padding(12);
                    // 商品1
                    Column.margin({ bottom: 16 });
                    // 商品1
                    Column.shadow({
                        radius: 4,
                        color: '#E0E0E0',
                        offsetX: 0,
                        offsetY: 2
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(item.image);
                    Image.width('100%');
                    Image.aspectRatio(1);
                    Image.borderRadius(8);
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.productName);
                    Text.fontSize(14);
                    Text.fontColor('#333');
                    Text.margin({ top: 8 });
                    Text.alignSelf(ItemAlign.Start);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('¥' + item.price + '/' + item.unit);
                    Text.fontSize(14);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor('#E53935');
                    Text.margin({ top: 4 });
                    Text.alignSelf(ItemAlign.Start);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel('购买');
                    Button.fontSize(12);
                    Button.fontColor('#FFFFFF');
                    Button.backgroundColor('#4CAF50');
                    Button.borderRadius(6);
                    Button.width('100%');
                    Button.height(32);
                    Button.margin({ top: 8 });
                }, Button);
                Button.pop();
                // 商品1
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.products, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        // 商品网格（包裹为可滚动列表，保留原卡片样式）
        Scroll.pop();
        // 热门商品推荐区
        Column.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 悬浮购物车按钮
                    FloatingCartButton(this, { pageStack: this.pageStack }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Users/Market/MarketPage.ets", line: 316, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            pageStack: this.pageStack
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        pageStack: this.pageStack
                    });
                }
            }, { name: "FloatingCartButton" });
        }
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
