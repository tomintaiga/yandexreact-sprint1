import React from 'react';
import curStyle from './burger-constructor-item.module.css';
import { TBurgerIngredient } from '../../../declarations/burger';
import { removeIngredient } from '../../services/actions/burger-constructor';
import { useDispatch } from 'react-redux';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { DRAG_CONSTRUCTOR_INGREDIENT } from '../../services/drag/contructor';
import { CONSTRUCTOR_MOVE_ITEM } from '../../services/actions/burger-constructor';

interface IBurgerConstructorItem {
  isTop: boolean;
  isBottom: boolean;
  item: TBurgerIngredient;
}

const BurgerConstructorItem: React.FC<IBurgerConstructorItem> = ({
  isTop,
  isBottom,
  item,
}) => {
  const dispatch = useDispatch();

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
      // Не будем менять элемент если бросили на себя
      if (newItem.id === item.id) {
        return;
      }

      // Не даем трогать наши булочки
      if (isTop || isBottom) {
        return;
      }

      // Отправляем ID которые надо менять местами
      dispatch({
        type: CONSTRUCTOR_MOVE_ITEM,
        payload: {
          dragId: newItem.id,
          dropId: item.id,
        },
      });
    },
  });

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.currentTarget.style.cursor = 'grab';
  };

  const handleMouseExit = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.currentTarget.style.cursor = 'arrow';
  };

  return (
    <div ref={dropRef}>
      <div
        className={`${curStyle.constructor_element} ${isDragging ? curStyle.dragging : ''}`}
        ref={isTop || isBottom ? null : dragRef}
      >
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
          <DragIcon type="primary" />
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
          handleClose={() => removeIngredient(dispatch, item)}
        />
      </div>
    </div>
  );
};

export default BurgerConstructorItem;
