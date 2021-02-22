import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { produtoListaReducer, produtoDetalhesReducer } from './reducers/produtoReducers'
import { carrinhoReducer } from './reducers/carrinhoReducers'


const reducer = combineReducers({
    produtoLista: produtoListaReducer,
    produtoDetalhes: produtoDetalhesReducer,
    carrinho:carrinhoReducer,
})

const carrinhoItensDeStorage = localStorage.getItem('carrinhoItens') ?
        JSON.parse(localStorage.getItem('carrinhoItens')) : []

const initialState = {
    carrinho: {
        carrinhoItens: carrinhoItensDeStorage
    }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store