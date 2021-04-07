import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Router } from 'react-router-dom'
import Header from "./Components/Header"
import Tasks from "./Components/Tasks"
import AddTask from "./Components/AddTask"
import Footer from "./Components/Footer"
import About from "./Components/About"

function App() {
  const [showForm, setShowForm] = useState(false)
  const [tasksarr, setTasks] = useState([])

  //
  useEffect ( () => {
    const GetTasks = async () => {
      const getdatafromjson = await FetchTasks()
      console.log("DATA: ",getdatafromjson)
      setTasks(getdatafromjson)
    }
    GetTasks()
  },[])

  // Fetch all Tasks
  const FetchTasks = async() => {
    const response = await fetch('http://localhost:5000/tasksarr')
    console.log(response)

    const data = await response.json()
    return data
  }

  // Add task
  const addEvent = async (obj) => {
    console.log(obj)
    const req = await fetch ('http://localhost:5000/tasksarr',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(obj)
    })

    const data = await req.json()
    console.log(data)
    setTasks([...tasksarr, data])

    // const id = Math.floor(Math.random() * 10000 ) + 1
    // console.log(id)
    // const newTask = {id, ...obj}
    // setTasks([...tasksarr, newTask])
  }

  // Delete task from state
  const deleteEvent = async (id) => {
    console.log('Delete', id)
    await fetch(`http://localhost:5000/tasksarr/${id}`, {method: 'DELETE'})
    setTasks(tasksarr.filter( (task) => task.id !== id ))
  }

  // Fetch Task
  const FetchSingleTask = async(id) => {
    const response = await fetch(`http://localhost:5000/tasksarr/${id}`)
    const data = await response.json()
    return data
  }

  // Toggle task's reminder
  const ToggleReminder = async(id) => {
    console.log('Toggle',id)
    const taskToToggle = await FetchSingleTask(id)
    const updTask = {...taskToToggle, reminder:!taskToToggle.reminder}

    const req = await fetch (`http://localhost:5000/tasksarr/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })
    const data = await req.json()
    console.log(data)

    setTasks(tasksarr.map((task) => task.id === id ? {...task, reminder: data.reminder } : task ))
  }

  return (
    <BrowserRouter>
      <div className="container">
        <Header title="Task Tracker" onAdd={ () => setShowForm(!showForm) } isFormVisible={showForm} />
        
        
        <Route path='/' exact render={ (props) => (
          <>
            {showForm && <AddTask onAdd={addEvent} />}
            { tasksarr.length > 0 ? <Tasks tasksarr={tasksarr} onDelete={deleteEvent} onToggle={ToggleReminder} /> : <h3>No tasks</h3> } 
          </>
        )} /> 
        <Route path='/about' component={About} /> 
        <Footer />
      </div>
    </BrowserRouter>
  );
}

// class App extends React.Component
// {
//   render() {
//     return (
//       <h1>yolo</h1>
//     )
//   }
// }

// setState -> class components
// useState -> functional  components

export default App;
