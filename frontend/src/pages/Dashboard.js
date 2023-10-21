import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Dashboard = () => {

    return (
        <Container  >
            <Row className='d-flex mt-5 align-items-center justify-content-center flex-direction-column'>
                <Col md={6} className='d-flex  align-items-center justify-content-center shadow-lg p-3 pb-5 bg-white rounded'>
                    <h1>WELCOME</h1>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard
