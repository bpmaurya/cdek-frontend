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
  const [created_at, setCreated_at] = useState("");
  const [product, setProduct] = useState([]);
  const [user, setUser] = useState({});

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
          setUser(incomingPackage.user);
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
      created_by: userInfo.id
    };
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(dict);
    console.log(incomingPackage);
    dispatch(updatePackage(dict));

    console.log("submit");
  };

  return (
    <div>
      <Link to="/admin/package">Go Back</Link>

      <Row>
        <Col md={6}>
          <h2>Edit Package </h2>

          {loading ? (
            <Loader />
          ) : errorUpdate ? (
            <Message variant="danger"> {errorUpdate} </Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group as={Row} controlId="email">
                <Form.Label column sm="3">
                  Package Name
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    disabled
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}></Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="email">
                <Form.Label column sm="3">
                  TrackingNumber
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    disabled
                    type="text"
                    value={trackingNumber}
                    onChange={(e) =>
                      setTrackingNumber(e.target.value)
                    }></Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="email">
                <Form.Label column sm="3">
                  Count In Stock
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    value={countInStock}
                    onChange={(e) =>
                      setCountInStock(e.target.value)
                    }></Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="comment">
                <Form.Label column sm="3">
                  Comment by user
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    disabled
                    as="textarea"
                    type="textarea"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}></Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="partial_received">
                <Form.Label column sm="3">
                  If Partial Received
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    value={partial_received}
                    onChange={(e) =>
                      setPartial_received(e.target.value)
                    }></Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="remarks">
                <Form.Label column sm="3">
                  Add Remarks{" "}
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    as="textarea"
                    type="textField"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}></Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="status">
                <Form.Label column sm="3">
                  Package Status
                </Form.Label>
                <Col sm="8">
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
                <Col sm="8">
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

              {/* <Form.Group controlId="isadmin">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
          </Form.Group> */}

              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          )}
        </Col>
        {product !== null ? (
          <Col md={3}>
            <h2>Total products </h2>
            {product.map((item) => (
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">
                    name={item.name}{" "}
                  </Card.Subtitle>
                  <Card.Text>
                    <p> Type ={item.type} </p>
                    <p> Brand ={item.brand} </p>
                    <p> Size ={item.size} </p>
                    <p> Price ={item.price} </p>
                    <p> Quantity ={item.quantity} </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>
        ) : (
          <Col md={3}>
            <h2>product not available</h2>
          </Col>
        )}

        {user !== null ? (
          <Col md={3}>
            <h2>User</h2>
            {/* <Card style={{ width: "18rem" }}>
              <ListGroup variant="flush">
                <ListGroup.Item>Username= {user.username} </ListGroup.Item>
                <ListGroup.Item>Email= {user.email}</ListGroup.Item>
              </ListGroup>
            </Card> */}
          </Col>
        ) : (
          <Col md={3}>
            <h2>user not provided</h2>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default EditPackageAdmin;
