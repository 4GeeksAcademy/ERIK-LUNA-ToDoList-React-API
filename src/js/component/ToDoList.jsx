import React, { useState, useEffect } from "react";
import Formulario from "./Formulario.jsx";
import "../../styles/index.css";
import "../../styles/Formulario.css";

const ToDoList = () => {
  const [texto, setTexto] = useState("");
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/Erik-Luna" )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data); 
        setTareas(data);
        setLoading(false); 
      })
      .catch((error) => {
        // Manejo de errores
        console.log(error);
        setLoading(false); 
      });
  }, []);


  const agregarTarea = () => {
    setTareas([...tareas, { label: texto }]); 
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
          {loading ? (
            <p>Cargando tareas...</p>
          ) : (
            <ul>
              {tareas.map((tarea, index) => (
                <li key={index} className="mi-li">
                  {tarea.label}{" "}
                  <button onClick={() => eliminarTarea(index)} className="mi-button">
                    X
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
