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
        USUARIO_LISTAR_REQUEST,
        USUARIO_LISTAR_SUCCESS,
        USUARIO_LISTAR_FAIL,
        USUARIO_LISTAR_RESET,
        USUARIO_APAGAR_REQUEST,
        USUARIO_APAGAR_SUCCESS,
        USUARIO_APAGAR_FAIL,
        USUARIO_ATUALIZAR_REQUEST,
        USUARIO_ATUALIZAR_SUCCESS,
        USUARIO_ATUALIZAR_FAIL,
        USUARIO_ATUALIZAR_RESET,
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
    dispatch({type: USUARIO_LOGOUT })
    dispatch({type: USUARIO_DETALHES_RESET })
    dispatch({type: PEDIDO_LISTAR_PEDIDOS_REQUEST })
    dispatch({type: USUARIO_LISTAR_RESET })
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

export const listarUsuarios = () => async (dispatch, getState) =>{
    try{
        dispatch({
            type: USUARIO_LISTAR_REQUEST
        })

        const{
            usuarioLogin: { usuarioInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${usuarioInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/users/`, config)


        dispatch({
            type:USUARIO_LISTAR_SUCCESS,
            payload: data
        })


    } catch (error){
        dispatch({
            type: USUARIO_LISTAR_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const apagarUsuario = (id) => async (dispatch, getState) =>{
    try{
        dispatch({
            type: USUARIO_APAGAR_REQUEST
        })

        const{
            usuarioLogin: { usuarioInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${usuarioInfo.token}`
            }
        }

        const {data} = await axios.delete(`/api/users/delete/${id}`, config)


        dispatch({
            type:USUARIO_APAGAR_SUCCESS,
            payload: data
        })


    } catch (error){
        dispatch({
            type: USUARIO_APAGAR_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const atualizarUsuario = (usuario) => async (dispatch, getState) =>{
    try{
        dispatch({
            type: USUARIO_ATUALIZAR_REQUEST
        })

        const{
            usuarioLogin: { usuarioInfo },
        } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${usuarioInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/users/update/${usuario._id}/`, usuario, config)

        dispatch({
            type:USUARIO_ATUALIZAR_SUCCESS,
        })

        dispatch({
            type:USUARIO_DETALHES_SUCCESS,
            payload: data
        })



    } catch (error){
        dispatch({
            type: USUARIO_ATUALIZAR_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}