import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";


const Users = ({ users, totalItemsCount, pagesSize, currentPage, onPageChanged, ...props }) => {
  return (
    <div>
      <Paginator totalItemsCount={totalItemsCount} pagesSize={pagesSize}
                 currentPage={currentPage} onPageChanged={onPageChanged}/>

      <div>
        {
          users.map((user) => {
            return (
              <User user={user} key={user.id} followingInProgress={props.followingInProgress}
                    follow={props.follow} unfollow={props.unfollow}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default Users;