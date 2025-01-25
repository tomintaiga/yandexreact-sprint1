import curCss from './order-details.module.css';
import check from '../../assets/check.svg';

const OrderDetails = () => {
    return (
        <div className={curCss.order_root}>
            <p className="text text_type_digits-large" style={{marginBottom: "32px"}}>034536</p>
            <p className="text text_type_main-medium" style={{marginBottom: "60px"}}>идентификатор заказа</p>
            <img src={check} alt="done" style={{marginBottom: "60px"}}/>
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive" style={{marginBottom: "60px"}}>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
};

export default OrderDetails;