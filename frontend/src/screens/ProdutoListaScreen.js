import React, {useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listaProdutos, apagarProduto, criarProduto } from '../actions/produtoActions'
import { PRODUTO_CRIAR_RESET } from '../constants/produtoConstants'

function ProdutoListaScreen({history,match}){
    const dispatch = useDispatch()

    const produtoLista = useSelector(state => state.produtoLista)
    const {loading, error, produtos } = produtoLista

    const produtoApagar = useSelector(state => state.produtoApagar)
    const {loading:loadingApagar, error:errorApagar, success:successApagar } = produtoApagar

    const produtoCriar = useSelector(state => state.produtoCriar)
    const {loading:loadingCriar, error:errorCriar, success:successCriar, produto:criadoProduto } = produtoCriar

    const usuarioLogin = useSelector(state => state.usuarioLogin)
    const { usuarioInfo } = usuarioLogin

    useEffect(() => {
        dispatch({type: PRODUTO_CRIAR_RESET})
        if (!usuarioInfo.isAdmin){
            history.push('/login')
        }

        if(successCriar){
            history.push(`/admin/produto/${criadoProduto._id}/edit`)
        }else{
            dispatch(listaProdutos())
        }
    }, [dispatch, history, usuarioInfo, successApagar, successCriar, criadoProduto])

    const deleteHandler = (id) => {
        if (window.confirm('Tem certeze que deseja excluir o produto? ')){
            dispatch(apagarProduto(id))
        }
    }

    const criarProdutoHandler = (produto) => {
        dispatch(criarProduto())

    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Produtos</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={criarProdutoHandler}>
                        <i className= 'fas fa-plus'>Criar Produto</i>
                    </Button>
                </Col>
            </Row>

            {loadingApagar && <Loader />}
            {errorApagar && <Message variant='danger'>{errorApagar}</Message>}

            {loadingCriar && <Loader />}
            {errorApagar && <Message variant='danger'>{errorCriar}</Message>}


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
                                    <th>PRECO</th>
                                    <th>CATEGORIA</th>
                                    <th>MARCA</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {produtos.map(produto => (
                                    <tr key={produto._id}>
                                        <td>{produto._id}</td>
                                        <td>{produto.nome}</td>
                                        <td>R${produto.preco}</td>
                                        <td>{produto.categoria}</td>
                                        <td>{produto.marca}</td>

                                        <td>
                                            <LinkContainer to={`/admin/produto/${produto._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(produto._id)}>
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

export default ProdutoListaScreen