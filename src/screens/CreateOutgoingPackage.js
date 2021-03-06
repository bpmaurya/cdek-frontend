import React, { useState, useEffect } from "react";
import { Row, Col, Table, Form, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPackage } from "../actions/createPackageAction";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

import {
  listIncomingPackageDetails,
  listIncomingPackage,
  updatePackage,
} from "../actions/incomimgPackageActions";
import { createOutgoing } from "../actions/outgoingPackageAction";
import { getUserAddress } from "../actions/addressAction";

function CreateOutgoingPackage({ match, location, history }) {
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
      link:"",
      remains_quantity:"",
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
      remains_quantity:item.remains_quantity-item.quantity,
      type:item.type,
      brand:item.brand,
      link:item.link,
      size:item.size,
      price:item.price,
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
      quantity: item.remains_quantity-item.quantity,
      link:item.link,
      remains_quantity:item.remains_quantity-item.quantity,
    }
    rate1.push(dict1);
  });

  if(userInfo){
    var savePackage = {
      _id:packageId,
      name: packageName,
      trackingNumber: trackingNumber,
      comment: comment,
      created_by: userInfo.id,
      product_package: rate1,
    }
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
      <Row>
        {errorDetails && <Message variant="danger"> {error} </Message>}
        {loadingDetails && <Loader />}

        <Col md={8}>
          <Form className="m-3" onSubmit={submitHandler}>

          <Col md={12}>

            {/* <Card className="m-3"> */}
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label> <strong> Outgoing Package Name</strong></Form.Label>
                  <Form.Control
                    required
                    type="outgoingPackageName"
                    placeholder="Enter Your Package name"
                    value={outgoingPackageName}
                    onChange={(e) => setOutgoingPackageName(e.target.value)}
                  />
                </Form.Group>
                {/* </Card> */}
              </Col>
            {product.map((x, i) => {
              return (
                <Row className="my-4">
                  <Col md={12}>
                    <h5> {i + 1}. Product Information</h5>

                    {x.quantity > '0' ? (
                    <Card>
                      <p className="m-3">
                        Please, give a detailed description of each item in your
                        order. This data will be used for the customs
                        declaration.
                      </p>
                      <h4 className="mx-3">Product{i + 1} </h4>

                      <Row>
                        <Col md={3}>
                          <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Product Type</Form.Label>
                            <Form.Control
                              disabled
                              name="type"
                              type="text"
                              placeholder="enter your product type"
                              value={x.type}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Product Brand</Form.Label>
                            <Form.Control
                              disabled
                              name="brand"
                              type="text"
                              placeholder="enter you product brand"
                              value={x.brand}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Color/Size</Form.Label>
                            <Form.Control
                              disabled
                              name="size"
                              type="text"
                              placeholder="product color"
                              value={x.size}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control
                              disabled
                              name="price"
                              type="number"
                              placeholder="price"
                              value={x.price}
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
                              disabled
                              name="name"
                              type="text"
                              placeholder="Enter Product Name"
                              value={x.name}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                       
                          <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Product Quantity</Form.Label>
                            <Form.Control
                              required
                              name="quantity"
                              max={x.remains_quantity}
                              maxLength="2"
                              min="0"
                              type="number"
                              placeholder="product quantity"
                              value={x.quantity}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Card>
                        ):(
                           <h4 className="mt-3" style={{color:"red"}}><strong>You have No  Quantity Remaining for this Product </strong> </h4> 
                        )}

                  </Col>
                </Row>
              );
            })}
            <Col className="submit">
              <Button type="submit" className="btn btn-primary btn-lg">
                Create OutGoing Package
              </Button>
            </Col>
          </Form>
        </Col>
        <Col md={4}>
          <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Select Address</Form.Label>
              <Form.Control as="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
          </Form>
          Or add New address
        </Col>
      </Row>
      <Row></Row>
    </>
  );
}

export default CreateOutgoingPackage;
