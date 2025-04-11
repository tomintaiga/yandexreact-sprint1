import curStyle from './ingredient.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useDrag } from 'react-dnd';
import { DRAG_INGREDIENT } from '../../services/drag/ingredient';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TBurgerIngredient } from '../../../declarations/burger'
import Price from '../price/price';

interface IIngredient {
  ingredient: TBurgerIngredient;
}

const Ingredient: React.FC<IIngredient> = ({ ingredient }) => {
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const location = useLocation();

  const [{ isDragging }, dragRef] = useDrag({
    type: DRAG_INGREDIENT,
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Link
      key={ingredient._id}
      to={`/ingredients/${ingredient._id}`}
      state={{ background: location, id: ingredient._id, type: 'ingredient' }}
      className={curStyle.link}
      id={ingredient._id}
    >
      <div
        className={`${curStyle.ingredient} ${isDragging ? curStyle.dragging : ''}`}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        ref={dragRef}
      >
        {ingredient.count > 0 && (
          <Counter
            count={ingredient.count}
            size="default"
            extraClass={curStyle.counter}
          />
        )}
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className={curStyle.img}
        />
        <Price
          price={ingredient.price}
          isActive={isActive}
          />
        <p className={`text text_type_main-default ${isActive ? '' : 'text_color_inactive'}`}>
          {ingredient.name}
        </p>
      </div>
    </Link>
  );
};

export default Ingredient;
