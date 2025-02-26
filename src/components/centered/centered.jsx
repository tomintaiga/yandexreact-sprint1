import curStyle from './centered.module.css';

const Centered = ({ children }) => (
    <div className={curStyle.top_div}>
        <div className={curStyle.child_div}>
            {children}
        </div>
    </div>
);

export const CenteredForm = ({ children }) => (
    <div className={curStyle.top_div}>
        <form className={curStyle.child_div}>
            {children}
        </form>
    </div>
);

export default Centered;