import { useDispatch,useSelector } from 'react-redux'
import axios from "axios";
import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import { Row, Col, Form, FormControl, Button, Card,Collapse,Image} from "react-bootstrap";
import { listIncomingPackage } from "../actions/incomimgPackageActions"
import Loader from '../components/Loader'
import Message from '../components/Message'

function IncomingPackage({}) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const incomingPackageList = useSelector(state=> state.incomingPackageList)
  const {error,loading, incomingPackages} = incomingPackageList

  useEffect(() => {

    dispatch(listIncomingPackage())
    // fetchProduct()

  }, [dispatch]);

  console.log(incomingPackages);
  

  return (
    <div>
      {/* <h1>This is Incoming package Page</h1> */}
      <Row>
        <Col md={8}>
          <Form>
            <FormControl type="text" placeholder="Search Package By Name" className="mr-sm-2" />
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
        <Col md={6}>
          <h2>Incoming Packages </h2>
        </Col>
        {/* <Col md={3}>
          <Form>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          </Form>
        </Col> */}
        <Col md={3} className="text-center align-items-center">
          {/* <p> arriving {incomingPackages.length} items </p> */}
        </Col>
      </Row>



      {loading ? <Loader/>
        : error ? <Message variant='danger' >{error} </Message>
        : <Row>
        {incomingPackages.map((product) => (
          <Card className="container p-md-3 m-3">
              <Link to={`/incoming/${product._id}`} >
            <Row>
              <Col
                md={4}
                // onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}>
                <a  style={{ color: "#4bbf73", fontWeight: "bold" }}>
                  {" "}
                  {product.name}
                </a>
              </Col>
              <Col md={4}>
                <h4>Package_id </h4>
                <p> {product._id} </p>
                {/* <h4>Products- 2 </h4> */}
              </Col>
              <Col md={4}>
                <h4>Created at </h4>
                <p>{product.created_at} </p>
                {/* <p> {product.user.profile.id} </p> */}
              </Col>
            </Row>
            </Link> 
            
            {/* <Row>
              <Col md={12}>
                <Collapse in={open}>
                  <div id="example-collapse-text">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life
                    accusamus terry richardson ad squid. Nihil anim keffiyeh
                    helvetica, craft beer labore wes anderson cred nesciunt
                    sapiente ea proident.
                  </div>
                </Collapse>
              </Col>
            </Row> */}

          </Card>
        ))}
      </Row>
       }
     

      {/* <Row>
        <Card className="container p-md-3 m-3">
          <Row>
            <Col md={4}>
              <p>Select all Packagee</p>
            </Col>
            <Col md={4}>
              <h4>Package_id </h4>
              <p> product._id </p>
            </Col>
            <Col md={4}>
              <h4>Product </h4>
              <p> 20 </p>
            </Col>
          </Row>
        </Card>
      </Row> */}

      {/* <Row className="text-center">
        {incomingPackages.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <h3> {product.name} </h3>
            <br />
            <p> {product._id} </p>
            <br />
            <h3>{product.user} </h3>
            <br />
            <p>{product.product} </p>
          </Col>
        ))}
      </Row> */}
    </div>
  );
}

export default IncomingPackage;
