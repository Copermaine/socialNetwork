import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, withRouter } from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import FriendsContainer from "./components/Navbar/Friends/FriendsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { connect } from "react-redux";
import { compose } from "redux";
import { initializeAppThunkCreator } from "./Redux/app-reducer";
import Loader from "./components/Loader/Loader";
import { withSuspense } from "./hoc/withSusupenseComponent";
/*import DialogsContainer from "./components/Dialogs/DialogsContainer";*/
/*import UserContainer from "./components/Users/UsersContainer";*/

//lazy
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const UserContainer = React.lazy(() => import("./components/Users/UsersContainer"));

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Loader/>
    }

    return (
      <div className={'app_wripper'}>
        <HeaderContainer/>
        <Navbar/>
        <div className={'app_wripper_content'}>
          <Route path={'/profile/:userId?'}
                 render={() => <ProfileContainer/>}/> {/*? параметр опционально, может и не быть*/}
          {/*<Route path={'/dialogs'} render={() => <DialogsContainer/>}/>*/}
          <Route path={'/dialogs'} render={withSuspense(DialogsContainer)}/>
          {/* <Route path={'/users'} render={() => <UserContainer/>}/>*/}
          <Route path={'/users'} render={withSuspense(UserContainer)}/>
          <Route path={'/music'} render={() => <Music/>}/>
          <Route path={'/news'} render={() => <News/>}/>
          <Route path={'/settings'} render={() => <Settings/>}/>
          <Route path={'/friends'} render={() => <FriendsContainer/>}/>
          <Route path={'/login'} render={() => <Login/>}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ initialized: state.app.initialized })

export default compose(withRouter, connect(mapStateToProps, {
  initializeApp: initializeAppThunkCreator
}))(App);
