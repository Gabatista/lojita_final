import Header from './components/Header'
import Footer from './components/Footer'
import Home from './screens/Home'
import CarrinhoScreen from './screens/CarrinhoScreen'
import ProdutoScreen from './screens/ProdutoScreen'
import LoginScreen from './screens/LoginScreen'
import CadastroScreen from './screens/CadastroScreen'
import PerfilScreen from './screens/PerfilScreen'

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
            </Container>
        </main>
        <Footer />
    </Router>
  );
}

export default App;
