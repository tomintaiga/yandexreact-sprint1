import AppHeader from '../../components/app-header/app-header';
import curStyle from './root.module.css';
import PropTypes from 'prop-types';

const Root = ({ children }) => {
  return (
    <div className={curStyle.root_div}>
      <AppHeader />
      {children}
    </div>
  );
};

Root.propTypes = {
  children: PropTypes.node,
};

export default Root;
