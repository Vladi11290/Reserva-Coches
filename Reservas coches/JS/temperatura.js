/*const apiKey = "d220e7a3459e9c4825c50d38fd0f676f";


const ubicaciones = [
  { nombre: "Málaga" }, 
  { nombre: "Benalmádena" }, 
  { nombre: "Mijas" },  
  { lat: 36.4931, lon: -4.7464, etiqueta: "Elviria"}, 
  { nombre: "Marbella" },
  { lat: 36.4908, lon: -4.9525, etiqueta: "Puerto Banús" } 
];

// Seleccionamos TODOS los <li> del div de temperatura
const lista = document.querySelectorAll(".temperatura ul li");

// Recorremos las ubicaciones
ubicaciones.forEach((ubicacion, index) => {
  let url = "";

  if (ubicacion.nombre) {
    
    url = `https://api.openweathermap.org/data/2.5/weather?q=${ubicacion.nombre}&appid=${apiKey}&units=metric&lang=es`;
  } else {
    
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${ubicacion.lat}&lon=${ubicacion.lon}&appid=${apiKey}&units=metric&lang=es`;
  }

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const nombreMostrar = ubicacion.etiqueta ? ubicacion.etiqueta : ubicacion.nombre;

      if (data.main) {
        const temp = data.main.temp.toFixed(1);
        const descripcion = data.weather[0].description;
        const icono = data.weather[0].icon;

        
        lista[index].innerHTML = `
          <img src="https://openweathermap.org/img/wn/${icono}.png" alt="${descripcion}" />
          <br><strong>${nombreMostrar}</strong> ${temp}°C
          
        `;
      } else {
        lista[index].textContent = `${nombreMostrar}: No disponible`;
      }
    })
    .catch(() => {
      const nombreMostrar = ubicacion.etiqueta ? ubicacion.etiqueta : ubicacion.nombre;
      lista[index].textContent = `${nombreMostrar}: Error al cargar`;
    });

});
*/

const apiKey = "d220e7a3459e9c4825c50d38fd0f676f";

const ubicaciones = [
  { nombre: "Málaga" }, 
  { nombre: "Benalmádena" }, 
  { nombre: "Mijas" },  
  { lat: 36.4931, lon: -4.7464, etiqueta: "Elviria"}, 
  { nombre: "Marbella" },
  { lat: 36.4908, lon: -4.9525, etiqueta: "Puerto Banús" } 
];

const ul = document.querySelector(".temperatura ul");
const lista = document.querySelectorAll(".temperatura ul li");

// === Rellenamos la información de las ciudades ===
ubicaciones.forEach((ubicacion, index) => {
  let url = ubicacion.nombre
    ? `https://api.openweathermap.org/data/2.5/weather?q=${ubicacion.nombre}&appid=${apiKey}&units=metric&lang=es`
    : `https://api.openweathermap.org/data/2.5/weather?lat=${ubicacion.lat}&lon=${ubicacion.lon}&appid=${apiKey}&units=metric&lang=es`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const nombreMostrar = ubicacion.etiqueta ? ubicacion.etiqueta : ubicacion.nombre;
      if (data.main) {
        const temp = data.main.temp.toFixed(1);
        const descripcion = data.weather[0].description;
        const icono = data.weather[0].icon;
        lista[index].innerHTML = `
          <img src="https://openweathermap.org/img/wn/${icono}.png" alt="${descripcion}" />
          <br><strong>${nombreMostrar}</strong> ${temp}°C
        `;
      } else {
        lista[index].textContent = `${nombreMostrar}: No disponible`;
      }
    })
    .catch(() => {
      const nombreMostrar = ubicacion.etiqueta ? ubicacion.etiqueta : ubicacion.nombre;
      lista[index].textContent = `${nombreMostrar}: Error al cargar`;
    });
});


let desplazamiento = 0;
const velocidad = 0.1; 

function moverCarrusel() {
  desplazamiento -= velocidad;
  ul.style.transform = `translateX(${desplazamiento}px)`;

  const primerLi = ul.querySelector("li");
  const primerLiAncho = primerLi.offsetWidth;

  if (desplazamiento <= -primerLiAncho) {
    ul.appendChild(primerLi); 
    desplazamiento += primerLiAncho; 
  }

  requestAnimationFrame(moverCarrusel);
}

moverCarrusel();
