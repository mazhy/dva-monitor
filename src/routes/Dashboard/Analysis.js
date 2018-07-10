import React, { Component } from 'react';
import { connect } from 'dva';


@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
export default class Analysis extends Component {

  render() {

    return (
      <div style={{width: '100%', position: 'relative',  height: '60%', fontSize: 40, textAlign: 'center',verticalAlign: 'middle'}}>
        <div style={{width: '100%',position: 'absolute', top: 100 }}>
          欢迎使用XXX监控平台
        </div>

      </div>
    )
  }
}
