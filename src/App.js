import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import { withAuthenticator, Heading } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';

function App({ signOut, user }) {
  const[task, setTask] = useState({
    name: "",
    description: "",
  })
  const [todos, setTodos] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(task)
    console.log('prueba')
    const result = await API.graphql(graphqlOperation(createTodo, {input: task}))
    console.log(result)
  }

  useEffect(() => {
    async function loadTodos() {
      const result = await API.graphql(graphqlOperation(listTodos))
      console.log(result)
      setTodos(result.data.listTodos.items)
    }
    loadTodos()
  }, [])

  return (
    <>
    <Container>
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action2"><Heading level={1}>Hello {user.username}</Heading></Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button onClick={signOut}>Sign out</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    {/* <form onSubmit={handleSubmit}>
      <input type="text" name='name' placeholder='name'
      onChange={e => setTask({...task, name: e.target.value})} />
      <textarea name="description" placeholder='description'
      onChange={e => setTask({...task, description: e.target.value})}></textarea>
      <button>
        submit
      </button>
    </form> */}
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="name" placeholder="Enter name" onChange={e => setTask({...task, name: e.target.value})}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control type="name" placeholder="Enter description" onChange={e => setTask({...task, description: e.target.value})}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>


        {/* {JSON.stringify(todos)} */}

        <div class="divTable">
             <div class="headRow">
                <div class="divCell" align="center">Todo ID</div>
                <div  class="divCell">Todo Name</div>
                <div  class="divCell">Todo Description</div>
             </div>
            <div class="divRow">
                  <div class="divCell">{todos.map((post) => <li key={post.id}> {post.id}</li>)}</div>
                <div class="divCell">{todos.map((post) => <li key={post.name}>{post.name}</li>)}</div>
                <div class="divCell">{todos.map((post) => <li key={post.name}>{post.description}</li>)}</div>
            </div>
      </div>




      </Container>
    </>
  );
}

export default withAuthenticator(App);
