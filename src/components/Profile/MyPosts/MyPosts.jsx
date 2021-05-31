import React from 'react';
import style from './MyPosts.module.css';
import Post from "./Post/Post";
import { Field, Form, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import { Textarea } from "../../FormsControls/FormsControls";

//React.memo перересовывает компонент только если изменились пропсы
const MyPosts = React.memo(props => {

  let postsElement = [...props.posts]
  .reverse()//мутирует данные, !!!работаем с копией
  .map((item) => {
    return (
      <Post key={item.id} id={item.id} message={item.message} likesCount={item.likesCount}/>)
  });


  const onAddPost = (value) => {
    props.addPost(value.newPostText);
  };
  /* let newPosElement = React.createRef();
   const onUpdateNewPostText = () => {
       let textPost = newPosElement.current.value;
       props.updateNewPostText(textPost);
   };*/

  return (
    <div>
      <div className={style.my_Posts_block}>
        {/*<textarea ref={newPosElement} value={props.newPostText} onChange={onUpdateNewPostText}/>*/}
        {/* <button onClick={onAddPost}>Add new post</button>*/}
        <MyPostsFormReduxForm onSubmit={onAddPost}/>
        <h3>my posts</h3>
      </div>
      <div>
        {postsElement}
      </div>
    </div>
  )
});
const maxLength10 = maxLengthCreator(10);
const MyPostsForm = (props) => {
  return (
    <Form onSubmit={props.handleSubmit}>
      <Field type="text" name={'newPostText'}
             component={Textarea} placeholder={'My post'}
             validate={[required, maxLength10]}/>
      <button type={'submit'}>Add new post</button>
    </Form>
  )
}
const MyPostsFormReduxForm = reduxForm({
  form: 'myPostsForm', // имя формы в state
  //AddMessageForm, форма которую оборачиваем, наша форма
})(MyPostsForm);
export default MyPosts;