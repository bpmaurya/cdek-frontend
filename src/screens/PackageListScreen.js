import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listUsers, deleteUsers } from "../actions/userActions";
import { listIncomingPackage } from "../actions/incomimgPackageActions";
import { ListGroup, ListGroupItem } from "reactstrap";

function PackageListScreen({ history, match }) {
  const dispatch = useDispatch();

  const incomingPackageList = useSelector((state) => state.incomingPackageList);
  const { error, loading, incomingPackages } = incomingPackageList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listIncomingPackage());
    } else {
      history.push("/login");
    }
    // history.push('/admin/userlist')
  }, [dispatch, history, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // dispatch(deleteUsers(id))
    }
    // console.log("delete:",id);
  };
  const createPackageHandler = () => {
    //create incoming package
  };

  const warehouse1 = incomingPackages.filter(
    (item) => item.full_received === "YES"
  ).length;

  return (
    <div>
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
                  <strong>Package:</strong>
                  {"  "}
                </Col>
                <Col>{incomingPackages.length} Items</Col>
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
              <th>PACKAGE NAME</th>
              <th>USER</th>
              <th>TRACKING NUMBER</th>
              <th>COUNT IN STOCK</th>
              <th>STATUS</th>
              <th>CREATED AT</th>
              <th>EDIT/DELETE</th>
            </tr>
          </thead>
          <tbody>
            {incomingPackages.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.created_by}</td>
                <td>{user.trackingNumber}</td>
                <td>{user.countInStock}</td>
                <td style={{color:"red"}} > <strong>{user.status} </strong></td>
                <td>{user.created_at}</td>

                <td>
                  <LinkContainer to={`/admin/package/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}>
                    <i className="fas fa-trash"> </i>
                  </Button>
                </td>
                <td>
                  {/* <LinkContainer to={`/incoming/detail/${user._id}`}>
                    <Button variant="light" className="btn-sm">
                      DETAILS
                    </Button>
                  </LinkContainer> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default PackageListScreen;
