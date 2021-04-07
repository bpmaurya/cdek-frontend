import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Form, FormControl, Button, Card,Collapse} from "react-bootstrap";
import API from "../apiUrl.json";
function IncomingPackage() {
  const [incomingPackages, setIncomingPackages] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchIncomingPackage() {
      var url = API.baseUrl + API.incomingPackage;
      const { data } = await axios.get(url);
      setIncomingPackages(data);
      console.log(data);
    }

    fetchIncomingPackage();
  }, []);

  return (
    <div>
      {/* <h1>This is Incoming package Page</h1> */}
      <Row>
        <Col md={8}>
          <Form>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
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
          <h2>incomingPackg </h2>
        </Col>
        <Col md={3}>
          <Form>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          </Form>
        </Col>
        <Col md={3} className="text-center align-items-center">
          <p> arriving 2 items </p>
        </Col>
      </Row>

      <Row>
        {incomingPackages.map((product) => (
          <Card className="container p-md-3 m-3">
            <Row>
              <Col
                md={4}
                onClick={() => setOpen(!open)}
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
              </Col>
              <Col md={4}>
                <h4>Product </h4>
                <p> 20 </p>
              </Col>
            </Row>
            <Row>
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
            </Row>
          </Card>
        ))}
      </Row>

      <Row>
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
      </Row>

      <Row className="text-center">
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
      </Row>
    </div>
  );
}

export default IncomingPackage;
