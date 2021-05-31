import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Field, Form, reduxForm } from "redux-form";
import { Textarea } from "../FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validators";

const Dialogs = (props) => {

  let dialogsElements = props.dialogs.map(item => <DialogItem key={item.id} id={item.id} name={item.name}/>);
  let messagesElements = props.messages.map((item) => {
    return (
      <Message key={item.id} id={item.id} message={item.message}/>)
  });

  /* old method
  let onUpdateDialogsMessage = (event) => {
    //value textarea
    let textDialog = event.target.value;
    props.updateDialogsMessage(textDialog);
  };*/

  let addNewMessage = (value) => {
    props.addMessage(value.newDialog);
  };


  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={styles.messages}>
        {messagesElements}
      </div>
      <AddMessageReduxForm onSubmit={addNewMessage}/>
    </div>
  )
};

const maxLength300=maxLengthCreator(300)
const AddMessageForm = (props) => {
  return (
    <Form onSubmit={props.handleSubmit}>
      <Field type="text" name={'newDialog'}
             component={Textarea}
             placeholder={'Enter you message'}
             validate={[required, maxLength300]}/>
      <button type={'submit'}>Send Message</button>
    </Form>
  )
}
const AddMessageReduxForm = reduxForm({
  form: 'dialogAddMessageForm', // имя формы в state
  //AddMessageForm, форма которую оборачиваем, наша форма
})(AddMessageForm);


export default Dialogs;

