import React from 'react';

import styles from '../styles.css';
import SingleStars from './SingleStars';

const date = (review) => {
  review = review.replace(/\s/g, '');
  console.log('ReViEw: ', review);

  review = review.split('-');
  let result = review[1].concat(' ', review[2], ', ', review[0]);
  console.log(result);
  return result;
};

const verified = (review) => {
  return review.verified ? 'Verified' : '';
};

const helpful = (review) => {
  const votes = review.helpful - review.not_helpful;
  return votes > 0 ? `${votes} found this helpful` : '';
};

const urlify = file => file.replace(' ', '+');

const Review = ({review}) => (
  <div className={styles.review}>
    <div className={styles.user}>
      <div className={styles.avatar}>
        <img src={`https://s3-us-west-1.amazonaws.com/errbnb/${review.img}`} alt="profile"></img>
      </div>
      <span className={styles.username}>
        {review.username}
      </span>
    </div>
    <SingleStars rating={review.rating} />
    {review.title}{/*Bold header*/}<br></br>


    {date(review.date)}<br></br>
    {verified(review)}<br></br>
    {review.review}<br></br>
    {helpful(review)}<br></br>
    {/*Helpful button*/}
    {/*Not Helpful button*/}
    {/*Comment button*/}
    {/*Report abuse button*/}
  </div>
);

export default Review;
