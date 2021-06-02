import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserAddress, createAddress } from "../actions/addressAction";

function AddAddresses({history}) {

    

    const [address, setAddress] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState("")
    const [recipient, setRecipient] = useState("")


    const dispatch = useDispatch();

    const getAddress = useSelector((state) => state.getAddress);
    const { loading, error, address:getAdd } = getAddress;
  
    const userLogin  = useSelector(state => state.userLogin)
    const { userInfo  } = userLogin

    const createNewAddress = useSelector((state) => state.createNewAddress);
    const { loading:newAdd, error:newError, success } = createNewAddress;
  



  const addressData = {
    address: address,
    zipcode: zipcode,
    city: city,
    country: country,
    recipient: recipient,
    created_by: userInfo._id,
  };

  useEffect(() => {
    if(userInfo){
        dispatch(getUserAddress());
    }else{
        history.push('/login')
    }
    }, [dispatch,history]);


    const deleteHandler =()=>{
        if(window.confirm('Are you sure you want to delete this address?')){
            
        }
    }
    const submitHandler =(e)=>{
      // e.preventDefault()
      console.log(addressData);
      dispatch(createAddress(addressData) )
    }



  return (
    <>
      <Row>
        <Col md={6}>
            <h2>Add Address</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formGridAddress1">
              <Form.Label>Address1</Form.Label>
              <Form.Control 
              required
              placeholder="1234 Main St"
              value={address}
              onChange={(e) => setAddress(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor"
               value={address}
               onChange={(e) => setAddress(e.target.value)}  />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmadil">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" placeholder="Enter Country" 
                required
                 value={country}
                 onChange={(e) => setCountry(e.target.value)} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Recipient</Form.Label>
                <Form.Control
                required type="text" placeholder="Enter Recipient"
                 value={recipient}
                 onChange={(e) => setRecipient(e.target.value)}  />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                required 
                 value={city}
                 onChange={(e) => setCity(e.target.value)}  />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control as="select" defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control 
                required
                 value={zipcode}
                 onChange={(e) => setZipcode(e.target.value)}  />
              </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit">
              Add Address
            </Button>
          </Form>
        </Col>

        <Col md={6}>
        {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"> {error} </Message>
      ) : (
        <Table striped border hover responsive className="table-sm">
          <thead>
            <tr>
            
              <th>ADDRESS</th>
              <th>ZIPCODE</th>
              <th>CITY</th>
              <th>COUNTRY</th>
              <th>RECIPIENT</th>
              <th>EDIT/DELETE</th>
            </tr>
          </thead>
          <tbody>
            {getAdd
            .filter((item) => item.created_by === userInfo._id)
            .map((item) => (
              <tr key={item._id}>
             
                <td>{item.address}</td>
                <td>{item.zipcode}</td>
                <td>{item.city}</td>
                <td>{item.country}</td>
                <td>{item.recipient}</td>

                <td>
                  <LinkContainer to={`/address/${item._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(item._id)}>
                    <i className="fas fa-trash"> </i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
        </Col>
      </Row>
    </>
  );
}

export default AddAddresses;
