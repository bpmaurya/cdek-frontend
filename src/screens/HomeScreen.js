import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import logo from "../img/girl.png";
import good from "../img/goods.png";
import girl from "../img/girl.jpg";

function HomeScreen() {
  return (
    <div>
      <Row className="align-items-center">
        <Col md={6} style={{ width: "100", height: "100" }}>
          <div className="my-4">
            <h1>Reduce the distance, unite the world!</h1>
          </div>
          <div className="my-4">
            <p>
              The CDEK Forward service provides a personal address abroad to
              send products from local online stores to it. We will consolidate
              all your packages and deliver them to you, your friends or
              customers directly.
            </p>
          </div>
          <div className="my-5">
            <Button className=" btn btn-primary btn-lg">Sign Up</Button>
          </div>
        </Col>
        <Col md={6}>
          <div >
            <img src={logo}  className="img-fluid"/>
          </div>
        </Col>
      </Row>

      <Row className="m-3">
        <Col md={6}>
          <div>
            <img  className="img-fluid" src={good} />
          </div>
        </Col>
        <Col md={6}>
          <h1>We deliver from U.S.-based stores</h1>
          <div>
            <p>
              For individuals: we'll deliver your parcels within 7 days and from
              $10, you'll be able to monitor the process 24/7, and we'll perform
              customs procedures. We'll deliver your purchases to you or your
              friends: to the nearest CDEK pick-up point or personally in hands.
              For wholesale customers: we'll sort the packages, collect your
              customers' passport data and arrange delivery directly to the end
              customers. At lower prices: from $9.
            </p>
          </div>
          <div className="my-5">
            <Button className=" btn btn-primary btn-lg">Sign Up</Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card>
            <Row>
              <Col md={6} className="">
                <div className="m-4">
                  <h1>
                    We know about the best deals in the USA and are glad to
                    share them with you
                  </h1>
                  <p>Join us!</p>
                </div>
                <Row>
                  <Col md={6} >
                      <div className="m-4">
                    <div style={{ color: "#1ab248" }}>
                      <i className="fas fa-box-open fa-9x"></i>
                    </div>
                    <p>How can you find discounts up to 50%-80%?</p>
                    </div>
                  </Col>
                  <Col md={6}>
                       <div className="m-4">
                    <div style={{ color: "#1ab248" }}>
                      <i className="fas fa-box-open fa-9x"></i>
                    </div>
                    <p>What can you buy favourably in the United States?</p>
                    </div>
                  </Col>
                </Row>
                <div className="m-5">
                  <Button className=" btn btn-primary btn-lg">Sign Up</Button>
                </div>
              </Col>
              <Col md={6}>
                <div>
                  <img  className="img-fluid" src={girl} />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default HomeScreen;
