
const BASE_URL = 'http://localhost:9081';

async function test() {
    try {
        console.log('Testing Upload...');

        // 1. Get/Create Subject
        let subjectId;
        try {
            const sems = await (await fetch(BASE_URL + '/api/semesters')).json();
            let semId = sems[0]?._id;
            if (!semId) {
                const s = await fetch(BASE_URL + '/api/semester', { 
                    method: 'POST', 
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({number: 100})
                });
                semId = (await s.json()).semester._id;
            }
            const subs = await (await fetch(BASE_URL + '/api/subjects/' + semId)).json();
            subjectId = subs.subjects?.[0]?._id;
            if (!subjectId) {
                 const sub = await fetch(BASE_URL + '/api/subject', {
                    method: 'POST', 
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({name: 'Debug Subject', semesterId: semId})
                 });
                 subjectId = (await sub.json())._id;
            }
        } catch (e) {
            console.error('Setup error:', e);
            return;
        }

        console.log('Using Subject ID:', subjectId);

        // 2. Create FormData with valid PDF
        const formData = new FormData();
        formData.append('title', 'Debug PDF');
        formData.append('category', 'Notes');
        formData.append('subjectId', "null");
        
        // Mock PDF content (minimal header to pass filters if checking magic numbers, but mime is key)
        const pdfContent = '%PDF-1.4\n%\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n';
        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        
        formData.append('file', blob, 'debug.pdf');

        const res = await fetch(BASE_URL + '/api/resource', {
            method: 'POST',
            body: formData
        });

        console.log('Status:', res.status);
        const data = await res.json();
        console.log('Response:', data);

        if (res.status === 400) {
            console.log('✅ PASS: Got 400 Bad Request as expected');
        } else {
            console.log('❌ FAIL: Expected 400, got', res.status);
        }

    } catch (e) {
        console.error('Test Error:', e);
    }
}
test();
