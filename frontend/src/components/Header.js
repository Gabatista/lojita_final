import React from 'react'
import { Navbar, Nav, Container, Row, NavDropdown} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/usuarioActions'
import  CaixaBusca  from './CaixaBusca'

function Header(){
    const usuarioLogin = useSelector(state => state.usuarioLogin)
    const { usuarioInfo } = usuarioLogin

    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand> Lojita </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <CaixaBusca/>
                        <Nav className="mr-auto">

                            <LinkContainer to='/carrinho'>
                                <Nav.Link> <i className="fas fa-shopping-cart"></i>Carrinho</Nav.Link>
                            </LinkContainer>

                            {usuarioInfo ? (
                                <NavDropdown title={usuarioInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Perfil
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Sair
                                    </NavDropdown.Item>

                                </NavDropdown>
                            ): (

                            <LinkContainer to='/login'>
                                <Nav.Link> <i className="fas fa-user"></i>Login</Nav.Link>
                            </LinkContainer>

                            )}


                            {usuarioInfo && usuarioInfo.isAdmin &&(
                                <NavDropdown title='Admin' id='adminmenue'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>
                                            Usuários
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/produtolista'>
                                        <NavDropdown.Item>
                                            Produtos
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/pedidolista'>
                                        <NavDropdown.Item>
                                            Pedidos
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;