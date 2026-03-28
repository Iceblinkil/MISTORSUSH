const https = require('https');

const S_URL = 'https://iaqbtwsothmkdjapstkq.supabase.co';
const S_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhcWJ0d3NvdGhta2RqYXBzdGtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNjE0ODYsImV4cCI6MjA4OTgzNzQ4Nn0.ye0QGkypstTfxGjCkytn_x7bwsa-2tNiq3EIEulsvV0';

function makeRequest(path, method = 'GET') {
    return new Promise((resolve, reject) => {
        const url = new URL(path, S_URL);
        const options = {
            method: method,
            headers: {
                'apikey': S_KEY,
                'Authorization': `Bearer ${S_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            }
        };

        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        resolve(data);
                    }
                } else {
                    reject(new Error(`Status: ${res.statusCode}, Data: ${data}`));
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.end();
    });
}

async function check() {
    console.log("Checking products table...");
    try {
        const products = await makeRequest('/rest/v1/products?select=*&limit=1');
        console.log("Products table: OK");
        console.log("Sample product:", JSON.stringify(products[0], null, 2));
    } catch (e) {
        console.error("Products table: ERROR", e.message);
    }

    console.log("\nChecking orders table...");
    try {
        const orders = await makeRequest('/rest/v1/orders?select=*&limit=1');
        console.log("Orders table: OK");
        if (orders.length > 0) {
            console.log("Sample order fields:", Object.keys(orders[0]));
        } else {
            console.log("Orders table is empty, but exists.");
        }
    } catch (e) {
        console.error("Orders table: ERROR", e.message);
    }
}

check();
