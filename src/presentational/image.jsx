import React from 'react';

import styles from '../styles.css';

const urlify = file => file.replace(' ', '+');

const Img = ({ image }) => {
  return (
    <div className={styles.image}>
      <img src={`https://s3.amazonaws.com/viamis-review-module-product-pics/${urlify(image.url)}`} alt={image.title}></img>
    </div>
  );
};

export default Img;
