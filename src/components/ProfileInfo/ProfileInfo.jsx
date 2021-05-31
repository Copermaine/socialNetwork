import React, { useState } from 'react';
import style from './ProfileInfo.module.css'
import Loader from "../Loader/Loader";
import userPhoto from "../../assets/images/user.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import { ProfileDataReduxForm } from "./ProfileDataForm";


const ProfileInfo = ({ userProfile, status, updateUserStatus, isOwner, savedPhoto, saveProfile }) => {
  const [editMode, setEditMode] = useState(false);

  if (!userProfile) {
    return <Loader/>
  }
  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savedPhoto(e.target.files[0])
    }
  };

  const onSubmit = (formData) => {
    saveProfile(formData)
    .then(() => {
      setEditMode(false);
    })
  }
  return (

    <div>
      <div className={style.descriptionBlock}>
        <img src={userProfile.photos.large || userPhoto} alt="User_photo" className={style.profileUserPhoto}/>
        {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}

        <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>

        {editMode
          ? <ProfileDataReduxForm initialValues={userProfile} onSubmit={onSubmit} userProfile={userProfile}/>
          : <ProfileData userProfile={userProfile} isOwner={isOwner} goToEditMode={() => {
            setEditMode(true)
          }}/>
        }

      </div>

    </div>
  )
};

const ProfileData = ({ userProfile, isOwner, goToEditMode }) => {

  return (
    <div>
      {isOwner &&
      <div>
        <button onClick={goToEditMode}>Edit</button>
      </div>
      }
      <p>My name is: <b>{userProfile.fullName}</b></p>
      <p>About me: <b>{userProfile.aboutMe}</b></p>
      <p>Looking for a job: <b>{userProfile.lookingForAJob ? 'Yes' : 'No'}</b></p>

      {
        userProfile.lookingForAJob &&
        <div>
          <p>My professional skills: <b>{userProfile.lookingForAJobDescription}</b></p>
        </div>
      }
      <div><p>Contacts: </p>{Object.keys(userProfile.contacts).map((key) => {
        return <Contacts key={key} contactTitle={key} contactValue={userProfile.contacts[key]}/>
      })}</div>

    </div>
  )
};


const Contacts = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <p>{contactTitle}: <b>{contactValue}</b></p>
    </div>
  )
}

export default ProfileInfo;