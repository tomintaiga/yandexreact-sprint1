import React from 'react';
import curStyle from './burger-constructor-item.module.css';
import { TBurgerIngredient } from '../../../declarations/burger';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { DRAG_CONSTRUCTOR_INGREDIENT } from '../../services/drag/contructor';
import { removeIngredientFromBurger } from '../../thunks/removeIngredientFromBurger';
import { useAppDispatch } from '../../app/hooks';
import { moveIngredient } from '../../slices/burger-ingredients';

interface IBurgerConstructorItem {
  isTop?: boolean;
  isBottom?: boolean;
  item: TBurgerIngredient;
}

const BurgerConstructorItem: React.FC<IBurgerConstructorItem> = ({
  isTop,
  isBottom,
  item,
}) => {
  const dispatch = useAppDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: DRAG_CONSTRUCTOR_INGREDIENT,
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: DRAG_CONSTRUCTOR_INGREDIENT,
    drop: (newItem: TBurgerIngredient) => {
      if (newItem.id === item.id) return;
      if (isTop || isBottom) return;
      dispatch(moveIngredient({ dragId: newItem.id, dropId: item.id }));
    },
  });

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.cursor = 'grab';
  };

  const handleMouseExit = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.cursor = 'arrow';
  };

  return (
    <div ref={dropRef}>
      <div
        className={`${curStyle.constructor_element} ${
          isDragging ? curStyle.dragging : ''
        }`}
        ref={isTop || isBottom ? null : dragRef}
      >
        {/* Всегда рендерим контейнер для иконки, но скрываем его для булочек */}
        <div 
          className={curStyle.drag_icon_container}
          style={{ visibility: isTop || isBottom ? 'hidden' : 'visible' }}
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseExit}
        >
          {!isTop && !isBottom && <DragIcon type="primary" />}
        </div>

        <ConstructorElement
          type={isTop ? 'top' : isBottom ? 'bottom' : undefined}
          text={
            isTop
              ? `${item.name}\n(верх)`
              : isBottom
              ? `${item.name}\n(низ)`
              : item.name
          }
          price={item.price}
          thumbnail={item.image}
          handleClose={() => dispatch(removeIngredientFromBurger(item))}
        />
      </div>
    </div>
  );
};

export default BurgerConstructorItem;