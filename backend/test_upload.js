import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

const BASE_URL = 'http://localhost:9080';

async function testUpload() {
    try {
        // 1. Create a dummy file
        fs.writeFileSync('test_file.txt', 'Hello world content');

        // 2. Prepare form data
        const form = new FormData();
        form.append('title', 'Test Resource');
        form.append('category', 'Notes');
        // We need a valid subject ID. Let's create a semester and subject first or assume one?
        // Let's just try to fetch subjects and pick one.
        
        let subjectId = "60d5ecb8b4873436087b7a0b"; // dummy default
        
        try {
            const sems = await axios.get(BASE_URL + '/api/semesters');
            if (sems.data.length > 0) {
                 const semId = sems.data[0]._id;
                 const subs = await axios.get(BASE_URL + '/api/subjects/' + semId);
                 if (subs.data.subjects.length > 0) {
                     subjectId = subs.data.subjects[0]._id;
                 } else {
                     // create subject
                     const sub = await axios.post(BASE_URL + '/api/subject', { name: 'Test Subject', semesterId: semId });
                     subjectId = sub.data._id;
                 }
            } else {
                // create semester
                const sem = await axios.post(BASE_URL + '/api/semester', { number: 1 });
                const sub = await axios.post(BASE_URL + '/api/subject', { name: 'Test Subject', semesterId: sem.data.semester._id });
                subjectId = sub.data._id;
            }
        } catch(e) {
            console.log('Setup failed, using dummy id', e.message);
        }

        form.append('subjectId', subjectId);
        form.append('file', fs.createReadStream('test_file.txt'));

        console.log('Uploading to subject:', subjectId);

        // 3. Upload
        const res = await axios.post(BASE_URL + '/api/resource', form, {
            headers: {
                ...form.getHeaders()
            }
        });

        console.log('✅ Upload Success:', res.data);

    } catch (e) {
        console.error('❌ Upload Failed Status:', e.response?.status);
        console.error('❌ Upload Failed Data:', JSON.stringify(e.response?.data, null, 2));
    } finally {
        if (fs.existsSync('test_file.txt')) fs.unlinkSync('test_file.txt');
    }
}

testUpload();
