import React from 'react';
import style from './Header.module.css';
import {NavLink} from "react-router-dom";


const Header = (props) => {
    return (
        <header className={style.header}>
            <div>
                <img
                    src="https://s3-eu-west-1.amazonaws.com/tpd/logos/5a5da5a638378f000168feea/0x0.png"
                    alt=""/>
            </div>
            <div>
                <h1 className={style.headerName}>Ц-сеть</h1>
            </div>
            <div className={style.loginBlock}>
              {props.isAuth
                ? <div><p>{props.login}</p><button onClick={props.logout}>Log out</button></div>
                : <NavLink to={'/login'}>Login</NavLink>}

            </div>
        </header>
    )
};

export default Header;