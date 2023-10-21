import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
const Otp = () => {
    const [otp, setOtp] = useState('')

    const location = useLocation()
    const navigate = useNavigate()
    const userotp = String(location.state)
    const loginUser = (e) => {
        e.preventDefault()
        if (otp === "") {
            toast.error('Enter Your Otp')
        }
        if (!/[^a-zA-Z]/.test(otp)) {
            toast.error('Enter velid otp')
        }
        if (otp.length < 6 || otp.length > 6) {
            toast.error('Otp length minimum 6 digits')
        }
        if (otp === userotp) {
            navigate('/')
        } else {
            toast.error('incorrect otp')
        }
    }

    return (
        <Container  >
            <Row className='d-flex mt-5 align-items-center justify-content-center flex-direction-column'>
                <Col md={6} className='d-flex  align-items-center justify-content-center shadow-lg p-3 pb-5 bg-white rounded'>
                    <Form className='w-50'>
                        <h3 className='mb-4'>Enter Your Otp Here</h3>
                        <p className='mt-3 text-success text-solid'>Otp sent successfully on you Email</p>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label> <h3>OTP</h3></Form.Label>
                            <Form.Control type="Number" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter Otp Here" required />
                        </Form.Group>
                        <Button className='w-100 btn btn-sm ' variant="secondary" type="submit" onClick={loginUser}>
                            Submit
                        </Button>

                    </Form>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    )
}

export default Otp
