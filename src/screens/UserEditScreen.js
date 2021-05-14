import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { login, register, getUserDetails } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

function UserEditScreen({ match, history }) {
  const userId = match.params._id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);

  const { error, loading, user } = userDetails;

  useEffect(() => {
      if(!user.name || user._id !== Number(userId)){
          dispatch(getUserDetails(userId))
      }else{
          setName(user.name)
          setEmail(user.email)
          setIsAdmin(user.isAdmin)
      }
  }, [user,userId]);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log("submit");
  };

  return (
    <div>
      <Link to="/admin/userlist">Go Back</Link>

      <FormContainer>
        <h1>Edit User </h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger"> {error} </Message>
        ) : (
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

            <Form.Group controlId="isadmin">
              <Form.Check
                required
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default UserEditScreen;