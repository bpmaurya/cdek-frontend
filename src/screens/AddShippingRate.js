import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getCalculator, createShippingRate } from "../actions/calculatorAction";
import { LinkContainer } from "react-router-bootstrap";

function AddShippingRate({}) {
  const [zone, setZone] = useState("");
  const [region, setRegion] = useState("");
  const [rateType, setRateType] = useState("");
  const [weightType, setWeightType] = useState("");

  const [inputList, setInputList] = useState([
    {
      weight: "",
      rate: "",
    },
  ]);
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        weight: "",
        rate: "",
      },
    ]);
  };

  const dispatch = useDispatch({});

  const getCalculators = useSelector((state) => state.getCalculators);
  const { loading, error, calculator } = getCalculators;

  const shippingRate = useSelector((state) => state.shippingRate);
  const { error1, loading1, success1 } = shippingRate;

  const rate = {
    zone: zone,
    region: region,
    rate_type: rateType,
    weight_type: weightType,
    weight: "122",
    rate: "12",
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(zone);
    console.log(region);
    console.log(rateType);
    console.log(weightType);
    dispatch(createShippingRate(rate));
  };

  useEffect(() => {
    dispatch(getCalculator());
  }, [dispatch]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this rate?")) {
    }
    // console.log("delete:",id);
  };

  return (
    <div>
      <Row className="my-4">
        <Col md={12}>
          <Row>
            <Col md={4}>
              <h2>Add Rates</h2>
              {error1 && <Message variant="danger"> {error1} </Message>}
              {loading1 && <Loader />}
              <Form>
                <Form.Group>
                  <Form.Label>ZONE</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter Zone"
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Region</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Rate Type</Form.Label>
                  <Form.Control
                    as="select"
                    required
                    onChange={(e) => setRateType(e.target.value)}>
                    <option value="" disabled selected hidden>
                      Select Type...
                    </option>

                    <option value="PARCEL">PARCEL</option>
                    <option value="COURIER">COURIER</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Weight Type</Form.Label>
                  <Form.Control
                    as="select"
                    required
                    onChange={(e) => setWeightType(e.target.value)}>
                    <option value="" disabled selected hidden>
                      Select Type...
                    </option>

                    <option value="KILOGRAM"> KILOGRAM </option>
                    <option value="PASCAl">LBS</option>
                  </Form.Control>
                </Form.Group>
              </Form>

              <Row className="my-4">
                <Col md={12}>
                  <Row>
                    <Col md={4}></Col>
                    <Col md={4}>
                      <h6> weight</h6>
                    </Col>
                    <Col md={4}>
                      <h6> rate</h6>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {inputList.map((x, i) => {
                return (
                  <Row className="my-4">
                    <Col md={12}>
                      <Form>
                        <Row>
                          <Col md={4}>
                            {/* <Button href="" variant="outline-success btn-block" type="button">
                +Add New Product
              </Button> */}
                            {inputList.length !== 1 && (
                              <Button
                                className="mr10"
                                onClick={() => handleRemoveClick(i)}
                                variant="outline-danger btn-sm"
                                type="button">
                                <i class="fas fa-minus"></i>
                              </Button>
                            )}
                            {inputList.length - 1 === i && (
                              <Button
                                onClick={handleAddClick}
                                variant="outline-success btn-sm"
                                type="button">
                                {" "}
                                <i class="fas fa-plus"></i>
                              </Button>
                            )}
                          </Col>

                          <Col md={4}>
                            <Form.Group controlId="zoneCity">
                              {/* <Form.Label>Weight </Form.Label> */}
                              <Form.Control
                                type="number"
                                name="weight"
                                placeholder="Enter Weight"
                                // value={password}
                                value={x.weight}
                                onChange={(e) =>
                                  handleInputChange(e, i)
                                }></Form.Control>
                            </Form.Group>
                          </Col>

                          <Col md={4}>
                            <Form.Group controlId="zoneCity1">
                              {/* <Form.Label>Rate </Form.Label> */}
                              <Form.Control
                                type="number"
                                name="rate"
                                placeholder="Enter Rate"
                                value={x.rate}
                                onChange={(e) =>
                                  handleInputChange(e, i)
                                }></Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                );
              })}

              <Row>
                <Col md={12}>
                  <Button variant="success btn-block" onClick={submitHandler}>
                    Add Shipping Rate
                  </Button>
                </Col>
              </Row>
            </Col>

            <Col md={8}>
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

                      <th>RATE_TYPE</th>
                      <th>WEIGHT_TYPE</th>
                      <th>WEIGHT</th>
                      <th>RATE</th>
                      <th>EDIT/DELETE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calculator
                      .filter((item) => item.rate_type === "COURIER")
                      .map((item) => (
                        <tr key={item._id}>
                          <td>{item.zone}</td>
                          <td>{item.region}</td>

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
                          <th>RATE_TYPE</th>
                          <th>WEIGHT_TYPE</th>
                          <th>WEIGHT</th>
                          <th>RATE</th>
                          <th>EDIT/DELETE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {calculator
                          .filter((item) => item.rate_type === "PARCEL")
                          .map((item) => (
                            <tr key={item._id}>
                              <td>{item.zone}</td>
                              <td>{item.region}</td>

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
        </Col>
      </Row>
    </div>
  );
}

export default AddShippingRate;
