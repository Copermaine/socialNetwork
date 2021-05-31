import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input, Textarea } from "../FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validators";


const maxLength15 = maxLengthCreator(15);
const maxLength150 = maxLengthCreator(150);
const maxLength30 = maxLengthCreator(30);

const ProfileDataForm = ({ userProfile, ...props }) => {

  return (
    <form onSubmit={props.handleSubmit}>
        {props.error && <div><p>{props.error}</p></div>}


      <button type={'submit'}>Save</button>

      <b>My name: </b><Field component={Input} type="text" name={'fullName'}
                             placeholder={'Name'} validate={[required, maxLength15]}/>
      <b>About me: </b><Field component={Textarea} type="text" name={'aboutMe'}
                              placeholder={'About Me'} validate={[maxLength150]}/>

      <b>Looking for a job: </b><Field component={Input} type="checkbox" name={'lookingForAJob'}/>

      <b>My professional skills: </b><Field component={Textarea} type="text" name={'lookingForAJobDescription'}
                                            placeholder={'My skills'} validate={[maxLength150]}/>
      <div>
        <p>Contacts: </p>{Object.keys(userProfile.contacts).map((key) => {
        return <div>
          <b>{key}</b><Field key={key} component={Input} type="text" name={'contacts.' + key}
                             placeholder={key} validate={[maxLength30]}/>
        </div>
      })}
      </div>
      {/* <b>My contacts: </b><Field component={Input} type="text" name={'contacts'}
             placeholder={'My contacts'} validate={[required, maxLength20]}/>*/}
    </form>
  )
}
export const ProfileDataReduxForm = reduxForm({ form: 'ProfileData' })(ProfileDataForm);
