const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');

const currentYear = new Date().getFullYear();


const newYearTime = new Date(`January 01 ${currentYear +1} 00:00:00`);

//Set Background year
year.innerText = currentYear + 1;

//Update countdown time
function updateCountdown(){
  const currentTime = new Date();
  const diff = newYearTime - currentTime; //in milliseconds

  const d = Math.floor(diff / 1000 / 60 / 60 / 24); //calculate from milliseconds to days
  const h = Math.floor(diff / 1000 / 60 / 60) %24; //calculate from hours remaining inthe day
  const m = Math.floor(diff / 1000 / 60 ) %60; //calculate from minutes remaining inthe day
  const s = Math.floor(diff / 1000 ) %60; //calculate from minutes remaining inthe day

  //Add values to DOM
  days.innerHTML = d;
  hours.innerHTML = h < 10 ? '0' + h : h;
  minutes.innerHTML = m < 10 ? '0' + m : m;
  seconds.innerHTML = s < 10 ? '0' + s : s;
}

//Show spinner before countdown (loading)
setTimeout(() => {
  loading.remove();
  countdown.style.display = 'flex';
}, 1000);

//Run every second
setInterval(updateCountdown, 1000);