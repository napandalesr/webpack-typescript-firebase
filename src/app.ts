import { serve } from "./bin/www"; 
import { router } from "./routes/web";
var root = require('app-root-path');

const lounch = new serve();

const app = lounch.start();

app.set('views', `${root}/src/views/`);
app.set('view engine', 'hbs');

app.use(router);


export default app;
