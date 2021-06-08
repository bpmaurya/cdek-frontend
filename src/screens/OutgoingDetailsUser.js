import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { ListGroup, ListGroupItem } from "reactstrap";
import {
  outgoingPackageDetails,
  updateOutgoingPackage,
} from "../actions/outgoingPackageAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { OUTGOING_PACKAGE_DETAIL_RESET } from "../constants/outgoingPackageConstant";

function OutgoingDetailsUser({ match, history }) {
  const packageId = match.params._id;

  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const singleOutgoingPackage = useSelector(
    (state) => state.singleOutgoingPackage
  );
  const { error, loading, singlePackage } = singleOutgoingPackage;

  const updateOutgoing = useSelector((state) => state.updateOutgoing);
  const {
    error: updateError,
    loading: updateLoading,
    success: updateSuccess,
  } = updateOutgoing;

  const [trackingNumber, setTrackingNumber] = useState("");
  const [comment, setComment] = useState("");
  const [ready, setReady] = useState("");
  const [selectProduct, setSelectProduct] = useState([]);
  const [status, setStatus] = useState("");
  const [packageName, setPackageName] = useState("");
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
    _id: packageId,
    incoming_package_name: packageName,
    outgoing_package_name: packageName,
    trackingNumber: trackingNumber,
    created_by: userInfo._id,
    status: status,
    outgoing_product: rate,
  };
  
  useEffect(() => {
    if (singlePackage._id !== packageId) {
      dispatch(outgoingPackageDetails(packageId));
      // setProduct(singlePackage.outgoing_product)
    } else {
      setProduct(singlePackage.outgoing_product);
      setInputList(singlePackage.outgoing_product);
      setPackageName(singlePackage.outgoing_package_name);
    }
    // fetchProduct()
  }, [dispatch, history, singlePackage]);


  const handleShow = (e) => {
    e.preventDefault();
    dispatch(updateOutgoingPackage(outgoingData));
    window.location.reload(false);
  };


  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"> {error} </Message>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>For Outgoing: </h3>
                <p>
                  <strong> shipping address</strong>
                </p>
              </ListGroupItem>

              <ListGroupItem>
                <h2>Payment: </h2>
                <p>
                  <strong>Method: </strong> PayPal
                </p>
              </ListGroupItem>

              <ListGroupItem>
                <h3>Products:</h3>
                <ListGroup variant="flush">
                  {product.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col>
                          <p>
                            <strong>Name </strong>
                            {item.product_name}
                          </p>
                        </Col>
                        <Col md={4}>
                          {item.product_quantity}X{item.price}=$
                          {(item.product_quantity * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>Package Summary</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Package Name:</Col>
                    <Col>{singlePackage.outgoing_package_name} </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Tracking Number:</Col>
                    <Col>{singlePackage.trackingNumber} </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Created At:</Col>
                    <Col>{singlePackage.created_at}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col style={{ color: "red" }}>
                      {" "}
                      <strong>{singlePackage.status} </strong>{" "}
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Created By:</Col>
                    <Col>{userInfo.email}</Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}

export default OutgoingDetailsUser;
