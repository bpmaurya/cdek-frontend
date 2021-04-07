import React from "react";
import { Row, Col, Form, Card,Button } from "react-bootstrap";

function AddNewIncomingPck() {
  return (
    <div>
      <h1>Add your new Incoming Package here</h1>
      <Row className="my-4">
        <Col md={12}>
          <h3> 1. Order Information</h3>
          <Card className="m-3">
            <Form className="m-3">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Package Name</Form.Label>
                <Form.Control type="text" placeholder="package name" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Tracking Number</Form.Label>
                <Form.Control type="text" placeholder="tracking number" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select Warehouse</Form.Label>
                <Form.Control as="select">
                  <option>Warehouse 1</option>
                  <option>Warehouse 2</option>
                  <option>Warehouse 3</option>
                  <option>Warehouse 4</option>
                  <option>Warehouse 5</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Your Comment</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <h3> 2. Product Information</h3>
          <Card>
            <p className="m-3">
              Please, give a detailed description of each item in your order.
              This data will be used for the customs declaration.
            </p>
            <h4 className="mx-3">Product 1</h4>
            <Form className="m-3">
              <Row>
                <Col md={3}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Product Type</Form.Label>
                    <Form.Control type="text" placeholder="product type" />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Product Brand</Form.Label>
                    <Form.Control type="text" placeholder="product brand" />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Color/Size</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="product color/size"
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Product Name(in English)</Form.Label>
                    <Form.Control type="text" placeholder="package name" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={8}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Link To the Product</Form.Label>
                    <Form.Control type="text" placeholder="" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Product Colour</Form.Label>
                    <Form.Control type="text" placeholder="" />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <Col md={4}>
            <Button
                    href=""
                    variant="outline-success btn-block"
                    type="button">
                    +Add New Product
                  </Button>
                  </Col>
          </Card>
        </Col>
        <Col className="m-3">
        <Button variant="success">Save</Button>{' '}
        <Button variant="danger">Cancel</Button>{' '}
        </Col>
      </Row>
    </div>
  );
}

export default AddNewIncomingPck;
