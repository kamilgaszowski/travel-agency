import React from 'react';
import PropTypes from 'prop-types';
//import styles from './OrderForm.scss';

import OrderSummary from '../OrderSummary/OrderSummary';

import {Row, Col} from 'react-flexbox-grid';

class OrderForm extends React.Component {

  static propTypes = {
    tripCost: PropTypes.node,
    options: PropTypes.object,
  }
  render(){
    const {tripCost, options} = this.props;
    return (
      <Row>
        <Col xs={12}>
          <OrderSummary tripCost={tripCost} options={options}/>      
        </Col>
      </Row>
    );
  }
}

export default OrderForm;