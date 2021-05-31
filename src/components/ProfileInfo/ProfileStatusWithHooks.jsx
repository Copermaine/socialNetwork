import React, { useEffect, useState } from "react";

const ProfileStatusWithHooks = (props) => {

  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status); //initial value берем из props

  useEffect(() => {
      setStatus(props.status);
      //arrays dependenses
    },[props.status]);

  const activatedEditMode = () => {
    setEditMode(true)
  }

  const deactivatedEditMode = () => {
    setEditMode(false);
    props.updateUserStatus(status)
  }
  const onStatusChange = (e) => { //event, узнаем какое новое значение input
    setStatus(e.currentTarget.value);
  }
  return (
    <div>
      {!editMode &&
      <div>
        {/*span отображает глобальный state*/}
        <b>My status: </b><span onDoubleClick={activatedEditMode}>
                  {props.status || 'No status'}</span>
      </div>
      }

      {editMode &&
      <div>
        {/*onBlur срабатывает когда уходит фокус //input отображает локальный state*/}
        <input onChange={onStatusChange} autoFocus={true} onBlur={deactivatedEditMode} type="text"
               value={status}/>
      </div>
      }
    </div>
  )
}



export default ProfileStatusWithHooks;