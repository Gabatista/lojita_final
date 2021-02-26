import React, {useState, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import PassosCheckout from '../components/PassosCheckout'
import { salvarEnderecoEntrega } from '../actions/carrinhoActions'

function EntregaScreen({ history }){

    const carrinho = useSelector(state => state.carrinho)
    const {enderecoEntrega} = carrinho

    const dispatch = useDispatch()

    const [endereco, setEndereco] = useState(enderecoEntrega.endereco)
    const [cidade, setCidade] = useState(enderecoEntrega.cidade)
    const [cep, setCep] = useState(enderecoEntrega.cep)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(salvarEnderecoEntrega({endereco, cidade, cep}))
        history.push('/pagamento')
    }


    return(
        <FormContainer>
            <PassosCheckout passo1 passo2/>
            <h1>Entrega</h1>
            <Form onSubmit={submitHandler}>

               <Form.Group controlId='endereco'>
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control required type='text' placeholder='Digite seu endereço ' value={endereco ? endereco : ''} onChange={(e) => setEndereco(e.target.value)}>
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='cidade'>
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control required type='text' placeholder='Digite a cidade ' value={cidade ? cidade : ''} onChange={(e) => setCidade(e.target.value)}>
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='cep'>
                    <Form.Label>CEP</Form.Label>
                    <Form.Control required type='text' placeholder='Digite o cep' value={cep ? cep : ''} onChange={(e) => setCep(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continuar para o pagamento
                </Button>

            </Form>
        </FormContainer>
    )
}

export default EntregaScreen