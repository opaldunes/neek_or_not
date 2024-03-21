const onlineBtn = document.getElementById('onlineBtn');
const workBtn = document.getElementById('workBtn');

onlineBtn.addEventListener('click', function() {
    onlineBtn.classList.add('green');
    workBtn.classList.remove('green');
});

workBtn.addEventListener('click', function() {
    workBtn.classList.add('green');
    onlineBtn.classList.remove('green');
});