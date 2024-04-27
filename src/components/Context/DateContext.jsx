import React, { useEffect, useState, createContext } from "react";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import parseISO from "date-fns/parseISO";

export const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [idProduct, setIdProduct] = useState(1); // ID de producto simulado
  const [product, setProduct] = useState({
    // Producto simulado
    id: 1,
    name: "Producto de ejemplo",
    reservas: [
      { fechaInicio: "2024-03-20", fechaFinal: "2024-03-25" },
      { fechaInicio: "2024-04-05", fechaFinal: "2024-04-10" },
    ],
  });
  const [booking, setBooking] = useState(product.reservas);
  const [startDates, setStartDates] = useState([]);
  const [endDates, setEndDates] = useState([]);
  const [excluded, setExcluded] = useState([]);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, setStartDate] = useState(dateRange[0]);
  const [endDate, setEndDate] = useState(dateRange[1]);

  const getProduct = async () => {
    // Simulación de llamada a API para obtener detalles del producto
    const startDates = product.reservas.map((p) => parseISO(p.fechaInicio));
    const endDates = product.reservas.map((p) => parseISO(p.fechaFinal));
    setStartDates(startDates);
    setEndDates(endDates);

    // Crear un array de fechas excluidas
    let excludedDates = [];
    for (let i = 0; i < startDates.length; i++) {
      excludedDates = excludedDates.concat(
        eachDayOfInterval({ start: startDates[i], end: endDates[i] })
      );
    }
    setExcluded(excludedDates);
  };

  useEffect(() => {
    getProduct();
  }, [idProduct]);

  return (
    <DateContext.Provider
      value={{
        idProduct,
        setIdProduct,
        product,
        setProduct,
        dateRange,
        setDateRange,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        booking,
        setBooking,
        startDates,
        setStartDates,
        endDates,
        setEndDates,
        excluded,
        setExcluded,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};