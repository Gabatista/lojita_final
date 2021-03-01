import { PEDIDO_CRIAR_REQUEST, PEDIDO_CRIAR_SUCCESS, PEDIDO_CRIAR_FAIL, PEDIDO_CRIAR_RESET,
 PEDIDO_DETALHES_REQUEST,PEDIDO_DETALHES_SUCCESS,PEDIDO_DETALHES_FAIL,
 PEDIDO_PAGAR_REQUEST,PEDIDO_PAGAR_SUCCESS,PEDIDO_PAGAR_FAIL,PEDIDO_PAGAR_RESET,
 PEDIDO_LISTAR_PEDIDOS_REQUEST, PEDIDO_LISTAR_PEDIDOS_SUCCESS, PEDIDO_LISTAR_PEDIDOS_FAIL, PEDIDO_LISTAR_PEDIDOS_RESET,
 PEDIDO_LISTAR_REQUEST,PEDIDO_LISTAR_SUCCESS,PEDIDO_LISTAR_FAIL,PEDIDO_LISTAR_RESET,
 PEDIDO_ENTREGUE_REQUEST,PEDIDO_ENTREGUE_SUCCESS,PEDIDO_ENTREGUE_FAIL,PEDIDO_ENTREGUE_RESET}
from '../constants/pedidoConstants'

export const pedidoCriarReducer = (state={}, action) => {
    switch(action.type){
        case PEDIDO_CRIAR_REQUEST:
            return{
                loading: true
            }

        case PEDIDO_CRIAR_SUCCESS:
            return {
                loading: false,
                success: true,
                pedido: action.payload
            }

        case PEDIDO_CRIAR_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        case PEDIDO_CRIAR_RESET:
            return{}

        default:
            return state
    }
}

export const pedidoDetalhesReducer = (state={loading:true, pedidoItens: [], enderecoEntrega:{}}, action) => {
    switch(action.type){
        case PEDIDO_DETALHES_REQUEST:
            return{
                ...state,
                loading: true
            }

        case PEDIDO_DETALHES_SUCCESS:
            return {
                loading: false,
                pedido: action.payload
            }

        case PEDIDO_DETALHES_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const pedidoPagarReducer = (state={}, action) => {
    switch(action.type){
        case PEDIDO_PAGAR_REQUEST:
            return{
                loading: true
            }

        case PEDIDO_PAGAR_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case PEDIDO_PAGAR_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        case PEDIDO_PAGAR_RESET:
            return{}

        default:
            return state
    }
}

export const pedidoListarReducer = (state={pedidos:[]}, action) => {
    switch(action.type){
        case PEDIDO_LISTAR_PEDIDOS_REQUEST:
            return{
                loading: true
            }

        case PEDIDO_LISTAR_PEDIDOS_SUCCESS:
            return {
                loading: false,
                pedidos: action.payload
            }

        case PEDIDO_LISTAR_PEDIDOS_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        case PEDIDO_LISTAR_PEDIDOS_RESET:
            return{
                pedidos:[]
            }

        default:
            return state
    }
}

export const pedidolistarTodosReducer = (state={pedidos:[]}, action) => {
    switch(action.type){
        case PEDIDO_LISTAR_REQUEST:
            return{
                loading: true
            }

        case PEDIDO_LISTAR_SUCCESS:
            return {
                loading: false,
                pedidos: action.payload
            }

        case PEDIDO_LISTAR_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const pedidoEntregarReducer = (state={}, action) => {
    switch(action.type){
        case PEDIDO_ENTREGUE_REQUEST:
            return{
                loading: true
            }

        case PEDIDO_ENTREGUE_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case PEDIDO_ENTREGUE_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        case PEDIDO_ENTREGUE_RESET:
            return{}

        default:
            return state
    }
}