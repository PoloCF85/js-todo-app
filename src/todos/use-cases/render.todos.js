import { Todo } from '../models/todo.model';
import { createTodoHtml } from './';

let element;

/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = (elementId, todos = [] ) => {
    
    if( !element )//Si el elemento no existe.
        element = document.querySelector( elementId );
        
    if( !element ) throw new Error(`Element ${ elementId } not found`);

    element.innerHTML = '';//Limpiar el elemento
    
    todos.forEach( todo => {
        element.append( createTodoHtml(todo) );//appendChild(todo)
    });

}