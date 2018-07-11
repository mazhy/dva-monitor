import { Chart, Tooltip, Axis, Area, Line } from 'viser-react';
import * as React from 'react';

const scale = [{
  dataKey: 'value',
  min: 0,
}, {
  dataKey: 'percentage',
  min: 0,
  max: 60,
}];


export default class Cpu extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
       data : [
        { percentage: '0',  value: 0 },
        { percentage: '3',  value: 0 },
        { percentage: '6',  value: 0 },
        { percentage: '9',  value: 0 },
        { percentage: '12', value: 0 },
        { percentage: '15', value: 0 },
        { percentage: '18', value: 0 },
        { percentage: '21', value: 0 },
        { percentage: '24', value: 0 },
        { percentage: '27', value: 0 },
        { percentage: '30', value: 0 },
        { percentage: '33', value: 0 },
        { percentage: '36', value: 0 },
        { percentage: '39', value: 0 },
        { percentage: '42', value: 0 },
        { percentage: '45', value: 0 },
        { percentage: '48', value: 0 },
        { percentage: '51', value: 0 },
        { percentage: '54', value: 0 },
        { percentage: '57', value: 0 },
      ],
    }
  }



  /**
   * 更新图表数组
   */
  componentDidMount() {
    const dataList = [
      { percentage: '0',  value: 20 },
      { percentage: '3',  value: 34 },
      { percentage: '6',  value: 54 },
      { percentage: '9',  value: 23 },
      { percentage: '12', value: 87 },
      { percentage: '15', value: 100 },
      { percentage: '18', value: 23 },
      { percentage: '21', value: 54 },
      { percentage: '24', value: 76 },
      { percentage: '27', value: 12 },
      { percentage: '30', value: 98 },
      { percentage: '33', value: 23 },
      { percentage: '36', value: 34 },
      { percentage: '39', value: 65 },
      { percentage: '42', value: 12 },
      { percentage: '45', value: 32 },
      { percentage: '48', value: 100 },
      { percentage: '51', value: 43 },
      { percentage: '54', value: 54 },
      { percentage: '57', value: 76 },
    ]
    const { data } = this.state
    this.timer = setInterval(() => {
      if(dataList.length > 0) {
        const first = dataList.shift()
        data.shift()
        data.push(first)

      }else {
        const first = data.shift()
        data.push(first)
      }
      console.log(data)
      this.setState({
        data,
      })
    },3000)
  }

  /**
   * 当组件卸载时清除定时器
   */
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const crosshairs = {
      type: 'y',
      style: {},
    };

    const { data } = this.state
    return (
      <Chart forceFit height={400} data={data} scale={scale}>
        <Tooltip crosshairs={crosshairs} />
        <Axis dataKey="value" />
        <Line position="percentage*value" size={2} />
        <Area position="percentage*value" />
      </Chart>
    );
  }
}
