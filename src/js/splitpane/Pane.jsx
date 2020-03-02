import React from 'react';
import PropTypes from 'prop-types';

const Pane = ({ children }) => <>{children}</>;

Pane.defaultProps = {
  height: "50%",
  width: "50%"
};

Pane.propTypes = {
  // initial width/height of the pane. either in % or px using
  // css units. eg: 20% or 200px
  width: PropTypes.string,
  height: PropTypes.string
};


export default Pane;