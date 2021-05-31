import React from 'react';
import { Field, reduxForm } from "redux-form";
import styles from "./Login.module.css";
import { Input } from "../FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { loginThunkCreator } from "../../Redux/auth-reducer";
import { Redirect } from "react-router-dom";

//validate symbols
const maxLength30 = maxLengthCreator(30);
const maxLength10 = maxLengthCreator(10);
const maxLength8 = maxLengthCreator(8);

const LoginForm = ({ captchaUrl, handleSubmit, error, ...props }) => {
  return (
    /*метод собмита, приходит в пропсах из redux-form*/
    <form onSubmit={handleSubmit} className={styles.formLogin}>

      <div className={styles.inputLoginForm}>
        {error && <div><p>{error}</p></div>}
        {/*name обязательный атрибуд*/}
        <Field component={Input} type="email" name={'email'} placeholder={'Email'} validate={[required, maxLength30]}/>
        <Field component={Input} type="password" name={'password'} placeholder={'Password'}
               validate={[required, maxLength10]}/>
        <Field component={'input'} type="checkbox" name={'rememberMe'} id='rememberMe'/>
        <label htmlFor="rememberMe">Remember me</label>
      </div>
      <div>
        {captchaUrl && <img src={captchaUrl} alt=""/>}
        {captchaUrl && <Field component={Input} type="text" name={'captcha'}
                              placeholder={'enter captches'} validate={[required, maxLength8]}/>}
      </div>
      <div className={styles.loginBtn}>
        <button type={'submit'}>Login</button>
        {/* reset метод redux-form*/}
        <button type={'button'} onClick={props.reset}>Clear form</button>
      </div>

    </form>
  )
}
//form: 'login' имя формы в state
//LoginForm, форма которую оборачиваем, наша форма
const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);


const Login = (props) => {
  //formData данные собраные из нашей формы
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
  }
  if (props.isAuth) {
    return <Redirect to={'/profile'}/>
  }
  return (
    <div>
      <h2>Please enter your email and password</h2>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
  }
}
export default connect(mapStateToProps, { login: loginThunkCreator })(Login);