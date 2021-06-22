import { useDispatch, useSelector } from "react-redux";

import React, { useState, useEffect } from "react";

import { LinkContainer } from "react-router-bootstrap";
import { Row, Col, Table, Form, FormControl, Button } from "react-bootstrap";
import { listIncomingPackage } from "../actions/incomimgPackageActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

function IncomingPackage({ history }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const incomingPackageList = useSelector((state) => state.incomingPackageList);
  const { error, loading, incomingPackages } = incomingPackageList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listIncomingPackage());
    } else {
      history.push("/login");
    }

    // fetchProduct()
  }, [dispatch, history]);

  console.log(incomingPackages);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      // dispatch(deleteUsers(id))
    }
    // console.log("delete:",id);
  };
  const createPackageHandler = () => {
    //create incoming package
  };

  var reISO =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
  var reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;

  JSON.dateParser = function (key, value) {
    if (typeof value === "string") {
      var a = reISO.exec(value);
      if (a) return new Date(value);
      a = reMsAjax.exec(value);
      if (a) {
        var b = a[1].split(/[-+,.]/);
        return new Date(b[0] ? +b[0] : 0 - +b[1]);
      }
    }
    return value;
  };

  const count = incomingPackages.filter(
    (item) => item.created_by === userInfo._id
  ).length;
  const warehouse = incomingPackages.filter(
    (item) =>
      ((item.created_by === userInfo._id) === item.full_received) === "YES"
  ).length;

  const warehouse1 = incomingPackages
    .filter((item) => item.created_by === userInfo._id)
    .filter((item) => item.full_received === "YES").length;

  //expandable table row content
  const [expandedRows, setExpandedRows] = useState([]);
  const [expandState, setExpandState] = useState({});

  const handleEpandRow = (event, userId) => {
    const currentExpandedRows = expandedRows;
    const isRowExpanded = currentExpandedRows.includes(userId);

    let obj = {};
    isRowExpanded ? (obj[userId] = false) : (obj[userId] = true);
    setExpandState(obj);

    // If the row is expanded, we are here to hide it. Hence remove
    // it from the state variable. Otherwise add to it.
    const newExpandedRows = isRowExpanded
      ? currentExpandedRows.filter((id) => id !== userId)
      : currentExpandedRows.concat(userId);

    setExpandedRows(newExpandedRows);
  };
  const [showProduct1, setShowProduct1] = useState([]);
  const [expandState1, setExpandState1] = useState({});
  const [outgoingState, setOutgoingState] = useState([])
  const [expandState2, setExpandState2] = useState({});
  const [processing, setProcessing] = useState([])
  const [expandState3, setExpandState3] = useState({});

  const showProduct = (e,id) => {
    const currentExpandedRows1 = showProduct1;
    const isRowExpanded1 = currentExpandedRows1.includes(id);

    let obj1 = {};
    isRowExpanded1 ? (obj1[id] = false) : (obj1[id] = true);
    setExpandState1(obj1);
    const newExpandedRows1 = isRowExpanded1
      ? currentExpandedRows1.filter((id1) => id1 !== id)
      : currentExpandedRows1.concat(id);

      setShowProduct1(newExpandedRows1);
  };

  const showOutgoing=(e,id)=>{
    const currentExpandedRows2 = outgoingState;
    const isRowExpanded2 = currentExpandedRows2.includes(id);

    let obj1 = {};
    isRowExpanded2 ? (obj1[id] = false) : (obj1[id] = true);
    setExpandState1(obj1);
    const newExpandedRows2 = isRowExpanded2
      ? currentExpandedRows2.filter((id1) => id1 !== id)
      : currentExpandedRows2.concat(id);

      setOutgoingState(newExpandedRows2);
  }

  const packageProcessing=(e,id)=>{
    const currentExpandedRows3 = processing;
    const isRowExpanded3 = currentExpandedRows3.includes(id);

    let obj1 = {};
    isRowExpanded3 ? (obj1[id] = false) : (obj1[id] = true);
    setExpandState1(obj1);
    const newExpandedRows3 = isRowExpanded3
      ? currentExpandedRows3.filter((id1) => id1 !== id)
      : currentExpandedRows3.concat(id);

      setProcessing(newExpandedRows3);
  }
  return (
    <div>
      {/* <h1>This is Incoming package Page</h1> */}
      <Row>
        <Col md={8}>
          <Form className="mt-2">
            <FormControl
              type="text"
              placeholder="Search Package By Name"
              className="mr-sm-2"
            />
          </Form>
        </Col>

        <Col md={4}>
          <Button
            href="/add-incoming"
            variant="outline-success btn-block"
            type="button">
            +Add new incoming package
          </Button>
        </Col>
      </Row>
      <Row className="my-3">
        <Col md={4}>
          <h2>Incoming Packages </h2>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroupItem>
              <Row>
                <Col md={12}>
                  <i class="fas fa-warehouse mx-3"></i>
                  <strong>At the Warehouse:</strong>
                  {"  "}
                  {warehouse1} Items | status |
                </Col>
                {/* <Col md={6}>
             {incomingPackages.countInStock} Items | status | 
              </Col> */}
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={4} className="text-center align-items-center">
          <ListGroup>
            <ListGroupItem>
              <Row>
                <Col md={6}>
                  <i className="far fa-clock mx-3"></i>
                  <strong>Arriving:</strong>
                  {"  "}
                </Col>
                <Col>{count} Items</Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"> {error} </Message>
      ) : (
        <Table striped border hover responsive className="table-sm">
          <thead>
            <tr>
              <th>NAME</th>
              <th>TRACKING NUMBER</th>
              <th>COUNT IN STOCK</th>
              <th>CREATED AT</th>
              <th>STATUS</th>
            
            </tr>
          </thead>
          <tbody>
            {incomingPackages
              .filter((item) => item.created_by === userInfo.id)
              .map((item) => (
                <>
                  <tr key={item._id} onClick={(event) => handleEpandRow(event, item._id)} style={{cursor:"pointer"}} >
                    <td>{item.name}</td>
                    <td>{item.trackingNumber}</td>
                    <td>{item.countInStock}</td>
                    <td>{item.created_at} </td>
                    <td style={{ color: "green" }}>
                      <strong>{item.status}</strong>{" "}
                    </td>
                    

                    {/* <td>
                      <Button
                        variant="link"
                        onClick={(event) => handleEpandRow(event, item._id)}>
                        {expandState[item._id] ? "Hide" : "Show"}
                      </Button>
                    </td> */}
                  </tr>
                  
                  <>
                    {expandedRows.includes(item._id) ? (
                      <tr>
                        <td colspan="12">
                          <div style={{ padding: "10px" }}>
                            <Row>
                              <Col md={12}>
                                <ListGroup variant="flush">
                                  <ListGroupItem>
                                    <i className="fas fa-box-open m-2"></i>
                                    <Link onClick={(e)=>showProduct(e,item._id) }>
                                      <strong>Products in the package</strong>
                                    </Link>
                                     {showProduct1.includes(item._id) && (
                                      <ListGroup>
                                        <Table
                                          striped
                                          border
                                          hover
                                          responsive
                                          className="table-sm">
                                          <thead>
                                            <tr>
                                              <th>Name</th>
                                              <th>Price</th>
                                              <th>quantity</th>
                                              <th>Total</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {item.product_package.map(
                                              (item) => (
                                                <tr key={item._id}>
                                                  <td>{item.name}</td>
                                                  <td>${item.price}</td>
                                                  <td>{item.quantity}</td>
                                                  <td>
                                                    {" "}
                                                    ${" "}
                                                    {(
                                                      item.quantity * item.price
                                                    ).toFixed(2)}{" "}
                                                  </td>
                                                </tr>
                                              )
                                            )}
                                          </tbody>
                                        </Table>
                                      </ListGroup>
                                    )}
                                  </ListGroupItem>
                                  <ListGroupItem>
                                    <i className="fas fa-box-open m-2"></i>
                                    <Link onClick={(e)=>showOutgoing(e,item._id)} >
                                      <strong>
                                        Request for outgoing package
                                      </strong>
                                    </Link>
                                    {outgoingState.includes(item._id) &&
                                    <ListGroup>
                                      <p className="m-3">If you want to send this package quicker, without uniting it with other packages, create a request for its sending before the package is registered at the warehouse.</p>
                                    <Row>
                                      <Col md={4}>
                                     
                                    <LinkContainer to={`/users/package/${item._id}/outgoing`}>
                                    <Button className="btn  btn-primary m-3">
                                      Create Request
                                    </Button>
                                   </LinkContainer>
                                    </Col>
                                    </Row>
                                    </ListGroup>
                                    }
                                  </ListGroupItem>
                                  <ListGroupItem>
                                    <i className="fas fa-box-open m-2"></i>
                                    <Link onClick={(e)=>packageProcessing(e,item._id)} >
                                      <strong >Package processing</strong>
                                    </Link>
                                    {processing.includes(item._id) &&
                                    <ListGroup>
                                      <spang className="m-3">Processing status</spang>
                                      <p  className="m-3">Created:<span className="ml-2">{item.created_at}</span></p>
                                    </ListGroup>
                                   }
                                  </ListGroupItem>
                                  <ListGroupItem>
                                    <Row>
                                      <Col md={4}>
                                        <i className="far fa-edit m-2"></i>{" "}
                                        <LinkContainer
                                          to={`/users/package/${item._id}/edit`}>
                                          <Button
                                            variant="light"
                                            className="btn-sm">
                                            EDIT
                                          </Button>
                                        </LinkContainer>
                                      </Col>
                                      <Col md={4}>
                                        <i className="fas fa-columns m-2"></i>{" "}
                                        <Link> SPLIT</Link>
                                      </Col>
                                      <Col md={4}>
                                        <i className="fas fa-trash-alt m-2"></i>{" "}
                                        <Button
                                          variant="danger"
                                          className="btn-sm"
                                          onClick={() =>
                                            deleteHandler(item._id)
                                          }>
                                          DELETE
                                        </Button>
                                      </Col>
                                    </Row>
                                  </ListGroupItem>
                                </ListGroup>
                              </Col>
                            </Row>
                          </div>
                        </td>
                      </tr>
                    ) : null}
                  </>
                </>
              ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default IncomingPackage;
