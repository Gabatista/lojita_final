import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listaProdutoDetalhes, atualizarProduto } from '../actions/produtoActions'
import { PRODUTO_ATUALIZAR_RESET } from '../constants/produtoConstants'

function ProdutoEditaScreen({match, history}){

    const produtoId = match.params.id

    const [nome, setNome] = useState('')
    const [preco, setPreco] = useState(0)
    const [imagem, setImagem] = useState('')
    const [marca, setMarca] = useState('')
    const [categoria, setCategoria] = useState('')
    const [num_estoque, setNum_estoque] = useState(0)
    const [descricao, setDescricao] = useState('')
    const [enviando, setEnviando] = useState(false)

    const dispatch = useDispatch()

    const produtoDetalhes = useSelector(state => state.produtoDetalhes)
    const { error, loading, produto } = produtoDetalhes

    const produtoAtualizar = useSelector(state => state.produtoAtualizar)
    const { error:errorAtualiza, loading:loadingAtualiza, success:successAtualiza } = produtoAtualizar


    useEffect(() => {
        if(successAtualiza){
            dispatch({type:PRODUTO_ATUALIZAR_RESET})
            history.push('/admin/produtolista')
        }else{
            if(!produto.nome || produto._id !== Number(produtoId)){
                dispatch(listaProdutoDetalhes(produtoId))
            } else {
                setNome(produto.nome)
                setPreco(produto.preco)
                setImagem(produto.imagem)
                setMarca(produto.marca)
                setCategoria(produto.categoria)
                setNum_estoque(produto.num_estoque)
                setDescricao(produto.descricao)
            }
        }

    }, [dispatch, produto, produtoId, history, successAtualiza])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(atualizarProduto({
            _id:produtoId,
            nome,
            preco,
            imagem,
            marca,
            categoria,
            num_estoque,
            descricao
        }))
    }

    const uploadFileHandler = async (e) => {
        const arquivo = e.target.files[0]
        const formData = new FormData()
        formData.append('imagem', arquivo)
        formData.append('produto_id', produtoId)

        setEnviando(true)

        try{
            const config = {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/produtos/upload/',formData, config)

            setImagem(data)
            setEnviando(false)

        }catch (error) {
            setEnviando(false)
        }
    }

    return(
        <div>
            <Link to='/admin/produtolista'>
                Voltar
            </Link>
            <FormContainer>
                <h1>Editar Produto</h1>
                {loadingAtualiza && <Loader />}
                {errorAtualiza && <Message variant='danger'>{errorAtualiza}</Message>}


                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type='text' placeholder='Digite seu nome' value={nome} onChange={(e) => setNome(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='preco'>
                        <Form.Label>Preço</Form.Label>
                        <Form.Control type='number' placeholder='Digite o preço ' value={preco} onChange={(e) => setPreco(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='imagem'>
                        <Form.Label>Imagem</Form.Label>
                        <Form.Control type='text' placeholder='Insira a imagem ' value={imagem} onChange={(e) => setImagem(e.target.value)}>
                        </Form.Control>

                        <Form.File id='imagem-arquivo' label='Escolha o arquivo' custom onChange={uploadFileHandler}>

                        </Form.File>
                        {enviando && <Loader />}
                    </Form.Group>

                    <Form.Group controlId='marca'>
                        <Form.Label>Marca</Form.Label>
                        <Form.Control type='text' placeholder='Insira a marca do produto: ' value={marca} onChange={(e) => setMarca(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='num_estoque'>
                        <Form.Label>Quantidade no estoque</Form.Label>
                        <Form.Control type='number' placeholder='Insira a quantidade no estoque ' value={num_estoque} onChange={(e) => setNum_estoque(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='categoria'>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control type='text' placeholder='Insira a categoria do produto ' value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='descricao'>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control type='text' placeholder='Insira a descrição do produto ' value={descricao} onChange={(e) => setDescricao(e.target.value)}>
                        </Form.Control>
                    </Form.Group>


                    <Button type='submit' variant='primary'>Atualizar</Button>
                </Form>
                )}
            </FormContainer>
        </div>
    )
}

export default ProdutoEditaScreen