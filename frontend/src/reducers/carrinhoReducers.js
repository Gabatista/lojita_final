import { CARRINHO_AD_ITEM, CARRINHO_REMOVE_ITEM } from '../constants/carrinhoConstants'


export const carrinhoReducer = (state = { carrinhoItens:[] } , action) => {
    switch(action.type){
        case CARRINHO_AD_ITEM:
            const item = action.payload
            const item_existe = state.carrinhoItens.find(x => x.produto === item.produto)

            if (item_existe){
                return{
                    ...state,
                    /* se item não existe, retorna produto, do contrário atualiza */
                    carrinhoItens: state.carrinhoItens.map(x =>
                        x.produto === item_existe.produto ? item : x)
                }

            }else{
                return{
                    ...state,
                    carrinhoItens:[...state.carrinhoItens,item]
                }
            }


        case CARRINHO_REMOVE_ITEM:
            return {
                ...state,
                carrinhoItens:state.carrinhoItens.filter(x => x.produto !== action.payload)

            }


        default:
            return state
    }
}