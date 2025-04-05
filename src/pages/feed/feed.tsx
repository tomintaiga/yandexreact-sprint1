import React from 'react';
import curStyle from './feed.module.css';
import OrderList from '../../components/order-list/order-list';

const Feed: React.FC = () => {
  return (
    <div className={curStyle.root_div}>
      <div className={curStyle.title_div}>
        <p className={`text text_type_main-large ${curStyle.title}`}>Лента заказов</p>
      </div>
      <div className={curStyle.info_div}>
        <OrderList />
      </div>
    </div>
  );
};

export default Feed;
