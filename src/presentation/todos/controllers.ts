import { Request, Response } from "express";
import { parseQueryIntStrict } from "../../shared/utils";

const todos = [
    { id: 1, text: 'Buy milk'  , completeAt: new Date()},
    { id: 2, text: 'Buy potato', completeAt: null      },
    { id: 3, text: 'Buy water' , completeAt: new Date()},      
];

export class TodosController {

    /**
     * DI
     */
    constructor () {}

    public getTodos =  (_req:Request, res:Response) => {
        res.json(todos);
    };

    public getTodoById = (req:Request, res:Response) => {
        const raw = (req.query as any).id ?? req.params.id;
        const id = parseQueryIntStrict(raw as any);
        if (id === null) {
            return res.status(400).json({ error: 'Invalid id' });
        }

        const todo = todos.find(t => t.id === id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(todo);
    };

    public createTodo = (req:Request, res:Response) => {
        const { text } = req.body;
        console.log(text);
        
        if(!text) return res.status(400).json({error: 'Text Property is Required'})

        const newTodo = {
            id: todos.length + 1,
            text: String(text),
            completeAt: null
        };

        todos.push(newTodo as any);
        res.json(newTodo);
    };

    public updateTodo = (req:Request, res:Response) => {
        
        const raw = (req.query as any).id ?? req.params.id;
        const id = parseQueryIntStrict(raw as any);
        if (id === null) return res.status(400).json({ error: 'Invalid id' });
        
        const { text, completedAt } = req.body;

        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(400).json({error: 'Todo not found'});

        todo.text = text || todo.text;

        (completedAt === 'null') 
            ? todo.completeAt = null 
            : todo.completeAt = new Date(completedAt || todo.completeAt);
        

        res.json(todo);
    };

    public deleteTodo = (req:Request, res:Response) => {
        const raw = (req.query as any).id ?? req.params.id;
        const id = parseQueryIntStrict(raw as any);
        if (id === null) return res.status(400).json({ error: 'Invalid id' });

        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(400).json({error: 'Todo not found'});

        todos.splice(todos.indexOf(todo), 1);
        
        res.status(200).json({message: 'Item has Been deleted'})
    };
}
