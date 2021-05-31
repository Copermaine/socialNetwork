import style from "./Friends.module.css";
import React from "react";

const Friend = (props) => {
    return (

        <div className={style.friends}>
            <div className={style.friends_block}>
                <div className={style.friend}>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq_I0JFO2DxoAV3J-sI7ajtx0qW0Q5neaY_A&usqp=CAU"
                        alt=""/>
                    <p>{props.name}</p>
                <p>{props.age}</p></div>
                <div className={style.friends_info}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam autem esse minima molestias nulla placeat quibusdam sit suscipit unde veritatis. Assumenda
                    dignissimos, doloremque illum ipsam nesciunt pariatur placeat suscipit voluptatum!
                </div>

            </div>
        </div>
    )};

export default Friend;