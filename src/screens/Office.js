import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";

function Office() {
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        MY Page
      </Link>

      <Row>
        <Col  className="col-md-6 col-sm-6 col-xs-12">
          <Card>
            <div className="m-5 text-center">
              <div>
                <p>New incoming packages and packages in stock</p>
                <h2 style={{ color: "#1ab248" }}>
                  <i className="fas fa-box-open"></i> Incoming Packages
                </h2>
              </div>

              <div>
                <p>New Incoming: 4 items</p>
              </div>
              <div>
                <p>In stock: 0 items</p>
              </div>
              <div>
                <Button
                  href="/incoming"
                  variant="outline-success btn-block"
                  type="button">
                  New Incoming Package
                </Button>
              </div>
            </div>
          </Card>
        </Col>

        <Col  className="col-md-6 col-sm-6 col-xs-12">
          <Card style={{ backgroundColor: "#f5f5f6" }}>
            <div className="m-5 text-center">
              <div className="profile">
                <div className="info-client">
                  <div className="num m-4">Customer number: #51463</div>
                  <div className="fio">Nvidia Shield</div>
                  <li>
                    <a href="/office/profile" className="profile-link">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="/office/tariff" className="tariff">
                      Tariff: Standard
                    </a>
                  </li>
                  <li>
                    <a href="/office/recipient" className="recipients">
                      Recipients
                    </a>
                  </li>
                  <li>
                    <a href="/office/address" className="address">
                      Delivery addresses
                    </a>
                  </li>
                  <li>
                    <a href="/office/profile/password" className="change-password">
                      Change password
                    </a>
                  </li>
                  <div className="line">
                    <a href="/logout" className="exit">
                      Log out
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="my-5">
        <Col className="col-md-6 col-sm-6 col-xs-12">
          <Card>
            <div className="m-5 text-center">
              <div>
                <p>New incoming packages and packages in stock</p>
                <h2 style={{ color: "#1ab248" }}>
                  {" "}
                  <i className="fas fa-box-open"></i> OutGoing Packages
                </h2>
              </div>

              <div>
                <p>New Incoming: 4 items</p>
              </div>
              <div>
                <p>In stock: 0 items</p>
              </div>
              <div>
                <Button
                  href="/outgoing"
                  variant="outline-success btn-block"
                  type="button">
                  New OutGoing Package
                </Button>
              </div>
            </div>
          </Card>
        </Col>

        <Col md={6}>
          <Row>
            <Col className="col-md-6 col-sm-6 col-xs-12">
              <Card
                style={{ background: "#e5fae8" }}
                className="text-center text-align-center item-align-center">
                <div className="m-3" style={{color:"red"}}>
                  <i className="fas fa-hand-paper fa-9x"></i>
                </div>
                <div className="m-3">
                  <p>Prohibited Shipping Items</p>
                </div>
                <div className="m-3">
                  <Button
                    href="/view"
                    variant="outline-success btn-block"
                    type="button">
                    View a list
                  </Button>
                </div>
              </Card>
            </Col>
            <Col className="col-md-6 col-sm-6 col-xs-12">
              <Card
                className="text-center"
                style={{ background: "#dff5ff" }}>
                <div className="m-3" style={{color:"red"}}>
                  <i className="fas fa-hand-paper fa-9x "></i>
                </div>
                <div className="m-3">
                  <p>customer Limit In Russia</p>
                </div>
                <div className="m-3">
                  <Button
                    href="/view"
                    variant="outline-success btn-block"
                    type="button">
                    View a list
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col className="col-md-6 col-sm-6 col-xs-12">
          <h2>News Feed</h2>
          <p>No News Feed Till now</p>
        </Col>
        <Col>
          <Col className="col-md-12 col-sm-6 col-xs-12" style={{ height: "40vh" }}>
            <h2>
              <i className="fas fa-location"></i>Your warehouse location:
            </h2>
            <p>No News Feed Till now</p>
          </Col>
          <Col className="col-md-12 col-sm-6 col-xs-12" style={{ height: "40vh" }}>
          <Button variant="success">New Castle</Button>{' '}
          <Button variant="outline-success">Boca Raton</Button>{' '}
            <p>
              101 Lukens drive suite H , New Castle, Delaware (DE) 19720
              +1-929-999-57-97
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  );
}

export default Office;
