import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const ForgotPassword = () => {
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const { id, token } = useParams()
    const userValid = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`http://localhost:5000/api/user/forgotpassword/${id}/${token}`);
            // console.log('updated',data)
            if (data.status === 201) {
                console.log("user valid")
            } else {
                navigate("/error")
            }
            setLoading(false)
        } catch (error) {
            console.error(error);
            setLoading(false)

        }
    }

    const sendpassword = async (e) => {
        e.preventDefault();

        if (password === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        }
        try {
            const { data } = await axios.post(`http://localhost:5000/api/user/${id}/${token}`, { password });
            console.log('updated', data)
            if (data.status === 201) {
                setPassword("")
                setMessage(true)
            } else {
                toast.error("! Token Expired generate new LInk", {
                    position: "top-center"
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        userValid()
    }, [])

    return (
        <Container >
            <Row className='d-flex mt-5 align-items-center justify-content-center flex-direction-column'>
                <Col md={7} className='d-flex  align-items-center justify-content-center shadow-lg p-3 pb-5 bg-white rounded'>

                    <Form className='w-50'>
                        <h1 className='mb-4'>Enter Your New Password</h1>
                        {message ? <p className='text-success'>password updated successfully</p> : ""}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control className='bg-info text-black' value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your new password" required />
                        </Form.Group>
                        <Button className='w-100 btn btn-sm ' variant="secondary" type="submit" disabled={loading} onClick={sendpassword}>
                            {loading ? 'Loading...' : "Update Password"}
                        </Button>

                    </Form>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    )
}

export default ForgotPassword
