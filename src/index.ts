import 'reflect-metadata';
import App from './App'

const corsOptions: object = {
  credentials: true,
  // origin: process.env.APP_URL
  origin: '*',
};

App.listen(
  {
    cors: corsOptions,
    port: process.env.PORT || 4015,
    playground: process.env.NODE_ENV === 'production' ? false : '/',
  },
  () => {
    console.log(`Server started: ${process.env.PORT || 4015} on ${process.env.NODE_ENV}`);
  }
);
