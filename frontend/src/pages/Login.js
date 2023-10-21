import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/user/login', { email, password })
            if (data.status === 201) {
                navigate('/dashboard')
                toast.success('Login successful');
            } else {
                toast.error("Invalid Credentials", {
                    position: "top-center"
                });
            }


        } catch (error) {
            console.log(error)
            toast.error('Login failed');
        }
    }


    return (
        <Container>
            <Row className='d-flex justify-content-center align-items-center mt-4'>
                <Col md={6} className='d-flex align-items-center justify-content-center flex-direction-column shadow-lg bg-white rounded'>

                    <Form className='w-40' onSubmit={(e) => e.preventDefault()}>
                        <h1 className='mt-4 mb-4 text-center'>Login</h1>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control className='bg-info text-black' value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" required />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicRePassword">
                            <Form.Label>Password</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control className='bg-info text-black' value={password} onChange={(e) => setPassword(e.target.value)} type={show ? 'text' : 'password'} placeholder="Password" required />
                                <InputGroup.Text className='bg-dark text-white' id="basic-addon2" onClick={() => setShow(!show)} >
                                    {show ? 'hide' : 'show'}
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                        <Button className='w-100 btn btn-sm mb-3' variant="primary" type="submit" onClick={handleLogin}>
                            Login
                        </Button>

                        <Button className='w-100 btn btn-sm ' onClick={() => navigate('/reset-password')} variant="outline-secondary" type="submit">
                            Forgot Password
                        </Button>
                        <div className='py-4'>
                            <p className='text-center'>
                                Don't have an account? <Link to={'/register'}>Signup</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
            </Row>
            <ToastContainer position="top-right" autoClose={3000} />
        </Container>
    )
}

export default Login
