const http = require('http');
require("dotenv-safe").config();
const express = require('express');
const apiRoutes = require('./src/routes/api');
const webRoute = require('./src/routes/web');

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

const version = 'v1'
const app = express();

app.set('view engine', 'ejs');
app.set('views','./src/views');
app.use(express.static('static'));
app.use(`/api/${version}/`, apiRoutes);
app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );
app.use('/', webRoute);



const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);
