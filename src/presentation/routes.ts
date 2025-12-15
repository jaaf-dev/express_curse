import { Router } from "express";
import { TodosController } from "./todos/controllers";
import { TodoRoutes } from "./todos/routes";

export class AppRoutes {


    static get routes(): Router {

        const router = Router();
        const todosController = new TodosController();
        

        router.use('/api/todos', TodoRoutes.routes);

        return router;
    }

}












