const apiKey = "d220e7a3459e9c4825c50d38fd0f676f";

// En el mismo orden que aparecen en el HTML
const ubicaciones = [
  { nombre: "Málaga" }, 
  { nombre: "Benalmádena" }, 
  { nombre: "Mijas" },  
  { lat: 36.4931, lon: -4.7464, etiqueta: "Elviria" }, 
  { nombre: "Marbella" },
  { lat: 36.4908, lon: -4.9525, etiqueta: "Puerto Banús" } 
];

// Seleccionamos TODOS los <li> del div de temperatura
const lista = document.querySelectorAll(".temperatura ul li");

// Recorremos las ubicaciones
ubicaciones.forEach((ubicacion, index) => {
  let url = "";

  if (ubicacion.nombre) {
    // 📌 Si la ubicación tiene "nombre", buscamos por nombre
    url = `https://api.openweathermap.org/data/2.5/weather?q=${ubicacion.nombre}&appid=${apiKey}&units=metric&lang=es`;
  } else {
    // 📌 Si la ubicación tiene coordenadas, buscamos por lat/lon
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${ubicacion.lat}&lon=${ubicacion.lon}&appid=${apiKey}&units=metric&lang=es`;
  }

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.main) {
        const temp = data.main.temp;
        // Usamos etiqueta si existe (Ej: Puerto Banús)
        const nombreMostrar = ubicacion.etiqueta ? ubicacion.etiqueta : ubicacion.nombre;
        lista[index].textContent = `${nombreMostrar}: ${temp}°C`;
      } else {
        const nombreMostrar = ubicacion.etiqueta ? ubicacion.etiqueta : ubicacion.nombre;
        lista[index].textContent = `${nombreMostrar}: No disponible`;
      }
    })
    .catch(() => {
      const nombreMostrar = ubicacion.etiqueta ? ubicacion.etiqueta : ubicacion.nombre;
      lista[index].textContent = `${nombreMostrar}: Error al cargar`;
    });
});

