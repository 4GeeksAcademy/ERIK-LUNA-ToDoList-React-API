import React, { useState } from "react";
import Formulario from "./Formulario.jsx";

const ToDoList = () => {
  const [texto, setTexto] = useState("");
  const [tareas, setTareas] = useState([]);

  const agregarTarea = () => {
    if (texto.trim() !== "") {
      setTareas([...tareas, texto]);
      setTexto(""); // Limpia el input después de agregar la tarea
    }
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
            <li key={index}>
              {tarea}{" "}
              <button onClick={() => eliminarTarea(index)}>X</button>
            </li>
          ))}
    </ul>
		</div>
      </div>
    </div>
  );
};

export default ToDoList;

