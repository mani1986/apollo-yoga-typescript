import createServer from './server'
import boot from './boot'

require("dotenv").config({ path: __dirname + '/../.env' });

boot.start()
const server = createServer()

const corsOptions:object = {
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
