import { useDispatch, useSelector } from "react-redux";
import React, {useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col,  Button, Card } from "react-bootstrap";
import { listIncomingPackage } from "../actions/incomimgPackageActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { logout } from "../actions/userActions";

function Office({ location, history }) {
  const dispatch = useDispatch();
  const incomingPackageList = useSelector((state) => state.incomingPackageList);
  const { error, loading, incomingPackages } = incomingPackageList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const logoutHandler = () => {
    console.log("logout");
    dispatch(logout());
  };

  useEffect(() => {
    if (userInfo) {
    dispatch(listIncomingPackage());
    }else{
      history.push("/login");
    }
    // fetchProduct()
    //   if(!userInfo){
    //     history.push(redirect)
    //  }
  }, [dispatch, history]);

  var count=0
  if(userInfo){
    for ( var i=0; i<=incomingPackages.length; i++ ){
      if(userInfo._id === (incomingPackages['created_by'])){
        i+=1;
      }
    }
  }
  console.log( JSON.stringify(incomingPackages['created_by']));
  

  return (
    <div>
      {/* <Link to="/" className="btn btn-light my-3">
        MY Page
      </Link> */}
      <h2>MY PAGE</h2>
      <Row>
        <Col className="col-md-6 col-sm-6 col-xs-10 ">
          <Card style={{ backgroundColor: "#f5f5f6" }}>
            <div className="m-5 text-center">
              <div className="profile">
                <div className="info-client">
                  <div className="num m-4">
                    Customer number: {userInfo.id}{" "}
                  </div>
                  <div className="fio">{userInfo.name} </div>
                  <li>
                    <a href="/profile" className="profile-link">
                      Profile
                    </a>
                  </li>
                 
                  <li>
                    <a href="/recipient" className="recipients">
                      Recipients
                    </a>
                  </li>
                  <li>
                    <a href="/address" className="address">
                      Delivery addresses
                    </a>
                  </li>
                 
                  <div className="line">
                    <Link onClick={logoutHandler} to="/" className="exit">
                      Log out
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>

            <Col className="col-md-3 col-sm-6 col-xs-10">
              <Card
                style={{ background: "#e5fae8" }}
                className="text-center text-align-center item-align-center">
                <div className="m-3" style={{ color: "red" }}>
                  <i className="fas fa-hand-paper fa-6x"></i>
                </div>
                <div className="m-3">
                  <p>Incoming Package Items</p>
                </div>
                <div className="m-3">
                  <Button
                    href="/add-incoming"
                    variant="outline-success btn-block"
                    type="button">
                    Create Incoming Package
                  </Button>
                </div>
              </Card>
            </Col>
            <Col className="col-md-3 col-sm-6 col-xs-10">
              <Card className="text-center" style={{ background: "#dff5ff" }}>
                <div className="m-3" style={{ color: "red" }}>
                  <i className="fas fa-hand-paper fa-6x "></i>
                </div>
                <div className="m-3">
                  <p>Outgoing Package Items</p>
                </div>
                <div className="m-3">
                  <Button
                    href="/incoming"
                    variant="outline-success btn-block"
                    type="button">
                    Create Outgoing Package
                  </Button>
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
                <Link to="/incoming" style={{ textDecoration: "none" }}>
                  <h2 style={{ color: "#1ab248" }}>
                    <i className="fas fa-box-open"></i> Incoming Packages
                  
                  </h2>
                </Link>
              </div>

              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error} </Message>
              ) : (
                <div>
                  <div>
                    <p>New Incoming:  {count}{i}    items</p>
                  </div>
                  <div>
                    <p>In stock: 0 items</p>
                  </div>
                  <div>
                    <Button
                      href="/incoming"
                      variant="outline-success btn-block"
                      type="button">
                      View Incoming Package
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </Col>

        <Col className="col-md-6 col-sm-6 col-xs-12">
          <Card>
            <div className="m-5 text-center">
              <div>
                <p>New Outgoing packages and packages in stock</p>
                <h2 style={{ color: "#1ab248" }}>
                  {" "}
                  <i className="fas fa-box-open"></i> OutGoing Packages
                </h2>
              </div>

              <div>
                <p>Outgoing package : 0 items</p>
              </div>
              <div>
                <p>In stock: 0 items</p>
              </div>
              <div>
                <Button
                  href="/outgoing"
                  variant="outline-success btn-block"
                  type="button">
                  View OutGoing Package
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Office;
