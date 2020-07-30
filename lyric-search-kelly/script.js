const apiURL = 'https://api.lyrics.ovh';

const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

//Search by song or artist (old way with .then and promises)
// function searchSongs(term){
//   fetch(`${apiURL}/suggest/${term}`)
//   .then(res => res.json())
//   .then(data => console.log(data));
// }

//Search by song or artist with async and await
async function searchSongs(term){
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  
  showData(data);
}

//Show song and artist in DOM using .forEach high order array method
// function showData(data){
//   let output = '';

//   data.data.forEach(song => {
//     output += `
//     <li>
//       <span><strong>${song.artist.name}</strong> - ${song.title}</span>
//       <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
//     </li>
//     `;
//   });

//   result.innerHTML = `
//     <ul class="songs">
//       ${output}
//     </ul>
//   `;

//Show song and artist in DOM using .map high order array method
function showData(data){
  result.innerHTML = `
    <ul class="songs">
      ${data.data.map(
        song => `<li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`)
    .join('')}
    
    </ul>
  `;

  if(data.prev || data.next) {
    more.innerHTML = `
      ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
      ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
    `;
  } else {
    more.innerHTML = '';
  }
}

// Get prev and next songs
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}

//Get lyrics for song
async function getLyrics(artist, songTitle){
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  console.log(data);

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
  <span>${lyrics}</span>`;

  more.innerHTML = '';
}


//Event Listeners 
form.addEventListener('submit', e => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if(!searchTerm) {
    alert('Please type a search term')
  }else {
    searchSongs(searchTerm);
  }

});

//Get lyrics button click
result.addEventListener('click', e => {
  const clickedEl = e.target;

  if (clickedEl.tagName === 'BUTTON'){
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-songtitle');

    getLyrics(artist, songTitle);
  }
});