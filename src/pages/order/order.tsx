import React from "react";
import SingleOrder from "../../components/single-order/single-order";
import { useLocation } from "react-router-dom";
import Centered from "../../components/centered/centered";

const Order: React.FC = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
        <Centered>
            <p className="text text_type_main-large">
                Заказ не найден
            </p>
        </Centered>
    );
  }

  return (
    <Centered>
        <SingleOrder order={order} />
    </Centered>
  );
};

export default Order;