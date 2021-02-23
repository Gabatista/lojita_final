import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { cadastro } from '../actions/usuarioActions'

function CadastroScreen({location, history}){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirmPassword){
            setMessage('As senhas digitadas são diferentes')
        } else{
            dispatch(cadastro(name, email, password))

        }
    }
    const userRegister = useSelector(state => state.usuarioCadastro)
    const {error, loading, usuarioInfo} = userRegister

    useEffect(() => {
        if(usuarioInfo){
            history.push(redirect)
        }
    }, [history, usuarioInfo, redirect])

    return(
        <FormContainer>
            <h1>Cadastre-se</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control required type='name' placeholder='Digite seu nome' value={name} onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type='email' placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control required type='password' placeholder='Digite sua senha' value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirm_password'>
                    <Form.Label>Confirme a senha</Form.Label>
                    <Form.Control required type='password' placeholder='Digite sua senha novamente' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Cadastrar</Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    Já possui cadastro? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Entrar </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default CadastroScreen