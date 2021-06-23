import React, { useState, useEffect } from "react";
import { Row, Col, Table, Form, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPackage } from "../actions/createPackageAction";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ListGroup, ListGroupItem } from "reactstrap";

import {
  listIncomingPackageDetails,
  listIncomingPackage,
  updatePackage,
} from "../actions/incomimgPackageActions";
import { createOutgoing } from "../actions/outgoingPackageAction";
import { getUserAddress } from "../actions/addressAction";

function CreateRequest({ match, params, history }) {
  const packageId = match.params._id;
  const [packageName, setPackageName] = useState("");
  const [outgoingPackageName, setOutgoingPackageName] = useState("");
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [Address, setAddress] = useState([]);

  const [product, setProduct] = useState([]);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [comment, setComment] = useState("");
  const [ready, setReady] = useState("");
  const [selectProduct, setSelectProduct] = useState([]);
  const [inputList, setInputList] = useState([
    {
      name: "",
      type: "",
      brand: "",
      size: "",
      price: "",
      quantity: "",
      link: "",
      remains_quantity: "",
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
    success: successDetails,
    loading: loadingDetails,
    error: errorDetails,
    incomingPackage: incomingDetails,
  } = incomingPackageDetails;

  const getAddress = useSelector((state) => state.getAddress);
  const { loading: loadingAdd, error: errorAdd, address: getAdd } = getAddress;

  const packageUpdate = useSelector((state) => state.packageUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = packageUpdate;

  var rate = [];
  inputList.map((item) => {
    const dicts = {
      product_id: item._id,
      product_name: item.name,
      product_quantity: item.quantity,
      remains_quantity: item.remains_quantity - item.quantity,
      type: item.type,
      brand: item.brand,
      link: item.link,
      size: item.size,
      price: item.price,
    };
    rate.push(dicts);
  });

  const outgoingData = {
    incoming_package_name: packageName,
    outgoing_package_name: outgoingPackageName,
    trackingNumber: trackingNumber,
    created_by: userInfo._id,
    outgoing_product: rate,
  };

  const rate1 = [];
  inputList.map((item) => {
    const dict1 = {
      name: item.name,
      type: item.type,
      brand: item.brand,
      size: item.size,
      price: item.price,
      quantity: item.remains_quantity - item.quantity,
      link: item.link,
      remains_quantity: item.remains_quantity - item.quantity,
    };
    rate1.push(dict1);
  });

  if (userInfo) {
    var savePackage = {
      _id: packageId,
      name: packageName,
      trackingNumber: trackingNumber,
      comment: comment,
      created_by: userInfo.id,
      product_package: rate1,
    };
  }

  useEffect(() => {
    // dispatch(getUserAddress());
    if (incomingDetails._id !== packageId) {
      dispatch(listIncomingPackageDetails(packageId));
    } else {
      setTrackingNumber(incomingDetails.trackingNumber);
      setComment(incomingDetails.comment);
      setPackageName(incomingDetails.name);
      setProduct(incomingDetails.product_package);
      setInputList(incomingDetails.product_package);
      dispatch(getUserAddress());

      // product.map((x)=>{
      //     setInputList({name:x.name,brand:x.brand })
      // })
    }
  }, [history, success, successDetails, incomingDetails]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(outgoingData);
    dispatch(createOutgoing(outgoingData));
    dispatch(updatePackage(savePackage));
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const selectAddress = (e) => {
    setAddress(e.target.value);
  };

  if (success) {
    history.push("/outgoing");
  }

  return (
    <>
      {loadingDetails ? (
        <Loader />
      ) : errorDetails ? (
        <Message variant="danger"> {error} </Message>
      ) : (
        <>
          <h2>Request for a package shipping</h2>
          <h3>1. Package contents {product.length} products </h3>
          <Card className="mb-4">
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col md={2}>Incoming package number</Col>
                  <Col md={3}>Name</Col>
                  <Col md={3}>Price per item</Col>
                  <Col md={2}>Quantity</Col>
                  <Col md={2}>Total</Col>
                </Row>
              </ListGroupItem>
              {product.map((item) => (
                <ListGroupItem>
                  <Row>
                    <Col md={2}>{item._id}</Col>
                    <Col md={3}>{item.name}</Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>{item.quantity}</Col>
                    <Col md={2}>
                      {" "}
                      $ {(item.quantity * item.price).toFixed(2)}{" "}
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Card>

          <h3>2. Select the recipient </h3>
          <Card className="p-4">
            <Row>
              <Col md={5}>
                <Form.Group>
                  <Form.Label></Form.Label>
                  <Form.Control></Form.Control>
                </Form.Group>
              </Col>
              <Col md={7} style={{ textAlign: "right" }}>
                <Button className="btn btn-primary">
                  + Add a new recipient
                </Button>
              </Col>
            </Row>
          </Card>

          <h3>3. Delivery type </h3>
          <Card className="mb-4 ">
            <Form className="m-4">
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Delivery to the pick-up point"
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Delivery at the address" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card>

          <h3>4. Customs limit</h3>

          <Card className="mb-4">
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col md={6}>Items selected for shipment</Col>
                  <Col md={6} style={{ textAlign: "right" }}>
                    415,84 €
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col md={6}>
                    Duty-free limit in the Russian Federation per package
                  </Col>
                  <Col md={6} style={{ textAlign: "right" }}>
                    200 €
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row style={{ color: "red" }}>
                  <Col md={6}>Expected exceeding of the duty-free limit:</Col>
                  <Col md={6} style={{ textAlign: "right" }}>
                    215,84 €
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>

          <h3>5. Confirm shipping</h3>
          <Card md={12}>
            <Row>
              <Col style={{ justifyContent: "center" }}>
                <input
                  type="checkbox"
                  style={{
                    width: "30px",
                    height: "30px",
                    marginLeft: "20px",
                    marginRight: "20px",
                    marginTop: "4px",
                  }}
                />
                <p style={{ display: "inline" }}>
                  Send manually (not send a parcel automatically)
                </p>
              </Col>
            </Row>
            <Row>
              <Col style={{ justifyContent: "center" }}>
                <input
                  type="checkbox"
                  style={{
                    width: "30px",
                    height: "30px",
                    marginLeft: "20px",
                    marginRight: "20px",
                    marginTop: "4px",
                  }}
                />
                <p style={{ display: "inline" }}>
                  Send an SMS with a payment link for a parcel
                </p>
              </Col>
            </Row>
            <Row>
              <Col style={{ justifyContent: "center" }}>
                <input
                  type="checkbox"
                  style={{
                    width: "30px",
                    height: "30px",
                    marginLeft: "20px",
                    marginRight: "20px",
                    marginTop: "4px",
                  }}
                />
                <p style={{ display: "inline" }}>
                  Send an SMS with tracking number of the parcel after
                  dispatching
                </p>
              </Col>
            </Row>
            <Row>
              <Col className="m-4">
                <Form>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>
                      {" "}
                      <span style={{ fontSize: "18px" }}>Comments</span>
                    </Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col className="m-4">
                <p>
                  {" "}
                  <span style={{ fontSize: "17px" }}> Insurance: 279,66 ₽</span>
                </p>
                <p>
                  Please note that the calculation may be not correct, since the
                  weight may change both up and down after packaging. The
                  delivery price will include mandatory insurance – 0.75% of the
                  declared value of the goods Sending SMS notifications is
                  chargeable: 10 RUB per message.
                </p>
              </Col>
            </Row>
          </Card>

          <div>
            <Button className="btn btn-lg blockquote-primary mr-4">Save</Button>
            <Button className="btn btn-lg btn-danger">Cancel</Button>
          </div>
        </>
      )}
    </>
  );
}

export default CreateRequest;
