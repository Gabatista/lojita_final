import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Produto from '../components/Produto'
import axios from 'axios'

import produtos from '../produtos'

function Home(){
    const [produtos, setProdutos] = useState([])

    useEffect(() => {
        async function fetchProdutos(){
            const { data } = await axios.get('/api/produtos/')
            setProdutos(data)
        }

        fetchProdutos()

    }, [])

    return (
        <div>
            <h1>Últimas novidades</h1>
                <Row>
                    { produtos.map(produto => (
                        <Col key={produto._id} sm={12} md={6} lg={4} xl={3}>
                            <Produto produto = { produto } />
                        </Col>
                    ))}
                </Row>
        </div>
    )
}

export default Home;