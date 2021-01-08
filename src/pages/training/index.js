import React, { useEffect } from 'react';
import axios from '../../axios/index.js'
import styles from './index.css'
import Alerts from '@/components/Alerts'
import moment from 'moment'
import {
	CardContent, Card, IconButton, Drawer,
  List, ListItem, ListSubheader, Divider, Chip,
  Menu, MenuItem, InputAdornment, OutlinedInput,
  CircularProgress
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'
import { makeStyles } from '@material-ui/core/styles';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DoneIcon from '@material-ui/icons/Done';

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
  }
});

const SET_ACTIONS_LIST = true;

export default function Training() {
  const [actionsList, setActionsList] = React.useState([])

	const [showActionsLib, setShowActionsLib] = React.useState(false)
  const [selectedActionsLibIndex, setSelectedActionsLibIndex] = React.useState([])
  const [actionsLib, setActionsLib] = React.useState([])
  const [actionsOffset, setActionOffset] = React.useState([0,0])
  const [anchorWeight, setAnchorWeight] = React.useState(null);
  const [anchorNum, setAnchorNum] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const openWeight = Boolean(anchorWeight);
  const openNum = Boolean(anchorNum);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const classes = useStyles();

  const url = '/actions'

  useEffect(()=>{
    // 实现componentDidMount
    axios.get(url, {
      params:{
        datetime: moment().format("YYYY-MM-DD")
      }
    }).then(res=>{
      if(res && res.data){
        setActionsList(res.data.mydata)
      }
    }).catch(e=>{
      const status = e?.response?.status;
      if (status === 401){
        Alerts.show('Unauthorized...')
      }else if(status === 404){
      }else {
        Alerts.show('Unknow error...')
      }
    })
  },[url])

  const mockWeight = [...new Array(200).keys()]
  const mockNumbers = [5, 10, 15, 20, 25, 30, 35, 40]

  // Functions

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

	const openActionsLib = function(){
    axios.get('/actions-lib').then(res=>{
      setActionsLib(res.data)
    }).catch(e=>[
      Alerts.show("Network error.")
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

  // Handle Menu Items
  const handleWeight = (weight) =>{
    const [card_idx, value_idx] = actionsOffset
    const newActionsList = [...actionsList]
    // console.log(card_idx, value_idx)
    // console.log(newActionsList)
    // console.log(newActionsList[card_idx].values[value_idx])
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Request
  const request_append_actions = (isSetActions, actions_list, timestamp='') => {
    const message = {
      timestamp: timestamp ? timestamp : moment().format("YYYY-MM-DD"),
      mydata: actions_list
    }
    axios.post('/actions', message).then(resp=>{
      if(isSetActions){
        setActionsList(actions_list)
      }
    }).catch(e=>{
      const status = e?.response?.status;
      if (status === 401){
        Alerts.show('Unauthorized error.')
      }else{
        Alerts.show('Save failed...')
      }
      
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



			<div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
            variant="inline"
            margin="normal"
            id="date-picker-dialog"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
      </MuiPickersUtilsProvider>

        <IconButton onClick={openActionsLib} size="medium">
          <AddBoxIcon color="primary" size="large"/>
        </IconButton>
			</div>
		</div>
	)
}
