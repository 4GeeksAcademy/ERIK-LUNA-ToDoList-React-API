import React from "react";
import "../../styles/Formulario.css";

const Formulario = ({ texto, setTexto, agregarTarea }) => {
  const cambiarTexto = (event) => {
    // Actualiza la variable texto al cambiar el valor del input
    setTexto(event.target.value);
  };

  const manejarKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Evita la recarga de la página por defecto
      agregarTarea();
    }
  };

  return (
    <form className="mi-formulario">
      <input
        type="text"
        value={texto}
        onChange={cambiarTexto}
        onKeyDown={manejarKeyDown}
        placeholder="Introduce algún texto y presiona Enter"
        className="mi-input"
      />
    </form>
  );
};

export default Formulario;


