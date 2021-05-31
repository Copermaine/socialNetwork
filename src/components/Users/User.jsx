import React from "react";
import userPhoto from "../../assets/images/user.png";
import styles from "./Users.module.css";
import { NavLink } from "react-router-dom";


const User = ({ user, followingInProgress, follow, unfollow, key, ...props }) => {
  return (
    <>
      <div className={styles.users}>
                        <span>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                               <img src={user.photos.small !== null
                                 ? user.photos.small
                                 : userPhoto} alt="photoUrl" className={styles.userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                    {
                      user.followed
                        //если в массиве будет юзер кот равен запрашиваемому, some вернет true и кнопка будет неактивна
                        ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                          unfollow(user.id)
                        }}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                          follow(user.id)
                        }}>Follow</button>
                    }
                        </div>
                        </span>
        <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                        </span>
        <span>
                        <div>{'user.location.country'}</div>
                        <div>{'user.location.city'}</div>
                        </span>
      </div>

    </>
  )
}

export default User;