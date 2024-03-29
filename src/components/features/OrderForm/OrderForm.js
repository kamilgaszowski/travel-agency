import React from 'react';
import PropTypes from 'prop-types';
//import styles from './OrderForm.scss';

import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import pricing from '../../../data/pricing';

import {Row, Col} from 'react-flexbox-grid';
import Button from '../../common/Button/Button';
import {formatPrice} from '../../../utils/formatPrice';
import {calculateTotal} from '../../../utils/calculateTotal';
import settings from '../../../data/settings';


const sendOrder = (options, tripCost, tripName, tripId, countryCode) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options, countryCode));

  const payload = {
    ...options,
    totalCost,
    tripName,
    tripId,
    countryCode,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};


class OrderForm extends React.Component {
  onSubmit = (event) => {
    event.preventDefault();
  }

  static propTypes = {
    tripCost: PropTypes.node,
    options: PropTypes.object,
  }
  render(){
    
    const {tripCost, options, setOrderOption, tripName, tripId, countryCode} = this.props;
    return (
      <form onSubmit={() => sendOrder(options, tripCost, tripName, tripId, countryCode)}>
        <Row>
          {pricing.map(pricingData => (
            <Col md={4} key={pricingData.id}>
              <OrderOption currentValue={options[pricingData.id]} setOrderOption={setOrderOption} {...pricingData}/>
            </Col>
          ))}
          <Col xs={12}>
            <OrderSummary tripCost={tripCost} options={options}/>
            {options.currentValue}
          </Col>
          <Button>Order now!</Button>
        </Row>
      </form>
      
    );
  }
}

export default OrderForm;