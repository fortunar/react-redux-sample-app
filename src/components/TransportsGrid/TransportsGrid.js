import React, {Component, PropTypes} from 'react';
import {Table, Tr, Td, Thead, Th} from 'reactable';


export default class TransportsGrid extends Component {
  static propTypes = {
    transports: PropTypes.array.isRequired,
    onTransportClick: PropTypes.func.isRequired
  };

  render() {
    const {transports, onTransportClick} = this.props;
    // const styles = require('./TransportsGrid.scss');
    return (
      <Table className="table"
         sortable>
        <Thead>

        <Th column="ArrivalPlace">
            <strong className="name-header">Price</strong>
        </Th>
        <Th column="DeparturePlace">
            <strong className="name-header">Price</strong>
        </Th>
        <Th column="DepartureDate">
          <strong className="name-header">Departure date</strong>
        </Th>
        <Th column="DepartureTime">
            <strong className="name-header">Departure time</strong>
        </Th>
        <Th column="Price">
          <strong className="name-header">Price</strong>
        </Th>
        <Th column="Driver">
          <strong className="name-header">Driver</strong>
        </Th>
        <Th column="Phone">
          <strong className="name-header">Phone number</strong>
        </Th>

        </Thead>
        {
          transports.map(
            (transport) =>
              <Tr onClick={() => onTransportClick(transport.idTransport)} key={transport.idTransport}>
                <Td column="ArrivalPlace">
                  {transport.arrivalPlace.city}
                </Td>
                <Td column="DeparturePlace">
                  {transport.departurePlace.city}
                </Td>
                <Td column="DepartureDate">
                  {transport.departureTime}
                </Td>
                <Td column="DepartureTime">
                  {transport.departureTime}
                </Td>
                <Td column="Price">
                  {`${transport.price} ${transport.currency.symbol}`}
                </Td>
                <Td column="Driver">
                  {transport.user.name}
                </Td>
                <Td column="Phone">
                  {transport.user.mobile}
                </Td>
              </Tr>
            )
        }
      </Table>
    );
  }
}
