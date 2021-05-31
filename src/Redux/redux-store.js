import { combineReducers, createStore, applyMiddleware } from "redux";
import profileReducer from "./profile-reducer";
import dialogReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunk from 'redux-thunk';
import { reducer as formReducer } from "redux-form";
import appReducer from "./app-reducer";


let reducers = combineReducers({
  profilePages: profileReducer,
  dialogsPage: dialogReducer,
  sidebarPage: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer
});

///прими промежуточные слои
let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;
export default store;