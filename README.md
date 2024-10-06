# Redis Cluster

## Overview
This repository contains the implementation of a Redis master-slave cluster, tests for different eviction strategies, and a probabilistic cache wrapper.

## Prerequisites
- Docker and Docker Compose installed.
- Node.js installed.

## Setup and Run

### Step 1: Start Redis Master-Slave Cluster and install dependencies
Run the following command to start the cluster:
```sh
docker-compose up -d
```
Install dependencies:
```sh
pnpm install
```

### Step 2: Use Probabilistic Cache Wrapper
Run the wrapper script:
```sh
node src/cacheWrapper.js
```

### Step 3: Test Eviction Strategies
Edit `redis/master/redis.conf` and set different eviction policies:
```conf
maxmemory-policy allkeys-lru
```
Then run:
```sh
node src/testEviction.js
```
