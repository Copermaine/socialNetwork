import React from 'react';
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  requestUserProfilerThunkCreator,
  requestUserStatusThunkCreator, savePhotoThunkCreator, saveProfileThunkCreator,
  updateUserStatusThunkCreator
} from "../../Redux/profile-reducer";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import {
  getAuthorizedUserIdSelector,
  getIsAuthSelector,
  getStatusSelector,
  getUserProfileSelector
} from "../../Redux/selectors";

class ProfileContainer extends React.Component {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) { //если userId отсутствет, грузим 5893 пользователя
      userId = this.props.authorizedUserId
      if (!userId) {
        this.props.history.push('/login')
      }
    }
    this.props.getUserProfile(userId)
    this.props.requestUserStatus(userId)
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <>
        <Profile {...this.props} profile={this.props.userProfile}
                 isOwner={!this.props.match.params.userId}
                 savedPhoto={this.props.savedPhoto}
                 status={this.props.status}
                 updateUserStatus={this.props.updateUserStatus}
                 saveProfile={this.props.saveProfile}/>
      </>
    )
  }
}

let mapStateToProps = (state) => ({
  userProfile: getUserProfileSelector(state),
  status: getStatusSelector(state),
  authorizedUserId: getAuthorizedUserIdSelector(state),
  isAuth: getIsAuthSelector(state)
})


//Закидываем компоненту в НОС, на выжоде полуаем обертку над контейнерной и её подключаем к роуту
/*let AuthRedirectComponent = withAuthRedirect(ProfileContainer)*/

//withRouter оборачивает AuthRedirectComponent которая оборачивает ProfileContainer компоненту, как матрешка.
// отрисует ProfileContainer, и закинает в неё данные из URL
/*let WithUrlDataProfileContainer = withRouter( AuthRedirectComponent )*/


/*connect(mapStateToProps, { getUserProfile: requestUserProfilerThunkCreator })(WithUrlDataProfileContainer)*/

export default compose(connect(mapStateToProps, {
    getUserProfile: requestUserProfilerThunkCreator,
    requestUserStatus: requestUserStatusThunkCreator,
    updateUserStatus: updateUserStatusThunkCreator,
    savedPhoto:savePhotoThunkCreator,
    saveProfile:saveProfileThunkCreator
  }),
  withRouter, withAuthRedirect)(ProfileContainer)