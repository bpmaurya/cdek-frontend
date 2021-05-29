import { useDispatch,useSelector } from 'react-redux'

import React, { useState, useEffect } from "react";

import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col,Table, Form, FormControl, Button} from "react-bootstrap";
import { listIncomingPackage } from "../actions/incomimgPackageActions"
import Loader from '../components/Loader'
import Message from '../components/Message'

function IncomingPackage({history}) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const incomingPackageList = useSelector(state=> state.incomingPackageList)
  const {error,loading, incomingPackages} = incomingPackageList

  const userLogin  = useSelector(state => state.userLogin)
  const { userInfo  } = userLogin

  useEffect(() => {
    if(userInfo){
      dispatch(listIncomingPackage())
  }else{
      history.push('/login')
  }
    
    // fetchProduct()

  }, [dispatch,history]);

  console.log(incomingPackages);

  const deleteHandler = (id)=>{
    if(window.confirm('Are you sure you want to delete this package?')){
        // dispatch(deleteUsers(id))
        
    }
    // console.log("delete:",id);
    
}
const createPackageHandler = (  )=>{
    //create incoming package

}
  

var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
var reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;

JSON.dateParser = function (key, value) {
    if (typeof value === 'string') {
        var a = reISO.exec(value);
        if (a)
            return new Date(value);
        a = reMsAjax.exec(value);
        if (a) {
            var b = a[1].split(/[-+,.]/);
            return new Date(b[0] ? +b[0] : 0 - +b[1]);
        }
    }
    return value;
};
    

  return (
    <div>
      {/* <h1>This is Incoming package Page</h1> */}
      <Row>
        <Col md={8}>
          <Form className="mt-2">
            <FormControl type="text" placeholder="Search Package By Name" className="mr-sm-2" />
          </Form>
        </Col>

        <Col md={4}>
          <Button
            href="/add-incoming"
            variant="outline-success btn-block"
            type="button">
            +Add new incoming package
          </Button>
        </Col>
      </Row>
      <Row className="my-3">
        <Col md={8}>
          <h2>Incoming Packages </h2>
        </Col>
        {/* <Col md={3}>
          <Form>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          </Form>
        </Col> */}
        <Col md={4} className="text-center align-items-center">
        <Button
            href="/create_outgoing"
            variant="outline-success btn-block"
            type="button">
            +Create New Outgoing package
          </Button>
        </Col>
      </Row>



      {loading
            ? (<Loader/>)
            : error 
            ? (<Message variant='danger' > {error} </Message>)
            :(
               <Table striped border hover responsive className='table-sm'>
                   <thead>
                       <tr>
                       <th>ID</th>
                       <th>NAME</th>
                       <th>TRACKING NUMBER</th>
                       <th>COUNT IN STOCK</th>
                       <th>CREATED AT</th>
                       <th>EDIT/DELETE</th>
                       </tr>
                   </thead>
                   <tbody>
                       {incomingPackages
                       .filter((item) => item.created_by === userInfo.id)
                       .map(user=>(
                           <tr key={user._id} >
                               <td>{user._id}</td>
                               <td>{user.name}</td>
                               <td>{user.trackingNumber}</td>
                               <td>{user.countInStock}</td>
                               <td>{ user.created_at} </td>
                              
                               <td>
                                   <LinkContainer to={`/users/package/${user._id}/edit`} >
                                       <Button variant='light' className='btn-sm' >
                                           <i className='fas fa-edit' ></i>

                                       </Button>
                                   
                                   </LinkContainer>

                                   <Button variant='danger' className='btn-sm'  onClick={()=> deleteHandler(user._id) } >

                                       <i className='fas fa-trash' > </i>

                                   </Button>
                               </td>
                                </tr>
                       ))}
                   </tbody>


               </Table>
            ) }
    </div>
  );
}

export default IncomingPackage;
