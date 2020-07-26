import register from "./controllers/register.js";
import login from "./controllers/login.js";
import catalog, {create, edit, details} from "./controllers/movies.js";
import home from "./controllers/home.js";
import {registerPost} from "./controllers/register.js";
import {loginPost} from "./controllers/login.js";
import logout from "./controllers/logout.js";

window.addEventListener('load', () => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            username: '',
            userId: '',
        }

        this.get('/', home);
        this.get('index.html', home);
        this.get('#/home', home);
        this.get('#/register', register);
        this.get('#/login', login);
        this.get('#/logout', logout);
        this.get('#/catalog', catalog);
        this.get('#/details:id', details);
        this.get('#/create', create);
        this.get('#/edit/:id', edit);


        this.post('#/register', (ctx) => {registerPost.call(ctx)})
        this.post('#/login', (ctx) => {loginPost.call(ctx)})

    });


    app.run();


});