import React, { useState, useEffect } from "react";
import { Row, Col, Table, Form, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPackage } from "../actions/createPackageAction";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PACKAGE_UPDATE_RESET } from "../constants/incomingPackageConstant";
import {
  listIncomingPackageDetails,
  listIncomingPackage,
  updatePackage,
} from "../actions/incomimgPackageActions";
import { createOutgoing } from "../actions/outgoingPackageAction";
import { getUserAddress } from "../actions/addressAction";

function CreateOutgoingPackage({ match, location, history }) {
  const [packageName, setPackageName] = useState("");
  const [outgoingPackageName, setOutgoingPackageName] = useState("");
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [address, setAddress] = useState('')

  const [product, setProduct] = useState([]);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [comment, setComment] = useState("");
  const [ready, setReady] = useState("");
  const [selectProduct, setSelectProduct] = useState([]);
  const [inputList, setInputList] = useState([
    {
      name: "",
      quantity: "",
    },
  ]);

  const dispatch = useDispatch();
  const outgoingCreate = useSelector((state) => state.outgoingCreate);
  const {
    error: errorCreate,
    loading: loadingCreate,
    success,
  } = outgoingCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const incomingPackageList = useSelector((state) => state.incomingPackageList);
  const { error, loading, incomingPackages } = incomingPackageList;

  const incomingPackageDetails = useSelector(
    (state) => state.incomingPackageDetails
  );
  const {
    loading: loadingDetails,
    error: errorDetails,
    incomingPackage: incomingDetails,
  } = incomingPackageDetails;

  const getAddress = useSelector((state) => state.getAddress);
  const { loading:loadingAdd, error:errorAdd, address:getAdd } = getAddress;

  const outgoingData = {
    incoming_package_name: packageName,
    outgoing_package_name: outgoingPackageName,
    product_name: productName,
    product_quantity: productQuantity,
    created_by: userInfo.id,
  };
  useEffect(() => {
    if (userInfo) {
      dispatch(listIncomingPackage());
      dispatch(getUserAddress());
    } else {
      history.push("/login");
    }
    setReady(false);
    // fetchProduct()
  }, [dispatch, history]);

  const selectPackageHandler = (e) => {
    e.preventDefault();
    dispatch(listIncomingPackageDetails(e.target.value));
    setInputList(incomingDetails.product_package);
    setProduct(incomingDetails.product_package);

    setReady(true);
    setPackageName(e.target.value);
    setOutgoingPackageName(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(outgoingData);
    dispatch(createOutgoing(outgoingData));
  };

  if (success) {
    history.push("/outgoing");
  }

  const handleInputChange = (e, index) => {
    const { name, quantity } = e.target;
    const list = [...inputList];
    list[index][name] = quantity;
    setInputList(list);
  };
  const selectAddress =(e)=>{
    setAddress(e.target.value)
  }

  return (
    <>
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger"> {error} </Message>
        ) : (
          <Col md={6}>
            <h2>Create Outgoing Package</h2>
            <Form>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="4">
                  Incoming Package
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue="you have Incoming Package"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label column sm="4">
                  Select Incoming package
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    onChange={selectPackageHandler}>
                    <option>Choose...</option>
                    {incomingPackages
                      .filter((item) => item.created_by === userInfo.id)
                      .map((item) => (
                        <option value={item._id}> {item.name} </option>
                      ))}
                  </Form.Control>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        )}

        {loadingDetails ? (
          <Loader />
        ) : errorDetails ? (
          <Message variant="danger"> {error} </Message>
        ) : ready ? (
          <Col md={6}>
            <h2> Products in {incomingDetails.name} </h2>
            <Table striped border hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                </tr>
              </thead>

              <tbody>
                {incomingDetails.product_package.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        ) : (
          <Col md={6}>
            <h3>Please Select Package</h3>
          </Col>
        )}
      </Row>

      <Row>
        {loadingDetails ? (
          <Loader />
        ) : errorDetails ? (
          <Message variant="danger"> {error} </Message>
        ) : ready ? (
          <Col md={6}>
            {incomingDetails.product_package.map((x, i) => {
              return (
                <Row className="my-4">
                  <Col md={12}>
                    <Form>
                      <Row>
                        <Col md={4}></Col>
                        <Col md={4}>
                          <Form.Group controlId="zoneCity">
                            <Form.Label column sm="4">
                              product
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              placeholder="Product name"
                              value={x.name}
                              onChange={(e) =>
                                handleInputChange(e, i)
                              }></Form.Control>
                          </Form.Group>
                        </Col>

                        <Col md={4}>
                          <Form.Group controlId="rate">
                            <Form.Label column sm="4">
                              quantity
                            </Form.Label>
                            <Form.Control
                              type="number"
                              name="quantity"
                              placeholder="quantity"
                              value={x.quantity}
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
            <Col md={12}>
            <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label column sm="4">
                  Select Delivery address
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    onChange={selectAddress}>
                    <option>Choose...</option>
                    {getAdd 
                      .filter((item) => item.created_by === userInfo.id)
                      .map((item) => (
                        <option value={item._id}> {item.address} {item.zipcode} {item.city} </option>
                      ))}
                  </Form.Control>
                </Col>
              </Form.Group>
            </Col>
          </Col>
           
            

           

        ) : (
          <Col md={6}>
            <h3>Select Package</h3>
          </Col>
        )}
      </Row>
      <Row>
        <Col md={2}>
        
        </Col>
        <Col className="">
          {ready &&  (
            
            <Button
              onClick={submitHandler}
              type="submit"
              className="btn btn-primary btn-lg">
              Create OutGoing Package
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
}

export default CreateOutgoingPackage;
