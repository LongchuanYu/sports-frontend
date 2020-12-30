import {connect} from 'dva'

function StyDva(props) {
  return(
    <div>
      <div>Count: {props.sty_model}</div>
      {/* 通过dispatch来催动action, action更改state */}
      <button onClick={()=> props.dispatch({type:'sty_model/add'})}>+</button>
      <button onClick={()=> props.dispatch({type:'sty_model/minus'})}>-</button>
    </div>
  )
}
// 把组件用connect包起来, connect文档：https://www.redux.org.cn/docs/react-redux/api.html
// connect 会把 state的信息附加到props传给组件StyDva
export default connect((state )=>state)(StyDva)
