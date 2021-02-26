import axios from 'axios'
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
import { PEDIDO_LISTAR_PEDIDOS_REQUEST } from '../constants/pedidoConstants'

export const login = (email, password) => async (dispatch) =>{
    try{
        dispatch({
            type: USUARIO_LOGIN_REQUEST
        })

        const config = {
            headers:{
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/users/login/',
                                        {'username':email,'password':password},
                                        config)

        dispatch({
            type:USUARIO_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('usuarioInfo',JSON.stringify(data))

    } catch (error){
        dispatch({
            type: USUARIO_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const logout = () => (dispatch) => {
    localStorage.removeItem('usuarioInfo')
    dispatch({type:USUARIO_LOGOUT })
    dispatch({type: USUARIO_DETALHES_RESET })
    dispatch({type: PEDIDO_LISTAR_PEDIDOS_REQUEST })
}

export const cadastro = (name, email, password) => async (dispatch) =>{
    try{
        dispatch({
            type: USUARIO_REGISTRO_REQUEST
        })

        const config = {
            headers:{
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/users/register/',
                                        {'name': name, 'email':email,'password':password},
                                        config)

        dispatch({
            type:USUARIO_REGISTRO_SUCCESS,
            payload: data
        })

        dispatch({
            type:USUARIO_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('usuarioInfo',JSON.stringify(data))

    } catch (error){
        dispatch({
            type: USUARIO_REGISTRO_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getUsuarioDetalhes = (id) => async (dispatch, getState) =>{
    try{
        dispatch({
            type: USUARIO_DETALHES_REQUEST
        })

        const{
            usuarioLogin: {usuarioInfo},
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${usuarioInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/users/${id}/`,config)

        dispatch({
            type:USUARIO_DETALHES_SUCCESS,
            payload: data
        })

    } catch (error){
        dispatch({
            type: USUARIO_DETALHES_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const AtualizaPerfil = (usuario) => async (dispatch, getState) =>{
    try{
        dispatch({
            type: USUARIO_ATUALIZA_PERFIL_REQUEST
        })

        const{
            usuarioLogin: {usuarioInfo},
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${usuarioInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/users/profile/update/`, usuario, config)


        dispatch({
            type:USUARIO_ATUALIZA_PERFIL_SUCCESS,
            payload: data
        })

        dispatch({
            type:USUARIO_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('usuarioInfo',JSON.stringify(data))


    } catch (error){
        dispatch({
            type: USUARIO_ATUALIZA_PERFIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

