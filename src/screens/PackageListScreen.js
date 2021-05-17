import React,{useState,useEffect}  from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button,Row,Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers,deleteUsers } from '../actions/userActions'
import { listIncomingPackage } from "../actions/incomimgPackageActions"



function PackageListScreen({ history,match }) {
    const dispatch = useDispatch()
   
    const incomingPackageList = useSelector(state => state.incomingPackageList)
    const {error,loading, incomingPackages} = incomingPackageList

    const userLogin  = useSelector(state => state.userLogin)
    const { userInfo  } = userLogin 



    useEffect(() => {
        if(userInfo && userInfo.isAdmin ){
            dispatch(listIncomingPackage())
        }else{
            history.push('/login')
        }
        // history.push('/admin/userlist')
    }, [dispatch,history,userInfo])


    const deleteHandler = (id)=>{
        if(window.confirm('Are you sure you want to delete this user?')){
            // dispatch(deleteUsers(id))
            
        }
        // console.log("delete:",id);
        
    }
    const createPackageHandler = (  )=>{
        //create incoming package

    }

    return (
        <div>
            <Row className="align-items-center">
                <Col>
                <h2>Incoming Packages </h2>
                
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={createPackageHandler} >
                        <i className="fas fa-plus" > CREATE OUTGOING PACKAGE </i>
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
                       {incomingPackages.map(user=>(
                           <tr key={user._id} >
                               <td>{user._id}</td>
                               <td>{user.name}</td>
                               <td>{user.trackingNumber}</td>
                               <td>{user.countInStock}</td>
                               <td>{user.created_at}</td>
                              
                               <td>
                                   <LinkContainer to={`/admin/package/${user._id}/edit`} >
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
    )
}

export default PackageListScreen
