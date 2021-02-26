import axios from 'axios'
import { PEDIDO_CRIAR_REQUEST, PEDIDO_CRIAR_SUCCESS, PEDIDO_CRIAR_FAIL,
 PEDIDO_DETALHES_REQUEST,PEDIDO_DETALHES_SUCCESS,PEDIDO_DETALHES_FAIL,
 PEDIDO_PAGAR_REQUEST,PEDIDO_PAGAR_SUCCESS,PEDIDO_PAGAR_FAIL,PEDIDO_PAGAR_RESET,
 PEDIDO_LISTAR_PEDIDOS_REQUEST,PEDIDO_LISTAR_PEDIDOS_SUCCESS,PEDIDO_LISTAR_PEDIDOS_FAIL,PEDIDO_LISTAR_PEDIDOS_RESET}
from '../constants/pedidoConstants'
import { CARRINHO_LIMPAR } from '../constants/carrinhoConstants'

export const criarPedido = (pedido) => async (dispatch, getState) =>{
    try{
        dispatch({
            type: PEDIDO_CRIAR_REQUEST
        })

        const{
            usuarioLogin: {usuarioInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${usuarioInfo.token}`
            }
        }

        const {data} = await axios.post(`/api/pedidos/add/`, pedido, config)

        dispatch({
            type:PEDIDO_CRIAR_SUCCESS,
            payload: data
        })

        dispatch({
            type:CARRINHO_LIMPAR,
            payload: data
        })

        localStorage.removeItem('carrinhoItens')

    } catch (error){
        dispatch({
            type: PEDIDO_CRIAR_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const getPedidoDetalhes = (id) => async (dispatch, getState) =>{
    try{
        dispatch({
            type: PEDIDO_DETALHES_REQUEST
        })

        const{
            usuarioLogin: { usuarioInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${ usuarioInfo.token }`
            }
        }

        const {data} = await axios.get(`/api/pedidos/${id}/`, config)

        dispatch({
            type:PEDIDO_DETALHES_SUCCESS,
            payload: data
        })

    } catch (error){
        dispatch({
            type: PEDIDO_DETALHES_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const pagarPedido = (id, pagamentoResult) => async (dispatch, getState) =>{
    try{
        dispatch({
            type: PEDIDO_PAGAR_REQUEST
        })

        const{
            usuarioLogin: { usuarioInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${ usuarioInfo.token }`
            }
        }

        const {data} = await axios.put(`/api/pedidos/${id}/pagar/`, pagamentoResult, config)

        dispatch({
            type:PEDIDO_PAGAR_SUCCESS,
            payload: data
        })

    } catch (error){
        dispatch({
            type: PEDIDO_PAGAR_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const ListarPedidos = () => async (dispatch, getState) =>{
    try{
        dispatch({
            type: PEDIDO_LISTAR_PEDIDOS_REQUEST
        })

        const{
            usuarioLogin: { usuarioInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${ usuarioInfo.token }`
            }
        }

        const {data} = await axios.get(`/api/pedidos/meuspedidos/`, config)

        dispatch({
            type:PEDIDO_LISTAR_PEDIDOS_SUCCESS,
            payload: data
        })

    } catch (error){
        dispatch({
            type: PEDIDO_LISTAR_PEDIDOS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
