import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { login, register, getUserDetails,updateUserProfile } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { USER_PROFILE_RESET } from '../constants/userConstant'

function ProfileScreen({ location, history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id ) {
          dispatch({
              type:USER_PROFILE_RESET
          })
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user,success]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("password do not match");
    } else {
        dispatch(updateUserProfile({
            'id':user._id,
            'name':name,
            'email':email,
            'password':password
        }))
        console.log("Updating");
    }

    console.log("submit");
  };

  return (
    <Row>
      <Col md={3}>
        <h2>UserProfile</h2>

        {message && <Message variant="danger"> {message} </Message>}
        {error && <Message variant="danger"> {error} </Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              
              type="name"
              placeholder="enter you name"
              value={name}
              onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              
              type="email"
              placeholder="enter you email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Your Password</Form.Label>
            <Form.Control
              
              type="password"
              placeholder="enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Retype Password</Form.Label>
            <Form.Control
              
              type="password"
              placeholder="enter your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>UserProfile</h2>
      </Col>
    </Row>
  );
}

export default ProfileScreen;
