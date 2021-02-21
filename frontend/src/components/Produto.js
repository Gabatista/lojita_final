import React from 'react'
import { Card } from 'react-bootstrap'
import Avaliacao from './Avaliacao'
import { Link } from 'react-router-dom'

function Produto({ produto }){
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/produto/${produto._id}`}>
                <Card.Img src={produto.imagem} />
            </Link>

        <Card.Body>
            <Link to={`/produto/${produto._id}`}>
                <Card.Title as="div">
                    <strong>{produto.nome}</strong>
                </Card.Title>
            </Link>

            <Card.Text as="div">
                <div className="my-3">
                    { produto.avaliacao } de { produto.num_avaliacao } avaliações
                </div>
            </Card.Text>

            <Card.Text as="h3">
                ${ produto.preco }
            </Card.Text>
        </Card.Body>
    </Card>
    )
}

export default Produto;