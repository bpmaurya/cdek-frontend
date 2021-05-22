import React, { useState, useEffect } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import logo from "../img/girl.png";
import good from "../img/goods.png";
import girl from "../img/girl.jpg";
import how1 from "../img/how-1.svg";
import how2 from "../img/how-2.svg";
import how3 from "../img/how-3.svg";
import how4 from "../img/how-4.svg";
import { getCalculator } from "../actions/calculatorAction";

function HomeScreen({}) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const getCalculators = useSelector((state) => state.getCalculators);
  const { loading, error, calculator } = getCalculators;

  useEffect(() => {
    dispatch(getCalculator());
  }, [dispatch]);
  
  const [region, setRegion] = useState('')
  const [weight, setWeight] = useState('')

  function handleChangeRegion(e){
      setRegion(e.target.value)
  }
 

  const rate = parseInt(weight)*parseInt(weight)

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
          {!userInfo && (
            <div className="my-5">
              <Link to="/register" className=" btn btn-success btn-lg p-3">
                Sign Up
              </Link>
            </div>
          )}
        </Col>
        <Col md={6}>
          <div>
            <img src={logo} className="img-fluid" />
          </div>
        </Col>
      </Row>

      <Row className="text-center">
        <Col md={12}>
          <h1>Delivery cost from the USA</h1>
          <p>CDEK company delivers at two tariffs. More</p>

          <div className="m-5">
            <Link
              to="/register"
              className=" btn btn-outline-success  btn-lg p-3">
              Tariff «Standard»
            </Link>
          </div>
          <Card className="half-width">
          {loading ? (
                      <Loader />
                    ) : error ? (
                      <Message variant="danger"> {error} </Message>
                    ) : (

            <Form className="m-3">
              <Row className="item-align-content-center">
                <Col md={4}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Region </Form.Label>
                    {/* <Form.Control
                      required
                      name="productType"
                      type="name"
                      placeholder="enter your city"
                      // value={productType}
                      // onChange={(e) => setProductType(e.target.value)}
                    /> */}
                    
                      <Form.Control as="select">
                      <option value="" disabled selected hidden>Select Region...</option>
                        {calculator.map((item) => (
                          <option onChange={handleChangeRegion}>
                            {item.zone} {item.region} {item.zone_city} {" "}
                          </option>
                        ))}
                      </Form.Control>
                    
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Product Weight </Form.Label>
                    <Form.Control
                      required
                      name="productWeight"
                      type="number"
                      placeholder="enter package weight"
                      // value={productBrand}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                    {/* <Form.Control as="select"  >
                    <option value="" disabled selected hidden>Select Weight...</option>
                        {calculator.map((item) => (
                          <option onChange={handleChangeWeight} >
                            {item.weight}{" "}
                          </option>
                        ))}
                      </Form.Control> */}
                    
                  </Form.Group>
                </Col>
                { rate>=1 &&
                <Col md={4}>
                     <h5 style={{color:"green"}}>Delivery price:${rate} </h5>
                </Col>
}
              </Row>
            </Form>
          )}
          </Card>
        </Col>
      </Row>

      <Row className="m-3">
        <Col md={6}>
          <div>
            <img className="img-fluid" src={good} />
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
          {!userInfo && (
            <div className="my-5">
              <Link to="/register" className=" btn btn-success btn-lg p-3">
                Sign Up
              </Link>
            </div>
          )}
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card>
            <Row className="m-3">
              <Col md={6} className="">
                <div className="m-4">
                  <h1>
                    We know about the best deals in the USA and are glad to
                    share them with you
                  </h1>
                  <p>Join us!</p>
                </div>
                <Row>
                  <Col md={6}>
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
                {!userInfo && (
                  <div className="m-5">
                    <Link
                      to="/register"
                      className=" btn btn-success btn-lg p-3">
                      Sign Up
                    </Link>
                  </div>
                )}
              </Col>
              <Col md={6}>
                <div>
                  <img className="img-fluid" src={girl} />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <div className="text-center m-4">
        {" "}
        <h1>How does It Word</h1>
      </div>
      <Row className="m-5 ">
        {/* <h1>How does it work?</h1> */}
        <Col md={3}>
          <div>
            <img src={how1} className="img-fluid" />
          </div>
          <div>
            <h3>1. Create an account</h3>
          </div>
          <div>
            <p>Get an address for shipping your purchases from abroad</p>
          </div>
        </Col>
        <Col md={3}>
          <div>
            <img src={how2} className="img-fluid" />
          </div>
          <div>
            <h3>2. Do Shopping</h3>
          </div>
          <div>
            <p>
              Buy products in online stores from North America, Europe and Asia
              and send them to our warehouse
            </p>
          </div>
        </Col>
        <Col md={3}>
          <div>
            <img src={how3} className="img-fluid" />
          </div>
          <div>
            <h3>3. Consolidate packages</h3>
          </div>
          <div>
            <p>
              After receiving your orders in the warehouse, you can consolidate
              them and send to yourself, friends or directly to your customer
            </p>
          </div>
        </Col>
        <Col md={3}>
          <div>
            <img src={how4} className="img-fluid" />
          </div>
          <div>
            <h3>4. Receive</h3>
          </div>
          <div>
            <p>
              The parcel will be delivered door-to-door or to the nearest CDEK
              pick-up point
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default HomeScreen;
