'use strict'

// install redis first:
// https://redis.io/

// then:
// $ npm install redis
// $ redis-server

/**
 * Module dependencies.
 */

var express = require('../..');
var path = require('node:path');
var redis = require('redis');

var db = redis.createClient();
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

// npm install redis

/**
 * Redis Initialization
 */

async function initializeRedis() {
  try {
    // connect to Redis

    await db.connect();

    // populate search

    await db.sAdd('ferret', 'tobi');
    await db.sAdd('ferret', 'loki');
    await db.sAdd('ferret', 'jane');
    await db.sAdd('cat', 'manny');
    await db.sAdd('cat', 'luna');
  } catch (err) {
    console.error('Error initializing Redis:', err);
    process.exit(1);
  }
}

/**
 * GET search for :query.
 */