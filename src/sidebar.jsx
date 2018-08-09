import React from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import styles from './styles.css';
import Images from './presentational/images';
import Recent from './presentational/recent';
import Search from './presentational/search';

const Sidebar = ({ reviews, images }) => (
  <div className={styles.sidebar}>
    <Images images={images} />
    <Recent reviews={reviews.reviews} images={images}/>
    <Search />
  </div>
);

export default Sidebar;
