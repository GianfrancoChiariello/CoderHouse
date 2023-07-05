const form = document.getElementById('cookieForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};

    data.forEach((value, key) => {
        obj[key] = value;
    });

    console.log(obj);

    fetch('/api/cookies/set', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => console.log(data))
});




function getCookie() {
    console.log(document.cookie)
}