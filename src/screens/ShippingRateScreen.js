import React, { useEffect } from "react";
import { Button, Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getCalculator, deleteRates } from "../actions/calculatorAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { LinkContainer } from "react-router-bootstrap";


function ShippingRateScreen({history}) {
  const dispatch = useDispatch();

  const getCalculators = useSelector((state) => state.getCalculators);
  const { loading, error, calculator } = getCalculators;

  const userLogin  = useSelector(state => state.userLogin)
  const { userInfo  } = userLogin 

  const rateDelete  = useSelector(state => state.rateDelete)
  const { success:successDelete  } = rateDelete

  useEffect(() => {
    if(userInfo && userInfo.isAdmin ){
      dispatch(getCalculator());
   }else{
       history.push('/login')
   }
  //  history.push('/admin/shippingRate')
  }, [dispatch,history,successDelete, userInfo]);

  const deleteHandler = (_id) => {
    if (window.confirm("Are you sure you want to delete this rate?")) {
      dispatch(deleteRates(_id))
    }
    // console.log("delete:",id);
  };
  const createRateHandler = () => {};

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h2>Shipping rate </h2>
        </Col>
        <Col className="text-right">
          <Button
            className="my-3"
            variant="outline-success"
            href="/admin/add-shippingRate">
            <i className="fas fa-plus"> </i> Add Shipping Rates
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger"> {error} </Message>
          ) : (
            <Table striped border hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ZONE</th>
                  <th>REGION</th>
                  <th>RATE_TYPE</th>
                  <th>WEIGHT_TYPE</th>
                  <th>WEIGHT</th>
                  <th>RATE</th>
                  <th>EDIT/DELETE</th>
                </tr>
              </thead>
              <tbody>
                {calculator.map((item) => (
                  <tr key={item._id}>
                    <td>{item.zone}</td>
                    <td>{item.region}</td>
                    <td>{item.rate_type}</td>
                    <td>{item.weight_type}</td>
                    <td>{item.weight}</td>
                    <td>{item.rate}</td>
                    <td>
                      <LinkContainer
                        to={`/admin/shippingRate/${item._id}/edit`}>
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
        </Col>
      </Row>
    </div>
  );
}

export default ShippingRateScreen;
