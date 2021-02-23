import axios from 'axios'
import {
    PRODUTO_LISTA_REQUEST,
    PRODUTO_LISTA_SUCCESS,
    PRODUTO_LISTA_FAIL,

    PRODUTO_DETALHES_REQUEST,
    PRODUTO_DETALHES_SUCCESS,
    PRODUTO_DETALHES_FAIL,

} from '../constants/produtoConstants'

export const listaProdutos = () => async (dispatch) => {
    try{

        dispatch({ type:PRODUTO_LISTA_REQUEST })

        const { data } = await axios.get('/api/produtos/')

        dispatch({
            type:PRODUTO_LISTA_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({
            type: PRODUTO_LISTA_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listaProdutoDetalhes = (id) => async (dispatch) => {
    try{

        dispatch({ type:PRODUTO_DETALHES_REQUEST })

        const { data } = await axios.get(`/api/produtos/${id}`)

        dispatch({
            type:PRODUTO_DETALHES_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({
            type: PRODUTO_DETALHES_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}