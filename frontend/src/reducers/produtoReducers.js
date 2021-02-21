import {
    PRODUTO_LISTA_REQUEST,
    PRODUTO_LISTA_SUCCESS,
    PRODUTO_LISTA_FAIL,

    PRODUTO_DETALHES_REQUEST,
    PRODUTO_DETALHES_SUCCESS,
    PRODUTO_DETALHES_FAIL,
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
