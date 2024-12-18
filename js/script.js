
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
const backCrearCard = document.getElementById(`backCrearCard`);
const textArea = document.querySelector("textarea");
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
    //vaciar al crear
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
        //vaciar al cancelar
        question.value = "";
        answer.value = "";
    }
    crearCard.classList.toggle('hide');
    backCrearCard.classList.toggle('hide');
    
});

// Agregar eventos / card ejemplo 
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

// Agregar evento de clic a los botones de edición
btnsEdit.forEach((button) => {
button.addEventListener('click', () => {
    // Obtener la tarjeta asociada al botón
    const card = button.closest('.card');

    // Obtener los elementos de pregunta y respuesta
    const contentQuestion = card.querySelector('.question');
    const contentAnswer = card.querySelector('.answer');

    // Comprobar si se está editando o no
    if (edit) {
      // Editar la pregunta y la respuesta
    editarPreguntaRespuesta(contentQuestion, contentAnswer);
    edit = false;
    } else {
      // Guardar los cambios y volver a la vista normal
    guardarCambios(contentQuestion, contentAnswer);
    edit = true;
    }
});
});

// Función para editar la pregunta y la respuesta
function editarPreguntaRespuesta(contentQuestion, contentAnswer) {
  // Guardar el contenido original de la pregunta y la respuesta
const questionActual = contentQuestion.textContent;
const answerActual = contentAnswer.textContent;

  // Reemplazar el h4 por un textarea
const textAreaQuestion = document.createElement('textarea');
textAreaQuestion.value = questionActual;
textAreaQuestion.className = 'question';
contentQuestion.replaceWith(textAreaQuestion);

const textAreaAnswer = document.createElement('textarea');
textAreaAnswer.value = answerActual;
textAreaAnswer.className = 'answer hide';
contentAnswer.replaceWith(textAreaAnswer);
}

// Función para guardar los cambios y volver a la vista normal
function guardarCambios(contentQuestion, contentAnswer) {
  // Guardar los cambios en la pregunta y la respuesta
const textAreaQuestion = contentQuestion;
const newQuestion = textAreaQuestion.value;

const textAreaAnswer = contentAnswer;
const newAreaAnswer = textAreaAnswer.value;

  // Reemplazar el textarea por un h4
const h4Pregunta = document.createElement('h4');
    h4Pregunta.textContent = newQuestion;
    h4Pregunta.className = 'question';
    textAreaQuestion.replaceWith(h4Pregunta);

const h5Respuesta = document.createElement('h5');
    h5Respuesta.textContent = newAreaAnswer;
    h5Respuesta.className = 'answer hide';
    textAreaAnswer.replaceWith(h5Respuesta);
}
/*
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
*/
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

//constructor de Flash Cards
class Card {
    constructor(id, question, answer) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.edit = true;
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
        console.log('presionaste le boton');
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
        console.log('metodo ');
    if (this.edit === true) {
        
        // Editar la pregunta y la respuesta
        const contentQuestion = card.querySelector('.question');
        const contentAnswer = card.querySelector('.answer');
            this.editarPreguntaRespuesta(contentQuestion, contentAnswer);
            this.edit = false;
    } else {
        // Guardar los cambios y volver a la vista normal
        const textAreaQuestion = card.querySelector('textarea.question');
        const textAreaAnswer = card.querySelector('textarea.answer');
        if (textAreaQuestion && textAreaAnswer) {
            this.guardarCambios(textAreaQuestion, textAreaAnswer);
            this.edit = true;
        }
    }
    }

    ajustTextArea(textArea) {
        textArea.addEventListener("input", () => {
        textArea.style.height = `1.7em`;
        textArea.style.height = textArea.scrollHeight + "px";
        });
    }
    editarPreguntaRespuesta(contentQuestion, contentAnswer) {
      // Guardar el contenido original de la pregunta y la respuesta
    
    const preguntaOriginal = contentQuestion.textContent;
    const respuestaOriginal = contentAnswer.textContent;
      // Reemplazar el h4 por un textarea
    const textAreaQuestion = document.createElement('textarea');
        textAreaQuestion.value = preguntaOriginal;
        textAreaQuestion.className = 'question';
        contentQuestion.replaceWith(textAreaQuestion);
    const textAreaAnswer = document.createElement('textarea');
        textAreaAnswer.value = respuestaOriginal;
        textAreaAnswer.className = 'answer hide';
        contentAnswer.replaceWith(textAreaAnswer);

        this.ajustTextArea(textAreaQuestion);
        this.ajustTextArea(textAreaAnswer);
    }

    guardarCambios(textAreaQuestion, textAreaAnswer) {
      // Guardar los cambios en la pregunta y la respuesta
    const newQuestion = textAreaQuestion.value;
    const newAreaAnswer = textAreaAnswer.value;

      // Reemplazar el textarea por un h4
    const h4Pregunta = document.createElement('h4');
        h4Pregunta.textContent = newQuestion;
        h4Pregunta.className = 'question';
        textAreaQuestion.replaceWith(h4Pregunta);

    const h5Respuesta = document.createElement('h5');
        h5Respuesta.textContent = newAreaAnswer;
        h5Respuesta.className = 'answer hide';
        textAreaAnswer.replaceWith(h5Respuesta);
    }
}

textArea.addEventListener("input",()=>{
    textArea.style.height = `1.7em`;
    textArea.style.height = textArea.scrollHeight + "px";
});
}

document.addEventListener('DOMContentLoaded', () => {
    eventListeners();
});