import {Redis} from "ioredis";
const redis = new Redis({
    host: "localhost", // will replcace with env variable
    port: 6379,
    
});

export default redis;
