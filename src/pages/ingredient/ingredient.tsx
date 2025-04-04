import React from 'react';
import { useParams } from 'react-router-dom';
import { IgredientDetailsData } from '../../components/ingredient-details/ingredient-details';
import Centered from '../../components/centered/centered';
import { useAppSelector } from '../../app/hooks';

const Ingredient: React.FC = () => {
  const { id } = useParams();
  const ingredient = useAppSelector((state) =>
    state.ingredients.ingredients.find((item) => item._id === id),
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
