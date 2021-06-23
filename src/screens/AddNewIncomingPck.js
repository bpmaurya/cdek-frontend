import React, { useState, useEffect } from "react";
import { Row, Col, Form, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPackage } from "../actions/createPackageAction";
import Loader from "../components/Loader";
import Message from "../components/Message";

function AddNewIncomingPck({ location, history }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [packageName, setPackageName] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [comment, setComment] = useState("");
  const [inputList, setInputList] = useState([
    {
      productName:"",
      productType: "",
      productBrand: "",
      productColor: "",
      productPrice: "",
      productQuantity: "",
      productLink:""
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
        productName:"",
        productType: "",
        productBrand: "",
        productColor: "",
        productPrice: "",
        productQuantity: "",
        productLink:"",
      },
    ]);
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";
 
  const createIncomingPackage = useSelector(
    (state) => state.createIncomingPackage
  );
  const { error, loading, success } = createIncomingPackage;

  const rate = [];
  inputList.map((item) => {
    const dict1 = {
      name: item.productName,
      type: item.productType,
      brand: item.productBrand,
      size: item.productColor,
      price: item.productPrice,
      quantity: item.productQuantity,
      remains_quantity:item.productQuantity,
      link:item.productLink,
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

  useEffect(() => {}, []);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(packageName);
    console.log(inputList);
    console.log(inputList.productBrand);
    console.log(savePackage);
    dispatch(createPackage(savePackage));
    window.scrollTo(0, 0);
    console.log("submit");
  };

  if (success) {
    history.push("/incoming");
    
  } 

    return (
      <div>
        <h2>Add Your New Incoming Package here</h2>
        <Row className="my-4">
          <Col md={12}>
            <h3> 1. Order Information</h3>

            {error && <Message variant="danger"> Please Enter All field Carefully </Message>}
            {loading && <Loader />}
            <Card className="m-3">
              <Form className="m-3">
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
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Tracking Number</Form.Label>
                  <Form.Control
                    required
                    type="name"
                    placeholder="Tracking Number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Your Comment</Form.Label>
                  <Form.Control
                    required
                    type="name"
                    placeholder="Enter Your Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                  />
                </Form.Group>
              </Form>
            </Card>
          </Col>
        </Row>

        {inputList.map((x, i) => {
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
                            placeholder="Enter Your Product Type"
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
                            placeholder="Enter You Product Brand"
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
                            placeholder="Product Color"
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
                            placeholder="Price"
                            value={x.productPrice}
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                    <Col md={3}>
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
                      <Col md={5}>
                      <Form.Group controlId="exampleForm.ContrsolInput2">
                          <Form.Label>Product Link</Form.Label>
                          <Form.Control
                            required
                            name="productLink"
                            type="url"
                            placeholder="Enter Product Link"
                            value={x.productLink}
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
                            placeholder="Product Quantity"
                            value={x.productQuantity}
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                  <Col md={4}>
                    {inputList.length !== 1 && (
                      <Button
                        className="mr10"
                        onClick={() => handleRemoveClick(i)}
                        variant="outline-danger btn-block"
                        type="button">
                        Remove
                      </Button>
                    )}
                    {inputList.length - 1 === i && (
                      <Button
                        onClick={handleAddClick}
                        variant="outline-success btn-block"
                        type="button">
                        {" "}
                        +Add New Product{" "}
                      </Button>
                    )}
                  </Col>
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
              Save
            </Button>{" "}
            <Button className="btn btn-danger btn-lg" href="/incoming">Cancel</Button>{" "}
          </Col>
        </Row>
      </div>
    );
  }


export default AddNewIncomingPck;
