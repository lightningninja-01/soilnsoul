const https = require('https');

https.get('https://unsplash.com/s/photos/varanasi', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        const urls = [...data.matchAll(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+[0-9a-f]{10,}/g)]
            .map(m => m[0].split('?')[0])
            .filter((v, i, a) => a.indexOf(v) === i);
        console.log(urls.slice(0, 20));
    });
}).on('error', (e) => {
    console.error(e);
});
