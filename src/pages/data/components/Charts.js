import React, { useEffect } from 'react';
import { Line } from '@ant-design/charts';

import {
	Card, CardContent
} from '@material-ui/core';

import fake_chart from '@/utils/chart_fake.js'
// capacity = 组数 × 次数 × 重量
function Charts(props) {
  console.log(props)
  const { value } = props;
  const config = {
    data: fake_chart,
    autoFit: true,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: { tickCount: 5 },
    slider: {
      start: 0.0,
      end: 0.3,
      textStyle: {
        fill: '#0fd'
      }
    },
  }
  return (
    <Card className={`mb-2 mt-2`} style={{height: '55%'}}>
      <CardContent style={{height: '100%'}}>
        <Line {...config}></Line>
      </CardContent>
    </Card>
  )

}

export default Charts;