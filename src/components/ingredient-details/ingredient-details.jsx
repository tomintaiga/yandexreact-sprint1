import curStyle from './ingredient-details.module.css';
import IngredientDetailCaption from '../ingredient-detail-caption/ingredient-detail-caption';
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
    const ingredient = useSelector(state => state.ingredientDetail.ingredient);

    return (
        <div className={curStyle.ingredient_details}>
            <img src={ingredient.image_large} alt={ingredient.name} className={curStyle.ingredient_img} />
            <p className={`text text_type_main-medium ${curStyle.ingredient_name}`}>
                {ingredient.name}
            </p>
            <div className={curStyle.ingredient_details_components}>
                <IngredientDetailCaption caption="Калории, ккал" value={ingredient.calories} />
                <IngredientDetailCaption caption="Белки, г" value={ingredient.proteins} />
                <IngredientDetailCaption caption="Жиры, г" value={ingredient.fat} />
                <IngredientDetailCaption caption="Углеводы, г" value={ingredient.carbohydrates} />
            </div>
        </div>
    )
};

export default IngredientDetails;