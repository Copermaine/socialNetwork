import {connect} from "react-redux";
import Friends from "./Friends";


//state = store.getState()
let mapStateToProps = (state) => {
    return {
        friends: state.sidebarPage.friends
    }
};
const FriendsContainer = connect(mapStateToProps)(Friends);

export default FriendsContainer;