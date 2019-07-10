import React from 'react';
import PropTypes from 'prop-types';
//import styles from './OrderForm.scss';

import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import pricing from '../../../data/pricing';

import {Row, Col} from 'react-flexbox-grid';

class OrderForm extends React.Component {

  static propTypes = {
    tripCost: PropTypes.node,
    options: PropTypes.object,
  }
  render(){
    const {tripCost, options, setOrderOption} = this.props;
    return (
      <Row>
        {pricing.map(pricingData => (
          <Col md={4} key={pricingData.id}>
            <OrderOption currentValue={options[pricingData.id]} setOrderOption={setOrderOption} {...pricingData} />
          </Col>
        ))}
        <Col xs={12}>
          <OrderSummary tripCost={tripCost} options={options} />
          {options.currentValue}
        </Col>
      </Row>
    );
  }
}

export default OrderForm;