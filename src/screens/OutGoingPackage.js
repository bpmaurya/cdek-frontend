import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Row,
  Col,
  Card,
  Table,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  listOutgoingPackage,
  deleteOutgoing,
} from "../actions/outgoingPackageAction";
import { ListGroup, ListGroupItem } from "reactstrap";

function OutGoingPackage({ history }) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getOutgoingPackage = useSelector((state) => state.getOutgoingPackage);
  const { error, loading, outgoingPackages } = getOutgoingPackage;

  const deleteOutgoingPackage = useSelector(
    (state) => state.deleteOutgoingPackage
  );
  const { success: successDelete } = deleteOutgoingPackage;

  useEffect(() => {
    if (userInfo) {
      dispatch(listOutgoingPackage());
    } else {
      history.push("/login");
    }

    // fetchProduct()
  }, [dispatch, history]);

  const deleteHandler = (_id) => {
    if (
      window.confirm("Are you sure you want to delete this outgoing package?")
    ) {
      dispatch(deleteOutgoing(_id));
      window.location.reload(false);
    }
    // console.log("delete:",id);
  };


  // const [count, setCount] = useState('')
  // const v =()=>{
  //   outgoingPackages
  //   .filter((item) => item.created_by === userInfo.id)
  //   .map(item=>(
  //     setCount(item.length)
  //   ))

  // }

  const count = outgoingPackages.filter(item => item.created_by === userInfo._id).length;




  return (
    <div>
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
          <h2>Outgoing Packages </h2>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroupItem>
              <Row>
                <Col md={12}>
                  <i class="fas fa-warehouse mx-3"></i>
                  <strong>At the Warehouse:</strong>
                  {"  "}
                  {count} Items | status |
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
      <Row>
        <Col>
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
                  <th>PRODUCT NAME</th>
                  <th>QUANTITY</th>
                  <th>CREATED AT</th>
                  <th>STATUS</th>
                  <th>EDIT/DELETE</th>
                </tr>
              </thead>
              <tbody>
                {outgoingPackages
                  .filter((item) => item.created_by === userInfo.id)
                  .map((item) => (
                    <tr key={item._id}>
                      <td>{item.outgoing_package_name}</td>
                      <td>{item.trackingNumber}</td>
                      <td>{item.product_name}</td>
                      <td>{(item.outgoing_product).length}</td>
                      <td>{item.created_at} </td>
                      <td style={{color:"red"}} > <strong>{item.status} </strong></td>

                      <td>
                        <LinkContainer to={`/outgoing/edit/${item._id}/edit`}>
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>

                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(item._id)}>
                          <i className="fas fa-trash"> </i>
                        </Button>
                      </td>
                      <td>
                      <LinkContainer to={`/outgoing/user/detail/${item._id}`}>
                        <Button variant="light" className="btn-sm">
                          DETAILS
                        </Button>
                      </LinkContainer>
                    </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default OutGoingPackage;
