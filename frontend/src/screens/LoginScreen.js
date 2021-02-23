import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/usuarioActions'

function LoginScreen({location, history}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email,password))
    }
    const userLogin = useSelector(state => state.usuarioLogin)
    const {error, loading, usuarioInfo} = userLogin

    useEffect(() => {
        if(usuarioInfo){
            history.push(redirect)
        }
    }, [history, usuarioInfo, redirect])

    return (
        <FormContainer>
            <h1>Entrar</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type='password' placeholder='Digite sua senha' value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Entrar</Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    Primeira compra? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                    Cadastrar </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default LoginScreen