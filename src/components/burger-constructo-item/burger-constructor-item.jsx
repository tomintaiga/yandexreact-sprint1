import { removeIngredient } from "../../services/actions/burger-constructor";
import { useDispatch } from "react-redux";
import curStyles from './burger-constructor-item.module.css';
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import item from "../../utils/proptypes";


const BurgerConstructorItem = ({isTop, isBottom, item}) => {
    const dispatch = useDispatch();

    const handleMouseEnter = (event) => {
        event.currentTarget.style.cursor = 'grab';
    };

    const handleMouseExit = (event) => {
        event.currentTarget.style.cursor = 'arrow';
    };


    return (
        <div className={curStyles.constructor_element}>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
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
    )
};

BurgerConstructorItem.propTypes = {
    isTop: PropTypes.bool,
    isBottom: PropTypes.bool,
    item: PropTypes.shape(item).isRequired
};

export default BurgerConstructorItem;