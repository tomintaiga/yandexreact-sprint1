import curCss from './ingredient-details.module.css';
import IngredientDetailCaption from '../ingredient-detail-caption/ingredient-detail-caption';
import PropTypes from 'prop-types';
import item from "../../utils/proptypes";


const IngredientDetails = ({ ingredient }) => {
    return (
        <div className={curCss.ingredient_details}>
            <img src={ingredient.image_large} alt={ingredient.name} className={curCss.ingredient_img} />
            <p className="text text_type_main-medium" style={{ marginTop: "16px", maxWidth: "520px" }}>
                {ingredient.name}
            </p>
            <div className={curCss.ingredient_details_components}>
                <IngredientDetailCaption caption="Калории, ккал" value={ingredient.calories} />
                <IngredientDetailCaption caption="Белки, г" value={ingredient.proteins} />
                <IngredientDetailCaption caption="Жиры, г" value={ingredient.fat} />
                <IngredientDetailCaption caption="Углеводы, г" value={ingredient.carbohydrates} />
            </div>
        </div>
    )
};

IngredientDetails.propTypes = {
    ingredient: PropTypes.shape(item).isRequired
};

export default IngredientDetails;