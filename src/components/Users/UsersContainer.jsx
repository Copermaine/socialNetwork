import React from "react";
import {connect} from "react-redux";
import {
    followThunkCreator, getUsersThunkCreator, setCurrentPageThunkCreator,
    toggleIsFollowingProgress,
    unfollowThunkCreator
} from "../../Redux/users-reducer";
import Users from "./Users";
import Loader from "../Loader/Loader";

class UserContainer extends React.Component {
    componentDidMount() {
      const {currentPage, pagesSize} = this.props;
        this.props.getUsers(currentPage, pagesSize);
    }

    //запрос за новой страницей
    //request for new page
    onPageChanged = (pageNumber) => {
      const {pagesSize} = this.props;
        this.props.setCurrentPage(pageNumber, pagesSize)
    }

    render() {
        return (
            <>
                {
                    this.props.isFetching ? <Loader/> : null
                }
                <Users onPageChanged={this.onPageChanged}
                       currentPage={this.props.currentPage}
                       pagesSize={this.props.pagesSize}
                       totalItemsCount={this.props.totalUsersCount}
                       users={this.props.users}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                       toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                       followingInProgress={this.props.followingInProgress}/>
            </>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pagesSize: state.usersPage.pagesSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}
/*const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {dispatch(followAC(userId))},
        unfollow: (userId) => {dispatch(unFollowAC(userId))},
        setUsers: (users) => {dispatch(setUsersAC(users))},
        setUsersCount: (totalUsersCount) => {dispatch(setUsersCountAC(totalUsersCount))},
        setCurrentPage: (pageNumber) => {dispatch(setCurrentPageAC(pageNumber))},
        одно и то же
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching))
        }
    }
}*/
//mapDispatchToProps заменяем на обьекты, ключами которого будут выступать имя callback-а, значениями
//имена АС, так как имя ключа и имя АС === оставляем только 1 имя. follow: follow
//Параметры connect закинет сам и задиспатчит.
export default connect(mapStateToProps,
    {
        toggleIsFollowingProgress,
        getUsers: getUsersThunkCreator,
        setCurrentPage: setCurrentPageThunkCreator,
        follow: followThunkCreator,
        unfollow: unfollowThunkCreator
    })(UserContainer);
