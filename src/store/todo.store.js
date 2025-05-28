import { Todo } from '../todos/models/todo.model';

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Valer Verga'),
        new Todo('Basilar'),
        new Todo('Cashar la Perra'),
        new Todo('Joder Gente'),
        new Todo('Chambear'),
        new Todo('Todas Las Anteriores'),
    ],
    filter: Filters.All,
}


const initStore = () => {
    loadStore();
    console.log( 'InitStore 🥑');
}

const loadStore = () => {
    if ( !localStorage.getItem('state') ) return; // Si no existe el localStorage, no hace nada.

    //Desestructuración del objeto.
    const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state') );// Obtener el estado del localStorage
    state.todos = todos;   
    state.filter = filter; // Asignar el estado del localStorage al estado de la aplicación   
}

const saveStateToLocalStorage = () => {
    //console.log( JSON.stringify(state) );
    localStorage.setItem( 'state', JSON.stringify(state) );// Guardar el estado en el localStorage
}

const getTodos = ( filter = Filters.All ) => {
    
    switch( filter ) {
        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter( todo => todo.done );

        case Filters.Pending:
            return state.todos.filter( todo => !todo.done );

        default:
            throw new Error(`Option ${ filter } is not valid.`);
    }

}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
    if( !description ) throw new Error('Description is required');
    state.todos.push( new Todo(description) );

    saveStateToLocalStorage();
}

const toogleTodo = ( todoId ) => {
    state.todos = state.todos.map( todo => {
        if( todo.id === todoId ) {
            todo.done = !todo.done;
        }
        return todo;
    });

    saveStateToLocalStorage();
}

const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId );  

    saveStateToLocalStorage();
}

const deleteCompleted = ( todoId ) => {
    state.todos = state.todos.filter( todo => !todo.done );

    saveStateToLocalStorage();
}
/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;

    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toogleTodo,
};
