import createServer from './server'

require("dotenv").config({ path: __dirname + '/../.env' });

const server = createServer()

const corsOptions = {
    credentials: true,
    origin: process.env.APP_URL
}

server.start(
    {
        cors: corsOptions,
        playground: process.env.NODE_ENV === 'production' ? false : '/',
    },
    server => {
		console.log(`Server started: ${server.port}`)
    }
)
