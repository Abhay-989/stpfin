------------------------------------------------------------------------------------------
const BASE_URL = 'http://localhost:9080';

async function test() {
    try {
        console.log('Testing Health...');
        try {
            const res1 = await fetch(BASE_URL + '/');
            console.log('✅ Health:', await res1.text());
        } catch (e) {
            console.error('❌ Health Failed:', e.message);
        }

        console.log('\nTesting Create User...');
        try {
            const res2 = await fetch(BASE_URL + '/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'antigravity_test_' + Date.now(),
                    password: 'password123'
                })
            });
            const data2 = await res2.json();
            console.log('✅ Create User:', data2);
        } catch (e) {
            console.log('ℹ️ Create User Note:', e.message);
        }

        console.log('\nTesting Login...');
        try {
            const fixedName = 'antigravity_fixed';
            
            // Try create fixed user
            try {
                 await fetch(BASE_URL + '/api/user', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: fixedName, password: 'password123' })
                });
            } catch(e) {}

            const res3 = await fetch(BASE_URL + '/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: fixedName, password: 'password123' })
            });
            const data3 = await res3.json();
            
            if (res3.ok) {
                console.log('✅ Login:', data3);
            } else {
                console.error('❌ Login Failed:', data3);
            }
            
        } catch (e) {
            console.error('❌ Login Failed:', e.message);
        }

    } catch (e) {
        console.error('Unexpected Error:', e);
    }
}

test();
