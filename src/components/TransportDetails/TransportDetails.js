import React, {Component, PropTypes} from 'react';
import { Panel, Jumbotron } from 'react-bootstrap';


export default class TransportDetails extends Component {
  static propTypes = {
    transport: PropTypes.object
  }

  render() {
    const { transport } = this.props;
    return (
      <Jumbotron>
        <Panel>
          <h3>{transport.departurePlace.city} - {transport.arrivalPlace.city}</h3>
          <div>
            <p>Cena: {transport.price} {transport.currency.symbol}</p>
            <p>Odhod: {transport.departureTime}</p>
            <p>Število potnikov: {transport.passangersNumber} </p>
            <p>Opis vozila: {transport.vehicleDesc}</p>
            <p>Uporabljam avtocesto: {transport.highway}</p>
            <p>Ponudnik: {transport.user.name}</p>
            <p>Telefonska: {transport.user.mobile}</p>
            <p>Dodaten opis: {transport.additionalInfo}</p>
          </div>
        </Panel>
      </Jumbotron>
    );
  }
}
