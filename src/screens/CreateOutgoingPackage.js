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
  listIncomingPackage,
  updatePackage,
} from "../actions/incomimgPackageActions";
import IncomingPackageDetails from "./IncomingPackageDetails";

function CreateOutgoingPackage({ match, location, history }) {
  const [packageName, setPackageName] = useState("");
  const [setPackageId, setSetPackageId] = useState("");
  const [product, setProduct] = useState([]);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [comment, setComment] = useState("");
  const [ready, setReady] = useState("");
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

  const dispatch = useDispatch();
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

  useEffect(() => {
    if (userInfo) {
      dispatch(listIncomingPackage());
    } else {
      history.push("/login");
    }

    // fetchProduct()
  }, [dispatch, history]);

  const selectPackageHandler = (e) => {
    dispatch(listIncomingPackageDetails(e.target.value));
  };

  return (
    <>
      <h2>Create Outgoing Package</h2>
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger"> {error} </Message>
        ) : (
          <Col md={12}>
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
      </Row>

      <Row>
        <Col md={12}></Col>
      </Row>
    </>
  );
}

export default CreateOutgoingPackage;
