import React, {useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listarUsuarios, apagarUsuario } from '../actions/usuarioActions'

function UsuarioListaScreen({history}){
    const dispatch = useDispatch()

    const usuarioListar = useSelector(state => state.usuarioListar)
    const {loading, error, usuarios } = usuarioListar

    const usuarioLogin = useSelector(state => state.usuarioLogin)
    const { usuarioInfo } = usuarioLogin

    const usuarioApagar = useSelector(state => state.usuarioApagar)
    const { success:successApagar } = usuarioApagar

    useEffect(() => {
        if (usuarioInfo && usuarioInfo.isAdmin){
            dispatch(listarUsuarios())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successApagar, usuarioInfo])

    const deleteHandler = (id) => {
        if (window.confirm('Tem certeze que deseja excluir o usuário? ')){
            dispatch(apagarUsuario(id))
        }
    }

    return (
        <div>
            <h1>Usuários</h1>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NOME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {usuarios.map(usuario => (
                                    <tr key={usuario._id}>
                                        <td>{usuario._id}</td>
                                        <td>{usuario.name}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.isAdmin ? (
                                            <i className='fas fa-check' style={{color:'green'}}></i>
                                            ) : (
                                                <i className='fas fa-check' style={{color:'red'}}></i>
                                        )}</td>
                                        <td>
                                            <LinkContainer to={`/admin/user/${usuario._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(usuario._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default UsuarioListaScreen