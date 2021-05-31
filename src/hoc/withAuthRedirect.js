import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

let mapStateToPropsForRedirect = (state) => {
  return {
    isAuth: state.auth.isAuth
  }
};

export const withAuthRedirect = (Component) => {
  class RedirectComponent extends React.Component {
    render() {
      if (!this.props.isAuth) return <Redirect to='/login'/>
      return <Component {...this.props}/>
    }
  }

//Подключаем RedirectComponent к стейту и возвращаем
  let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
  return ConnectedAuthRedirectComponent
}