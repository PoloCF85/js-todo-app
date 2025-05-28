import { v4 as uuid } from 'uuid';

export class Todo { // un todo es una tarea

    /**
     * 
     * @param {String} description //La descripción de la tarea.
     */

    constructor( description ){
        this.id = uuid();
        this.description = description;
        this.done = false;
        this.createdAt = new Date();
    }

};