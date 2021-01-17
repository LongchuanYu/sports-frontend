import React, { useEffect } from 'react';
import {
	Card, CardContent
} from '@material-ui/core';

function ActionsList(props) {
	console.log(props)
	const { value } = props;
	return (
		<div>
			<Card style={{height: '260px'}}>
				<CardContent>
					123
				</CardContent>
			</Card>
		</div>
	)

}

export default ActionsList;