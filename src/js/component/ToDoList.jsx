
import React, {useState, useEffect} from "react";



//create your first component
const ToDoList = () => {

	
	const [tarea,setTarea] = useState("");
	const [list,setList] = useState([]);


	/*const listItems = list.map((item) =>
	<li key={item.toString()}>
	{item}
  </li>
	);*/

	const deleteTarea = (indexItem) => {
		setList((prevState) =>
		  prevState.filter((listItems, index) => index !== indexItem)
		);
	  };
	  

	function agregarTarea(e) {
		e.preventDefault()
// {label: 'sample task', done: false}
		// setList([...list, {tarea}]);
		setList(list.concat({label: tarea, done: false}))
		setTarea("")
	}


	function crearUsuario(){
		fetch(`https://playground.4geeks.com/apis/fake/todos/user/Erik-Luna`,
		{method: 'POST', 
		headers: {
			'Content-Type': 'application/json'},
		body: JSON.stringify([])
	  })
		.then((response)=>response.json())
		.then((data)=>console.log(data))
	}

	function obtenerLista(){
		fetch(`https://playground.4geeks.com/apis/fake/todos/user/Erik-Luna`,
		{method: 'GET', 
		
	  })
		.then((response)=>response.json())
		.then((data)=>setList(data))
	}



	function deleteList() {
		fetch(`https://playground.4geeks.com/apis/fake/todos/user/Erik-Luna`, {
		  method: 'DELETE',
		  headers: {
			'Content-Type': 'application/json'
		  }
		})
		  .then((response) => response.json())
		  .then((data) => {
			console.log(data);
			if (data.result === "ok") {
			  setList([]);
			}
		  })
		  .catch((error) => console.error('Error deleting list:', error));
	  }
	  

	function actualizar(){
		fetch(`https://playground.4geeks.com/apis/fake/todos/user/Erik-Luna`,
		{method: 'PUT', 
		headers: {
			'Content-Type': 'application/json'},
		body: JSON.stringify(list)
	  })
		.then((response)=>response.json())
		.then((data)=>console.log(data))
	}



	useEffect (()=>{
		crearUsuario();
		obtenerLista()
	},[])

	useEffect (()=>{
		actualizar()
		},[list])

	return (

	<>
  <div className="task-container card container bg-info text-white d-flex flex-column align-items-center mt-3 md-w50">
    <h2 className="titulo p-2">TODOLIST</h2>
    <div className="card-body">
      <input
        type="text"
        className="input m-1 w-85"
        value={tarea}
        id="exampleInput"
        aria-describedby="inputHelp"
        onChange={(e) => { setTarea(e.target.value) }}
        placeholder="Añadir una tarea."
      />
      <button
        type="submit"
        className="btn btn-primary btn-sm"
        onClick={agregarTarea}
      >
        Agregar
      </button>
    </div>

    <div className="to-do-list d-flex">
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item.label}
            <button className="btn" onClick={() => deleteTarea(index)}>
              <i className="fas fa-trash-alt" />
            </button>
          </li>
        ))}
      </ul>
    </div>

    
  </div>
</>


	);
};

export default ToDoList;