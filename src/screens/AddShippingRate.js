import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col,Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getCalculator } from "../actions/calculatorAction";
import { LinkContainer } from "react-router-bootstrap";

function AddShippingRate() {
  const [zone, setZone] = useState("");
  const [region, setRegion] = useState("");
  const [zoneCity, setZoneCity] = useState("");
  const [weight, setWeight] = useState("");
  const [rate, setRate] = useState("");


  const dispatch = useDispatch({});

  const getCalculators = useSelector((state) => state.getCalculators);
  const { loading, error, calculator } = getCalculators;

  useEffect(() => {
    dispatch(getCalculator());
  }, [dispatch]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this rate?")) {
    }
    // console.log("delete:",id);
  };

  const submitHandler = () => {};

  return (
    <div>
      <Row>
        <Col md={3}>
        <h2>Add Rates</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>ZONE</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Zone"
                // value={name}
                onChange={(e) => setZone(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Region</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter region"
                // value={email}
                onChange={(e) => setRegion(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="zoneCity">
              <Form.Label>Zone City </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter zone city"
                // value={password}
                onChange={(e) => setZoneCity(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Rate Type</Form.Label>
              <Form.Control as="select">
                <option value="" disabled selected hidden>
                  Select Type...
                </option>

                <option value="PARCEL">PARCEL</option>
                <option value="COURIER">COURIER</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword1">
              <Form.Label>Weight Type</Form.Label>
              <Form.Control as="select">
                <option value="" disabled selected hidden>
                  Select Type...
                </option>

                <option value="KILOGRAM"> KILOGRAM </option>
                <option value="PASCAl">PASCAl</option>
              </Form.Control>
              
            </Form.Group>
            <Form.Group controlId="zoneCity">
              <Form.Label>Weight </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Weight"
                // value={password}
                onChange={(e) => setWeight(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="zoneCity1">
              <Form.Label>Rate </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Rate"
                // value={password}
                onChange={(e) => setRate(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              ADD
            </Button>
          </Form>
        </Col>

        <Col md={9}>
          <h2>PARCEL RATES</h2>
          {/* <Row className="align-items-center">
       
        <Col className="text-right">
          <Button
            className="my-3"
            variant="outline-success"
            href="/admin/add-shippingRate">
            <i className="fas fa-plus"> </i> Add Shipping Rates
          </Button>
        </Col>
      </Row> */}

      <Row>
        <Col md={12}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger"> {error} </Message>
          ) : (
            <Table striped border hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ZONE</th>
                  <th>REGION</th>
                  <th>ZONE_CITY</th>
                  <th>RATE_TYPE</th>
                  <th>WEIGHT_TYPE</th>
                  <th>WEIGHT</th>
                  <th>RATE</th>
                  <th>EDIT/DELETE</th>
                </tr>
              </thead>
              <tbody>
                
                {calculator
                .filter(item => item.rate_type ==="PARCEL")
                .map(item => (

                  <tr key={item._id}>
                    
                    <td>{item.zone}</td>
                    <td>{item.region}</td>
                    <td>{item.zone_city}</td>
                    <td>{item.rate_type}</td>
                    <td>{item.weight_type}</td>
                    <td>{item.weight}</td>
                    <td>{item.rate}</td>
                    <td>
                      <LinkContainer
                        to={`/admin/shippingRate/${item._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>

                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(item._id)}>
                        <i className="fas fa-trash"> </i>
                      </Button>
                    </td>
                  </tr>

                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>


      <Row>
      
        <Col md={12}>
        <h2>COURIER RATES</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger"> {error} </Message>
          ) : (
            <Table striped border hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ZONE</th>
                  <th>REGION</th>
                  <th>ZONE_CITY</th>
                  <th>RATE_TYPE</th>
                  <th>WEIGHT_TYPE</th>
                  <th>WEIGHT</th>
                  <th>RATE</th>
                  <th>EDIT/DELETE</th>
                </tr>
              </thead>
              <tbody>
                
                {calculator
                .filter(item => item.rate_type ==="COURIER")
                .map(item => (

                  <tr key={item._id}>
                    
                    <td>{item.zone}</td>
                    <td>{item.region}</td>
                    <td>{item.zone_city}</td>
                    <td>{item.rate_type}</td>
                    <td>{item.weight_type}</td>
                    <td>{item.weight}</td>
                    <td>{item.rate}</td>
                    <td>
                      <LinkContainer
                        to={`/admin/shippingRate/${item._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>

                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(item._id)}>
                        <i className="fas fa-trash"> </i>
                      </Button>
                    </td>
                
                  </tr> 
                
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
        </Col>
      </Row>
    </div>
  );
}

export default AddShippingRate;
