import curCss from './ingredient-detail-caption.module.css';

const IngredientDetailCaption = ({ caption, value }) => {
    return (
        <div className={curCss.ingredient_root}>
            <p className="text text_type_main-small text_color_inactive">{caption}</p>
            <p className="text text_type_digits-default text_color_inactive">{value}</p>
        </div>
    );
};

export default IngredientDetailCaption;