// ---------------- GLOBAL VARIABLES --------------------------

let songs = [
    {songName: 'Chill', artist: 'Unknown Artist', src: 'music/chill.mp3', cover: 'covers/chill.jpg', length: '3:07', genre:'relax', index: '0'},
    {songName: 'Fireside', artist: 'Some Artist', src: 'music/fireside.mp3', cover: 'covers/fireside.jpg', length: '2:34', genre:'relax', index: '1'},
    {songName: 'Future', artist: 'Forgot', src: 'music/future.mp3', cover: 'covers/future.jpg', length: '3:20', genre:'cry', index: '2'},
    {songName: 'Garden', artist: 'Unknown Artist', src: 'music/garden.mp3', cover: 'covers/garden.jpg', length: '2:17', genre:'relax', index: '3'},
    {songName: 'Jpop', artist: 'Me', src: 'music/jpop.mp3', cover: 'covers/jpop.jpg', length: '3:13', genre:'play', index: '4'},
    {songName: 'Lament', artist: 'Unknown Artist', src: 'music/lament.mp3', cover: 'covers/lament.jpg', length: '3:17', genre:'cry', index: '5'},
    {songName: 'Lo-fi', artist: 'City Pop', src: 'music/lo-fi.mp3', cover: 'covers/lo-fi.jpg', length: '3:19', genre:'play', index: '6'},
    {songName: 'Reflection', artist: 'My Life', src: 'music/reflection.mp3', cover: 'covers/reflection.jpg', length: '3:07', genre:'cry', index: '7'},
    {songName: 'Samurai', artist: 'Kenshin', src: 'music/samurai.mp3', cover: 'covers/samurai.jpg', length: '2:04', genre:'play', index: '8'},
    {songName: 'Shamisen', artist: 'Brothers', src: 'music/shamisen.mp3', cover: 'covers/shamisen.jpg', length: '2:12', genre:'relax', index: '9'},
    
];

let songIndex = 0;
let audioEle = new Audio('music/chill.mp3');
let bigPlay = document.querySelector('.bigPlay');
let progressBar = document.querySelector('.progress-bar');
let songItems = Array.from(document.getElementsByClassName('song-item'));
let masterSongName = document.getElementById('masterSongName');
let volume = document.querySelector('.volume-control');
let mute = document.querySelector(".fa-volume-mute");
let unmute = document.querySelector(".fa-volume-up");



// -------------- APPEND SONGS IN HTML ---------------------
const appendMusic = function (item) {
    document.querySelector('.all-songs').innerHTML += 
    `<div class="song-item">
    <i id="${item.index}" class="fas smallPlay fa-play"></i></span>
    <img src="${item.cover}" alt="song cover">
    <span class="songName">${item.songName}</span>
    <span class="song-listplay">
    <span class="songtime">${item.length}</span>
    </div>
    `
}

songs.forEach(appendMusic);

// -------------------- PLAY / PAUSE -----------------------
bigPlay.addEventListener('click', () => {
    if (audioEle.paused || audioEle.currentTime <= 0 ) {
        audioEle.play();
        bigPlay.classList.remove('fa-play');
        bigPlay.classList.add('fa-pause');
    } else {
        audioEle.pause();
        bigPlay.classList.remove('fa-pause');
        bigPlay.classList.add('fa-play');
    }
})


// -------------- NEXT AND PREVIOUS --------------------
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioEle.src = `music/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
        audioEle.currentTime = 0;
        audioEle.play();
        bigPlay.classList.remove('fa-play');
        bigPlay.classList.add('fa-pause');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioEle.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioEle.currentTime = 0;
    audioEle.play();
    bigPlay.classList.remove('fa-play');
    bigPlay.classList.add('fa-pause');
});



 //------------------ UPDATING THE PROGRESS BAR -------------------
audioEle.addEventListener('timeupdate', () => {
    progress = parseInt((audioEle.currentTime/audioEle.duration) * 100);
    progressBar.value = progress;

})

progressBar.addEventListener('change', () => {
    audioEle.currentTime = progressBar.value * audioEle.duration/100;
})


//--------------- CREATING PLAYLIST --------------------

songItems.forEach((element, i) => {
element.getElementsByTagName("img")[0].src = songs[i].cover;
element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
element.getElementsByClassName("songtime")[0].innerText = songs[i].length;
})


// ---------- PLAYING SONGS IN A PLAYLIST ------------

const allPlays = () => {
    Array.from(document.getElementsByClassName('smallPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
};

Array.from(document.getElementsByClassName('smallPlay')).forEach((element)=>{
        
        element.addEventListener('click', (e)=>{ 
        allPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');

        
        audioEle.src = `music/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;


        audioEle.currentTime = 0;        
        audioEle.play();
        bigPlay.classList.remove('fa-play');
        bigPlay.classList.add('fa-pause');
        
    })
});

// ----------------- FILTER -----------------

document.getElementById("filterSongs").innerHTML = 
`<option value="all">All</option>
<option value="relax">Relax</option>
<option value="play">Play</option>
<option value="cry">Cry</option>
`

function filterRelax(songs) {
    return songs.genre == 'relax'
}

function filterPlay(songs) {
    return songs.genre == 'play'
}

function filterCry(songs) {
    return songs.genre == 'cry'
}

var relax = songs.filter(filterRelax);
var play = songs.filter(filterPlay);
var cry = songs.filter(filterCry)

var a = document.getElementById('filterSongs');
a.addEventListener('change', function () {
    if (a.value =='all'){
        document.querySelector('.all-songs').innerHTML= ``;
        songs.forEach(appendMusic)
    
    } else if (a.value =='relax'){
    document.querySelector('.all-songs').innerHTML= ``;
   relax.forEach(appendMusic);
   } else if (a.value == 'play') {
    document.querySelector('.all-songs').innerHTML= ``;
 
    play.forEach(appendMusic);
   } else if (a.value == 'cry') {
    document.querySelector('.all-songs').innerHTML= ``;
    cry.forEach(appendMusic);
   }
}), false;


// ----------- VOLUME CONTROL ---------------

volume.addEventListener("change", function(e) {
    audioEle.volume = e.currentTarget.value / 100;
    })

unmute.addEventListener('click', muteOrUnmute);

function muteOrUnmute () {
    if (audioEle.muted == true) {
        audioEle.muted = false;
         unmute.classList.remove('fa-volume-mute');
        unmute.classList.add('fa-volume-up');

    } else {
        audioEle.muted = true;
        unmute.classList.remove('fa-volume-up');
        unmute.classList.add('fa-volume-mute');
            
    }
}


