import { useParams } from 'react-router-dom';
import { IgredientDetailsData } from '../../components/ingredient-details/ingredient-details';
import Centered from '../../components/centered/centered';
import { useSelector } from 'react-redux';

const Ingredient = () => {
  const { id } = useParams();
  const ingredient = useSelector((state) =>
    state.ingredient.ingredients.find((item) => item._id === id),
  );

  if (!ingredient) {
    return (
      <Centered>
        <p className="text text_type_main-large">Ингредиент не найден</p>
      </Centered>
    );
  }

  return (
    <Centered>
      <IgredientDetailsData ingredient={ingredient} />
    </Centered>
  );
};

export default Ingredient;
