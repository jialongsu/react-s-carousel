export interface carousel {
  initItem?: number, //初始化显示item的下标，默认为0
  loop?: boolean, //是否循环滚动，默认true
  auto?: boolean, //是否自动滚动，默认true
  autoplayTime: number, //自动滚动间隔，默认3000毫秒
  indicator?: boolean, //是否显示指示器
  indicatorStyle?: object, //指示器容器样式
  indicatorCls: string, //指示器容器样式
  indicatorDef?: ReactNode, //指示器默认布局
  indicatorActive?: ReactNode, //指示器选中布局
  bounce?: boolean, //是否可弹性拉动， false
  pageScrollEnd?: (currenPageIndex: number, carousel: carousel) => void, //滑动结束回调
  itemCls?: string, //carousel item的样式
  itemStyle?: object,
  horizontal?: boolean, //是否水平滑动， 默认为true
  disable?: boolean, //是否禁用手势滑动， 默认为false

  refresh: () => void, //刷新carousel
  goToPage: (index: number) => void, //指定跳转到某一页
}