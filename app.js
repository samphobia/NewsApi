require('dotenv').config();
const express = require('express')
const mongoose =  require('mongoose')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const cors = require('cors')


const options = {
  definition: {
    openapi:  "3.0.0",
    info: {
      title: "Denukan API",
      version: "1.0.0",
      description: "DENUKAN SOFTWARE API v2.2"
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          schema: 'bearer',
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: [],
      }
    ],
    servers: [
      {
        url: "https://plum-nutty-oyster.cyclic.app/"
              
      },
      {
        url: "http://localhost:3002/"
      }
    ],
  },

  apis: ["./routes/*.js"]
}



// Method can be called in any place after calling constructor SwaggerUIBundle


const specs = swaggerJsDoc(options)

const app = express()

app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use(express.json())



app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

const newsPageRoutes = require('./routes/newsPage');
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/account')
const transactionRoutes = require('./routes/transactions')

app.use('/news', newsPageRoutes)
app.use('/auth', authRoutes)
app.use('/account', accountRoutes)
app.use('/transaction',  transactionRoutes)

const port = process.env.PORT

app.listen(port, console.log(`server started on port ${port}`))

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
  console.log('Database connected');
})
.catch(err => {
  console.log(err);
})
