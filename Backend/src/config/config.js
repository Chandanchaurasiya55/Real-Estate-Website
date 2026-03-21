import dotenv from 'dotenv';
dotenv.config();



if(!process.env.PORT){
  throw new Error("PORT is not defined in environment variables");
}
if(!process.env.MONGODB_URL){
  throw new Error("MONGODB_URL is not defined in environment variables");
}
if(!process.env.jwtSecret){
  throw new Error("jwtSecret is not defined in environment variables");
}

const config = {
  port: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL,
  jwtSecret: process.env.jwtSecret,
};

export default config;
