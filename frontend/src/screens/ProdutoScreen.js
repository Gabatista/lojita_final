import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Avaliacao from '../components/Avaliacao'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listaProdutoDetalhes, criarProdutoAnalise } from '../actions/produtoActions'
import { PRODUTO_CRIAR_ANALISE_RESET } from '../constants/produtoConstants'

function ProdutoScreen({ match, history }){
    const [qtd, setQtd] = useState(1)
    const [avaliacao, setAvaliacao] = useState(0)
    const [comentario, setComentario]= useState('')

    const dispatch = useDispatch()

    const produtoDetalhes = useSelector(state => state.produtoDetalhes)
    const { loading, error, produto } = produtoDetalhes

    const usuarioLogin = useSelector(state => state.usuarioLogin)
    const { usuarioInfo } = usuarioLogin

    const produtoAnaliseCriar = useSelector(state => state.produtoAnaliseCriar)
    const {loading:loadingProdutoAnalise, error:errorProdutoAnalise, success:successProdutoAnalise } = produtoAnaliseCriar

    useEffect(() => {
        if (successProdutoAnalise){
            setAvaliacao(0)
            setComentario('')
            dispatch({type:PRODUTO_CRIAR_ANALISE_RESET})
        }
        dispatch(listaProdutoDetalhes(match.params.id))

    }, [dispatch, match, successProdutoAnalise])

    const addCarrinhoHandler = () => {
        history.push(`/carrinho/${match.params.id}?qtd=${qtd}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(criarProdutoAnalise(
            match.params.id,
            avaliacao,
            comentario

        ))
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'> Voltar </Link>
            {loading ?
                    <Loader />
                    : error
                        ? <Message variant='danger'>{error}</Message>
                        :(
                            <div>
                                <Row>
                                    <Col md={6}>
                                        <Image src={produto.imagem} alt={produto.nome} fluid />
                                    </Col>

                                    <Col md={3}>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <h3>{ produto.nome }</h3>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Avaliacao value={produto.avaliacao} text={`${produto.num_avaliacoes} avaliações`} color="#f8e825"/>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                Preço: R${produto.preco}
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                Descrição: {produto.descricao}
                                            </ListGroup.Item>

                                        </ListGroup>
                                    </Col>

                                    <Col md={3}>
                                        <Card>
                                            <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Preço:
                                                    </Col>

                                                    <Col>
                                                        <strong>R${produto.preco}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Estoque:
                                                    </Col>

                                                    <Col>
                                                        <strong>{produto.num_estoque > 0 ? 'Disponível' : 'Indisponível'}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {produto.num_estoque > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qtd</Col>
                                                        <Col xs='auto' className='my-1'>
                                                            <Form.Control as="select" value={qtd} onChange={(e) => setQtd(e.target.value)}>
                                                            {
                                                                /*array do carrinho, mapeando todos os valores em estoque */
                                                                [...Array(produto.num_estoque).keys()].map((x) => (
                                                                    <option key={x+1} value={x+1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }

                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}


                                            <ListGroup.Item>
                                                <Button onClick={addCarrinhoHandler} className='btn-block' disabled={produto.num_estoque == 0}type='button'>
                                                    Adicionar ao carrinho
                                                </Button>
                                            </ListGroup.Item>

                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <h4>Avaliações</h4>
                                    {produto.analises.length === 0 && <Message variant='info'>Sem avaliações ainda</Message>}
                                    <ListGroup variant='flush'>
                                        {produto.analises.map((analise) =>(
                                            <ListGroup.Item key ={avaliacao._id}>
                                                <strong>{avaliacao.nome}</strong>
                                                <Avaliacao value={analise.avaliacao} color='#f8e825' />
                                                <p>{analise.criado_em.substring(0,10)}</p>
                                                <p>{analise.comentario}</p>
                                            </ListGroup.Item>
                                        ))}

                                        <ListGroup.Item>
                                            <h4>Escreva uma análise do produto</h4>
                                            {loadingProdutoAnalise && <Loader />}
                                            {successProdutoAnalise && <Message variant='success'>Avaliação enviada </Message>}
                                            {errorProdutoAnalise && <Message variant='danger'>{errorProdutoAnalise}</Message>}

                                            {usuarioInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='avaliacao'>
                                                        <Form.Label>Avaliação</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={avaliacao}
                                                            onChange={(e) => setAvaliacao(e.target.value)}>
                                                            <option value=''>Selecione...</option>
                                                            <option value='1'>1 - Ruim</option>
                                                            <option value='2'>2 - Razoável</option>
                                                            <option value='3'>3 - Bom</option>
                                                            <option value='4'>4 - Muito bom</option>
                                                            <option value='5'>5 - Excelente</option>
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group controlId='comentario'>
                                                        <Form.Label>Avaliação</Form.Label>

                                                    <Form.Control as='textarea' row='5' value={comentario} onChange={(e) => setComentario(e.target.value)}>
                                                    </Form.Control>

                                                    </Form.Group>

                                                    <Button disabled={loadingProdutoAnalise} type='submit' variant='primary'>
                                                        Enviar
                                                    </Button>

                                                </Form>
                                            ) : (
                                                <Message variant='info'>Por favor, faça o <Link to='/login'>login</Link> para deixar uma análise</Message>
                                            )}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </div>
                )
            }

        </div>
    )
}

export default ProdutoScreen;