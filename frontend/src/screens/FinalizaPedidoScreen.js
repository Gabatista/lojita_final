import React, {useState, useEffect} from 'react'
import { Form, Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import PassosCheckout from '../components/PassosCheckout'
import { Link } from 'react-router-dom'
import { criarPedido } from '../actions/pedidoActions'
import { PEDIDO_CRIAR_RESET } from '../constants/pedidoConstants'

function FinalizaPedidoScreen({history}){
    const pedidoCriar = useSelector(state => state.pedidoCriar)
    const {pedido, error, success} = pedidoCriar

    const dispatch = useDispatch()

    const carrinho = useSelector(state => state.carrinho)

    carrinho.itensPreco = carrinho.carrinhoItens.reduce((acc, item) => acc + item.preco * item.qtd, 0).toFixed(2)
    carrinho.frete = (carrinho.itensPreco > 150 ? 0 : 30).toFixed(2)
    carrinho.precoTotal = (Number(carrinho.itensPreco) + Number(carrinho.frete)).toFixed(2)

    if (!carrinho.metodo_pagamento){
        history.push('/pagamento')
    }

    useEffect(() => {
        if(success){
            history.push(`/pedido/${pedido._id}`)
            dispatch({type: PEDIDO_CRIAR_RESET })
        }
    }, [success, history])

    const finalizarPedido = () => {
        dispatch(criarPedido({
            itensPedido: carrinho.carrinhoItens,
            enderecoEntrega: carrinho.enderecoEntrega,
            metodoPagamento: carrinho.metodo_pagamento,
            itensPreco: carrinho.itensPreco,
            frete: carrinho.frete,
            precoTotal: carrinho.precoTotal
        }))
    }

    return(
        <div>
            <PassosCheckout passo1 passo2 passo3 passo4 />

            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Entrega</h2>

                            <p>
                                <strong>Dados da Entrega: </strong>
                                {carrinho.enderecoEntrega.endereco}, {carrinho.enderecoEntrega.cidade}
                                {'  '}
                                {carrinho.enderecoEntrega.cep}
                            </p>
                        </ListGroup.Item>

                       <ListGroup.Item>
                            <h2>Dados do pagamento</h2>

                            <p>
                                <strong>Forma de pagamento: </strong>
                                {carrinho.enderecoEntrega.metodo_pagamento}
                            </p>
                        </ListGroup.Item>


                       <ListGroup.Item>
                           <h2>Itens do pedido</h2>

                           <p>
                               {carrinho.carrinhoItens.length === 0 ? <Message variant='info'>
                                    Seu carrinho está vazio
                               </Message> : (
                                <ListGroup variant='flush'>
                                    {carrinho.carrinhoItens.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.imagem} alt={item.nome} fluid rounded/>
                                                </Col>

                                                <Col>
                                                    <Link to={`/produto/${item.produto}`}>
                                                        {item.nome}
                                                    </Link>
                                                </Col>

                                                <Col md={4}>
                                                        {item.qtd} X R${item.preco} = R${(item.qtd * item.preco).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                    ))}
                                </ListGroup>
                               )}
                           </p>
                       </ListGroup.Item>


                    </ListGroup>
                </Col>


                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Resumo do pedido</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Itens:
                                    </Col>
                                    <Col>
                                        R${carrinho.itensPreco}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Frete:
                                    </Col>
                                    <Col>
                                        R${carrinho.frete}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
{/* imposto já incluido no valor do produto
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Taxa:
                                    </Col>
                                    <Col>
                                        R${carrinho.taxa}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
*/}
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Preço Final:
                                    </Col>
                                    <Col>
                                        R${carrinho.precoTotal}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={carrinho.carrinhoItens === 0} onClick={finalizarPedido}>
                                    Finalizar compra
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>

                </Col>

            </Row>

        </div>
    )
}

export default FinalizaPedidoScreen