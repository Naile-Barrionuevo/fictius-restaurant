document.addEventListener("DOMContentLoaded", () => {
  const platos = {
    menu: [
      { nombre: "Salmón Teriyaki", descripcion: "Salmón grillado con salsa teriyaki.", imagen: "https://images.unsplash.com/photo-1553621042-f6e147245754", precio: 15.99 },
      { nombre: "Ramen Clásico", descripcion: "Caldo casero con fideos japoneses.", imagen: "https://images.unsplash.com/photo-1571091718767-18b4d0e05f0f", precio: 12.99 },
      { nombre: "Sushi Variado", descripcion: "Surtido de nigiris y rolls frescos.", imagen: "https://images.unsplash.com/photo-1562967916-eb82221dfb36", precio: 18.99 },
      { nombre: "Gyozas", descripcion: "Empanaditas japonesas rellenas de cerdo.", imagen: "https://images.unsplash.com/photo-1606755962779-0c3a2c18224d", precio: 8.99 },
      { nombre: "Yakimeshi", descripcion: "Arroz salteado estilo japonés.", imagen: "https://images.unsplash.com/photo-1589308078054-832214b9f191", precio: 10.99 },
      { nombre: "Tempura Mixta", descripcion: "Langostinos y verduras rebozadas.", imagen: "https://images.unsplash.com/photo-1633966888778-7377e0be5d03", precio: 11.99 },
    ],
    postres: [
      { nombre: "Mochi Helado", descripcion: "Masa de arroz rellena de helado.", imagen: "https://images.unsplash.com/photo-1584642501740-4f075f2df4a4", precio: 6.99 },
      { nombre: "Tarta de Matcha", descripcion: "Bizcocho esponjoso con té verde.", imagen: "https://images.unsplash.com/photo-1617196038404-ecabf57e2dcb", precio: 7.99 },
      { nombre: "Dorayaki", descripcion: "Panqueques rellenos de anko.", imagen: "https://images.unsplash.com/photo-1618681808186-68a8a6f4e6f3", precio: 5.99 },
      { nombre: "Helado de Té Verde", descripcion: "Helado artesanal de matcha.", imagen: "https://images.unsplash.com/photo-1603980380439-7355e6453c5b", precio: 4.99 },
      { nombre: "Tarta de Sésamo", descripcion: "Postre crujiente con sésamo negro.", imagen: "https://images.unsplash.com/photo-1626785774572-7a7f1a3b4050", precio: 5.99 },
      { nombre: "Cheesecake de Yuzu", descripcion: "Cheesecake japonés esponjoso.", imagen: "https://images.unsplash.com/photo-1617196038404-ecabf57e2dcb", precio: 10 },
      { nombre: "Frutas con sake", descripcion: "Fruta fresca marinada.", imagen: "https://images.unsplash.com/photo-1576402187876-d292c0e6c5df", precio: 7.99 },
    ],
    bebidas: [
      { nombre: "Sake", descripcion: "Licor japonés tradicional.", imagen: "https://images.unsplash.com/photo-1612020587848-0f72f49a514a", precio: 3.99 },
      { nombre: "Té Verde", descripcion: "Infusión caliente matcha.", imagen: "https://images.unsplash.com/photo-1577620942854-2b3dfc4f0e1d", precio: 5 },
      { nombre: "Ramune", descripcion: "Gaseosa japonesa con bolita.", imagen: "https://images.unsplash.com/photo-1621440531556-0c385cf4011f", precio: 6 },
      { nombre: "Cerveza Asahi", descripcion: "Cerveza lager japonesa.", imagen: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38", precio: 7 },
      { nombre: "Whisky Japonés", descripcion: "Destilado premium.", imagen: "https://images.unsplash.com/photo-1627754509501-3d1bd8f137b0", precio: 8 },
      { nombre: "Jugo de Melón", descripcion: "Fresco y dulce.", imagen: "https://images.unsplash.com/photo-1614707267534-929d31b76b6c", precio: 4.99 },
      { nombre: "Té de Cebada", descripcion: "Infusión refrescante.", imagen: "https://images.unsplash.com/photo-1614707267534-929d31b76b6c", precio: 3.5 },
    ]
  };

  const divisa = '$';
  const carrito = [];
  const DOMcarrito = document.getElementById('carrito');
  const DOMtotal = document.getElementById('total');
  const DOMbotonVaciar = document.getElementById('boton-vaciar');
  const modalCarrito = document.getElementById('items');
  const carritoBtn = document.getElementById('carrito-btn');

  if (carritoBtn && modalCarrito) {
    carritoBtn.addEventListener('click', () => {
      modalCarrito.classList.toggle('active');
      modalCarrito.classList.toggle('hidden');
    });
  }

  function renderPlatos(categoria = 'menu') {
    const contenedor = document.getElementById('menu-contenido');
    contenedor.innerHTML = '';

    platos[categoria].forEach(plato => {
      const card = document.createElement('div');
      card.classList.add('menu-card');
      card.innerHTML = `
        <img src="${plato.imagen}" alt="${plato.nombre}" class="menu-img" />
        <h3>${plato.nombre}</h3>
        <p>${plato.descripcion}</p>
        <span class="price">${divisa}${plato.precio}</span>
        <button class="btn-agregar" data-nombre="${plato.nombre}" data-precio="${plato.precio}">Agregar</button>
      `;
      contenedor.appendChild(card);
    });

    // Botones agregar
    const botonesAgregar = document.querySelectorAll('.btn-agregar');
    botonesAgregar.forEach(btn => {
      btn.addEventListener('click', () => {
        const nombre = btn.dataset.nombre;
        const precio = parseFloat(btn.dataset.precio);
        addToCart(nombre, precio);
      });
    });
  }

  function addToCart(nombre, precio) {
    const existente = carrito.find(item => item.nombre === nombre);
    if (existente) {
      existente.cantidad++;
    } else {
      carrito.push({ nombre, precio, cantidad: 1 });
    }
    renderizarCarrito();
    modalCarrito.classList.add('active');
    modalCarrito.classList.remove('hidden');
  }

  function renderizarCarrito() {
    DOMcarrito.innerHTML = '';
    carrito.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.cantidad} x ${item.nombre} - ${divisa}${(item.precio * item.cantidad).toFixed(2)}`;

      const btn = document.createElement('button');
      btn.textContent = 'X';
      btn.className = 'btn btn-danger btn-sm ml-2';
      btn.onclick = () => {
        carrito.splice(carrito.indexOf(item), 1);
        renderizarCarrito();
      };

      li.appendChild(btn);
      DOMcarrito.appendChild(li);
    });

    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    DOMtotal.textContent = total.toFixed(2);
  }

  DOMbotonVaciar.addEventListener('click', () => {
    carrito.length = 0;
    renderizarCarrito();
  });

  // Tabs categoría
  const buttons = document.querySelectorAll('.menu-tab');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const categoria = btn.dataset.categoria;
      renderPlatos(categoria);
    });
  });

  // Inicial
  renderPlatos('menu');
  buttons[0].classList.add('active');

  // ----------------- SLIDER PROMOCIONES -----------------
  const carousel = document.querySelector('.carousel');
  const promoSlider = document.getElementById('promo-slider');
  const prevBtn = document.getElementById('promo-prev');
  const nextBtn = document.getElementById('promo-next');

  if (carousel && promoSlider && prevBtn && nextBtn) {
    const promociones = [
      {
        titulo: "2x1 en postres",
        descripcion: "¡Solo por hoy, pedí cualquier postre y llevate otro gratis!",
        imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
      },
      {
        titulo: "Menú ejecutivo",
        descripcion: "Plato principal + bebida + postre a $12.99 de lunes a viernes.",
        imagen: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80"
      },
      {
        titulo: "Happy Hour",
        descripcion: "Bebidas al 50% de 18 a 20 hs.",
        imagen: "https://images.unsplash.com/photo-1514361892635-cebbd82b8bdf?auto=format&fit=crop&w=400&q=80"
      }
    ];

    promociones.forEach(promo => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.innerHTML = `<img src="${promo.imagen}" alt="${promo.titulo}" />`;
    carousel.appendChild(slide);
  });

    const sliderTrack = carousel; 
    const cloneSlides = () => {
      const slides = [...sliderTrack.children];
      slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        sliderTrack.appendChild(clone);
      });
    };

    const startAutoplay = () => {
      let scrollAmount = 0;
      const slideWidth = sliderTrack.children[0].offsetWidth + 32;
      setInterval(() => {
        scrollAmount += slideWidth;
        if (scrollAmount >= sliderTrack.scrollWidth / 2) {
          scrollAmount = 0;
          sliderTrack.scrollTo({ left: 0, behavior: 'auto' });
        } else {
          sliderTrack.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        }
      }, 3000);
    };

  prevBtn.addEventListener('click', () => {
  const slideWidth = sliderTrack.children[0].offsetWidth + 32;
  console.log("← Scroll", slideWidth);
  sliderTrack.scrollBy({ left: -slideWidth, behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
  const slideWidth = sliderTrack.children[0].offsetWidth + 32;
  console.log("→ Scroll", slideWidth);
  sliderTrack.scrollBy({ left: slideWidth, behavior: 'smooth' });
});

    promoSlider.addEventListener('mouseenter', () => {
      prevBtn.classList.remove('opacity-0');
      nextBtn.classList.remove('opacity-0');
    });
    promoSlider.addEventListener('mouseleave', () => {
      prevBtn.classList.add('opacity-0');
      nextBtn.classList.add('opacity-0');
    });

    cloneSlides();
    startAutoplay();
  }

  // ----------------- DROPDOWN "CARTA" -----------------
  const cartaBtn = document.getElementById('carta-btn');
  const cartaDropdown = document.getElementById('carta-dropdown');
  const dropdownLi = cartaBtn?.closest('li');

  if (cartaBtn && cartaDropdown && dropdownLi) {
    cartaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const expanded = cartaBtn.getAttribute('aria-expanded') === 'true';
      cartaBtn.setAttribute('aria-expanded', !expanded);
      cartaDropdown.classList.toggle('opacity-0');
      cartaDropdown.classList.toggle('pointer-events-none');
      cartaDropdown.classList.toggle('opacity-100');
      cartaDropdown.classList.toggle('pointer-events-auto');
    });

    document.addEventListener('click', (e) => {
      if (!dropdownLi.contains(e.target)) {
        cartaBtn.setAttribute('aria-expanded', 'false');
        cartaDropdown.classList.add('opacity-0', 'pointer-events-none');
        cartaDropdown.classList.remove('opacity-100', 'pointer-events-auto');
      }
    });
  }
});


