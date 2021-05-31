import React from 'react';
import Friend from "./Friend";

const Friends = (props) => {
    console.log(props.bla);
    let friends_info = props.friends.map((item)=>{
        return (
            <Friend id={item.id} name={item.name} age={item.age}/>
        )
    });
    return (
        <div>{friends_info}</div>

    )
};

export default Friends;