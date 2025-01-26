import React from "react";
import btnStyle from "./btn-icon.module.css";
import PropTypes from "prop-types";

const BntIcon = ({ IconComponent, text, onClick }) => {
    const [isActive, setIsActive] = React.useState("secondary");

    return (
        <div onClick={onClick}
            onMouseEnter={() => setIsActive("primary")}
            onMouseLeave={() => setIsActive("secondary")}
            className={btnStyle.btn_div} >
            <IconComponent type={isActive} className={btnStyle.btn_icon} />
            <p className={"text text_type_main-default " + btnStyle.btn_caption}>{text}</p>
        </div>
    );
}

BntIcon.propTypes = {
    IconComponent: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func // Не является обязательным на текущем этапе проекта
};

export default BntIcon;