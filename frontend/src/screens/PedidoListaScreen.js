import React, {useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ListarTodosPedidos } from '../actions/pedidoActions'

function PedidoListaScreen({history}){
    const dispatch = useDispatch()

    const pedidolistarTodos = useSelector(state => state.pedidolistarTodos)
    const {loading, error, pedidos } = pedidolistarTodos

    const usuarioLogin = useSelector(state => state.usuarioLogin)
    const { usuarioInfo } = usuarioLogin

    useEffect(() => {
        if (usuarioInfo && usuarioInfo.isAdmin){
            dispatch(ListarTodosPedidos())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, usuarioInfo])

    return (
        <div>
            <h1>Todos os Pedidos</h1>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USUÁRIO</th>
                                    <th>DATA</th>
                                    <th>PAGO</th>
                                    <th>ENTREGUE</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {pedidos.map(pedido => (
                                    <tr key={pedido._id}>
                                        <td>{pedido.usuario && pedido.usuario.nome}</td>
                                        <td>{pedido.criado_em.substring(0,10)}</td>
                                        <td>R${pedido.precoTotal}</td>

                                        <td>{pedido.status_entregue ? (
                                                pedido.status_pagamento.substring(0,10)
                                            ) : (
                                                <i className='fas fa-check' style={{color:'red'}}></i>
                                        )}
                                        </td>
                                        <td>{pedido.status_entregue ? (
                                                pedido.data_entrega.substring(0,10)
                                            ) : (
                                                <i className='fas fa-check' style={{color:'red'}}></i>
                                        )}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/pedido/${pedido._id}`}>
                                                <Button variant='light' className='btn-sm'>
                                                    Detalhes
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default PedidoListaScreen