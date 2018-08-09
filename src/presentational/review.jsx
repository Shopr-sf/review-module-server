import React from 'react';

import styles from '../styles.css';
import SingleStars from './SingleStars';

const date = (review) => {
  const months = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };
  const dates = {
    '01': 'st',
    '02': 'nd',
    '03': 'rd',
    21: 'st',
    22: 'nd',
    23: 'rd',
    31: 'st',
  };
  let result = months[`${review.slice(5, 7)}`];
  result += ' ';
  if (review[8]) result += review[8];
  result += review[9];
  const suffix = dates[`${review.slice(8, 10)}`];
  if (suffix) {
    result += suffix;
  } else result += 'nd';
  result += `, ${review.slice(0, 4)}`;
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
        <img src={`https://s3-us-west-1.amazonaws.com/viamis-review-module-profile-pics/${urlify(review.img)}`} alt="profile"></img>
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
