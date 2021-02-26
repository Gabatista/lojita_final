import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUsuarioDetalhes, AtualizaPerfil } from '../actions/usuarioActions'
import { USUARIO_ATUALIZA_PERFIL_RESET } from '../constants/usuarioConstants'
import { ListarPedidos } from '../actions/pedidoActions'

function PerfilScreen({history}){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const userDetails = useSelector(state => state.usuarioDetalhes)
    const {error, loading, usuario} = userDetails

    const userLogin = useSelector(state => state.usuarioLogin)
    const {usuarioInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.usuarioAtualizaPerfil)
    const {success} = userUpdateProfile

    const pedidoListar = useSelector(state => state.pedidoListar)
    const {loading: loadingPedidos, error:errorPedidos, pedidos } = pedidoListar

    const dispatch = useDispatch()

        useEffect(() => {
        if(!usuarioInfo){
            history.push('/login')
        }else{
            if (!usuario || !usuario.name || success){
                dispatch({type:USUARIO_ATUALIZA_PERFIL_RESET})
                dispatch(getUsuarioDetalhes('profile'))
                dispatch(ListarPedidos())
            }else{
                setName(usuario.name)
                setEmail(usuario.email)
            }
        }
    }, [dispatch, history, usuarioInfo, usuario, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirmPassword){
            setMessage('As senhas digitadas são diferentes')
        } else{
            dispatch(AtualizaPerfil({'id':usuario._id,'name':name,'email':email,'password':password}))
            setMessage('')
        }
    }




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

            <Col md={9}>
                <h2>Meus Pedidos</h2>
                {loadingPedidos ? (
                    <Loader />
                ) : errorPedidos ? (
                    <Message variant='danger'>{errorPedidos}</Message>
                ) : (
                    <Table striped responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Data</th>
                                <th>Total</th>
                                <th>Pagamento</th>
                                <th>Entregue</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {pedidos.map(pedido => (
                                <tr>
                                    <td>{pedido._id}</td>
                                    <td>{pedido.criado_em.substring(0, 10)}</td>
                                    <td>R${pedido.precoTotal}</td>
                                    <td>{pedido.status_pagamento ? pedido.pago_em : (
                                        <i className='fas fa-times' style={{color:'red'}}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/pedidos/${pedido._id}`}>
                                           <Button className='btn-sm'>Detalhes</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </Table>
                )}

            </Col>
        </Row>
    )
}

export default PerfilScreen