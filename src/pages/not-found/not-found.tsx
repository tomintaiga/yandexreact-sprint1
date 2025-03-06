import Centered from '../../components/centered/centered';
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <Centered>
      <p className="text text_type_main-large">Такой страницы не существует</p>
    </Centered>
  );
};

export default NotFound;
