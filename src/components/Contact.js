import React from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
function Contact() {
  return (
    <Row>
      <Col md={8}>
        <Row className="my-4">
          <Col md={6}>
            <h3 style={{ color: "#1ab248" }} ><i className="fas fa-phone-volume"></i> Office phone</h3>
            <h3>8-800-250-6915</h3>
          </Col>
          <Col md={6}>
          <h3 style={{ color: "#1ab248" }} > <i className="fas fa-envelope-open-text"></i> Corporate email: </h3>
             <a>mf@cdek.ru</a>
          </Col>
        </Row>
        <h1>Contact Component</h1>

        <h3>Feedback form</h3>
        <p>
          Feedback form We are glad to answer your questions. Please submit the
          form below. Do you want to get an answer to your question quickly?
          Check out the FAQ section, where we have answers to the most popular
          questions. If your question is about when the incoming package will be
          entered into the system, we would like to remind you that we need 1-2
          business to do it, rarely a little longer. We advise you to write on
          this issue only if the package has not been entered into the system
          for more than 3 days.
        </p>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>WareHouse select</Form.Label>
            <Form.Control as="select">
              <option>WareHouse 1</option>
              <option>WareHouse 2</option>
              <option>WareHouse 3</option>
              <option>WareHouse 4</option>
              <option>WareHouse 5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Your Message</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
        <Button href="/incoming" variant="success btn-block" type="button">
          submit
        </Button>
      </Col>
    </Row>
  );
}

export default Contact;
