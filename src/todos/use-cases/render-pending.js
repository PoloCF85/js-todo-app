import todoStore, { Filters } from "../../store/todo.store";

let element;
/**
 * 
 * @param {String} elementId// Elemento HTML donde se mostrará el número de tareas pendientes.
 */
export const renderPending = ( elementId ) => {

    if( !element )
        element = document.querySelector( elementId );

    if( !element )
        throw new Error(`Element ${ elementId } not found`);

    element.innerHTML = todoStore.getTodos( Filters.Pending ).length;
}