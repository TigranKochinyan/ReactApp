import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({type, isAuth, component: Component, path}) => {
	return (
        <Route 
        path={path}
        render={(props)=>{
          if(isAuth && type==='public'){
            return <Redirect to='/'/>;
          }
  
          if(!isAuth && type==='private'){
            return <Redirect to='/signin'/>;
          }
  
          return <Component {...props}/>;
        }}
       />
	)
}

export default AuthRoute;