import curStyle from './order-details.module.css';
import check from '../../assets/check.svg';

const OrderDetails = () => {
    return (
        <div className={curStyle.order_root}>
            <p className={`text text_type_digits-large ${curStyle.order_number}`}>034536</p>
            <p className={`text text_type_main-medium ${curStyle.order_number_caption}`}>идентификатор заказа</p>
            <img src={check} alt="done" className={curStyle.order_number_caption}/>
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className={`text text_type_main-default text_color_inactive ${curStyle.order_number_caption}`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
};

export default OrderDetails;