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
    PRODUTO_CRIAR_RESET,

    PRODUTO_ATUALIZAR_REQUEST,
    PRODUTO_ATUALIZAR_SUCCESS,
    PRODUTO_ATUALIZAR_FAIL,
    PRODUTO_ATUALIZAR_RESET,
} from '../constants/produtoConstants'

export const produtoListaReducer = (state = {produtos:[]}, action) => {
    switch(action.type){
        case PRODUTO_LISTA_REQUEST:
            return {loading:true, produtos: []}

        case PRODUTO_LISTA_SUCCESS:
            return {loading:false, produtos: action.payload }

        case PRODUTO_LISTA_FAIL:
            return {loading:false, error: action.payload }

        default:
            return state

    }

}

export const produtoDetalhesReducer = (state = {produto:{avaliacoesap:[]} }, action) => {
    switch(action.type){
        case PRODUTO_DETALHES_REQUEST:
            return {loading:true, ...state}

        case PRODUTO_DETALHES_SUCCESS:
            return {loading:false, produto: action.payload }

        case PRODUTO_DETALHES_FAIL:
            return {loading:false, error: action.payload }

        default:
            return state

    }
}

export const produtoApagarReducer = (state = {} , action) => {
    switch(action.type){
        case PRODUTO_APAGAR_REQUEST:
            return {loading:true }

        case PRODUTO_APAGAR_SUCCESS:
            return {loading:false, success: true }

        case PRODUTO_APAGAR_FAIL:
            return {loading:false, error: action.payload }

        default:
            return state

    }
}

export const produtoCriarReducer = (state = {} , action) => {
    switch(action.type){
        case PRODUTO_CRIAR_REQUEST:
            return {loading:true }

        case PRODUTO_CRIAR_SUCCESS:
            return {loading:false, success: true, produto:action.payload }

        case PRODUTO_CRIAR_FAIL:
            return {loading:false, error: action.payload }

        case PRODUTO_CRIAR_RESET:
            return{}

        default:
            return state

    }
}

export const produtoAtualizarReducer = (state = {produto:{} } , action) => {
    switch(action.type){
        case PRODUTO_ATUALIZAR_REQUEST:
            return {loading:true }

        case PRODUTO_ATUALIZAR_SUCCESS:
            return {loading:false, success: true, produto:action.payload }

        case PRODUTO_ATUALIZAR_FAIL:
            return {loading:false, error: action.payload }

        case PRODUTO_ATUALIZAR_RESET:
            return{}

        default:
            return state

    }
}