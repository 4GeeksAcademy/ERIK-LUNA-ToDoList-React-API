import React, { useState } from "react";
import Formulario from "./Formulario.jsx";
import "../../styles/index.css";
import "../../styles/Formulario.css";

const ToDoList = () => {
  const [texto, setTexto] = useState("");
  const [tareas, setTareas] = useState([]);

  const agregarTarea = () => {
   
      setTareas([...tareas, texto]);
      setTexto(""); 
   
  };

  const eliminarTarea = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas.splice(index, 1);
    setTareas(nuevasTareas);
  };

  return (
    <div className="contenedor-principal">
      <h1>TO DO LIST</h1>
      <div className="contenedor-formulario">
        <Formulario texto={texto} setTexto={setTexto} agregarTarea={agregarTarea} />
		<div className="contenedor-tarea"> 
    <ul>
          {tareas.map((tarea, index) => (
            <li key={index} className="mi-li">
            {tarea}{" "}
            <button onClick={() => eliminarTarea(index)} className="mi-button">X</button>
          </li>
          ))}
    </ul>
		</div>
      </div>
    </div>
  );
};

export default ToDoList;

