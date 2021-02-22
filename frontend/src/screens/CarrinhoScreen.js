import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import  Message  from '../components/Message'
import { addCarrinho, removerDoCarrinho } from '../actions/carrinhoActions'


function CarrinhoScreen({match, location, history}){
    const produtoId = match.params.id
    /* recupera o index do produto na url */
    const qtd = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const carrinho = useSelector(state => state.carrinho)
    const {carrinhoItens} = carrinho



    useEffect(() => {
        if (produtoId){
            dispatch(addCarrinho(produtoId, qtd))
        }
    }, [dispatch, produtoId, qtd])

    const removerCarrinhoHandler = (id) => {
        dispatch(removerDoCarrinho(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return(
        <Row>
            <Col md={8}>
                <h2>Carrinho</h2>
                {carrinhoItens.length === 0 ? (
                    <Message variant='info'>
                        Carrinho vazio <Link to='/'>Voltar</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {carrinhoItens.map(item => (
                            <ListGroup.Item key = {item.produto}>
                                <Row>
                                    <Col md={2}>
                                        <Image src = {item.imagem} alt={item.nome} fluid rounded />
                                    </Col>

                                    <Col md={3}>
                                        <Link to={`/produto/${item.produto}`}>{item.nome}</Link>
                                    </Col>

                                    <Col md={2}>
                                        R${item.preco}
                                    </Col>

                                    <Col md={3}>
                                        <Form.Control as="select" value={item.qtd} onChange={(e) => dispatch(addCarrinho(item.produto, Number(e.target.value)))}>
                                            {
                                            /*array do carrinho, mapeando todos os valores em estoque */
                                            [...Array(item.num_estoque).keys()].map((x) => (
                                                <option key={x+1} value={x+1}>
                                                    {x + 1}
                                                </option>
                                            ))
                                            }

                                        </Form.Control>
                                    </Col>

                                    <Col md={1}>
                                        <Button type='button' variant='light' onClick={() => removerCarrinhoHandler(item.produto)}>
                                            <i className = 'fas fa-trash'></i>
                                        </Button>
                                    </Col>

                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({carrinhoItens.reduce((acc, item) => acc + item.qtd, 0)}) itens </h2>
                            R${carrinhoItens.reduce((acc, item) => acc + item.qtd * item.preco, 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item>
                        <Button type='button' className='btn-block' disabled={carrinhoItens.length === 0} onClick={checkoutHandler}>
                            Prosseguir para finalizar a compra
                        </Button>
                    </ListGroup.Item>
                </Card>
            </Col>
        </Row>
    )
}

export default CarrinhoScreen