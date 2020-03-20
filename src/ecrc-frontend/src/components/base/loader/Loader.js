import React from "react";

import PropTypes from "prop-types";
import "./Loader.css";

export default function Loader({ page }) {
  let loaderCss = "btn-loader";
  if (page) loaderCss = "page-loader";
  return <div className={loaderCss} />;
}

Loader.propTypes = {
  page: PropTypes.bool
};

Loader.defaultProps = {
  page: false
};
