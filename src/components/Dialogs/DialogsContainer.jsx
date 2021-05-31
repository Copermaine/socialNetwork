import { addMessageActionCreator} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";


let mapStateToProps = (state) => {
  return {
    newDialog: state.dialogsPage.newDialog,
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages
  }
};
let mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (newDialog) => {
      dispatch(addMessageActionCreator(newDialog))
    },
    /*updateDialogsMessage: (textDialog) => {
      dispatch(updateNewMessageActionCreator(textDialog))
    }*/
  }
};


//Закидываем компоненту в НОС, на выжоде полуаем обертку над компонентой и её подключаем коннектом
/*let AuthRedirectComponent = withAuthRedirect(Dialogs)*/
/*let AuthRedirectComponent = (props) => {
  if (!props.isAuth) return <Redirect to={'/login'}/>
  return (
    //{...props} деструктуризация, все пропсы перекидывем в контейнерную компоненту
    <Dialogs {...props}/>
  )
};*/



//первый параметр снизу вверх или справа налево функции обработчики
//второй параметр целевой обьект, кот обрабатывается на конвеёере, в данном случае Dialogs
const DialogsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs)
export default DialogsContainer;

