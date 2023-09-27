import React, { useState } from "react";

const Formulario = ({ texto, setTexto, agregarTarea }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      agregarTarea(e.target.value);
    }
  };

  return (
    <div className="formulario">
      <input
        type="text"
        placeholder="Nueva tarea"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onKeyDown={handleKeyPress} // Agregar manejo de evento Enter aquí
      />
      <button onClick={agregarTarea}>Agregar</button>
    </div>
  );
};

export default Formulario;









