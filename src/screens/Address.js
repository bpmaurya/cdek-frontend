import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserAddress } from "../actions/addressAction";

function Address({history}) {
  const dispatch = useDispatch();

  const getAddress = useSelector((state) => state.getAddress);
  const { loading, error, address } = getAddress;

  const userLogin  = useSelector(state => state.userLogin)
  const { userInfo  } = userLogin

  useEffect(() => {

    if(userInfo){
      dispatch(getUserAddress());
  }else{
      history.push('/login')
  }
  }, [dispatch,history]);

  const deleteHandler =()=>{
      
  }
  const createAddressHandler=()=>{
    history.push('/address/add')

  }

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h2>Address </h2>
        </Col>
        <Col className="text-right">
          <Button className="my-3  " variant="outline-success btn-block" href='/address/add'  >
            <i className="fas fa-plus"></i> CREATE NEW ADDRESS
          </Button>
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
              <th>ID</th>
              <th>ADDRESS</th>
              <th>ZIPCODE</th>
              <th>CITY</th>
              <th>COUNTRY</th>
              <th>RECIPIENT</th>
              <th>EDIT/DELETE</th>
            </tr>
          </thead>
          <tbody>
            {address
            .filter((item) => item.created_by === userInfo._id)
            .map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.address}</td>
                <td>{item.zipcode}</td>
                <td>{item.city}</td>
                <td>{item.country}</td>
                <td>{item.recipient}</td>

                <td>
                  <LinkContainer to={`/address/${item._id}/edit`}>
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
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Address;
