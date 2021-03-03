import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Produto from '../components/Produto'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listaProdutos } from '../actions/produtoActions'
import Paginate from '../components/Paginate'
import ProdutoCarousel from '../components/ProdutoCarousel'

function Home({history}){
    const dispatch = useDispatch()
    const produtoLista = useSelector(state => state.produtoLista)
    const {error, loading, produtos, page, pages } = produtoLista


    let keyword = history.location.search
    useEffect(() => {
        dispatch(listaProdutos(keyword))
    }, [dispatch,keyword])

    return (
        <div>
            {!keyword && <ProdutoCarousel />}
            <ProdutoCarousel />
            <h1>Últimas novidades</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                    <Row>
                        { produtos.map(produto => (
                            <Col key={produto._id} sm={12} md={6} lg={4} xl={3}>
                                <Produto produto = { produto } />
                            </Col>
                        ))}
                    </Row>
                    <Paginate page={page} pages={pages} keyword={keyword} />
                    </div>
            }
        </div>
    )
}

export default Home;