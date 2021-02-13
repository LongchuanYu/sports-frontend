import React, { useEffect } from 'react';
import {
	Card, CardContent, List, ListItem
} from '@material-ui/core';

function ActionsList(props) {
	const { dataAction, setDataList } = props;
	const { selectedIndex, setSelectedIndex } = props;

	const onActionClick = (index) => {
	  const yearDataList = dataAction[index].data;
	  setSelectedIndex(index)
	  setDataList(yearDataList)
  }

	return (
		<Card style={{ height: '40%', overflow: 'auto' }}>
			<CardContent style={{
				height: '100%',
				maxHeight: '100px',

			}}>
				<List>
          {
            dataAction.map((item, index) => {
              return (
                <ListItem
                  key={index}
                  dense
                  button
                  style={index === selectedIndex ? {backgroundColor: '#565656'} : null}
                  onClick={() => onActionClick(index)}
                >
                  {item.label}
                </ListItem>
              )
            })
          }
				</List>
			</CardContent>
		</Card>
	)

}

export default ActionsList;
