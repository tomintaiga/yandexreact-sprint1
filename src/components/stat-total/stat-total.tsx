import React from 'react';
import curStyle from './stat-total.module.css';

interface IStatTotal {
  total: number;
  title: string;
}

const StatTotal: React.FC<IStatTotal> = ({ total, title }) => {
  return (
   <div className={curStyle.top_div}>
     <div className={curStyle.stat_div_total}>
      <p className={`text text_type_main-medium ${curStyle.stat_title}`}>
        {title}
      </p>
      <p className={`text text_type_digits-large ${curStyle.stat_number}`}>
        {total}
      </p>
    </div>
    </div>
  );
};

export default StatTotal;
