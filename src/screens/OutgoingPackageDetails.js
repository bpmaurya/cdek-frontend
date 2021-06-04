import React, {useState, useEffect } from "react";
import {useDispatch,useSelector } from 'react-redux'
import {Row,Col,Card,Button } from "react-bootstrap"
import {ListGroup,ListGroupItem} from 'reactstrap';
import {outgoingPackageDetails} from '../actions/outgoingPackageAction';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { OUTGOING_PACKAGE_DETAIL_RESET} from '../constants/outgoingPackageConstant';






function OutgoingPackageDetails({match,history}) {


  const packageId = match.params._id;

  const [product, setProduct] = useState([])
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;



  const singleOutgoingPackage = useSelector((state) => state.singleOutgoingPackage);
  const { error, loading, singlePackage } = singleOutgoingPackage;


  useEffect(() => {
    if (singlePackage._id !== packageId) {
      dispatch(outgoingPackageDetails(packageId));
      // setProduct(singlePackage.outgoing_product)
    } else {
      setProduct(singlePackage.outgoing_product)
    }
    // fetchProduct()
  }, [dispatch, history,singlePackage]);

  const setStatus=()=>{

  }
  

    return (
        <>
     
     {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger"> {error} </Message>
          ) : (
            <Row>
       <Col md={8}>
         <ListGroup variant="flush">
           <ListGroupItem>
             <h3>For Outgoing: </h3>
             <p>
               <strong> shipping address</strong>
             </p>
           </ListGroupItem>

           <ListGroupItem>

           <h2>Payment: </h2>
             <p>
               <strong>Method: </strong> PayPal
             </p>
           </ListGroupItem>
           
           <ListGroupItem>
             <h3>Products:</h3>
             <ListGroup variant="flush">
    
             {product
             .map((item,index)=>(  
               <ListGroupItem key={index}>
                 <Row>
                   <Col>
                   <p>
                     <strong>Name </strong>{item.product_name}
                     </p>        
                   </Col>
                   <Col md={4}>
                   {item.product_quantity}X{item.price}=${ (item.product_quantity*item.price).toFixed(2)}
                   </Col>
                 </Row>

               </ListGroupItem>
                )) }
             </ListGroup>
             </ListGroupItem>

         </ListGroup>

         
         </Col>
         <Col md={4}>
               <Card>
                 <ListGroup variant="flush">
                   <ListGroupItem>
                     <h3>Package Summary</h3>
                   </ListGroupItem>
                   <ListGroupItem>
                     <Row>
                       <Col>
                       Package Name:
                       </Col>
                       <Col>{ singlePackage.outgoing_package_name} </Col>
                     </Row>
                   </ListGroupItem>
                   <ListGroupItem>
                     <Row>
                       <Col>
                       Tracking Number:
                       </Col>
                       <Col>{ singlePackage.trackingNumber} </Col>
                     </Row>
                   </ListGroupItem>
                   <ListGroupItem>
                   <Row>
                       <Col>
                       Created At:
                       </Col>
                       <Col>
                       {singlePackage.created_at}
                       </Col>
                     </Row>
                   </ListGroupItem>
                   <ListGroupItem>
                   <Row>
                       <Col>
                       Created By:
                       </Col>
                       <Col>
                       {userInfo.email}
                       </Col>
                     </Row>
                   </ListGroupItem>
                   <ListGroupItem>
                   <Button 
                     type="button"
                     className="btn-block"
                     onClick={setStatus} >
                      Change Status
                   </Button>
                   </ListGroupItem>

                 </ListGroup>
               </Card>
         </Col>
        
     </Row>
     )}

 </>
        
    
    )}

export default OutgoingPackageDetails
