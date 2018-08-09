import React from 'react';

// import Dashboard from './dashboard.jsx';
// import Top from './top.jsx';

import styles from '../styles.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.search}>
        <table>
          Search Component
          <button></button>
        </table>
      </div>
    );
  }
}

export default Search;
