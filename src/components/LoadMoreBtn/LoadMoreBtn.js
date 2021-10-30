import React from 'react';
import PropTypes from 'prop-types';
import s from '../LoadMoreBtn/LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div className={s.btn}>
      <button className={s.btnLoad} type="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoadMoreBtn;
