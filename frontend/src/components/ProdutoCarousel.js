import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listaTopProdutos } from '../actions/produtoActions'

function ProdutoCarousel(){
    const dispatch = useDispatch()

    const produtoTopAvaliado = useSelector(state => state.produtoTopAvaliado)
    const {error, loading, produtos} = produtoTopAvaliado

    useEffect(() => {
        dispatch(listaTopProdutos())
    }, [dispatch])

    return (loading ? <Loader />
        : error
            ? <Message variant='danger'>{error}</Message>
            : (
                <Carousel pause='hover' className='bg-dark'>
                    {produtos.map(produto => (
                        <Carousel.Item key={produto._id}>
                            <Link to={`/produto/${produto._id}`}>
                                <Image src={produto.imagem} alt={produto.nome} fluid/>
                                <Carousel.Caption className='carousel.caption'>
                                    <h4>{produto.nome} (R${produto.preco})</h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )
    )
}

export default ProdutoCarousel