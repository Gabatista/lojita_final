import React from 'react'
import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

function PassosCheckout(passo1, passo2, passo3, passo4){




    return(
        <Nav className='justify-content-center'>
            <Nav.Item>
            {passo1 ?(
                <LinkContainer to ='/login'>
                    <Nav.Link>
                        Login
                    </Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>
                    Login
                </Nav.Link>
            )}
            </Nav.Item>

            <Nav.Item>
            {passo2 ?(
                <LinkContainer to ='/shipping'>
                    <Nav.Link>
                        Entrega
                    </Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>
                    Entrega
                </Nav.Link>
            )}
            </Nav.Item>

            <Nav.Item>
            {passo3 ?(
                <LinkContainer to ='/pagamento'>
                    <Nav.Link>
                        Pagamento
                    </Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>
                    Pagamento
                </Nav.Link>
            )}
            </Nav.Item>

            <Nav.Item>
            {passo4 ?(
                <LinkContainer to ='/finalizarpedido'>
                    <Nav.Link>
                        Finalizar Pedido
                    </Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>
                    Finalizar Pedido
                </Nav.Link>
            )}
            </Nav.Item>
        </Nav>
    )
}

export default PassosCheckout