import React from 'react';
import PropTypes from 'prop-types';

import Sort from '../Sort';
import Clearfix from '../../Clearfix';

import {
  isSafari,
} from "react-device-detect";


const ShelfHeader = props => {
  return (
    <div className="shelf-container-header" style={{marginRight: '50px'}}>
      <small className="products-found">
      {isSafari ? (
        <h1 style={{ fontSize: '24px' }}> <span>{props.productsLength} Product(s) found.</span> </h1> 
      ) : (
        <span>{props.productsLength} Product(s) found.</span>
      )}
      </small>
      <Clearfix />
    </div>
  );
};

ShelfHeader.propTypes = {
  productsLength: PropTypes.number.isRequired
};

export default ShelfHeader;
