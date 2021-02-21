import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { produtoListaReducer, produtoDetalhesReducer } from './reducers/produtoReducers'

const reducer = combineReducers({
    produtoLista: produtoListaReducer,
    produtoDetalhes: produtoDetalhesReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store