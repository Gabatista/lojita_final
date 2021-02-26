import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { produtoListaReducer, produtoDetalhesReducer } from './reducers/produtoReducers'
import { carrinhoReducer } from './reducers/carrinhoReducers'
import { usuarioLoginReducer, usuarioRegistroReducer, usuarioDetalhesReducer, usuarioAtualizaPerfilReducer } from './reducers/usuarioReducers'
import { pedidoCriarReducer, pedidoDetalhesReducer, pedidoPagarReducer, pedidoListarReducer } from './reducers/pedidoReducers'

const reducer = combineReducers({
    produtoLista: produtoListaReducer,
    produtoDetalhes: produtoDetalhesReducer,
    carrinho: carrinhoReducer,
    usuarioLogin: usuarioLoginReducer,
    usuarioCadastro: usuarioRegistroReducer,
    usuarioDetalhes: usuarioDetalhesReducer,
    usuarioAtualizaPerfil: usuarioAtualizaPerfilReducer,
    pedidoCriar: pedidoCriarReducer,
    pedidoDetalhes: pedidoDetalhesReducer,
    pedidoPagar: pedidoPagarReducer,
    pedidoListar: pedidoListarReducer,

})

const carrinhoItensDeStorage = localStorage.getItem('carrinhoItens') ?
        JSON.parse(localStorage.getItem('carrinhoItens')) : []


const usuarioInfoDeStorage = localStorage.getItem('usuarioInfo') ?
        JSON.parse(localStorage.getItem('usuarioInfo')) : null

const enderecoEntregaDeStorage = localStorage.getItem('enderecoEntrega') ?
        JSON.parse(localStorage.getItem('enderecoEntrega')) : {}


const initialState = {
    carrinho: {
        carrinhoItens: carrinhoItensDeStorage,
        enderecoEntrega: enderecoEntregaDeStorage
    },
    usuarioLogin: {
        usuarioInfo: usuarioInfoDeStorage
    }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store