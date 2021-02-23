import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUsuarioDetalhes, AtualizaPerfil } from '../actions/usuarioActions'
import { USUARIO_ATUALIZA_PERFIL_RESET } from '../constants/usuarioConstants'

function PerfilScreen({history}){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirmPassword){
            setMessage('As senhas digitadas são diferentes')
        } else{
            dispatch(AtualizaPerfil({'id':usuario._id,'name':name,'email':email,'password:':password}))
            setMessage('')
        }
    }
    const userDetails = useSelector(state => state.usuarioDetalhes)
    const {error, loading, usuario} = userDetails

    const userLogin = useSelector(state => state.usuarioLogin)
    const {usuarioInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.usuarioAtualizaPerfil)
    const {success} = userUpdateProfile

    useEffect(() => {
        if(!usuarioInfo){
            history.push('/login')
        }else{
            if (!usuario || !usuario.name || success){
                dispatch({type:USUARIO_ATUALIZA_PERFIL_RESET})
                dispatch(getUsuarioDetalhes('profile'))
            }else{
                setName(usuario.name)
                setEmail(usuario.email)
            }
        }
    }, [dispatch, history, usuarioInfo, usuario, success])

    return (
        <Row>
            <Col md={3}>
                <h2>Perfil</h2>

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
                    <Form.Control type='password' placeholder='Digite sua senha' value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirm_password'>
                    <Form.Label>Confirme a senha</Form.Label>
                    <Form.Control type='password' placeholder='Digite sua senha novamente' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Atualizar</Button>

            </Form>
            </Col>

            <Col md={3}>
                <h2>Meus Pedidos</h2>
            </Col>
        </Row>
    )
}

export default PerfilScreen