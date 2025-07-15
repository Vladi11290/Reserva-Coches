// ===============================
// 1. MENÚ HAMBURGUESA (responsive)
// ===============================
document.addEventListener("DOMContentLoaded", function() {
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('header nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function() {
      nav.classList.toggle('open');
    });
  }
});

// ===============================
// 2. CARRUSEL DE VEHÍCULOS
// ===============================
document.querySelectorAll('.vehiculo-carrusel').forEach((carrusel) => {
  const grande = carrusel.querySelector('.carrusel-img');
  const miniaturas = carrusel.querySelectorAll('.mini');
  const prev = carrusel.querySelector('.carrusel-prev');
  const next = carrusel.querySelector('.carrusel-next');
  let actual = 0;
  const total = miniaturas.length;

  function muestraImagen(indice) {
    actual = indice;
    grande.src = miniaturas[indice].src;
    miniaturas.forEach(m => m.classList.remove('activa'));
    miniaturas[indice].classList.add('activa');
  }

  function avanzar() {
    let nuevo = actual + 1;
    if (nuevo >= total) nuevo = 0;
    muestraImagen(nuevo);
  }

  function retroceder() {
    let nuevo = actual - 1;
    if (nuevo < 0) nuevo = total - 1;
    muestraImagen(nuevo);
  }

  prev.addEventListener('click', () => {
    retroceder();
    reiniciarAuto();
  });

  next.addEventListener('click', () => {
    avanzar();
    reiniciarAuto();
  });

  miniaturas.forEach((m, i) => {
    m.addEventListener('click', () => {
      muestraImagen(i);
      reiniciarAuto();
    });
  });

  // Autoplay cada 7 segundos
  let intervalo = setInterval(avanzar, 7000);

  function reiniciarAuto() {
    clearInterval(intervalo);
    intervalo = setInterval(avanzar, 7000);
  }

  muestraImagen(0);
});

// ===============================
// 3. TESTIMONIOS (slider)
// ===============================
const comentarios = [
  {
    texto: "La experiencia fue excelente, desde la facilidad para reservar hasta el confort del vehículo. Ideal para viajes de trabajo y eventos importantes.",
    autor: "Javier Ruiz"
  },
  {
    texto: "Servicio impecable. El chófer muy puntual y atento, y el coche estaba impoluto. Sin duda repetiré.",
    autor: "Carmen López"
  },
  {
    texto: "Transfer privado desde el aeropuerto sin complicaciones, directo y muy cómodo. Lo recomiendo.",
    autor: "Lucas Fernández"
  },
  {
    texto: "Todo perfecto, atención personalizada y mucha profesionalidad. Volveré a contar con ellos.",
    autor: "Ana Martínez"
  }
];

let testimonioActual = 0;

function renderTestimonio() {
  document.querySelector('.testimonios-texto').textContent = `"${comentarios[testimonioActual].texto}"`;
  document.querySelector('.testimonios-autor').textContent = comentarios[testimonioActual].autor;
  document.querySelectorAll('.testimonios-dot').forEach((dot, idx) => {
    dot.classList.toggle('activo', idx === testimonioActual);
  });
}

function crearDots() {
  const dotsCont = document.querySelector('.testimonios-dots');
  dotsCont.innerHTML = '';
  comentarios.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = 'testimonios-dot' + (idx === 0 ? ' activo' : '');
    dot.onclick = () => {
      testimonioActual = idx;
      renderTestimonio();
    };
    dotsCont.appendChild(dot);
  });
}

// Botones anterior/siguiente
document.querySelector('.testimonios-prev').onclick = () => {
  testimonioActual = (testimonioActual - 1 + comentarios.length) % comentarios.length;
  renderTestimonio();
};
document.querySelector('.testimonios-next').onclick = () => {
  testimonioActual = (testimonioActual + 1) % comentarios.length;
  renderTestimonio();
};

crearDots();
renderTestimonio();

// Autoplay testimonios cada 5.5 segundos
setInterval(() => {
  testimonioActual = (testimonioActual + 1) % comentarios.length;
  renderTestimonio();
}, 5500);

// ===============================
// 4. FORMULARIO DE RESERVA (validación)
// ===============================
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('formulario-reserva');
  if (!form) return; // Si no existe, salimos

  form.addEventListener('submit', function(e) {
    let valid = true;
    let mensajes = [];

    // Nombre
    const nombre = form.elements['nombre'].value.trim();
    if (!nombre) {
      valid = false;
      mensajes.push('Introduce tu nombre completo.');
    }

    // Teléfono
    const telefono = form.elements['telefono'].value.trim();
    const telRegex = /^\d{9,15}$/;
    if (!telRegex.test(telefono.replace(/\s+/g, ""))) {
      valid = false;
      mensajes.push('Introduce un teléfono válido (solo números, 9 a 15 dígitos).');
    }

    // Email
    const email = form.elements['email'].value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      valid = false;
      mensajes.push('Introduce un correo electrónico válido.');
    }

    // Recogida y destino
    if (!form.elements['recogida'].value.trim()) {
      valid = false;
      mensajes.push('Introduce la ubicación de recogida.');
    }
    if (!form.elements['destino'].value.trim()) {
      valid = false;
      mensajes.push('Introduce la ubicación de destino.');
    }

    // Fecha y hora
    if (!form.elements['fecha'].value) {
      valid = false;
      mensajes.push('Selecciona una fecha.');
    }
    if (!form.elements['hora'].value) {
      valid = false;
      mensajes.push('Selecciona una hora.');
    }

    // Vehículo
    if (!form.elements['vehiculo'].value) {
      valid = false;
      mensajes.push('Selecciona un vehículo.');
    }

    // Privacidad (checkbox)
    if (!form.elements['privacidad'].checked) {
      valid = false;
      mensajes.push('Debes aceptar los términos del servicio.');
    }

    // Si algo falla, no envía el formulario y muestra mensajes
    if (!valid) {
      e.preventDefault();
      alert(mensajes.join('\n'));
    }
  });
});

// ===============================
// 5. CLICK EN LOGO: SCROLL AL HERO
// ===============================
document.getElementById('logo-top').onclick = function() {
  document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' });
};
