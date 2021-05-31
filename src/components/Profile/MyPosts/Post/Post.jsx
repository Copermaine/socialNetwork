import React from 'react';
import styles from './Post.module.css';

const Post = (props) => {
    return (
        <div className={styles.main_post}>
            <div className={styles.img_container}>
                <img src="https://www.meme-arsenal.com/memes/6bfb577982d175cc84af331de00c6baf.jpg" alt=""/>
            </div>
            <div className={styles.post}>
                <p> {props.message} </p>
                <span>Like {props.likesCount}</span>
            </div>

        </div>
    )
};

export default Post;