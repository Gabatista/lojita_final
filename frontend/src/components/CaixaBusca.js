import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function CaixaBusca(){
    const [keyword, setKeyWord] = useState('')
    let history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword){
            history.push(`/?keyword=${keyword}&page=1`)
        }else{
            history.push(history.push(history.location.pathname))
        }
    }
    return(
        <Form onSubmit={submitHandler} inline>
            <Form.Control type='text' name='p' onChange={(e) => setKeyWord(e.target.value)} className='mr-sm-2 ml-sm-5'>
            </Form.Control>

            <Button type='submit' variant='outline-success' className='pag-2'>
                Pesquisar
            </Button>
        </Form>
    )
}

export default CaixaBusca