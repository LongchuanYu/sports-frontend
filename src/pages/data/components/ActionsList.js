import React, { useEffect } from 'react';
import {
	Card, CardContent, List, ListItem
} from '@material-ui/core';

function ActionsList(props) {
	console.log(props)
	const { value } = props;
	return (
		<Card style={{ height: '40%', overflow: 'auto' }}>
			<CardContent style={{
				height: '100%',
				maxHeight: '100px',
				
			}}>
				<List>
					<ListItem dense button>
						1
					</ListItem>
					<ListItem dense button>
						1
					</ListItem>
					<ListItem dense button>
						1
					</ListItem>
					<ListItem dense button>
						1
					</ListItem>
					<ListItem dense button>
						1
					</ListItem>
					<ListItem dense button>
						1
					</ListItem>
					<ListItem dense button>
						1
					</ListItem>
					<ListItem dense button>
						1
					</ListItem>
					<ListItem dense button>
						1
					</ListItem>
					<ListItem dense button>
						1
					</ListItem>
					<ListItem dense button>
						3
					</ListItem>

				</List>
			</CardContent>
		</Card>
	)

}

export default ActionsList;