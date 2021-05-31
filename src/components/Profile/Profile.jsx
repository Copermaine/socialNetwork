import ProfileInfo from "../ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/Post/MyPostsContainer";




const Profile = (props) => {

    return (
        <div>
            <ProfileInfo userProfile={props.userProfile} status={props.status}
                         updateUserStatus={props.updateUserStatus}
                         isOwner={props.isOwner} savedPhoto={props.savedPhoto}
                         saveProfile={props.saveProfile}/>
            <MyPostsContainer />
        </div>

    )
};

export default Profile;