import React, { useEffect } from 'react';
import axios from '../../axios/index.js'
import sty from './index.css'

import {
	CardContent, Card, IconButton, Drawer,
  List, ListItem, ListSubheader, Divider, Chip,
  Menu, MenuItem, InputAdornment, OutlinedInput

} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
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



export default function Training() {
  const [actionsList, setActionsList] = React.useState([])

	const [showActionsLib, setShowActionsLib] = React.useState(false)
  const [selectedActionsLibIndex, setSelectedActionsLibIndex] = React.useState([])
  const [actionsLib, setActionsLib] = React.useState([])
  const [actionsOffset, setActionOffset] = React.useState([0,0])
  const [anchorWeight, setAnchorWeight] = React.useState(null);
  const [anchorNum, setAnchorNum] = React.useState(null);
  const openWeight = Boolean(anchorWeight);
  const openNum = Boolean(anchorNum);

  const classes = useStyles();

  const url = '/api/training'

  useEffect(()=>{
    // 实现componentDidMount
    axios.get(url).then(res=>{
      setActionsList(res.data)
    })
  },[url])

  const mockWeight = [...new Array(50).keys()]
  const mockNumbers = [5, 10, 15, 20, 25, 30, 35, 40]

  // Functions

  const addRecords = (index) => {
    const newActionsList = [...actionsList]
    newActionsList[index].values.push({
      weight: 0,
      numbers: 0
    })
    setActionsList(newActionsList)
  }

  const deleteRecord = (index, value_idx) => {
    const newActionsList = [...actionsList]
    if(newActionsList[index].values.length<=1){
      return
    }
    newActionsList[index].values.splice(value_idx, 1)
    setActionsList(newActionsList)
  }

  const deleteCard = (index) => {
    const newActionsList = [...actionsList]
    newActionsList.splice(index, 1)
    setActionsList(newActionsList)
  }

	const openActionsLib = function(){
    axios.get('/api/training/actions-lib').then(res=>{
      setActionsLib(res.data)
    })
    setSelectedActionsLibIndex([])
		setShowActionsLib(true)
	}

	const closeActionsLib = function(isConfirm){
    if(isConfirm){
      // 把选择的(selectedActionsLibIndex)加入到actionsList中
      const newActionsList = [...actionsList]
      selectedActionsLibIndex.forEach(index=>{
        newActionsList.push(actionsLib[index])
      })
      setActionsList(newActionsList)
    }
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
		closeActionsLib(1)
  }

	return (
		<div className="container">
      {actionsList.map((item, index)=>{
        return (
          <Card className={`mb-3`} key={`card-${index}`}>
            <CardContent>
              <div className={sty.card_wrapper}>
                <div className={`${sty.card_header} mb-4`}>
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
                    <div className={`${sty.card_content} ${sty.card_subFontSize} mb-2`} key={`value-${value_index}`}>
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
      })}


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
            <MenuItem key={index} onClick={()=>{
              const [card_idx, value_idx] = actionsOffset
              const newActionsList = [...actionsList]
              // console.log(card_idx, value_idx)
              // console.log(newActionsList)
              // console.log(newActionsList[card_idx].values[value_idx])
              newActionsList[card_idx].values[value_idx].weight = weight
              setActionsList(newActionsList)
              setAnchorWeight(null)
            }}>
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
            <MenuItem key={index} onClick={()=>{
              const [card_idx, value_idx] = actionsOffset
              const newActionsList = [...actionsList]
              newActionsList[card_idx].values[value_idx].numbers = numbers
              setActionsList(newActionsList)
              setAnchorNum(null)
            }}>
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
									background:'#424242',
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


			<div onClick={openActionsLib} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
				Add
			</div>
		</div>
	)
}
