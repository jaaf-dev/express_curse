import { Request, Response } from "express";
import { parseQueryIntStrict } from "../../shared/utils";
import { prisma } from "../../data/postgres"

export class TodosController {

    constructor () {}

    public getTodos =  async (_req:Request, res:Response) => {
        const todos = await prisma.todo.findMany();
        res.json(todos);
    };

    public getTodoById = async (req:Request, res:Response) => {
        const raw = (req.query as any).id ?? req.params.id;
        const id = parseQueryIntStrict(raw as any);
        if (id === null) {
            return res.status(400).json({ error: 'Invalid id' });
        }

        const todo = await prisma.todo.findFirst({
            where: {
                id
            }
        });

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(todo);
    };

    public createTodo = async (req:Request, res:Response) => {
        const { text } = req.body;
        if(!text) return res.status(400).json({error: 'Text Property is Required'})

        const todo = await prisma.todo.create({
                data: {
                    text: text,
                    completedAt: new Date()
                }
            });

        res.json(todo);
    };

    public updateTodo = async (req:Request, res:Response) => {
        
        const raw = (req.query as any).id ?? req.params.id;
        const id = parseQueryIntStrict(raw as any);
        if (id === null) return res.status(400).json({ error: 'Invalid id' });
        
        const { text, completedAt } = req.body;

        const todo = await prisma.todo.findFirst({
            where: {
                id
            }
        });

        if(!todo) return res.status(400).json({error: 'Todo not found'});

        const updateTodo = await prisma.todo.update({
            where: {
                id
            },
            data: { 
                text, 
                completedAt: (completedAt) ? new Date(completedAt): null,
            }
        })

        res.json(updateTodo);
    };

    public deleteTodo = async (req:Request, res:Response) => {
        
        const raw = (req.query as any).id ?? req.params.id;
        const id = parseQueryIntStrict(raw as any);
        if (id === null) return res.status(400).json({ error: 'Invalid id' });

        const todo = await prisma.todo.findFirst({
            where: {
                id
            }
        });        
        
        if(!todo) return res.status(400).json({error: 'Todo not found'});

        const deleted = await prisma.todo.delete({
            where: {
                id
            }
        });
        
        (deleted)
            ? res.json(deleted)
            : res.status(400).json({error: `Todo with id ${id} not found`});
    };
}
