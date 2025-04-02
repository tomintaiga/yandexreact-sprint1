import React from 'react';
import { useParams } from 'react-router-dom';
import { IgredientDetailsData } from '../../components/ingredient-details/ingredient-details';
import Centered from '../../components/centered/centered';
import { useGetIngredientsQuery } from '../../slices/ingredients';

const Ingredient: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetIngredientsQuery();
  if (isLoading) {
    return (
      <Centered>
        <p className="text text_type_main-large">Загрузка ингредиента...</p>
      </Centered>
    );
  }
  if (isError) {
    return (
      <Centered>
        <p className="text text_type_main-large">Ошибка загрузки ингредиента</p>
      </Centered>
    );
  }
  if (!data) {
    return (
      <Centered>
        <p className="text text_type_main-large">Ингредиент не найден</p>
      </Centered>
    );
  }
  const ingredient = data.find((item) => item._id === id);

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
