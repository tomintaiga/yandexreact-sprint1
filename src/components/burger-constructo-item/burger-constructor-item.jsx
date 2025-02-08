import { removeIngredient } from "../../services/actions/burger-constructor";
import { useDispatch } from "react-redux";
import curStyle from './burger-constructor-item.module.css';
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import item from "../../utils/proptypes";
import { useDrag, useDrop } from "react-dnd";
import { DRAG_CONSTRUCTOR_INGREDIENT } from "../../services/drag/contructor";
import { CONSTRUCTOR_MOVE_ITEM } from "../../services/actions/burger-constructor";

const BurgerConstructorItem = ({ isTop, isBottom, item }) => {
    const dispatch = useDispatch();

    const [{ isDragging }, dragRef] = useDrag({
        type: DRAG_CONSTRUCTOR_INGREDIENT,
        item: item,
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const [, dropRef] = useDrop({
        accept: DRAG_CONSTRUCTOR_INGREDIENT,
        drop: (newItem) => {
            // Не будем менять элемент если бросили на себя
            if(newItem._id === item._id) {
                return;
            }

            // Не даем трогать наши булочки
            if( isTop || isBottom ) {
                return;
            }

            // Отправляем ID которые надо менять местами
            dispatch({ type: CONSTRUCTOR_MOVE_ITEM, payload: {
                dragId: newItem._id,
                dropId: item._id
            }});
        }
    });

    const handleMouseEnter = (event) => {
        event.currentTarget.style.cursor = 'grab';
    };

    const handleMouseExit = (event) => {
        event.currentTarget.style.cursor = 'arrow';
    };


    return (
        <div ref={dropRef}>
            <div className={`${curStyle.constructor_element} ${isDragging ? curStyle.dragging : ""}`} ref={isTop || isBottom ? null : dragRef}> 
                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit} >
                    <DragIcon type="primary" />
                </div>
                <ConstructorElement
                    type={isTop ? "top" : isBottom ? "bottom" : ""}
                    text={isTop ? `${item.name}\n(верх)` : isBottom ? `${item.name}\n(низ)` : item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={() => removeIngredient(dispatch, item)}
                />
            </div>
        </div>
    )
};

BurgerConstructorItem.propTypes = {
    isTop: PropTypes.bool,
    isBottom: PropTypes.bool,
    item: PropTypes.shape(item).isRequired
};

export default BurgerConstructorItem;