import curStyle from './centered.module.css';

const Centered = ({ children }) => (
    <div className={curStyle.top_div}>
        <div className={curStyle.child_div}>
            {children}
        </div>
    </div>
);

export default Centered;