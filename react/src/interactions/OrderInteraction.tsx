import React from "react";

import { OrderInteractionCharacteristics as OrderInteractionProps } from '@qtikit/model/src/qti2_2';

const OrderInteraction: React.FC<OrderInteractionProps | any> = props => {
  return (
    <div>
      <h3>Order Interaction</h3>
      {props.children}
    </div>
  );
};

export default OrderInteraction;
