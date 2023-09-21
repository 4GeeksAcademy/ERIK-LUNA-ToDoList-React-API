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

  const agregarTarea = () => {
    const nuevaTarea = { label: texto };
  
    fetch("https://playground.4geeks.com/apis/fake/todos/user/Erik-Luna", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...tareas, nuevaTarea]),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setTexto("");
      })
      .catch((error) => {
        console.log(error);
        setApiError("Error al agregar tarea.");
      })
      .finally(() => {
        // Actualizar el estado local sin importar si la solicitud fue exitosa o no.
        setTareas([...tareas, nuevaTarea]);
      });
  };

  const eliminarTarea = (index) => {
    const tareaEliminada = tareas[index];
    const nuevasTareas = tareas.filter((_, i) => i !== index);
  
    fetch("https://playground.4geeks.com/apis/fake/todos/user/Erik-Luna", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevasTareas),
    })
      .then((resp) => resp.json())
      .then(() => {
        setTareas(nuevasTareas);
      })
      .catch((error) => {
        console.log(error);
        setApiError("Error al eliminar tarea.");
      });
  };

  const limpiarTareas = () => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/Erik-Luna", {
      method: "PUT",
    })
      .then(() => {
        setTareas([]);
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
                {tareas.map((tarea, index) => (
                  <li key={index} className="mi-li">
                    {tarea.label}{" "}
                    <button onClick={() => eliminarTarea(index)} className="mi-button">
                      X
                    </button>
                  </li>
                ))}
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
