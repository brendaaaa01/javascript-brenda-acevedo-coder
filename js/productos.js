const productos = [
    {
      idProducto: 1,
      nombre: "Golden Ale",
      precio: 1100,
      imagen:"../img/imagen-producto.jpg",
    },
    {
      idProducto: 2,
      nombre: "Amber",
      precio: 1100,
      imagen:"../img/imagen-producto.jpg",
    },
    {
      idProducto: 3,
      nombre: "Stout",
      precio: 1100,
      imagen:"../img/imagen-producto.jpg",
    },
    {
      idProducto: 4,
      nombre: "AAA",
      precio: 1200,
      imagen:"../img/imagen-producto.jpg",
    },
    {
      idProducto: 5,
      nombre: "IPA",
      precio: 1400,
      imagen:"../img/imagen-producto.jpg",
    },
    {
      idProducto: 6,
      nombre: "Pilsen",
      precio: 1150,
      imagen:"../img/imagen-producto.jpg",
    },
    {
      idProducto: 7,
      nombre: "American Stout",
      precio: 1300,
      imagen:"../img/imagen-producto.jpg",
    },
    {
      idProducto: 8,
      nombre: "Porter",
      precio: 1300,
      imagen:"../img/imagen-producto.jpg",
    }
  ];

export default productos;

JSON.parse(localStorage.getItem("productos")) || localStorage.setItem("productos", JSON.stringify(productos));
