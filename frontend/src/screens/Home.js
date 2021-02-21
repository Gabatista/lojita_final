import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Produto from '../components/Produto'

import produtos from '../produtos'

function Home(){
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