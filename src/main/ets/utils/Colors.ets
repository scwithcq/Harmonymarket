interface GeneratedObjectLiteralInterface_1 {
  /* 主色 – 蔬菜嫩绿 */
  primary: string;
  primaryLight: string;

  /* 辅助色 – 瓜果暖橙 */
  accent: string;
  accentLight: string;

  /* 功能色 – 仅用 10% 面积 */
  success: string;
  warning: string;
  error: string;

  /* 中性色 – 背景 + 文字 */
  bg: string;
  card: string;
  divider: string;
  text1: string;
  text2: string;
  text3: string;

  /* 阴影 – 用 primary 系而非纯黑 */
  shadow: string;
}

export const app_color: GeneratedObjectLiteralInterface_1 = {
  /* 主色 – 蔬菜嫩绿 */
  primary: '#27AE60',           // 顶部栏 / 主按钮
  primaryLight: '#2ECC40',      // 价格 / 选中态

  /* 辅助色 – 瓜果暖橙 */
  accent: '#F39C12',            // 促销角标 / 换一批按钮
  accentLight: '#F1C40F',       // icon 高亮

  /* 功能色 – 仅用 10% 面积 */
  success: '#2ECC71',
  warning: '#E67E22',
  error: '#E74C3C',

  /* 中性色 – 背景 + 文字 */
  bg: '#F8F9FA',                // 页面底色
  card: '#FFFFFF',              // 卡片
  divider: '#E9ECEF',           // 分割线
  text1: '#212529',             // 主标题
  text2: '#6C757D',             // 副标题
  text3: '#ADB5BD',             // 时间 / 次要信息

  /* 阴影 – 用 primary 系而非纯黑 */
  shadow: 'rgba(39, 174, 96, 0.12)'  // 0.12 透明度 = 干净不脏
};