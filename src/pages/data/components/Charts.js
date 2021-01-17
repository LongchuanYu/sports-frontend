import React, { useEffect } from 'react';
import {
	Card, CardContent
} from '@material-ui/core';

function Charts(props) {
  console.log(props)
  const { value } = props;
  return (
    <Card className={`mb-3 mt-3`} style={{height: '300px'}}>
      <CardContent>
        123
      </CardContent>
    </Card>
  )

}

export default Charts;