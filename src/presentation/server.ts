import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}

export class Server {

    private app = express();
    private readonly port:number;
    private readonly routes:Router;
    private readonly publicPath:string

    constructor(options: Options){

        const { port, routes ,public_path = 'public' } = options;

        this.port = port;
        this.routes = routes;
        this.publicPath = public_path;
    }

    async start () {

        //* MIDDLEWARES
        this.app.use(express.json());
        this.app.use(express.urlencoded( { extended: true } ));

        //* PUBLIC FOLDER
        this.app.use(express.static(this.publicPath));

        //*ROUTES
        this.app.use(this.routes);

        //*SPA
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        })    
    }


}