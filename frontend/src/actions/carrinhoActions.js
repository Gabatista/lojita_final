import axios from 'axios'
import { CARRINHO_AD_ITEM, CARRINHO_REMOVE_ITEM } from '../constants/carrinhoConstants'

/*getstate recolhe qualquer parte do state, tipo useSelector, acessando a store */
export const addCarrinho = (id, qtd) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/produtos/${id}`)

    dispatch({
        type: CARRINHO_AD_ITEM,
        payload: {
            produto: data._id,
            nome: data.nome,
            imagem: data.imagem,
            preco: data.preco,
            num_estoque: data.num_estoque,
            qtd
        }
    })
    localStorage.setItem('carrinhoItens', JSON.stringify(getState().carrinho.carrinhoItens))

}

export const removerDoCarrinho = (id) => (dispatch,getState) => {
    dispatch({
        type:CARRINHO_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('carrinhoItens', JSON.stringify(getState().carrinho.carrinhoItens))
}