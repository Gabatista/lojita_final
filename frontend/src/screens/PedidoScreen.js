import React, {useState, useEffect} from 'react'
import { Form, Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { getPedidoDetalhes, pagarPedido } from '../actions/pedidoActions'
import { PayPalButton } from 'react-paypal-button-v2'
import { PEDIDO_PAGAR_RESET } from '../constants/pedidoConstants'

function PedidoScreen({match}){
    const pedidoId = match.params.id
    const dispatch = useDispatch()

    //const [sdkReady, setSdkReady] = useState(false)

    const pedidoDetalhes = useSelector(state => state.pedidoDetalhes)
    const {pedido, error, loading} = pedidoDetalhes

    const pedidoPagar = useSelector(state => state.pedidoPagar)
    const { loading:loadingPagar, success: successPagar } = pedidoPagar

    if (!loading && !error){
        pedido.itensPreco = pedido.pedidoItens.reduce((acc, item) => acc + item.preco * item.qtd, 0).toFixed(2)
    }
    //chave da api PAYPAL AQUI
    /*
    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=chave}'
        script.async = true
        script.onload = () =>{
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }
    */
    useEffect(() => {
        if (!pedido || pedido._id !== Number(pedidoId)){
            //disptach({type:PEDIDO_PAGAR_RESET})
            dispatch(getPedidoDetalhes(pedidoId))
        }
        /*else if (!pedido.status_pagamento){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }
        */
    }, [dispatch, pedido, pedidoId])

    //adicionar successPagar no if acima e junto do dispatch
    /*
        const successPagamentoHandler = (pagamentoResult) => {
            dispatch(pagarPedido(pedidoId, pagamentoResult))
        }
    */


    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ):(
        <div>
            <h1>Pedido: {pedido._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Entrega</h2>

                            <p><strong>Nome:</strong>{pedido.usuario.nome}</p>
                            <p><strong>Email:</strong><a href={`mailto:${pedido.usuario.email}`}>{pedido.usuario.email}</a></p>

                            <p>
                                <strong>Dados da Entrega: </strong>
                                {pedido.enderecoEntrega.endereco}, {pedido.enderecoEntrega.cidade}
                                {'  '}
                                {pedido.enderecoEntrega.cep}
                            </p>


                            {pedido.status_entregue ? (
                                <Message variant='success'>Entregue em {pedido.status_entregue}</Message>
                            ) : (
                                <Message variant='warning'>Ainda não entregue</Message>
                            )}
                        </ListGroup.Item>

                       <ListGroup.Item>
                            <h2>Dados do pagamento</h2>

                            <p>
                                <strong>Forma de pagamento: </strong>
                                {pedido.metodo_pagamento}
                            </p>
                            {pedido.status_pagamento ? (
                                <Message variant='success'>Pago em {pedido.pago_em}</Message>
                            ) : (
                                <Message variant='warning'>Pagamento em processamento</Message>
                            )}
                        </ListGroup.Item>


                       <ListGroup.Item>
                           <h2>Itens do pedido</h2>

                           <p>
                               {pedido.pedidoItens.length === 0 ? <Message variant='info'>
                                    Pedido está vazio
                               </Message> : (
                                <ListGroup variant='flush'>
                                    {pedido.pedidoItens.map((item, index) => (
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
                                        R${pedido.itensPreco}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Frete:
                                    </Col>
                                    <Col>
                                        R${pedido.frete}
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
                                        R${pedido.precoTotal}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
{/*
                            {!pedido.status_pagamento && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}

                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton amount={pedido.precoTotal} onSuccess={successPagamentoHandler}/>
                                    )}
                                </ListGroup.Item>

                            )}
*/}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PedidoScreen