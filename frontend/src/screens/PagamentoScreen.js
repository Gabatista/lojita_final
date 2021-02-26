import React, {useState, useEffect} from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import PassosCheckout from '../components/PassosCheckout'
import { salvarMetodoPagamento} from '../actions/carrinhoActions'

function PagamentoScreen({history}){
    const carrinho = useSelector(state => state.carrinho)
    const {enderecoEntrega} = carrinho

    const dispatch = useDispatch()

    const [metodo_pagamento, setMetodoPagamento] = useState('Paypal')

    if(!enderecoEntrega.endereco){
        history.push('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(salvarMetodoPagamento(metodo_pagamento))
        history.push('/finalizarpedido')
    }

    return(
        <FormContainer>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>
                        Selecionar método
                    </Form.Label>
                        <Col>
                            <Form.Check type='radio' label='Paypal ou cartão de crédito' id='paypal' name='metodo_pagamento' checked onChange={(e) => setMetodoPagamento(e.target.value)}>

                            </Form.Check>
                        </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continuar
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PagamentoScreen