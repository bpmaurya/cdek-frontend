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

function SplitPackage({ match, history }) {
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

  const handleAddClick = () => {};
  return (
    <>
      {loadingDetails ? (
        <Loader />
      ) : errorDetails ? (
        <Message variant="danger"> {error} </Message>
      ) : (
        <>
          <h2>
            Divide a package{" "}
            <span style={{ color: "green" }}> {incomingDetails.name}</span>{" "}
          </h2>
          <h3>
            {" "}
            <i className="fas fa-box-open"></i> Items to be divided
          </h3>
          <Card className="mb-4 p-4">
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col md={6}>Name</Col>
                  <Col md={3}>Quantity</Col>
                  <Col md={3}>Remains to be divided</Col>
                </Row>
              </ListGroupItem>
              {product.map((item) => (
                <ListGroupItem>
                  <Row>
                    <Col md={6}>{item.name}</Col>
                    <Col md={3}>{item.quantity}</Col>
                    <Col md={3}>{item.quantity}</Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Card>

          <Card className=" p-3">
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Package Name</Form.Label>
                <Form.Control
                  required
                  type="name"
                  placeholder="Enter Your Package name"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                />
              </Form.Group>
            </Form>

            <p>Package contents</p>

            <Row>
              <Col md={6}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Product</Form.Label>
                  <Form.Control as="select">
             {product.map(item=> <option>{item.name} </option>)}
      
    </Form.Control>
                </Form.Group>
              </Col>
              <Col md={2} style={{textAlign:"right",marginTop:"29px"}}>
                <Link>
                  <i className="fas fa-minus"></i>
                </Link>
              </Col>
              <Col md={2}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    required
                    disabled
                    name="quantity"
                    type="number"
                    placeholder=""
                    // value={x.productQuantity}
                  />
                </Form.Group>
              </Col>
              <Col md={2} style={{marginTop:"29px"}} >
                <Link>
                  <i className="fas fa-plus"></i>
                </Link>
              </Col>
            </Row>

            <Link onClick={handleAddClick}>+Add A Product </Link>
          </Card>
          <Link onClick={handleAddClick}>+Add A Package </Link>

          <div className="m-4">
            <Button className="btn btn-lg blockquote-primary mr-4">Save</Button>
            <Button className="btn btn-lg btn-danger">Cancel</Button>
          </div>
        </>
      )}
    </>
  );
}

export default SplitPackage;
