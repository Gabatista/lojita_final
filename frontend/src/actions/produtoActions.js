import axios from 'axios'
import {
    PRODUTO_LISTA_REQUEST,
    PRODUTO_LISTA_SUCCESS,
    PRODUTO_LISTA_FAIL,

    PRODUTO_DETALHES_REQUEST,
    PRODUTO_DETALHES_SUCCESS,
    PRODUTO_DETALHES_FAIL,

    PRODUTO_APAGAR_REQUEST,
    PRODUTO_APAGAR_SUCCESS,
    PRODUTO_APAGAR_FAIL,

    PRODUTO_CRIAR_REQUEST,
    PRODUTO_CRIAR_SUCCESS,
    PRODUTO_CRIAR_FAIL,

    PRODUTO_ATUALIZAR_REQUEST,
    PRODUTO_ATUALIZAR_SUCCESS,
    PRODUTO_ATUALIZAR_FAIL,
    PRODUTO_ATUALIZAR_RESET,

    PRODUTO_CRIAR_ANALISE_REQUEST,
    PRODUTO_CRIAR_ANALISE_SUCCESS,
    PRODUTO_CRIAR_ANALISE_FAIL,
    PRODUTO_CRIAR_ANALISE_RESET,

    PRODUTO_TOP_REQUEST,
    PRODUTO_TOP_SUCCESS,
    PRODUTO_TOP_FAIL,

} from '../constants/produtoConstants'

export const listaProdutos = (keyword='') => async (dispatch) => {
    try{

        dispatch({ type:PRODUTO_LISTA_REQUEST })

        const { data } = await axios.get(`/api/produtos${keyword}`)

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

export const listaTopProdutos = () => async (dispatch) => {
    try{

        dispatch({ type:PRODUTO_TOP_REQUEST })

        const { data } = await axios.get(`/api/produtos/top/`)

        dispatch({
            type:PRODUTO_TOP_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({
            type: PRODUTO_TOP_FAIL,
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

export const apagarProduto = (id) => async (dispatch, getState) =>{
    try{
        dispatch({
            type: PRODUTO_APAGAR_REQUEST
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

        const {data} = await axios.delete(`/api/produtos/delete/${id}`, config)

        dispatch({
            type:PRODUTO_APAGAR_SUCCESS,
        })

    } catch (error){
        dispatch({
            type: PRODUTO_APAGAR_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const criarProduto = () => async (dispatch, getState) =>{
    try{
        dispatch({
            type: PRODUTO_CRIAR_REQUEST
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

        const {data} = await axios.post(`/api/produtos/criar/`, {}, config)

        dispatch({
            type:PRODUTO_CRIAR_SUCCESS,
            payload: data,
        })

    } catch (error){
        dispatch({
            type: PRODUTO_CRIAR_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const atualizarProduto = (produto) => async (dispatch, getState) =>{
    try{
        dispatch({
            type: PRODUTO_ATUALIZAR_REQUEST
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

        const {data} = await axios.put(`/api/produtos/update/${produto._id}/`, produto, config)

        dispatch({
            type:PRODUTO_ATUALIZAR_SUCCESS,
            payload: data,
        })
        //atualizando a visualização dos detalhes no state
        dispatch({type: PRODUTO_DETALHES_SUCCESS, payload:data})

    } catch (error){
        dispatch({
            type: PRODUTO_ATUALIZAR_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const criarProdutoAnalise = (produtoId, analise) => async (dispatch, getState) =>{
    try{
        dispatch({
            type: PRODUTO_CRIAR_ANALISE_REQUEST
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

        const {data} = await axios.post(`/api/produtos/${produtoId}/analises/`, analise, config)

        dispatch({
            type:PRODUTO_CRIAR_ANALISE_SUCCESS,
            payload: data,
        })

    } catch (error){
        dispatch({
            type: PRODUTO_CRIAR_ANALISE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}