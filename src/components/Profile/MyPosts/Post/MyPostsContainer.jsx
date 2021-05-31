import MyPosts from "../MyPosts";
import {addPostActionCreator} from "../../../../Redux/profile-reducer";
import {connect} from "react-redux";


//state = store.getState()
let mapStateToProps = (state) => {
    return {
        posts: state.profilePages.posts,
        newPostText: state.profilePages.newPostText
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText))
        },
        /*updateNewPostText: (textPost) => {
            dispatch(updateNewPostTextActionCreator(textPost))
        }*/
    }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;