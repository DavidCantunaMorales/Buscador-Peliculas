import { useState } from "react";
import { useEffect } from "react";

import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css'

import "./App.css";

function App() {

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [años, setAños] = useState();
  const [id, setId] = useState();

  const [editar, setEditar] = useState(false);

  // lista de los empleados
  const [empleadosList, setEmpleados] = useState([]);

  // Funciones para manejar los cambios en los campos
  const handleNombre = (event) => {
    setNombre(event.target.value);
  }

  const handleEdad = (event) => {
    setEdad(event.target.value);
  }

  const handlePais = (event) => {
    setPais(event.target.value);
  }

  const handleCargo = (event) => {
    setCargo(event.target.value);
  }

  const handleAños = (event) => {
    setAños(event.target.value);
  }

  // Funcion para editar los datos del empleado
  const handleEmpleado = (event) => {
    setEditar(event.target.value);
  }

  // Funcion para enviar los datos del empleado al servidor
  const guardarEmpleado = async () => {
    try {
      const response = await fetch('http://localhost:3000/guardarDatos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, edad, pais, cargo, años }),
      });

      if (response.ok) {
        console.log('Datos guardados correctamente en el servidor');
        // Actualiza la lista de empleados en el estado de tu componente React
        setEmpleados([...empleadosList, { nombre_emp: nombre }]);
        getEmpleados();

      } else {
        console.error('Error al guardar datos en el servidor');
        // Manejar errores aquí
      }
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
    }
  };

  // Funcion para enviar los datos del empleado al servidor
  const actualizarEmpleado = async () => {
    try {
      const response = await fetch('http://localhost:3000/actualizarDatos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, edad, pais, cargo, años, id }),
      });

      if (response.ok) {
        console.log('Datos guardados correctamente en el servidor');
        getEmpleados();

      } else {
        console.error('Error al guardar datos en el servidor');
        // Manejar errores aquí
      }
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
    }
  };

  // Funcion para obtener los datos de los empleados desde el servidor
  const getEmpleados = async () => {
    try {
      const response = await fetch('http://localhost:3000/obtenerDatos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Empleados obtenidos correctamente del servidor:', data);
        // Actualiza la lista de empleados en el estado de tu componente React
        setEmpleados(data);

      } else {
        console.error('Error al obtener empleados del servidor');
        // Manejar errores aquí
      }
    } catch (error) {
      console.error('Error al enviar solicitud al servidor:', error);
    }
  };

  const editarEmpleado = async (val) => {


    setEditar(true);

    setId(val.id_emp);
    setNombre(val.nombre_emp);
    setEdad(val.edad_emp);
    setPais(val.pais_emp);
    setCargo(val.cargo_emp);
    setAños(val.anios_emp);
  };

  useEffect(() => {
    getEmpleados(); // Esto ejecutará getEmpleados en cada renderizado
  }, []);

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          GESTION DE EMPLEADOS
        </div>
        <div className="card-body">

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text" name="nombre" className="form-control" placeholder="Ingrese el nombre"
              aria-label="Username" aria-describedby="basic-addon1" onChange={handleNombre} value={nombre} />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad:</span>
            <input type="number" name="edad" className="form-control" placeholder="Ingrese la edad"
              aria-label="Username" aria-describedby="basic-addon1" onChange={handleEdad} value={edad} />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Pais:</span>
            <input type="text" name="pais" className="form-control" placeholder="Ingrese el pais"
              aria-label="Username" aria-describedby="basic-addon1" onChange={handlePais} value={pais} />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo:</span>
            <input type="text" name="cargo" className="form-control" placeholder="Ingrese el cargo"
              aria-label="Username" aria-describedby="basic-addon1" onChange={handleCargo} value={cargo} />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años:</span>
            <input type="number" name="años" className="form-control" placeholder="Ingrese los años de expriencia"
              aria-label="Username" aria-describedby="basic-addon1" onChange={handleAños} value={años} />
          </div>

        </div>

        <div className="card-footer text-muted">
          {
            editar == true ? (
              <div>
                <button className="btn btn-warning m-2" onClick={actualizarEmpleado}>Editar</button>
                <button className="btn btn-danger m-2" onClick={guardarEmpleado}>Cancelar</button>
              </div>
            ) : (
              <button className="btn btn-success" onClick={guardarEmpleado}>Registrar</button>
            )
          }

        </div>

      </div>

      <br />
      <br />

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NOMBRE</th>
            <th scope="col">EDAD</th>
            <th scope="col">PAIS</th>
            <th scope="col">CARGO</th>
            <th scope="col">EXPERIENCIA</th>
            <th scope="col">ACCION</th>
          </tr>
        </thead>
        <tbody>

          {
            empleadosList.map((empleado, key) => {
              return (
                <tr key={key}>
                  <th>{empleado.id_emp}</th>
                  <td>{empleado.nombre_emp}</td>
                  <td>{empleado.edad_emp}</td>
                  <td>{empleado.pais_emp}</td>
                  <td>{empleado.cargo_emp}</td>
                  <td>{empleado.anios_emp}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button"
                        onClick={() => editarEmpleado(empleado)}
                        className="btn btn-warning" >Editar</button>
                      <button type="button" className="btn btn-danger">Eliminar</button>
                    </div>
                  </td>
                </tr>)
            })
          }

        </tbody>
      </table>

    </div>
  );
}

export default App;
