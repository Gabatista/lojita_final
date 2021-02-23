import {
        USUARIO_LOGIN_REQUEST,
        USUARIO_LOGIN_SUCCESS,
        USUARIO_LOGIN_FAIL,
        USUARIO_LOGOUT,
        USUARIO_REGISTRO_REQUEST,
        USUARIO_REGISTRO_SUCCESS,
        USUARIO_REGISTRO_FAIL,
        USUARIO_DETALHES_REQUEST,
        USUARIO_DETALHES_SUCCESS,
        USUARIO_DETALHES_FAIL,
        USUARIO_DETALHES_RESET,
        USUARIO_ATUALIZA_PERFIL_REQUEST,
        USUARIO_ATUALIZA_PERFIL_SUCCESS,
        USUARIO_ATUALIZA_PERFIL_FAIL,
        USUARIO_ATUALIZA_PERFIL_RESET,
} from '../constants/usuarioConstants'

export const usuarioLoginReducer = (state = {}, action) => {
    switch(action.type){
        case USUARIO_LOGIN_REQUEST:
            return {loading:true }

        case USUARIO_LOGIN_SUCCESS:
            return {loading:false, usuarioInfo: action.payload }

        case USUARIO_LOGIN_FAIL:
            return {loading:false, error: action.payload }

        case USUARIO_LOGOUT:
            return {}

        default:
            return state

    }
}

export const usuarioRegistroReducer = (state = {}, action) => {
    switch(action.type){
        case USUARIO_REGISTRO_REQUEST:
            return {loading:true }

        case USUARIO_REGISTRO_SUCCESS:
            return {loading:false, usuario: action.payload }

        case USUARIO_REGISTRO_FAIL:
            return {loading:false, error: action.payload }

        case USUARIO_LOGOUT:
            return {}

        default:
            return state

    }
}


export const usuarioDetalhesReducer = (state = { usuario:{} }, action) => {
    switch(action.type){
        case USUARIO_DETALHES_REQUEST:
            return {...state, loading:true}

        case USUARIO_DETALHES_SUCCESS:
            return {loading:false, usuario: action.payload }

        case USUARIO_DETALHES_FAIL:
            return {loading:false, error: action.payload }

        case USUARIO_DETALHES_RESET:
            return { usuario: {} }

        default:
            return state

    }
}

export const usuarioAtualizaPerfilReducer = (state ={}, action) => {
    switch(action.type){
        case USUARIO_ATUALIZA_PERFIL_REQUEST:
            return { loading:true }

        case USUARIO_ATUALIZA_PERFIL_SUCCESS:
            return { loading:false, success: true, usuarioInfo: action.payload }

        case USUARIO_ATUALIZA_PERFIL_FAIL:
            return { loading:false, error: action.payload }


        case USUARIO_ATUALIZA_PERFIL_RESET:
            return {}

        default:
            return state

    }
}