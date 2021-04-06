import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Row,Col } from 'react-bootstrap'
function IncomingPackage() {
   
    const [incomingPackages, setIncomingPackages] = useState([])

    useEffect(() => {

        async function fetchIncomingPackage(){

            const {data} = await axios.get('https://cdek-backend.herokuapp.com/incoming/')
            setIncomingPackages(data)
            console.log(data);
        }

       fetchIncomingPackage()

    }, [])

     
    return (
        <div>
            <h1>This is Incoming package Page</h1>
             <Row>
                 {incomingPackages.map(product =>(
                     <Col sm={12} md={6} lg={4} xl={3}>

                         <h3> {product.name} </h3>
                         <br/>
                         <h3> {product._id} </h3>
                         <br/>
                         <h3>{product.user} </h3>
                         <br/>
                         <h3>{product.product} </h3>
                     </Col>
                 ))}
             </Row>
        </div>
    )
}

export default IncomingPackage
