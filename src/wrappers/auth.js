import { Redirect } from 'umi'
import React, { useEffect } from 'react';

function useAuth(){
    const isLogin = function(){
        return false
    }
}

export default (props) => {
  console.log('auth....')
  const isLogin = useAuth()
  if (isLogin) {
    return <div>{ props.children }</div>;
  } else {
    return <Redirect to="/login" />;
  }
}
