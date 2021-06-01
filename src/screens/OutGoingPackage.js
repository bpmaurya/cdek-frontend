import { useDispatch,useSelector } from 'react-redux'
import React, { useState, useEffect } from "react";
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col,Card,Table, Form, FormControl, Button} from "react-bootstrap";
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOutgoingPackage, deleteOutgoing } from '../actions/outgoingPackageAction'



function OutGoingPackage({history}) {
  const dispatch = useDispatch()
  const userLogin  = useSelector(state => state.userLogin)
  const { userInfo  } = userLogin

  const  getOutgoingPackage = useSelector(state=> state.getOutgoingPackage)
  const {error,loading, outgoingPackages} =   getOutgoingPackage

  const  deleteOutgoingPackage = useSelector(state=> state.deleteOutgoingPackage)
  const { success:successDelete } =   deleteOutgoingPackage





  useEffect(() => {
    if(userInfo){
      dispatch(listOutgoingPackage())
  }else{
      history.push('/login')
  }
    
    // fetchProduct()

  }, [dispatch,history]);


  const deleteHandler = (_id)=>{
    if(window.confirm('Are you sure you want to delete this outgoing package?')){
        dispatch(deleteOutgoing(_id))
        window.location.reload(false);
    }
    // console.log("delete:",id);
}
  return (
    <div>
      <h2>THis is OutGoing package Page</h2>
      <Row>
        <Col>
        {loading
            ? (<Loader/>)
            : error 
            ? (<Message variant='danger' > {error} </Message>)
            :(
               <Table striped border hover responsive className='table-sm'>
                   <thead>
                       <tr>
                     
                       <th>NAME</th>
                       <th>TRACKING NUMBER</th>
                       <th>PRODUCT NAME</th>
                       <th>QUANTITY</th>
                       <th>CREATED AT</th>
                       <th>STATUS</th>
                       <th>EDIT/DELETE</th>
                       </tr>
                   </thead>
                   <tbody>
                       {outgoingPackages
                       .filter((item) => item.created_by === userInfo.id)
                       .map(item=>(
                           <tr key={item._id} >
                              
                               <td>{item.outgoing_package_name}</td>
                               <td>{item.trackingNumber}</td>
                               <td>{item.product_name}</td>
                               <td>{item.product_quantity}</td>

                               <td>{item.created_at} </td>
                               <td>{item.status} </td>
                              
                               <td>
                                   <LinkContainer to={`/outgoing/edit/${item._id}/edit`} >
                                       <Button variant='light' className='btn-sm' >
                                           <i className='fas fa-edit' ></i>

                                       </Button>
                                   
                                   </LinkContainer>

                                   <Button variant='danger' className='btn-sm'  onClick={()=> deleteHandler(item._id) } >

                                       <i className='fas fa-trash' > </i>

                                   </Button>
                               </td>
                                </tr>
                       ))}
                   </tbody>


               </Table>
            ) }
        </Col>
      </Row>
    </div>
  );
}

export default OutGoingPackage;
