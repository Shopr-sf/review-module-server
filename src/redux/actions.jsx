import fetch from 'cross-fetch';

const selectProduct = (product) => {
  return {
    type: 'SELECT_PRODUCT',
    product,
  };
};

// const refreshProduct = (productId) => {
//   return {
//     type: 'REFRESH_PRODUCT',
//     productId
//   }
// };

const requestAggregates = (product) => {
  return {
    type: 'REQUEST_AGGREGATES',
    product,
  };
};

const requestReviews = (product) => {
  return {
    type: 'REQUEST_REVIEWS',
    product,
  };
};

const receiveAggregates = (aggregates) => {
  return {
    type: 'RECEIVE_AGGREGATES',
    aggregates,
    // receivedAt: Date.now(),
  };
};

const receiveReviews = (reviews) => {
  return {
    type: 'RECEIVE_REVIEWS',
    reviews,
  };
};

const fetchAggregates = product => (dispatch) => {
  dispatch(requestAggregates(product));
  fetch(`reviews/${product}`)
    .then((data, err) => {
      if (err) console.log('An error occurred.', err);
      return data.json();
    }).then(json => dispatch(receiveReviews(json)));
};

const fetchReviews = product => (dispatch) => {
  dispatch(requestReviews(product));
  fetch(`reviews/summary/${product}`)
    .then((data, err) => {
      if (err) console.log('An error occurred.', err);
      return data.json();
    }).then(json => dispatch(receiveAggregates(json[0])));
};

const widgetModal = () => {
  return {
    type: 'WIDGET_MODAL',
  };
};

const infoModal = () => {
  return {
    type: 'INFO_MODAL',
  };
};

const photoModal = () => {
  return {
    type: 'PHOTO_MODAL',
  };
};

const galleryModal = () => {
  return {
    type: 'GALLERY_MODAL',
  };
};


// const Filters = {
//   SHOW_ALL: 'SHOW_ALL',
//   TOP_RATED: 'TOP_RATED',
//   MOST_RECENT: 'MOST_RECENT',
//   ALL_REVIEWERS: 'ALL_REVIEWERS',
//   VERIFIED_ONLY: 'VERIFIED_ONLY',
//   FIVE_STAR: 'FIVE_STAR',
//   FOUR_STAR: 'FOUR_STAR',
//   THREE_STAR: 'THREE_STAR',
//   TWO_STAR: 'TWO_STAR',
//   ONE_STAR: 'ONE_STAR',
//   POSITIVE: 'POSITIVE',
//   CRITICAL: 'CRITICAL',
//   REQUIRE_IMAGE: 'REQUIRE_IMAGE',
// };

// const filter = filter => ({
//   type: 'SET_FILTER',
//   filter,
// });

// const search = query => ({
//   type: 'SET_QUERY',
//   query,
// });

// const mapStateToProps = state => ({
//   product: selectProduct(state.product),
//   aggregates: receiveAggregates(state.aggregates),
//   reviews: receiveReviews(state.reviews),
// });

export {
  // refreshProduct,
  selectProduct,
  requestAggregates,
  receiveAggregates,
  fetchAggregates,
  requestReviews,
  receiveReviews,
  fetchReviews,
  widgetModal,
  // mapStateToProps,
  // Filters,
  // filter,
  // search,
};
