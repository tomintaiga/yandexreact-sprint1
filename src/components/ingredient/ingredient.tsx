import curStyle from './ingredient.module.css';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useDrag } from 'react-dnd';
import { DRAG_INGREDIENT } from '../../services/drag/ingredient';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TBurgerIngredient } from '../../declarations/burger';

interface IIngredient {
  ingredient: TBurgerIngredient;
}

const Ingredient: React.FC<IIngredient> = ({ ingredient }) => {
  const [isActive, setIsActive] = React.useState<string>('text_color_inactive');
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
      state={{ background: location, id: ingredient._id }}
      className={curStyle.link}
      id={ingredient._id}
    >
      <div
        className={`${curStyle.ingredient} ${isDragging ? curStyle.dragging : ''}`}
        onMouseEnter={() => setIsActive('')}
        onMouseLeave={() => setIsActive('text_color_inactive')}
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
        <p
          className={`text text_type_digits-default ${isActive} ${curStyle.currency_p}`}
        >
          {ingredient.price}
          <span className={curStyle.currency_icon}>
            <CurrencyIcon type="primary" />
          </span>
        </p>
        <p className={`text text_type_main-default ${isActive}`}>
          {ingredient.name}
        </p>
      </div>
    </Link>
  );
};

export default Ingredient;
