import curStyle from './ingredient-details.module.css';
import IngredientDetailCaption from '../ingredient-detail-caption/ingredient-detail-caption';
import { useSelector } from 'react-redux';
import { TStore } from '../../../declarations/store';
import { TIngredient } from '../../../declarations/ingredient';

interface IIngredientDetails {
  ingredient: TIngredient | null;
}

export const IgredientDetailsData: React.FC<IIngredientDetails> = ({
  ingredient,
}) => {
  if (!ingredient) {
    return null;
  }
  return (
    <div className={curStyle.ingredient_details}>
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        className={curStyle.ingredient_img}
      />
      <p className={`text text_type_main-medium ${curStyle.ingredient_name}`}>
        {ingredient.name}
      </p>
      <div className={curStyle.ingredient_details_components}>
        <IngredientDetailCaption
          caption="Калории, ккал"
          value={ingredient.calories}
        />
        <IngredientDetailCaption
          caption="Белки, г"
          value={ingredient.proteins}
        />
        <IngredientDetailCaption caption="Жиры, г" value={ingredient.fat} />
        <IngredientDetailCaption
          caption="Углеводы, г"
          value={ingredient.carbohydrates}
        />
      </div>
    </div>
  );
};

const IngredientDetails: React.FC = () => {
  const ingredient = useSelector(
    (state: TStore) => state.ingredientDetail.ingredient,
  );

  return <IgredientDetailsData ingredient={ingredient} />;
};

export default IngredientDetails;
