import classes from './index.css'
import React, { useEffect } from 'react';
import {
	AppBar, Tab, Tabs
} from '@material-ui/core';

import Charts from './components/Charts';
import ActionsList from './components/ActionsList'
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import axios from '../../axios';

const useStyles = makeStyles({
	tabStyle: {
		minHeight: 'unset',
		'& .MuiTabs-flexContainer': {
			height: '100%'
		}
	},
	root: {
		display: 'flex',
		justifyContent: 'start',
		flexDirection: 'column',
		height: 'calc(100vh - 50px)'
	}
});

function Data() {
	const classes = useStyles();
	const [tabValue, setTabValue] = React.useState(moment().year());
	const [dataAction, setDataAction] = React.useState([])
	const [dataList, setDataList] = React.useState([])
  const [selectedIndex, setSelectedIndex] = React.useState(-1)

	// useEffect
	useEffect(() => {
    requestDataOfYears(tabValue)
	}, [])

	// Tab
	const handleTabChanged = (event, newValue) => {
		setTabValue(newValue);
		setSelectedIndex(-1)
    requestDataOfYears(newValue)
	}

	// request
  function requestDataOfYears(year) {
    axios.get(`/data-of-years/${parseInt(year)}`).then(resp => {
      console.log(resp)
      setDataAction(resp.data.action_datas)
      setDataList(resp.data.year_datas)
    }).catch(e => {
      console.log('error')
      console.log(e)
    })
  }

	return (
		<div className={classes.root}>
			{/* Header */}
			<div
				className={`d-flex justify-content-center align-items-center`}
				style={{
					backgroundColor: "#4e4e4e",
					height: "20%",
					color: "#eee",
					boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
				}}
			>
				数据
			</div>
			<Tabs value={tabValue}
				className={classes.tabStyle}
				onChange={handleTabChanged}
				variant="scrollable"
				scrollButtons="auto"
			>
				<Tab label="2021" value={2021}/>
				<Tab label="2022" value={2022}/>
				<Tab label="2023" value={2023}/>
				<Tab label="2024" value={2024}/>
				<Tab label="2025" value={2025}/>
				<Tab label="2026" value={2026}/>
			</Tabs>

			{/* Tab Panel	 */}
			<div className={`container`} style={{
				height: '100%'
			}}>
				{/* Charts */}
				<Charts value={dataList}/>

				<ActionsList
          setDataList={(yearDataList) => setDataList(yearDataList)}
          dataAction={dataAction}
          selectedIndex={selectedIndex}
          setSelectedIndex={(index) => setSelectedIndex(index)}
        />

			</div>

		</div>
	)
}

export default Data
