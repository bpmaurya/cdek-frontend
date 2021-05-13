import React, { useState, useEffect } from "react";
import { Row, Col, Form, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPackage } from "../actions/createPackageAction";
import Loader from "../components/Loader";
import Message from "../components/Message";

function AddNewIncomingPck({ location, history }) {
  const [packageName, setPackageName] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [comment, setComment] = useState("");
  // const [productType, setProductType] = useState("");
  // const [productBrand, setProductBrand] = useState("");
  // const [productColor, setProductColor] = useState("");
  // const [productPrice, setProductPrice] = useState("");
  // const [productQuantity, setProductQuantity] = useState("");
  const [inputList, setInputList] = useState([{ productType: "", productBrand: "",productColor: "", productPrice: "" ,productQuantity:""}]);
 
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { productType: "", productBrand: "",productColor: "", productPrice: "" ,productQuantity:""}]);
  };



  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const createIncomingPackage = useSelector(
    (state) => state.createIncomingPackage
  );
  const { error, loading, success } = createIncomingPackage;

  const savePackage = {
    // name: packageName,
    // trackingNumber: trackingNumber,
    // countInStock: "12",
    // comment: comment,
    // product: [
    //   {
    //     name: productType,
    //     type: productType,
    //     brand: productBrand,
    //     size: "122",
    //     price: productPrice,
    //     quantity: productQuantity,
    //   }
    // ],
    // user: {
    //   username: "admin1@gmail.com",
    //   email: "admin1@gmail.com",
    //   name: "admin1@gmail.com",
    //   isAdmin: true,
    // },
  };

  useEffect(() => {
   
  }, [ ])

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(packageName);
    // console.log(productType);
    dispatch(createPackage(savePackage));
    console.log("submit");
    
  };
  if (success) {
    return (
      <div>
        <h1 style={{color:"green"}}> data submitted successfully</h1>
      </div>
    );
  }
  else {

 
  return (
    <div>
      <h1>Add your new Incoming Package here</h1>
      <Row className="my-4">
        <Col md={12}>
          <h3> 1. Order Information</h3>

          {error && <Message variant="danger"> {error} </Message>}
          {loading && <Loader />}
          <Card className="m-3">
            <Form className="m-3" onSubmit={submitHandler}>
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
      {inputList.map((x, i) => {
      return(
      
       <Row className="my-4">
        <Col md={12}>
          <h3> {i+1}. Product Information</h3>
          <Card>
            <p className="m-3">
              Please, give a detailed description of each item in your order.
              This data will be used for the customs declaration.
            </p>
            <h4 className="mx-3">Product{i+1} </h4>
            <Form className="m-3" onSubmit={submitHandler}>
              <Row>
                <Col md={3}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Product Type</Form.Label>
                    <Form.Control
                      required
                      type="name"
                      placeholder="enter your product type"
                      // value={productType}
                      // onChange={(e) => setProductType(e.target.value)}
                      value={x.productType}
                      onChange={e => handleInputChange(e, i)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Product Brand</Form.Label>
                    <Form.Control
                      required
                      type="name"
                      placeholder="enter you product brand"
                      // value={productBrand}
                      // onChange={(e) => setProductBrand(e.target.value)}
                      value={x.productBrand}
                      onChange={e => handleInputChange(e, i)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Color/Size</Form.Label>
                    <Form.Control
                      required
                      type="name"
                      placeholder="product color"
                      // value={productColor}
                      // onChange={(e) => setProductColor(e.target.value)}
                      value={x.productColor}
                      onChange={e => handleInputChange(e, i)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control
                      required
                      type="price"
                      placeholder="price"
                      // value={productPrice}
                      // onChange={(e) => setProductPrice(e.target.value)}
                      value={x.productPrice}
                      onChange={e => handleInputChange(e, i)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={8}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Link To the Product</Form.Label>
                    <Form.Control type="text" placeholder="" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Product Quantity</Form.Label>
                    <Form.Control
                      required
                      type="quantity"
                      placeholder="product quantity"
                      // value={productQuantity}
                      // onChange={(e) => setProductQuantity(e.target.value)}
                      value={x.productQuantity}
                      onChange={e => handleInputChange(e, i)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              
            </Form>
            <Col md={4}>
              {/* <Button href="" variant="outline-success btn-block" type="button">
                +Add New Product
              </Button> */}
              {inputList.length !== 1 && <Button
              className="mr10"
              onClick={() => handleRemoveClick(i)} variant="outline-danger btn-block" type="button">Remove</Button>}
               {inputList.length - 1 === i && <Button onClick={handleAddClick} variant="outline-success btn-block" type="button"> +Add New Product </Button>}
            </Col>
           
          </Card>
        </Col>
      </Row>
      
  
      );
    })}
    <Row>
    <Col className="m-3">
                <Button type="submit" variant="primary">
                  Save
                </Button>{" "}
                <Button variant="danger">Cancel</Button>{" "}
              </Col>
    </Row>
    </div>
  );
}
}

export default AddNewIncomingPck;
