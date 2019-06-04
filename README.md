# react-s-carousel

react-s-carousel实现了轮播功能，可以水平，垂直方向轮播与滑动

![](https://github.com/1035901787/react-s-listview/blob/master/source/20180506112030.gif)

# 安装

```sh
npm install react-s-carousel or  yarn add react-s-carousel
```

# 使用

```js
import Carousel from 'react-s-carousel';

const windows = {
  width: window.innerWidth,
  height: window.innerHeight
};

export default class DemoList extends PureComponent {
  render() {
    return (
      <div>
        <div>上下滑动（item需指定高度）</div>
        <Carousel
          className={styles.hcarousel}
          horizontal={false}
          indicator={false}
          itemStyle={{height: '180px'}}
        >
          <div className={styles.demoIem} >1</div>
          <div className={styles.demoIem2} >2</div>
          <div className={styles.demoIem3} >3</div>
        </Carousel>
        <div>左右滑动（item需指定宽度）</div>
        <Carousel className={styles.hcarousel} itemStyle={{width: windows.width}}>
          <div className={styles.demoIem} >1</div>
          <div className={styles.demoIem2} >2</div>
          <div className={styles.demoIem3} >3</div>
        </Carousel>
      </div>
    );
  }
}


```

# 属性

|属性         | 值类型          | 默认值  | 描述  |
| ------------- |:-------------:| -----:| -----:|
| initItem     | number | 0 | 初始化显示item的下标 |
| horizontal      | boolean      |   true |   是否水平滑动 |
| loop      | boolean      |   true |   是否循环滚动 |
| auto      | boolean      |   true |   是否自动滚动 |
| autoplayTime      | number      |   3000 |   自动滚动间隔 |
| disable      | boolean      |   false |   是否可弹性拉动 |
| indicator | boolean      |   true |   是否显示指示器 |
| indicatorStyle | object      |   无 |   指示器容器样式 |
| indicatorCls | string      |   无 |   指示器容器样式 |
| indicatorDef | ReactNode      |   无 |   指示器默认布局 |
| indicatorActive | ReactNode      |   无 |   指示器选中布局 |
| bounce | boolean      |  false |   是否可弹性拉动 |
| itemCls | string      |   无 |   carousel item的样式 |
| itemStyle | object      |   无 |   carousel item的样式 |
| refresh | func      |   无 |   刷新carousel |
| goToPage | func      |   无 |   指定跳转到某一页 |
