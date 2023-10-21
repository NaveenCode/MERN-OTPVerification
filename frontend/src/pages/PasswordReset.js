import axios from 'axios'
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [messages, setMessages] = useState("");
    const [loading, setLoading] = useState(false);

    const sendLink = async (e) => {

        e.preventDefault();
        try {
            setLoading(true)
            const { data } = await axios.post('http://localhost:5000/api/user/sendpasswordlink', { email })
            // console.log(data)
            if (data.status === 201) {
                setEmail("")
                setMessages(true);
                toast.success('Password reset email sent');
                setLoading(false)
            } else {
                toast.error("Invelid User")
                setLoading(false)
            }

        } catch (error) {
            console.log(error)
            toast.error('Failed to send password reset email');
            setLoading(false)
        }
    }
    return (
        <Container >
            <Row className='d-flex mt-5 align-items-center justify-content-center flex-direction-column'>
                <Col md={7} className='d-flex  align-items-center justify-content-center shadow-lg p-3 pb-5 bg-white rounded'>

                    <Form className='w-50'>
                        <h1 className='mb-4'>Enter Your Email</h1>
                        {
                            messages ? <p className="font-weight-bold text-success">Reset Password link sent to your email please check</p> : ""
                        }
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control className='bg-info text-black' value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Your Email" required />
                        </Form.Group>
                        <Button className='w-100 btn btn-sm ' variant="secondary" type="submit" onClick={sendLink} disabled={loading}>
                            {loading ? 'Loading...' : "Submit"}
                        </Button>

                    </Form>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    )
}

export default PasswordReset
