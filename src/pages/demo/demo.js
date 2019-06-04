import React, {PureComponent} from 'react';
import styles from './styles.scss';
import Carousel from '../../../plib/Carousel/Carousel';
// import Carousel from '../../../lib/Carousel/Carousel';

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

