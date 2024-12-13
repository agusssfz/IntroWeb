
function eventListeners(){
const form = document.getElementById(`form-card`);
const question = document.getElementById(`fquestion`);
const answer = document.getElementById(`fanswer`);
const btnCrear = document.getElementById('btn-crear');
const crearCard = document.querySelector('.crear-card');
const cardsContainer = document.getElementById('containerCards');
const btnsDelete = document.querySelectorAll(`.delete`);
const btnsEdit = document.querySelectorAll(`.edit`);
const btnsShow = document.querySelectorAll(`.show`);
let infoCard = [];
let id = 1;

form.addEventListener(`submit`, (e) => {
    e.preventDefault();

    if (question.value === "") {
    question.setAttribute(`placeholder`, `Rellena la pregunta boludo`);
    setTimeout(() => {
        question.removeAttribute(`placeholder`, `Rellena la pregunta boludo`);
    }, 3000);
    } else if (answer.value === "") {
    answer.setAttribute(`placeholder`, `Rellena la respuesta boludo`);
    setTimeout(() => {
        answer.removeAttribute(`placeholder`, `Rellena la respuesta boludo`);
    }, 3000);

    } else {
    const card = new Card(id, question.value, answer.value);
    infoCard.push(card);
    id++;
    question.value = "";
    answer.value = "";
    }
});


let isCrear = true;
btnCrear.addEventListener('click', () => {
    if (isCrear) {
        btnCrear.innerHTML = `<h2 style="color: red;">Cancelar</h2>`;
        isCrear = false;
    } else {
        btnCrear.innerHTML = `<h2>Crear</h2>`;
        isCrear = true;
    }
    crearCard.classList.toggle('hide');
});


// Selecciona todos los botones de eliminar


// Agrega un evento de clic a cada botón de eliminar
btnsDelete.forEach((button) => {
button.addEventListener('click', () => {
    const card = button.parentElement.parentElement;
    
    card.remove();
});
});
btnsShow.forEach((button) => {
    button.addEventListener('click', () => {
    const answer = button.closest('.card').querySelector('.answer');
    
    answer.classList.toggle('show');
    });
});

let edit = true;
        btnsEdit.forEach((button) => {
            button.addEventListener('click', ()=> {
            const card = button.closest('.card');
            const question = card.querySelector('.question');
            const answer = card.querySelector('.answer');
            if(edit === true)
            {
                question.contentEditable = 'true';
                answer.contentEditable = 'true';
                edit = false;
            }else
            {
                question.contentEditable = 'false';
                answer.contentEditable = 'false';
                edit = true;
            }
            });
        });  

/*
class Card {
    constructor(id, question, answer) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.createCard();
    }

    createCard() {
    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.dataset.id = this.id; 
    newCard.innerHTML = `
        <div class="body-card">
        <h4 class="question">${this.question}</h4>
        <h5 class="answer hide">${this.answer}</h5>
        </div>
        <div class="footer-card">
        <button class="delete" data-type="delete"><h2>Borrar</h2></button>
        <button class="show" data-type="show"><h2>Mostrar</h2></button>
        <button class="edit" data-type="edit"><h2>Editar</h2></button>
        </div>
    `;
    cardsContainer.appendChild(newCard);
    }
}
}
*/
class Card {
    constructor(id, question, answer) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.edit = false;
    this.createCard();
    }

    createCard() {
    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.dataset.id = this.id;
    newCard.innerHTML = `
        <div class="body-card">
        <h4 class="question">${this.question}</h4>
        <h5 class="answer hide">${this.answer}</h5>
        </div>
        <div class="footer-card">
        <button class="delete" data-type="delete"><h2>Borrar</h2></button>
        <button class="show" data-type="show"><h2>Mostrar</h2></button>
        <button class="edit" data-type="edit"><h2>Editar</h2></button>
        </div>
    `;

      // Agregar eventos de clic a los botones
    const btnEliminar = newCard.querySelector('.delete');
    const btnMostrar = newCard.querySelector('.show');
    const btnEditar = newCard.querySelector('.edit');

    btnEliminar.addEventListener('click', () => {
        this.eliminar(newCard);
    });

    btnMostrar.addEventListener('click', () => {
        this.showAnswer(newCard);
    });

    btnEditar.addEventListener('click', () => {
        this.editCard(newCard);
    });
    
    cardsContainer.appendChild(newCard);
    }

    eliminar(card) {
    card.remove();
    }

    showAnswer(card) {
    const answer = card.querySelector('.answer');
    answer.classList.toggle('hide');
    }

    editCard(card) {
        if (this.edit === true) {
        const question = card.querySelector('.question');
        const answer = card.querySelector('.answer');
        question.contentEditable = 'false';
        answer.contentEditable = 'false';
        this.edit = false;
        } else {
        const question = card.querySelector('.question');
        const answer = card.querySelector('.answer');
        question.contentEditable = 'true';
        answer.contentEditable = 'true';
        this.edit = true;
        }
    }
}
}

document.addEventListener('DOMContentLoaded', () => {
    eventListeners();
});