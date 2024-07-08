import { useEffect, useRef, useState } from 'react'
import Navbar from './Components/Navbar'
import { parse, stringify, v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  const input1 = useRef(null)




  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if(todostring){
    let todos = JSON.parse(localStorage.getItem("todos"))
   settodos(todos)
    }
  }, [])
  const saveToLS = () => {
    localStorage.setItem("todos",JSON.stringify(todos));
  }
 
  


  const editHandle = (e,id) => {
    input1.current.select()
    let todo = todos.filter((item)=>{
      return item.id === id
    })
    let todos1 = todo[0].todo;
    let newtodos = todos.filter((item)=>{
      return item.id !== id
    })
    settodos(newtodos)
    saveToLS()

    settodo(todos1)

  }
  const deleteHandle = (e,id) => {
    let newtodos = todos.filter((item)=>{
      return item.id !== id
    })
    settodos(newtodos)
    saveToLS()
      
  }
  const addHandle = () => {
    settodos([...todos, { id: uuidv4(),todo, isCompleted: false }])
    saveToLS()
    
  }
  
  
  const handleChange = (e) => {
    settodo(e.target.value)
    saveToLS()
  }
  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((e)=>{
      return e.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
    saveToLS()
  }
  const toggleFinished = (e) => { 

    setshowFinished(!showFinished)
   }
  

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-4 rounded-md p-5 bg-slate-900 border shadow-md min-h-[80vh]">
        <h1 className='font-bold underline text-2xl flex justify-center'>iTask</h1>
        <div className="addTodo mb-3">
          <h2 className='text-xl font-bold mb-2'>Add to do</h2>
          <div className="flex md:gap-6">
            <input ref={input1}  onChange={handleChange} name='' value={todo} type="text" className='text-black md:w-80'  />
            <button onClick={addHandle} disabled={todo.length < 3} className='bg-purple-900 p-2 rounded-md'>Add</button>
          </div>
    
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished
        <h1 className='text-xl font-bold mb-2'>Your Todos</h1>
        <div className="todos">
          {
            (todos.length === 0) && <div>No todos to Display</div>
          }
          {todos.map((item) => {
            return (showFinished || !item.isCompleted) && <div key={item.todo} className="todo w-full border flex items-center my-4 justify-between">
              <div className='flex gap-5 items-center '>
              <input onChange={handlecheckbox} type="checkbox" name={item.id} checked={item.isCompleted} id="" />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex justify-center items-center gap-3 relative right-0">
                <button onClick={(e)=>editHandle(e,item.id)} className='bg-purple-900 p-2 rounded-md min-w-12'>Edit</button>
                <button onClick={(e)=> deleteHandle(e,item.id)} className='bg-purple-900 p-2 rounded-md min-w-3'>Delete</button>
              </div>

            </div>
            })}
        </div>
      </div>
    </>
  )
}

export default App
