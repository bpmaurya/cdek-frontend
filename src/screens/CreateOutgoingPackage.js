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

function CreateOutgoingPackage({ match, location, history }) {
  const [packageName, setPackageName] = useState("");
  const [outgoingPackageName, setOutgoingPackageName] = useState("");
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  const [product, setProduct] = useState([]);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [comment, setComment] = useState("");
  const [ready, setReady] = useState("");
  const [selectProduct, setSelectProduct] = useState();

  const dispatch = useDispatch();
  const outgoingCreate = useSelector((state) => state.outgoingCreate);
  const { error:errorCreate, loading:loadingCreate, success } = outgoingCreate;


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

  const outgoingData = {
    incoming_package_name: packageName,
    outgoing_package_name: outgoingPackageName,
    product_name: productName,
    product_quantity: productQuantity,
    created_by: userInfo.id

  };
  useEffect(() => {
    if (userInfo) {
      dispatch(listIncomingPackage());
    } else {
      history.push("/login");
    }
    setReady(false);
    // fetchProduct()
  }, [dispatch, history]);

  const selectPackageHandler = (e) => {
    dispatch(listIncomingPackageDetails(e.target.value));
    setReady(true);
    setPackageName(e.target.value);
    setOutgoingPackageName(e.target.value);
  };

  const selectDivideProduct = (e) => {
    setSelectProduct(e.target.value === null ? false : true);
    console.log(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault()
    console.log(outgoingData);
    dispatch(createOutgoing(outgoingData))

  };

  if(success){
    history.push('/outgoing')
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
        <Col md={6}>
          {ready && (
            <Form>
              <Form.Group as={Row} controlId="formPlaintextPsassword">
                <Form.Label column sm="4">
                  Are you want divide Products
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    onChange={selectDivideProduct}>
                    <option>Choose...</option>

                    <option value="true"> YES </option>
                    <option value="false"> NO </option>
                  </Form.Control>
                </Col>
              </Form.Group>
            </Form>
          )}
          {ready && selectProduct === true && (
            <Form>
              <Form.Group as={Row} controlId="formPlainstextPassword">
                <Form.Label column sm="4">
                  Select The Product
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    onChange={(e) => setProductName(e.target.value)}>
                    <option>Choose...</option>
                    {incomingDetails.product_package.map((item) => (
                      <option value={item._id}> {item.name} </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlainsltextPassword">
                <Form.Label column sm="4">
                  Set The Quantity
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    required
                    name="productQuantity"
                    type="number"
                    placeholder="product quantity"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                  />
                </Col>
              </Form.Group>
              
              {/* <Button
                onClick={submitHandler}
                type="submit"
                className="btn btn-primary btn-lg">
                Create Outgoing
              </Button> */}
            </Form>
          )}
        </Col>
      </Row>
      <Row>
        <Col className="m-3">
          {ready && selectProduct === true &&
            
          <Button
            onClick={submitHandler}
            type="submit"
            className="btn btn-primary btn-lg">
            Create OutGoing Package
          </Button>}
         
        </Col>
      </Row>
    </>
  );
}

export default CreateOutgoingPackage;
