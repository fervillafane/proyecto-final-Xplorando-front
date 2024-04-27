import { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";

export default function ProductHome() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/productos/listar');
                console.log('Productos obtenidos:', response.data);
                const randomizedProducts = response.data.sort(() => Math.random() - 0.5);
                setProducts(randomizedProducts);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchProductos();
    }, []);

    // Obtener los índices de los productos a mostrar en la página actual
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Cambiar a la siguiente página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="random-products">
                <h2>¡Se viene el finde XL!</h2>
                <div className="row">
                    {currentProducts !== null && currentProducts.map((item) => (
                        <Product
                            key={item.id}
                            name={item.nombreProducto}
                            url={item.imagenSalidaDtoList[0].urlImagen}
                            price={item.precioProducto}
                            description={item.descripcionProducto}
                            id={item.id}
                        />
                    ))}
                </div>
            </div>
            <nav>
                <ul className="pagination justify-content-center">
                    {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button style={{margin:"4px", backgroundColor:"#ECE6F0", color:"#273662"}} onClick={() => paginate(index + 1)} className="page-link">
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}