import React from "react";

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
    <form>
      <input
        type="text"
        value={texto}
        onChange={cambiarTexto}
        onKeyDown={manejarKeyDown} // Cambia onKeyPress a onKeyDown
        placeholder="Introduce algún texto y presiona Enter"
      />
    </form>
  );
};

export default Formulario;


