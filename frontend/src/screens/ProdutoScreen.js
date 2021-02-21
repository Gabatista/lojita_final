import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Avaliacao from '../components/Avaliacao'
import axios from 'axios'


function ProdutoScreen({ match }){
    const [produto, setProduto] = useState([])

    useEffect(() => {
        async function fetchProduto(){
            const { data } = await axios.get(`/api/produtos/${match.params.id}`)
            setProduto(data)
        }

        fetchProduto()

    }, [])



    return (
        <div>
            <Link to='/' className='btn btn-light my-3'> Voltar </Link>
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
                        <Avaliacao value={produto.avaliacao} text={`${produto.num_avaliacao} avaliações`} color="#f8e825"/>
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
                                        <strong>${produto.preco}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Estoque:
                                    </Col>

                                    <Col>
                                        <strong>{produto.estoque > 0 ? 'Disponível' : 'Indisponível'}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <Button className='btn-block' disabled={produto.estoque == 0}type='button'>
                                    Adicionar ao carrinho
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProdutoScreen;