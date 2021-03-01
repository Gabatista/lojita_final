import Header from './components/Header'
import Footer from './components/Footer'
import Home from './screens/Home'
import CarrinhoScreen from './screens/CarrinhoScreen'
import ProdutoScreen from './screens/ProdutoScreen'
import LoginScreen from './screens/LoginScreen'
import CadastroScreen from './screens/CadastroScreen'
import PerfilScreen from './screens/PerfilScreen'
import EntregaScreen from './screens/EntregaScreen'
import PagamentoScreen from './screens/PagamentoScreen'
import FinalizaPedidoScreen from './screens/FinalizaPedidoScreen'
import PedidoScreen from './screens/PedidoScreen'
import UsuarioListaScreen from './screens/UsuarioListaScreen'
import UsuarioEditScreen from './screens/UsuarioEditScreen'
import ProdutoListaScreen from './screens/ProdutoListaScreen'
import ProdutoEditaScreen from './screens/ProdutoEditaScreen'
import PedidoListaScreen from './screens/PedidoListaScreen'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

function App() {
  return (
    <Router>
        <Header />
        <main className="py-3">
            <Container>
                <Route path='/' component={Home} exact/>
                <Route path='/login' component={LoginScreen} />
                <Route path='/register' component={CadastroScreen} />
                <Route path='/profile' component={PerfilScreen} />
                <Route path='/produto/:id' component={ProdutoScreen} />
                <Route path='/carrinho/:id?' component={CarrinhoScreen} />
                <Route path='/shipping' component={EntregaScreen} />
                <Route path='/pagamento' component={PagamentoScreen} />
                <Route path='/finalizarPedido' component={FinalizaPedidoScreen} />
                <Route path='/pedido/:id' component={PedidoScreen} />
                <Route path='/admin/userlist' component={UsuarioListaScreen} />
                <Route path='/admin/user/:id/edit' component={UsuarioEditScreen} />
                <Route path='/admin/produtolista' component={ProdutoListaScreen} />
                <Route path='/admin/produto/:id/edit' component={ProdutoEditaScreen} />
                <Route path='/admin/pedidolista' component={PedidoListaScreen} />

            </Container>
        </main>
        <Footer />
    </Router>
  );
}

export default App;
