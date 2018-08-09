import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles.css';
import Img from './image';

const Images = ({ images }) => {
  const imgs = [];
  images.forEach((review) => {
    if (review.length) {
      review.forEach(img => imgs.push(img));
    }
  });

  return (
    <div>
      <p className={styles.imagehead}>
      Customer images
      </p>
      <div className={styles.images}>
        {imgs.map(image => <Img image={image} /> )}
      </div>
      <span className={styles.sidebar}>
      <p className={styles.link}>
        See all customer images
      </p>
      </span>
    </div>
  );
};

// mapStateToProps = (state) => {
//   return {
//     reviews: receiveReviews(state)
//   }
// }

// export default connect(mapStateToProps)(Images);
export default Images;

// Images.propTypes = { images: PropTypes.array.isRequired };
