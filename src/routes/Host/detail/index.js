/**
 * @desc 主机详情页
 * @author mazy
 * date 2018/7/9
 */

import React from 'react'
// import PropTypes from 'prop-types'
import { Form, Tabs, Card, Row, Col} from 'antd'
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../index.less';
import CPU from './cpu'

const { Description } = DescriptionList;


const Detail = () => {

  const extra = (
    <Row>
      <Col xs={24} sm={12}>
        <div className={styles.textSecondary}>状态</div>
        <div className={styles.heading}>运行中</div>
      </Col>
      {/*<Col xs={24} sm={12}>*/}
        {/*<div className={styles.textSecondary}>订单金额</div>*/}
        {/*<div className={styles.heading}>¥ 568.08</div>*/}
      {/*</Col>*/}
    </Row>
  );



  const description = (
    <DescriptionList className={styles.headerList} size="small" col="2">
      <Description term="用途">部署项目</Description>
      <Description term="运行时间">3000小时</Description>
      <Description term="创建时间">2018-07-07</Description>
      {/*<Description term="关联单据">*/}
        {/*<a href="">12421</a>*/}
      {/*</Description>*/}
      {/*<Description term="生效日期">2017-07-07 ~ 2017-08-08</Description>*/}
      {/*<Description term="备注">请于两个工作日内确认</Description>*/}
    </DescriptionList>
  );

  // onOperationTabChange = key => {
  //   this.setState({ operationkey: key });
  // };

  return (
    <PageHeaderLayout
      title="主机详情"
      logo={
        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
      }
      content={description}
      extraContent={extra}

    >
      <Card bordered={false}>
        <div className={styles.tableList}>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <Tabs.TabPane tab="CPU" key="1">
              <CPU />
            </Tabs.TabPane>
            <Tabs.TabPane tab="内存" key="2">Content of Tab Pane 2</Tabs.TabPane>
            <Tabs.TabPane tab="磁盘" key="3">Content of Tab Pane 3</Tabs.TabPane>
          </Tabs>
        </div>
      </Card>
    </PageHeaderLayout>
)

  function callback(key) {
    console.log(key);
  }

}


Detail.propTypes = {
  // form: PropTypes.object.isRequired,
}

export default Form.create()(Detail)
