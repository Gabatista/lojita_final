import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUsuarioDetalhes, atualizarUsuario } from '../actions/usuarioActions'
import { USUARIO_ATUALIZAR_RESET } from '../constants/usuarioConstants'

function UsuarioEditScreen({match, history}){

    const usuarioId = match.params.id
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const usuarioDetalhes = useSelector(state => state.usuarioDetalhes)
    const { error, loading, usuario } = usuarioDetalhes

    const usuarioAtualizar = useSelector(state => state.usuarioAtualizar)
    const { error:errorAtualiza, loading: loadingAtualiza, success:successAtualiza} = usuarioAtualizar

    useEffect(() => {
        if (successAtualiza){
            dispatch({type:USUARIO_ATUALIZAR_RESET})
            history.push('/admin/userlist')
        }else{
            if(!usuario.name || usuario._id !== Number(usuarioId)){
                dispatch(getUsuarioDetalhes(usuarioId))
            }else{
                setName(usuario.name)
                setEmail(usuario.email)
                setIsAdmin(usuario.isAdmin)
            }
        }
    }, [usuario, usuarioId, successAtualiza, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(atualizarUsuario({_id:usuario._id,name,email,isAdmin}))
    }

    return(
        <div>
            <Link to='/admin/userlist'>
                Voltar
            </Link>
            <FormContainer>
                <h1>Editar Usuário</h1>
                {loadingAtualiza && <Loader/>}
                {errorAtualiza && <Message variant='danger'>{error}</Message>}


                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type='name' placeholder='Digite seu nome' value={name} onChange={(e) => setName(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='isadmin'>
                        <Form.Check type='checkbox' label='É adminstrador?' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}>
                        </Form.Check>
                    </Form.Group>

                    <Button type='submit' variant='primary'>Atualizar</Button>
                </Form>
                )}
            </FormContainer>
        </div>
    )
}

export default UsuarioEditScreen