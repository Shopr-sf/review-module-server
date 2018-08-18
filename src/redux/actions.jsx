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

// const fetchAggregates = product => (dispatch) => {
//   dispatch(requestAggregates(product));
//   fetch(`reviews/${product}`)
//     .then((data, err) => {
//       if (err) console.log('An error occurred.', err);
//       return data.json();
//     }).then(json => {
//       return dispatch(receiveReviews(json))
//     });
// };

const fetchAggregates = product => (dispatch) => {
  dispatch(requestAggregates(product));
  fetch(`reviews/all/${product}`)
    .then((data, err) => {
      if (err) console.log('An error occurred.', err);
      return data.json();
    }).then(json => {
      console.log('fetch aggregate', json);
      

      let output = {
        images: [[{url: "images (18) copy.jpeg"}, {url: "images (18) copy.jpeg"}, {url: "images (18) copy.jpeg"}]],
        // reviews: [
        //   {img: "images (11).jpeg", date: "2018-08-13T05:06:34.000Z", product_id: 29, rating: 5, review: "Lorem ipsum dolor ", title: "KFC", username: "polaroid", verified: true},
        //   {img: "images (11).jpeg", date: "2018-08-13T05:06:34.000Z", product_id: 29, rating: 5, review: "Lorem ipsum dolor ", title: "Burger King", username: "polaroid", verified: true},
        //   {img: "images (11).jpeg", date: "2018-08-13T05:06:34.000Z", product_id: 29, rating: 5, review: "Lorem ipsum dolor ", title: "McDonald", username: "polaroid", verified: false}
        // ]
        reviews: json
      }
      // json = [{id: 21, five: 5, four: 4, three: 3, two: 2, one: 1, qty: 15, score: 2.8, product_id: 21}];
      // console.log('fetch aggregate', json);
      return dispatch(receiveReviews(output))
    });
};

const fetchReviews = product => (dispatch) => {
  dispatch(requestReviews(product));
  fetch(`reviews/all/${product}`)
    .then((data, err) => {
      if (err) console.log('An error occurred.', err);
      return data.json();
    }).then(json => {
      return dispatch(receiveAggregates(json[0]))
    });
};

// const fetchAll = product => (dispatch) => {
//   dispatch()
// }

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
