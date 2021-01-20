import React, { useEffect } from 'react';
import axios from '../../axios/index.js'
import styles from './index.css'
import moment from 'moment'
import Alerts from '@/components/Alerts'
import {
	CardContent, Card, IconButton, Drawer,
  List, ListItem, ListSubheader, Divider, Chip,
  Menu, MenuItem, InputAdornment, OutlinedInput,
  CircularProgress, Dialog, Badge
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers'


import { makeStyles } from '@material-ui/core/styles';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DoneIcon from '@material-ui/icons/Done';
import DateRangeIcon from '@material-ui/icons/DateRange';

const useStyles = makeStyles({
  inputStyle: {
    width: '5.5rem',
    paddingLeft: '5px',
    paddingRight: '5px',
    '& div p': {
      fontSize: '0.75rem'
    },
    '& input': {
      padding: '10px 0',
      fontSize: '0.75rem'
    }
  },
  calendarStyle: {
    '& .MuiBadge-badge': {
      backgroundColor: '#eeeeee',
      top: '30px',
      right: '20px',
      height: '1px'
    }
  }
});

const SET_ACTIONS_LIST = true;

export default function Training() {
  // Actions
  const [actionsList, setActionsList] = React.useState([])

  // Actions lib
	const [showActionsLib, setShowActionsLib] = React.useState(false)
  const [selectedActionsLibIndex, setSelectedActionsLibIndex] = React.useState([])
  const [actionsLib, setActionsLib] = React.useState([])
  const [actionsOffset, setActionOffset] = React.useState([0,0]) // action(card) - item

  // Card
  const [anchorWeight, setAnchorWeight] = React.useState(null);
  const [anchorNum, setAnchorNum] = React.useState(null);
  const openWeight = Boolean(anchorWeight);
  const openNum = Boolean(anchorNum);
  
  // Date Picker
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(moment().format("YYYY-MM-DD"));
  const [daysHaveActions, setDaysHaveActions] = React.useState([])

  const classes = useStyles();

  const url = '/actions'

  useEffect(()=>{
    // 实现componentDidMount
    request_card_contents(selectedDate)
  },[url])

  const mockWeight = [...new Array(200).keys()]
  const mockNumbers = [5, 10, 15, 20, 25, 30, 35, 40]

  // Functions

  // Card
  const addRecords = (index) => {
    const newActionsList = [...actionsList]
    newActionsList[index].values.push({
      weight: 0,
      numbers: 0
    })
    request_append_actions(SET_ACTIONS_LIST, newActionsList);
  }

  const deleteRecord = (index, value_idx) => {
    const newActionsList = [...actionsList]
    if(newActionsList[index].values.length<=1){
      return
    }
    newActionsList[index].values.splice(value_idx, 1)
    request_append_actions(SET_ACTIONS_LIST, newActionsList);
  }

  const deleteCard = (index) => {
    const newActionsList = [...actionsList]
    newActionsList.splice(index, 1)
    request_append_actions(SET_ACTIONS_LIST, newActionsList);
  }

  const handleWeight = (weight) =>{
    const [card_idx, value_idx] = actionsOffset
    const newActionsList = [...actionsList]
    newActionsList[card_idx].values[value_idx].weight = weight
    request_append_actions(SET_ACTIONS_LIST, newActionsList);
    setAnchorWeight(null)
  }

  const handleNum = (numbers) =>{
    const [card_idx, value_idx] = actionsOffset
    const newActionsList = [...actionsList]
    newActionsList[card_idx].values[value_idx].numbers = numbers
    request_append_actions(SET_ACTIONS_LIST, newActionsList);
    setAnchorNum(null)
  }

  // Actions Lib
	const openActionsLib = function(){
    axios.get('/actions-lib').then(res=>{
      setActionsLib(res.data)
    }).catch(e=>[
      Alerts.show("网络错误")
    ])
    setSelectedActionsLibIndex([])
		setShowActionsLib(true)
	}

	const closeActionsLib = function(isConfirm){
		setShowActionsLib(false)
	}

	const selectActions = (index) => {
    const currentIndex = selectedActionsLibIndex.indexOf(index)
		const newSelectedAction = [...selectedActionsLibIndex]
		if(currentIndex === -1) {
			newSelectedAction.push(index)
		}else{
			newSelectedAction.splice(currentIndex, 1)
		}
		setSelectedActionsLibIndex(newSelectedAction)
	}

	const confirmActions = () => {
    if (!selectedActionsLibIndex.length){
      closeActionsLib(1)
      return;
    }
    const newActionsList = [...actionsList]

    selectedActionsLibIndex.forEach(index=>{
      newActionsList.push(actionsLib[index])
    })
    request_append_actions(SET_ACTIONS_LIST, newActionsList)
		closeActionsLib(1)
  }

  // Handle date picker
  const closeDatePicker = () => {
    setOpenDatePicker(false)
  }

  const handleDateChange = (date) => {
    const date_fr = moment(date).format("YYYY-MM-DD")
    setSelectedDate(date_fr);
    setOpenDatePicker(false);
    request_card_contents(date_fr)
  };

  const handleRenderDay = (day, selectedDate_, isInCurrentMonth, dayComponent) => {
    // daysHaveActions
    const formatted_day = parseInt(moment(day).format('D'))
    if(isInCurrentMonth && daysHaveActions.includes(formatted_day)){
      return <Badge variant="dot" className={classes.calendarStyle}>{dayComponent}</Badge>;
    }
    return dayComponent
    
  }

  const handelMonthChange = (date) => {
    const month = moment(String(date)).format("M")
    request_days_have_actions(month)
  }

  // Request
  const request_append_actions = (isSetActions, actions_list, timestamp='') => {
    const message = {
      timestamp: moment(selectedDate).format("YYYY-MM-DD"),
      mydata: actions_list
    }
    axios.post('/actions', message).then(resp=>{
      if(isSetActions){
        setActionsList(actions_list)
      }
    }).catch(e=>{
      const status = e?.response?.status;
      if (status === 401){
        Alerts.show('请登录')
      }else{
        Alerts.show('保存失败')
      }
      
    })
  }

  const request_card_contents = (date) => {
    axios.get(url, {
      params:{
        datetime: date
      }
    }).then(res=>{
      if(res && res.data){
        console.log(res)
        setActionsList(res.data.mydata)
      }
    }).catch(e=>{
      const status = e?.response?.status;
      if (status === 401){
        Alerts.show('请登录...')
      }else if(status === 404){
        setActionsList([])
      }else {
        Alerts.show('未知错误', 1500)
      }
    })
  }

  const request_days_have_actions = (month) => {
    const path = `/days-have-actions?date_month=${month}`
    axios.get(path).then(resp => {
      console.log(resp)
      const days_list = resp.data;
      setDaysHaveActions(days_list)
      
    })
  }

	return (
		<div className="container">
      {actionsList && actionsList.length ? actionsList.map((item, index)=>{
        return (
          <Card className={`mb-3`} key={`card-${index}`}>
            <CardContent>
              <div className={styles.card_wrapper}>
                <div className={`${styles.card_header} mb-3`}>
                  <div className={`font-weight-bold`}>{item.label}</div>

                  <IconButton style={{marginLeft: 'auto'}} onClick={()=>deleteCard(index)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                  <IconButton size='small' onClick={()=>addRecords(index)}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </div>

                {/* Record list */}
                {item.values.map((value, value_index)=>{
                  return (
                    <div className={`${styles.card_content} ${styles.card_subFontSize} mb-2`} key={`value-${value_index}`}>
                      <div className={'mr-3'}>
                        <OutlinedInput
                          readOnly
                          size="small"
                          value={value.weight}
                          onClick={(event)=>{
                            setAnchorWeight(event.currentTarget)
                            setActionOffset([index, value_index])
                          }}
                          className={classes.inputStyle}
                          startAdornment={ <InputAdornment position="start">重量</InputAdornment>}
                          endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                        >
                        </OutlinedInput>
                      </div>

                      <div className={'mr-3'}>
                        <OutlinedInput
                          readOnly
                          size="small"
                          value={value.numbers}
                          onClick={(event)=>{
                            setAnchorNum(event.currentTarget)
                            setActionOffset([index, value_index])
                          }}
                          className={classes.inputStyle}
                          startAdornment={ <InputAdornment position="start">数量</InputAdornment>}
                        >
                          </OutlinedInput>
                      </div>

                      <IconButton style={{marginLeft: 'auto'}} size='small' onClick={()=>deleteRecord(index, value_index)}>
                        <DeleteOutlineIcon fontSize='small'/>
                      </IconButton>
                    </div>
                  )
                })}
              </div>  {/* End Content */}
            </CardContent>
          </Card>
        )
      }) : ''}


      {/* Menu Weight */}
      <Menu
        anchorEl={anchorWeight}
        keepMounted
        open={openWeight}
        transitionDuration={0}
        onClose={()=>setAnchorWeight(null)}
        PaperProps={{
          style: {
            maxHeight: '200px',
            width: '10ch'
          }
        }}
      >
        {mockWeight.map((weight, index)=>{
          return(
            <MenuItem key={index} onClick={()=>{handleWeight(weight)}}>
              {weight}
            </MenuItem>
          )
        })}
      </Menu>

      {/* Menu Number */}
      <Menu
        anchorEl={anchorNum}
        keepMounted
        open={openNum}
        transitionDuration={0}
        onClose={()=>setAnchorNum(null)}
        PaperProps={{
          style: {
            maxHeight: '200px',
            width: '10ch'
          }
        }}
      >
        {mockNumbers.map((numbers, index)=>{
          return(
            <MenuItem key={index} onClick={()=>handleNum(numbers)}>
              {numbers}
            </MenuItem>
          )
        })}
      </Menu>

			<Drawer anchor="bottom" open={showActionsLib} onClose={()=>closeActionsLib(0)}>
				<div>
					<List style={{minHeight: '200px'}}>
						<li>
							<ul style={{padding:0}}>
								<ListSubheader style={{
									background: 'inherited',
									display:'flex', justifyContent: 'space-between', alignItems: 'center'
								}}>
                  <Chip label={selectedActionsLibIndex.length} />
									<IconButton onClick={()=>confirmActions()}>
										<DoneIcon fontSize='small'/>
									</IconButton>
								</ListSubheader>
								<Divider />
								{actionsLib.map((item, index)=>[
									<ListItem
									key={index}
									dense
                  button
                  style={selectedActionsLibIndex.indexOf(index)!==-1?{backgroundColor:'cadetblue'}:null}
									onClick={()=>selectActions(index)}>
										{item.label}
									</ListItem>
								])}
							</ul>
						</li>
					</List>
				</div>
			</Drawer>

      {/* Date picker */}
      <Dialog onClose={closeDatePicker} aria-labelledby="simple-dialog-title" open={openDatePicker}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            variant="static"
            margin="normal"
            id="date-picker-dialog"
            format="MM/dd/yyyy"
            value={selectedDate}
            onMonthChange={handelMonthChange}
            onChange={handleDateChange}
            renderDay={handleRenderDay}
          />
        </MuiPickersUtilsProvider>
      </Dialog>

			<div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <IconButton onClick={()=>{
          const month = moment(selectedDate).format('M')
          request_days_have_actions(month)
          setOpenDatePicker(true)
        }} size="medium">
          <DateRangeIcon color="primary" size="large"/>
        </IconButton>
        <IconButton onClick={openActionsLib} size="medium">
          <AddBoxIcon color="primary" size="large"/>
        </IconButton>
			</div>
		</div>
	)
}
