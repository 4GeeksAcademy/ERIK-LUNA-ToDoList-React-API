import React, { useState, useEffect } from "react";
import Formulario from "./Formulario.jsx";
import "../../styles/index.css";
import "../../styles/Formulario.css";

const ToDoList = () => {
  const [texto, setTexto] = useState("");
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);


  useEffect(() => {
    crearUsuario()
    fetch("https://playground.4geeks.com/apis/fake/todos/user/Erik-Luna")
      .then((resp) => resp.json())
      .then((data) => {
        setTareas(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setApiError("Error al cargar tareas desde la API.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    actualizarTareas()
  }, [tareas]);

  const agregarTarea = (tarea) => {
    const nuevaTarea = { label: tarea, done: false };
    setTareas([...tareas, nuevaTarea])
  }
  const crearUsuario = () => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/Erik-Luna", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([]),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(date)
    })
    .catch((error) => {
      console.log(error);
      setApiError("Error al agregar tarea.");
    })
    
};
  const actualizarTareas = () => {
      fetch("https://playground.4geeks.com/apis/fake/todos/user/Erik-Luna", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tareas),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setTexto("");
      })
      .catch((error) => {
        console.log(error);
        setApiError("Error al agregar tarea.");
      })
      
  };

  const eliminarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
  };

  const limpiarTareas = () => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/Erik-Luna", {
      method: "DELETE",
    })
      .then((resp) => {
        console.log(resp)
        setTareas([])
      })
      .catch((error) => {
        console.log(error);
        setApiError("Error al limpiar tareas.");
      });
  };

  return (
    <div className="contenedor-principal">
      <h1>TO DO LIST</h1>
      <div className="contenedor-formulario">
        <Formulario texto={texto} setTexto={setTexto} agregarTarea={agregarTarea} />
        <div className="contenedor-tarea">
          {loading ? (
            <p>Cargando tareas...</p>
          ) : apiError ? (
            <p>Error al cargar tareas desde la API.</p>
          ) : (
            <div>
              <ul>
                {tareas && tareas.length > 0 ? tareas.map((tarea, index) => (
                  <li key={index} className="mi-li">
                    {tarea.label}{" "}
                    <button onClick={() => eliminarTarea(index)} className="mi-button">
                      X
                    </button>
                  </li>
                )):
                <li className="mi-li">No hay tareas</li>
                }
              </ul>
              <button onClick={limpiarTareas} className="limpiar-button">
                Limpiar tareas
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
