import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Produto from '../components/Produto'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listaProdutos } from '../actions/produtoActions'

function Home(){
    const dispatch = useDispatch()
    const produtoLista = useSelector(state => state.produtoLista)
    const {error, loading, produtos } = produtoLista

    useEffect(() => {
        dispatch(listaProdutos())
    }, [dispatch])

    return (
        <div>
            <h1>Últimas novidades</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <Row>
                        { produtos.map(produto => (
                            <Col key={produto._id} sm={12} md={6} lg={4} xl={3}>
                                <Produto produto = { produto } />
                            </Col>
                        ))}
                    </Row>
            }
        </div>
    )
}

export default Home;