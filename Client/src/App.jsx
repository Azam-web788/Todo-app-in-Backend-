import React, { useRef } from 'react';
import axios from "axios"
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,  Paper,
  Box,
  CssBaseline
} from '@mui/material';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';


const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function TodoAppUI() {
  const [title , setTitle] = useState("");
  const [desc , setDesc] = useState("");
  const [todos , setTodos] = useState([]);
  const [id , setId] = useState(null);
  const [error , setError] = useState("");
  function addData() {
    axios.post("http://localhost:3000/todoapp/addTodo" , {title , desc})
    .then((result) => console.log(result.data))
    .catch((error) => {
      console.error(error)
    }
    )
  }
  function checkData() {
    const res = axios.get("http://localhost:3000/todoapp/listTodo").then((result) => {
      console.log(result)
      todos.push(result)
setTodos(result.data); // assuming result.data is an array
    }).catch((err) =>{
      console.log(err);
    })  
  }
  function deleteTodo(id) {
    const res = axios.delete(`http://localhost:3000/todoapp/deleteTodo/${id}`).then((result) => {
      console.log(result.data);
      checkData();
    }).catch((err) => {
      console.error(err);
      alert("error during deleting data")
    })
  }
  function startEdit(item) {
    setTitle(item.title)
    setDesc(item.desc)
   setId(item._id)
  }
  function updateTodo() {
    if (!title || !desc) {
      alert("plese fill all fields")
    }
    axios.put(`http://localhost:3000/todoapp/updateTodo/${id}` , {title : title , desc : desc}).then((result) => {
      console.log(result.data);
      setTitle("")
      setDesc("")
      setId(null)
      checkData();
    }).catch((err) => {
      console.error(err);
      
    })
  }
  function cancel() {
    setTitle("")
    setDesc("")
    setId(null)
  }
  useEffect(() =>{
    checkData()
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        {/* Add Todo Form */}
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {id ? "Edit Todo" : "Add New Todo"}
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              label="Title"
              name="title"
              margin="normal"
              value={title}
              onChange={e => setTitle(e.target.value)}
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="desc"
              name="desc"
              margin="normal"
              variant="outlined"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              multiline
              rows={3}
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
             {id ? (
                <>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={cancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={updateTodo}
                    startIcon={<EditSquareIcon />}
                  >
                    Update Todo
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addData}
                  startIcon={<AddIcon />}
                >
                  Add Todo
                </Button>
              )}
            </Box>
          </Box>
        </Paper>

        {/* Todo List */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Your Todos
        </Typography>
      </Container>
      <Box sx={{
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        flexDirection : "column"
      }}>
      {todos && todos.map((item, index) => (
  <Box key={index} sx={{
    boxShadow : "5px 10px 10px 10px gray",
    border : "1px solid gray",
    marginBottom : "20px",
    padding : "20px",
    textAlign : "left",
    width : "50%"
  }}>
    <Typography variant='h4'><b>Title :</b> {item.title}</Typography>
    <Typography variant='h4'><b>Description :</b> {item.desc}</Typography>
    <Box sx={{
      float : "right",
      display : 'flex',
      gap : "20px"
    }}>
    <Button variant='contained' color='primary' onClick={() => deleteTodo(item._id)}><DeleteIcon /></Button>
    <Button variant='contained' color='primary' onClick={() => startEdit(item)}><EditSquareIcon /></Button>
    </Box>
  </Box>
))}

      </Box>
    </ThemeProvider>
  );
}

export default TodoAppUI;