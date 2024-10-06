import { createClient } from 'redis';

const connectToRedis = async () => {
    const client = createClient({
        socket: {
            host: 'localhost',
            port: 6379,
        },
        password: 'masterpassword',
    });
    await client.connect();
    return client;
};

const populateCache = async () => {
    const client = await connectToRedis();
    for (let i = 0; i < 10000; i++) {
        await client.set(`key-${i}`, `value-${i}`);
    }
    await client.quit();
};

populateCache()
    .then(() => console.log('Cache population complete'))
    .catch((err) => console.error('Error populating cache:', err));
