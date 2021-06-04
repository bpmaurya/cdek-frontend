import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listIncomingPackageDetails,
  updatePackage,
} from "../actions/incomimgPackageActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PACKAGE_UPDATE_RESET } from "../constants/incomingPackageConstant";

function EditPackageAdmin({ match, history }) {
  const packageId = match.params._id;

  const [name, setName] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const [full_received, setFull_received] = useState("");
  const [partial_received, setPartial_received] = useState("");
  const [remarks, setRemarks] = useState("");
  const [product, setProduct] = useState([]);
  const [user, setUser] = useState({});

  const [inputList, setInputList] = useState([
    {
      name: "",
      type: "",
      brand: "",
      size: "",
      price: "",
      quantity: "",
      link:"",
    },
  ]);

  const dispatch = useDispatch();

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

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (successUpdate) {
        dispatch({ type: PACKAGE_UPDATE_RESET });
        history.push("/admin/package");
      } else {
        if (incomingPackage._id !== packageId) {
          dispatch(listIncomingPackageDetails(packageId));
        } else {
          setName(incomingPackage.name);
          setTrackingNumber(incomingPackage.trackingNumber);
          setCountInStock(incomingPackage.countInStock);
          setComment(incomingPackage.comment);
          setStatus(incomingPackage.state);
          setFull_received(incomingPackage.full_received);
          setPartial_received(incomingPackage.partial_received);
          setRemarks(incomingPackage.remarks);
          setProduct(incomingPackage.product_package);
          setUser(incomingPackage.created_by);
          setProduct(incomingPackage.product_package);
          setInputList(incomingPackage.product_package);
        }
      }
    } else {
      history.push("/login");
    }
  }, [history, successUpdate, incomingPackage]);

  console.log(incomingPackage.product);

  const rate = [];
  product.map((item) => {
    const dict1 = {
      name: item.name,
      type: item.type,
      brand: item.brand,
      size: item.size,
      price: item.price,
      quantity: item.quantity,
      link:item.link,
    };
    rate.push(dict1);
  });

  if (userInfo) {
    var dict = {
      _id: packageId,
      name: name,
      trackingNumber: trackingNumber,
      countInStock: countInStock,
      comment: comment,
      status: status,
      full_received: full_received,
      partial_received: partial_received,
      remarks: remarks,
      product_package: rate,
      
    };
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(dict);
    console.log(incomingPackage);
    dispatch(updatePackage(dict));
    console.log("submit");
    window.scrollTo(0, 0);
  };
   
  const cancelHandler=(e)=>{
    history.push("/admin/package");
  }
  return (
    <>
      <Link to="/admin/package">Go Back</Link>
     <Row> <Col md={8}>
      <Row>
        <Col md={12}>
          <h2>Edit Package </h2>

          {loading ? (
            <Loader />
          ) : errorUpdate ? (
            <Message variant="danger"> {errorUpdate} </Message>
          ) : (
            <Card className="m-3">
              <Form className="m-3" >
                <Row>
                  <Col md={3}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Package Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="enter you package name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Tracking Number</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="tracking number"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>User Comment</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder=""
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Count In Stock</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="enter  package name"
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                        rows={3}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label> If Partial Received</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        as="textarea"
                        placeholder=""
                        value={partial_received}
                        onChange={(e) => setPartial_received(e.target.value)}
                        rows={3}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={9}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label> Add Remarks</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        as="textarea"
                        placeholder="enter  package name"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        rows={3}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group as={Row} controlId="status">
                  <Form.Label column sm="3">
                    Package Status
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      as="select"
                      required
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}>
                      <option value=" " disabled selected hidden>
                        Select Type...
                      </option>

                      <option value="INCOMING">INCOMING</option>
                      <option value="PENDING">PENDING</option>
                      <option value="RECEIVED">RECEIVED</option>
                      <option value="OUTGOING">OUTGOING</option>
                      <option value="DELIVERED">DELIVERED</option>
                    </Form.Control>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="full_received">
                  <Form.Label column sm="3">
                    Is full Received
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      as="select"
                      required
                      value={full_received}
                      onChange={(e) => setFull_received(e.target.value)}>
                      <option value=" " disabled selected hidden>
                        Select Type...
                      </option>

                      <option value="YES">YES</option>

                      <option value="NO">NO</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
              </Form>
            </Card>
          )}
        </Col>
       
      </Row>

      <Row>
        {product.map((x, i) => {
          return (
            // <Row className="my-4">
            <Col md={12}>
              <h3> {i + 1}. Product Information</h3>
              <Card>
                <p className="m-3">
                  Please, give a detailed description of each item in your
                  order. This data will be used for the customs declaration.
                </p>
                <h4 className="mx-3">Product{i + 1} </h4>
                <Form className="m-3" >
                  <Row>
                    <Col md={3}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Product Type</Form.Label>
                        <Form.Control
                          required
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
                          required
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
                          required
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
                          required
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
                    <Col md={3}>
                      <Form.Group controlId="exampleForm.ControlInput2">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                          required
                          name="name"
                          type="text"
                          placeholder="Enter Product Name"
                          value={x.name}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={5}>
                      <Form.Group controlId="exampleForm.ContrsolInput2">
                          <Form.Label>Product Link</Form.Label>
                          <Form.Control
                            required
                            name="link"
                            type="url"
                            placeholder="Enter Product Link"
                            value={x.link}
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
                          type="number"
                          placeholder="product quantity"
                          value={x.quantity}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col className="m-3">
          {loadingUpdate ? ( 
             <Button
             className="btn btn-primary btn-lg" type="submit">
             Updating..........
           </Button>

          ):(
          <Button
            onClick={submitHandler}
            type="submit"
            className="btn btn-primary btn-lg">
            Update
          </Button>
          ) }
          
          { !loadingUpdate &&
          <Button className="btn btn-danger btn-lg m-3" href="" onClick={cancelHandler}>
            Cancel
          </Button>
         }
         
        </Col>
      </Row>
      </Col>
      <Col md={4}>
        <h2>User Details</h2>
         
      </Col>
      </Row>
    </>
  );
}

export default EditPackageAdmin;
