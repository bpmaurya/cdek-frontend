import React, { useState, useEffect } from "react";
import { Row, Col, Form, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPackage } from "../actions/createPackageAction";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import EditPackageAdmin from "./EditPackageAdmin";
import { PACKAGE_UPDATE_RESET } from "../constants/incomingPackageConstant";
import {
  listIncomingPackageDetails,
  updatePackage,
} from "../actions/incomimgPackageActions";

function EditPackageUser({ match, location, history }) {
  const packageId = match.params._id;
  const dispatch = useDispatch();

  const [packageName, setPackageName] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [comment, setComment] = useState("");
  const [product, setProduct] = useState([]);
  const [inputList, setInputList] = useState([
    {
      name: "",
      type: "",
      brand: "",
      size: "",
      price: "",
      quantity: "",
    },
  ]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const incomingPackageDetails = useSelector(
    (state) => state.incomingPackageDetails
  );
  const { loading, error, incomingPackage } = incomingPackageDetails;

  const packageUpdate = useSelector((state) => state.packageUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = packageUpdate;

  const rate = [];
  inputList.map((item) => {
    const dict1 = {
      name: item.productName,
      type: item.productType,
      brand: item.productBrand,
      size: item.productColor,
      price: item.productPrice,
      quantity: item.productQuantity,
    };
    rate.push(dict1);
  });

  const savePackage = {
    name: packageName,
    trackingNumber: trackingNumber,
    countInStock: 0,
    comment: comment,
    created_by: userInfo.id,
    product_package: rate,
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (successUpdate) {
        dispatch({ type: PACKAGE_UPDATE_RESET });
        history.push("/incoming");
      } else {
        if (incomingPackage._id !== packageId) {
          dispatch(listIncomingPackageDetails(packageId));
        } else {
          setPackageName(incomingPackage.name);
          setTrackingNumber(incomingPackage.trackingNumber);
          setTrackingNumber(incomingPackage.countInStock);
          setComment(incomingPackage.comment);
          setProduct(incomingPackage.product_package);
        //   setInputList(incomingPackage.product_package);

          product.map((x)=>{
              setInputList({...inputList,[x.name]:x.name,[x.price]:x.price, [x.brand]:x.brand})
          })
        }
      }
    } else {
      history.push("/login");
    }
  }, [history, successUpdate, incomingPackage]);

  console.log(inputList);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(packageName);
    console.log(inputList);
    console.log(inputList.productBrand);
    console.log(savePackage);
    dispatch(createPackage(savePackage));
    console.log("submit");
  };

  return (
    <div>
      <h2>Edit Your Package here</h2>
      <Link to="/incoming">Go Back</Link>
      <Row className="my-4">
        <Col md={12}>
          <h3> 1. Order Information</h3>

          {error && <Message variant="danger"> {error} </Message>}
          {loading && <Loader />}
          <Card className="m-3">
            <Form className="m-3">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Package Name</Form.Label>
                <Form.Control
                  required
                  type="name"
                  placeholder="enter you package name"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Tracking Number</Form.Label>
                <Form.Control
                  required
                  type="name"
                  placeholder="tracking number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Your Comment</Form.Label>
                <Form.Control
                  required
                  type="name"
                  placeholder="enter you package name"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                />
              </Form.Group>
            </Form>
          </Card>
        </Col>
      </Row>

      {product.map((x, i) => {
        return (
          <Row className="my-4">
            <Col md={12}>
              <h3> {i + 1}. Product Information</h3>
              <Card>
                <p className="m-3">
                  Please, give a detailed description of each item in your
                  order. This data will be used for the customs declaration.
                </p>
                <h4 className="mx-3">Product{i + 1} </h4>
                <Form className="m-3">
                  <Row>
                    <Col md={3}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Product Type</Form.Label>
                        <Form.Control
                          required
                          name="productType"
                          type="name"
                          placeholder="enter your product type"
                          value={x.productType}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Product Brand</Form.Label>
                        <Form.Control
                          required
                          name="productBrand"
                          type="name"
                          placeholder="enter you product brand"
                          value={x.productBrand}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Color/Size</Form.Label>
                        <Form.Control
                          required
                          name="productColor"
                          type="text"
                          placeholder="product color"
                          value={x.productColor}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control
                          required
                          name="productPrice"
                          type="number"
                          placeholder="price"
                          value={x.productPrice}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <Form.Group controlId="exampleForm.ControlInput2">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                          required
                          name="productName"
                          type="text"
                          placeholder="Enter Product Name"
                          value={x.productName}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Product Quantity</Form.Label>
                        <Form.Control
                          required
                          name="productQuantity"
                          type="number"
                          placeholder="product quantity"
                          value={x.productQuantity}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>
          </Row>
        );
      })}
      <Row>
        <Col className="m-3">
          <Button
            onClick={submitHandler}
            type="submit"
            className="btn btn-primary btn-lg">
            Update
          </Button>{" "}
          
          <Button className="btn btn-danger btn-lg" href="/incoming">
            Cancel
          </Button>{" "}
         
        </Col>
      </Row>
    </div>
  );
}

export default EditPackageUser;
