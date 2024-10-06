import { createClient } from 'redis';

class ProbabilisticCacheWrapper {
    constructor(host = 'localhost', port = 6379, password = '', cacheProbability = 0.5) {
        this.client = createClient({
            socket: {
                host,
                port,
            },
            password,
        });
        this.cacheProbability = cacheProbability;
        this.client.connect();
    }

    async set(key, value) {
        if (Math.random() < this.cacheProbability) {
            await this.client.set(key, value);
        }
    }

    async get(key) {
        return await this.client.get(key);
    }

    async disconnect() {
        await this.client.quit();
    }
}

(async () => {
    const cache = new ProbabilisticCacheWrapper('localhost', 6379, 'masterpassword', 0.7);
    await cache.set('example_key', 'example_value');
    console.log(await cache.get('example_key'));
    await cache.disconnect();
})();
