import Header from './components/Header'
import Footer from './components/Footer'
import Home from './screens/Home'
import ProdutoScreen from './screens/ProdutoScreen'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

function App() {
  return (
    <Router>
        <Header />
        <main className="py-3">
            <Container>
                <Route path='/' component={Home} exact/>
                <Route path='/produto/:id' component={ProdutoScreen} />
            </Container>
        </main>
        <Footer />
    </Router>
  );
}

export default App;
