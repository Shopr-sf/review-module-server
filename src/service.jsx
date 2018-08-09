import React from 'react';

import styles from './styles.css';
import Main from './main';
import Sidebar from './sidebar';

import {
  selectProduct,
  fetchAggregates,
  fetchReviews,
} from './redux/actions';

class Service extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      aggregates: {
        score: null,
        qty: null,
      },
      reviews: [],
      images: [],
      // query: '',
    };
    this.props.store.subscribe(() => {
      this.setState({
        product: this.props.store.getState().product,
        aggregates: this.props.store.getState().aggregates,
        reviews: this.props.store.getState().reviews.reviews,
        images: this.props.store.getState().reviews.images,
      });
    });
  }

  componentDidMount() {
    if (this.props.match.params.productId !== this.state.product) {
      this.props.store.dispatch(selectProduct(this.props.match.params.productId));
      this.props.store.dispatch(fetchAggregates(this.props.match.params.productId));
      this.props.store.dispatch(fetchReviews(this.props.match.params.productId));
    }
  }

  render() {
    return (
      <div>
        <a id="reviews" href={`*/#reviews`}></a>
        <hr className={styles.divider}></hr>
        <div className={styles.service}>
          <Main aggregates={this.state.aggregates} reviews={this.state.reviews} images={this.state.images} />
          <Sidebar reviews={this.state.reviews} images={this.state.images} />
        </div>
      </div>
    );
  }
}

export default Service;

/* TODO: add components for alt URLS <Route exact={true} path="/:productId?" component={CustomerReviews}/>
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; */
