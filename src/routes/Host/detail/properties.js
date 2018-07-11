import * as React from 'react';
import DescriptionList from 'components/DescriptionList';
import styles from '../index.less';

const { Description } = DescriptionList;

const Properties = () => {

  return (
    <DescriptionList className={styles.headerList} size="small" col="2">
      <Description term="利用率">10%</Description>
      <Description term="基础速率">3.60GHz</Description>
      <Description term="速度">1.62GHz</Description>
      <Description term="插槽">1</Description>
      <Description term="内核">2</Description>
      <Description term="进程">203</Description>
      <Description term="线程">2920</Description>
      <Description term="句柄">97653</Description>
      <Description term="正常运行时间">1:12:20:20:12</Description>
      <Description term="逻辑处理器">4</Description>
      <Description term="虚拟化">已启用</Description>
    </DescriptionList>
  )

}



export default Properties

