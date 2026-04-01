const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const phone = document.getElementById('phone');
const nextButton = document.getElementById('nextButton');
const createAccount = document.getElementById('createAccount');
const existingUserLink = document.getElementById('existingUserLink');
const clientButton = document.getElementById('clientButton');
const adminButton = document.getElementById('adminButton'); 
const loginForm = document.getElementById('loginForm');
const selectRole = document.getElementById('selectRole');
const welcomeScreen = document.getElementById('welcomeScreen');
const dniLabel = document.getElementById('dniLabel'); 
const rucLabel = document.getElementById('rucLabel'); 

// bienvenida
setTimeout(() => {
    welcomeScreen.classList.add('hidden');
    selectRole.classList.remove('hidden');
}, 3000);

existingUserLink.addEventListener('click', (e) => {
    e.preventDefault();
    nextButton.classList.add('hidden');
    createAccount.classList.remove('hidden');
});

// Para la validacion
nextButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (firstName.value.trim() && lastName.value.trim() && phone.value.trim()) {
        nextButton.classList.add("hidden");
        createAccount.classList.remove("hidden");
    } else {
        alert("Por favor, complete todos los campos requeridos.");
    }
});

// Login submission handler
document.getElementById('submitLogin').addEventListener('click', (e) => {
    e.preventDefault();

    const username = document.getElementById('username');
    const password = document.getElementById('password');

    if (username.value.trim() === '' || password.value.trim() === '') {
        alert('Por favor, ingrese un nombre de usuario y contraseña válidos');
    } else {
        const userData = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            dni: document.getElementById('dni')?.value.trim() || '',
            ruc: document.getElementById('ruc')?.value.trim() || '',
            phone: phone.value.trim(),
            username: username.value.trim(),
            password: password.value.trim()
        };

        // Almacenar datos en LocalStorage
        localStorage.setItem('userData', JSON.stringify(userData));

        console.log(userData);
        alert('Datos registrados correctamente');

        // Redirigir según el rol seleccionado
        const redirectTimeout = 2000;
        if (clientButton.classList.contains('active')) {
            setTimeout(() => {
                window.location.href = "../customer/index.html";
            }, redirectTimeout);
        } else if (adminButton.classList.contains('active')) {
            setTimeout(() => {
                window.location.href = "../admin/index.html";
            }, redirectTimeout);
        }
    }
});


// selecion de roles
clientButton.addEventListener('click', () => {
    selectRole.classList.add('hidden');
    loginForm.classList.remove('hidden');
    dniLabel.classList.add('hidden');
    rucLabel.classList.add('hidden');
    clientButton.classList.add('active');
    adminButton.classList.remove('active');
});

adminButton.addEventListener('click', () => {
    selectRole.classList.add('hidden');
    loginForm.classList.remove('hidden');
    dniLabel.classList.remove('hidden');
    rucLabel.classList.remove('hidden');
    adminButton.classList.add('active');
    clientButton.classList.remove('active');
});

