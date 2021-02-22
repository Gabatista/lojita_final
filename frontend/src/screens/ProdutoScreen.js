import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Avaliacao from '../components/Avaliacao'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listaProdutoDetalhes } from '../actions/produtoActions'


function ProdutoScreen({ match, history }){
    const [qtd, setQtd] = useState(1)

    const dispatch = useDispatch()
    const produtoDetalhes = useSelector(state => state.produtoDetalhes)
    const { loading, error, produto } = produtoDetalhes

    useEffect(() => {
        dispatch(listaProdutoDetalhes(match.params.id))
    }, [dispatch, match])

    const addCarrinhoHandler = () => {
        history.push(`/carrinho/${match.params.id}?qtd=${qtd}`)
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'> Voltar </Link>
            {loading ?
                    <Loader />
                    : error
                        ? <Message variant='danger'>{error}</Message>
                        :(
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
                )
            }

        </div>
    )
}

export default ProdutoScreen;