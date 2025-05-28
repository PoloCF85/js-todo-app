import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases';

const ElementIDs = {
    ClearCompletedButton: '.clear-completed',//boton de eliminar todos completados.
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}

/**
 * 
 * @param {String} elementId
 */
export const App = ( elementId ) => {//Esta función es para renderizar la aplicación.

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.TodoList, todos );
        updatePendingCount();//actualiza el número de tareas pendientes.
    }

    const updatePendingCount = () => {
        renderPending( ElementIDs.PendingCountLabel);// actualiza el número de tareas pendientes.
    }

    //cuando la función App() se llama
    //Función anonima autoinvocada
    (()=> {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodos();//llama a la función para mostrar los todos
    })();


    //Referencias HTML
    const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
    const todoListUL = document.querySelector( ElementIDs.TodoList );
    const clearCompletedButton = document.querySelector( ElementIDs.ClearCompletedButton );//boton de eliminar todos completados.
    const filtersLIs = document.querySelectorAll( ElementIDs.TodoFilters );//filtros de todos.

    
    //Listeners
    newDescriptionInput.addEventListener('keyup', ( event ) => {//cuando se presiona una tecla
        // console.log(event);//muestra el evento
        // console.log( event.key );//muestra la tecla que se ha presionado
        // console.log(event.target);//muestra todo el elemento html
        // console.log(event.target.value.length);//muestra la longitud del valor del input.
        // console.log(event.target.value);//muestra el valor del input de todas las teclas que se han presionado.
        if ( event.keyCode !== 13 ) return;//si la tecla no es Enter, no hace nada
        if ( event.target.value.trim().length === 0 ) return;//si el valor del input es 0, no hace nada
        todoStore.addTodo( event.target.value );//agrega el todo al store
        displayTodos();//muestra los todos
        event.target.value = '';//limpia el input
    });

    //cuando se hace click en el todo, cambia el estado del todo
    todoListUL.addEventListener('click', ( event ) => {
        //console.log(event.target);//muestra el elemento que se ha clicado
        const element = event.target.closest('[data-id]');//busca el elemento más cercano con el atributo data-id
        todoStore.toogleTodo( element.getAttribute( 'data-id' ) );//cambia el estado del todo
        displayTodos();//muestra los todos
    });
    
    //cuando se hace click en boton de eliminar, elimina el todo
    todoListUL.addEventListener('click', ( event ) => {
        //console.log(event.target);//muestra el elemento que se ha clicado
        //if ( !event.target.classList.contains('destroy') ) return;//si el elemento no tiene la clase destroy, no hace nada
        //if ( event.target.tagName !== 'BUTTON' ) return;//si el elemento no es un botón, no hace nada
        const isDestroyElement = event.target.className === 'destroy';//si el elemento tiene la clase destroy es true.
        const element = event.target.closest('[data-id]');//busca el elemento más cercano con el atributo data-id
        if ( !element || !isDestroyElement ) return;//si el elemento no existe o no es un botón, no hace nada
        todoStore.deleteTodo( element.getAttribute( 'data-id' ) );//elimina el todo
        displayTodos();//muestra los todos
    });

    //cuando se hace click en el boton de eliminar todos completados, elimina todos los todos completados.
    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLIs.forEach( element => {

        element.addEventListener('click', (element) => {
            filtersLIs.forEach( el => el.classList.remove('selected') );//elimina la clase selected de todos los elementos.
            element.target.classList.add( 'selected' );//agrega la clase selected al elemento que se ha clicado

            switch( element.target.text ) {
                 case 'Todos':
                     todoStore.setFilter( Filters.All);
                 break;
                 case 'Pendientes':
                     todoStore.setFilter( Filters.Pending);
                 break;
                 case 'Completados':
                     todoStore.setFilter( Filters.Completed);
                 break;
            };

            displayTodos();

        });
        

    });


};