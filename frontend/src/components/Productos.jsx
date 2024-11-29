import React, { useEffect, useState } from "react";
import apiClient from "../api/axiosConfig";

const Productos = () => {
  const [productos, setProductos] = useState([]); // Estado correctamente inicializado
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      setIsLoading(true); // Mostrar estado de carga
      try {
        const response = await apiClient.get("/productos"); // Llamada a la API
        setProductos(response.data); // Guardar datos en el estado
      } catch (err) {
        const errorMessage = err.response?.data?.message || "Error desconocido";
        setError(`Error al cargar los productos: ${errorMessage}`);
      } finally {
        setIsLoading(false); // Ocultar estado de carga
      }
    };

    fetchProductos(); // Ejecutar la función de carga al montar el componente
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>
      {isLoading && <p className="text-gray-500">Cargando productos...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {productos.length === 0 && !isLoading && (
        <p className="text-gray-500">No hay productos disponibles en este momento.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">{producto.nombre}</h2>
            <p className="text-gray-600">Precio: ${producto.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
