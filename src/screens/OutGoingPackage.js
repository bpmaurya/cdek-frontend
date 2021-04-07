import React from 'react'
import {Row,Col,Card} from 'react-bootstrap'

function OutGoingPackage() {
    return (
        <div>
          <h1>THis is OutGoing package Page</h1>
          <Row>
            <Col>
              <Card>
              <div className="m-5 text-center">
              <div>
                <p>New incoming packages and packages in stock</p>
                <h2 style={{ color: "#1ab248" }}>
                  {" "}
                  <i class="fas fa-box-open"></i> OutGoing Packages
                </h2>
              </div>
              </div>
              </Card>
            </Col>
          </Row>
        </div>
    )
}

export default OutGoingPackage
