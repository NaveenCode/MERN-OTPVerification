import React, { useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [show, setShow] = useState()
    const [confirmShow, setConfirmShow] = useState()
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [phone, setPhone] = useState("")
    const navigate = useNavigate()

    const submitHandler = async () => {

        try {

            await axios.post('http://localhost:5000/api/user/signup', { fullname, email, password, phone })
                .then((res) => {
                    navigate('/otp')
                })

            const { data } = await axios.post('http://localhost:5000/api/user/sendotp', { email })
            navigate('/otp', { state: data.otp })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Container>
            <Row className='d-flex align-items-center justify-content-center'>
                <Col md={6} className='d-flex align-items-center justify-content-center flex-column shadow-lg bg-white rounded'>

                    <Form className='w-40' onSubmit={(e) => e.preventDefault()}>
                        <h1 className='mt-4 mb-4 text-center'>SignUp</h1>
                        <Form.Group className="mb-3 mt-3" controlId="formBasicName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control className='bg-info text-black' type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder="Enter Your Name" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>

                            <Form.Control className='bg-info text-black' value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" required />

                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>Phone</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className='bg-dark text-white' id="basic-addon2">
                                    +91
                                </InputGroup.Text>
                                <Form.Control className='bg-info text-black' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required />

                            </InputGroup>

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control className='bg-info text-black' type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                                <InputGroup.Text className='bg-dark text-white' id="basic-addon2" onClick={() => setShow(!show)} >
                                    {show ? "Hide" : "show"}
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicRePassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control className='bg-info text-black' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type={confirmShow ? "text" : "password"} placeholder="confirm Password" required />
                                <InputGroup.Text className='bg-dark text-white' id="basic-addon2" onClick={() => setConfirmShow(!confirmShow)}>
                                    {confirmShow ? "Hide" : "show"}
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        <Button className='w-100 btn btn-sm' variant="primary" type="submit" onClick={submitHandler}>
                            SignUp
                        </Button>
                        <div className='py-4'>
                            <p className='text-center'>
                                Already have an account? <Link to={'/'}>Login</Link>
                            </p>
                        </div>

                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default SignUp
