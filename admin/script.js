// Datos iniciales por categoría
const categories = {
    abarrotes: [
        { img: '', desc: 'Producto 1 - Abarrotes' },
        { img: '', desc: 'Producto 2 - Abarrotes' },
        { img: '', desc: 'Producto 3 - Abarrotes' }
    ],
    licores: [
        { img: '', desc: 'Producto 1 - Licores' },
        { img: '', desc: 'Producto 2 - Licores' },
        { img: '', desc: 'Producto 3 - Licores' }
    ],
    limpieza: [
        { img: '', desc: 'Producto 1 - Limpieza' },
        { img: '', desc: 'Producto 2 - Limpieza' },
        { img: '', desc: 'Producto 3 - Limpieza' }
    ],
    carnes: [
        { img: '', desc: 'Producto 1 - Carnes' },
        { img: '', desc: 'Producto 2 - Carnes' },
        { img: '', desc: 'Producto 3 - Carnes' }
    ],
    bebidas: [
        { img: '', desc: 'Producto 1 - Bebidas' },
        { img: '', desc: 'Producto 2 - Bebidas' },
        { img: '', desc: 'Producto 3 - Bebidas' }
    ],
    panaderia: [
        { img: '', desc: 'Producto 1 - Panadería' },
        { img: '', desc: 'Producto 2 - Panadería' },
        { img: '', desc: 'Producto 3 - Panadería' }
    ]
};


// Renderiza los productos de la categoría seleccionada
function filterCategory(category) {
    const container = document.getElementById("category-items");
    container.innerHTML = "";

    categories[category].forEach((item, index) => {
        const itemId = `${category}-${index + 1}`;
        const div = document.createElement("div");
        div.className = "image-item";
        div.innerHTML = `
            <div class="image-preview">
                <img src="${item.img || 'placeholder.jpg'}" alt="${category} ${index + 1}" 
                    class="image" id="img-${itemId}">
            </div>
            <div class="image-controls">
                <input type="file" id="file-${itemId}" class="file-input" 
                    accept="image/*" onchange="previewImage('${itemId}')">
                <textarea id="desc-${itemId}" class="description" 
                    placeholder="Descripción del producto">${item.desc}</textarea>
                <button class="update-btn" onclick="updateCategoryItem('${itemId}', '${category}')">
                    Actualizar Datos
                </button>
            </div>
        `;
        container.appendChild(div);
    });
}


// Previsualiza la imagen seleccionada
function previewImage(itemId) {
    const fileInput = document.getElementById(`file-${itemId}`);
    const img = document.getElementById(`img-${itemId}`);
    
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}



function updateCategoryItem(itemId, category) {
    const [cat, index] = itemId.split('-');
    const img = document.getElementById(`img-${itemId}`);
    const desc = document.getElementById(`desc-${itemId}`).value;
    
    categories[category][parseInt(index) - 1] = {
        img: img.src,
        desc: desc
    };
    
    showToast("¡Datos actualizados correctamente!");
}


function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.innerHTML = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Actualiza los datos del producto
function updateItem(id, category) {
    const imgSrc = document.getElementById(`img-${id}`).src;
    const description = document.getElementById(`desc-${id}`).value;

    const item = categories[category].find(item => item.id === id);
    if (item) {
        item.img = imgSrc;
        item.desc = description;
        alert("Datos actualizados correctamente!");
    }
}

// Función para abrir un modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "flex";
    }
}

// Función para cerrar un modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // Oculta el modal
        modal.style.display = "none"; 
    }
}

// Función para guardar los cambios 
function saveChanges() {
    alert("Cambios guardados correctamente.");
}

// Función para manejar el clic en el botón "Generar Reporte"
document.getElementById('generateReportBtn').addEventListener('click', function() {
    generateSalesReport();
});

function generateSalesReport() {
    const { jsPDF } = window.jspdf; 

    // Crear una instancia de jsPDF
    const doc = new jsPDF();

    // Obtener la fecha de hoy
    const today = new Date();
    const dateString = today.toLocaleDateString(); // Fecha en formato local (día/mes/año)

    // Posición inicial en Y
    let yPosition = 10;  

    // Título del reporte
    doc.setFontSize(18);
    doc.text(`REPORTE DE VENTAS DE HOY: ${dateString}`, 10, yPosition);
    yPosition += 10; 

    // Encabezados
    doc.setFontSize(12);
    doc.text('CATEGORIA-----------------------CANTIDAD COMPRADA--------------CANTIDAD PAGADA', 10, yPosition);
    yPosition += 10; 

    // Total de ventas acumuladas
    let totalVentas = 0; 

    for (let category in categories) {
        // Nombre de la categoría
        doc.setFontSize(12);
        doc.text(`\n${category.toUpperCase()}`, 10, yPosition);
        yPosition += 10;

        // Recorre los productos de cada categoría
        categories[category].forEach(item => {
            const cantidadComprada = Math.floor(Math.random() * 10) + 1; // Simula cantidad comprada (1-10)
            const cantidadPagada = cantidadComprada * (Math.random() * 50 + 1); // Simula la cantidad pagada

            // Agrega los datos del producto
            doc.setFontSize(10);
            doc.text(`${item.desc}-----------------------${cantidadComprada}-----------------------S/. ${cantidadPagada.toFixed(2)}`, 10, yPosition);
            yPosition += 6; // Espacio entre productos

            totalVentas += cantidadPagada; // Acumula el total de ventas
        });
    }

    // Total de ventas
    yPosition += 10;
    doc.setFontSize(12);
    doc.text(`TOTAL EN SOLES DE LAS VENTAS DE HOY (${dateString}) ES: S/. ${totalVentas.toFixed(2)}`, 10, yPosition);

    // Guarda el archivo PDF 
    doc.save('Reporte_ventas_RESAK.pdf');
}


// Cart state
let cartItems = [];

// Loading screen
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('mainContent').classList.remove('d-none');
    }, 2000);

    renderProducts();
    setupEventListeners();
});

// script.js
function setupEventListeners() {
    // ÍICONO DE CASA
    document.querySelector('.home-icon').addEventListener('click', () => {
        window.location.reload();
    });

    // ÍCONO DE USUARIO
    document.querySelector('.user-icon').addEventListener('click', () => {
        window.open('../login/index.html', '_blank');
    });
}

// Asegurarse de que el DOM esté listo antes de ejecutar el script
document.addEventListener("DOMContentLoaded", function() {
    setupEventListeners();
});


// NOTIFICACIÓN
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.innerHTML = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function renderProducts(category) {
    const productsGrid = document.getElementById('productsGrid');
    
    // Filtrar productos según la categoría seleccionada
    const filteredProducts = products.filter(product => product.category === category);

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h5>${product.name}</h5>
            <p>S/. ${product.price}</p>
            <button onclick="addToCart(${product.id})" class="btn btn-outline-light btn-sm">
                <i class="bi bi-cart-plus"></i> Agregar al carrito
            </button>
        </div>
    `).join('');
}

function updateImage(imgId, fileId, descId) {
    const fileInput = document.getElementById(fileId);
    const imageElement = document.getElementById(imgId);
    const description = document.getElementById(descId);

    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Establece la imagen cargada como fuente
            imageElement.src = e.target.result; 
        };
        reader.readAsDataURL(file);
    }

    // Actualiza la descripción
    description.value = description.value || "Descripción sin contenido";
}

// Ventas del Día
const salesTodayCtx = document.getElementById('sales-today-chart').getContext('2d');
new Chart(salesTodayCtx, {
    type: 'bar',
    data: {
        labels: ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM'],
        datasets: [{
            label: 'Ventas (S/)',
            // Datos
            data: [50, 75, 60, 120, 180, 220, 100],
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgb(0, 102, 204)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#000'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#000' // Eje X 
                }
            },
            y: {
                ticks: {
                    color: '#000' // Eje Y 
                }
            }
        }
    }
});

// Productos en Stock
const productsInStockCtx = document.getElementById('products-in-stock-chart').getContext('2d');
new Chart(productsInStockCtx, {
    type: 'doughnut',
    data: {
        labels: ['Abarrotes', 'Licores', 'Limpieza', 'Carnes', 'Bebidas', 'Panadería'],
        datasets: [{
            label: 'Cantidad en Stock',
            // Datos
            data: [120, 90, 60, 50, 30, 70],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 206, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)', 
                'rgb(153, 102, 255)' 
            ],
            borderColor: [
                'rgb(204, 51, 51)', 
                'rgb(204, 102, 0)', 
                'rgb(204, 153, 0)', 
                'rgb(0, 153, 153)', 
                'rgb(0, 102, 204)',  
                'rgb(102, 51, 204)' 
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#000'
                }
            }
        }
    }
});

// Rendimiento de Ventas
const salesPerformanceCtx = document.getElementById('sales-chart').getContext('2d');
new Chart(salesPerformanceCtx, {
    type: 'line',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre'],
        datasets: [{
            label: 'Ventas Mensuales (S/)',
            // Datos
            data: [1200, 1400, 1100, 1600, 1800, 1700, 1900, 2000, 2100, 2200],
            backgroundColor: 'rgba(153, 102, 255, 0.7)',
            borderColor: 'rgb(102, 51, 204)',
            borderWidth: 2,
            fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#000'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#000' // Eje X 
                }
            },
            y: {
                ticks: {
                    color: '#000' // Eje Y
                }
            }
        }
    }
});
