import curStyle from './centered.module.css';
import PropTypes from 'prop-types';

const Centered = ({ children }) => (
    <div className={curStyle.top_div}>
        <div className={curStyle.child_div}>
            {children}
        </div>
    </div>
);

export const CenteredForm = ({ children, onSubmit = null }) => (
    <div className={curStyle.top_div}>
        <form className={curStyle.child_div} onSubmit={onSubmit}>
            {children}
        </form>
    </div>
);

Centered.propTypes = {
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func,
};

export default Centered;