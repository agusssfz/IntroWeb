function eventListeners()
{
// Selecciona los elementos del formulario
// Selecciona los elementos del formulario
const form = document.querySelector('form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// Manejar el envío del formulario
form.addEventListener('submit', (event) => {

    event.preventDefault();


    let isValid = true;

    
    if (usernameInput.value.trim() === '') {
        showPlaceholderError(usernameInput, 'El usuario no puede estar vacío');
        isValid = false;
    }

    
    if (passwordInput.value.trim().length < 6 || passwordInput.value.trim().length > 50) {
        showPlaceholderError(passwordInput, 'La contraseña debe tener entre 6 y 50 caracteres');
        isValid = false;
    }

    
    if (isValid) {
        
        window.location.href = 'index.html';
        
    }
});


function showPlaceholderError(input, errorMessage) {
    
    input.value = '';
    input.placeholder = errorMessage;

    
    input.classList.add('error-placeholder');

    
    input.addEventListener('focus', () => {
        input.placeholder = ''; 
        input.classList.remove('error-placeholder');
    });
}


}

document.addEventListener('DOMContentLoaded', () => {
    eventListeners();
});
