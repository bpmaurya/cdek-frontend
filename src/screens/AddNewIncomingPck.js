import React ,{useState,useEffect} from "react";
import { Row, Col, Form, Card,Button } from "react-bootstrap";

function AddNewIncomingPck() {

  const [packageName, setPackageName] = useState('')
  const [trackingNumber, setTrackingNumber] = useState('')
  const [comment, setComment] = useState('')
  const [productType, setProductType] = useState('')
  const [productBrand, setProductBrand] = useState('')
  const [productColor, setProductColor] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productQuantity, setProductQuantity] = useState('')


  const submitHandler = (e)=>{
    e.preventDefault()

    console.log(packageName);
    console.log(productType);

    console.log('submit');

}



  return (
    <div>
      <h1>Add your new Incoming Package here</h1>
      <Row className="my-4">
        <Col md={12}>
          <h3> 1. Order Information</h3>
          <Card className="m-3">
            <Form className="m-3" onSubmit={submitHandler}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Package Name</Form.Label>
                <Form.Control 
                    required
                    type='name'
                    placeholder='enter you package name'
                    value={packageName}
                    onChange={(e)=>setPackageName(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Tracking Number</Form.Label>
                <Form.Control 
                required
                type='name'
                placeholder='tracking number'
                value={trackingNumber}
                onChange={(e)=>setTrackingNumber(e.target.value)}/>
              </Form.Group>
             
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Your Comment</Form.Label>
                <Form.Control required
                    type='name'
                    placeholder='enter you package name'
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)} rows={3} />
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
            <Form className="m-3" onSubmit={submitHandler}>
              <Row>
                <Col md={3}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Product Type</Form.Label>
                    <Form.Control
                    required
                    type='name'
                    placeholder='enter your product type'
                    value={productType}
                    onChange={(e)=>setProductType(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Product Brand</Form.Label>
                    <Form.Control 
                    required
                    type='name'
                    placeholder='enter you product brand'
                    value={productBrand}
                    onChange={(e)=>setProductBrand(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Color/Size</Form.Label>
                    <Form.Control
                     required
                     type='name'
                     placeholder='product color'
                     value={productColor}
                     onChange={(e)=>setProductColor(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control 
                    required
                    type='price'
                    placeholder='price'
                    value={productPrice}
                    onChange={(e)=>setProductPrice(e.target.value)}/>
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
                    <Form.Label>Product Quantity</Form.Label>
                    <Form.Control 
                    required
                    type='quantity'
                    placeholder='product quantity'
                    value={productQuantity}
                    onChange={(e)=>setProductQuantity(e.target.value)} />
                  </Form.Group>
                </Col>
              </Row>
              <Col className="m-3">
              <Button  
                type='submit'
                variant = 'primary'>Save</Button>{' '}
       
       <Button variant="danger">Cancel</Button>{' '}
       </Col>
             
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
       
      </Row>
    </div>
  );
}

export default AddNewIncomingPck;
