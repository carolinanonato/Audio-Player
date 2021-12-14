//Variables

let songs = [
    {songName: 'Chill', artist: 'Unknown Artist', src: 'music/chill.mp3', cover: 'covers/chill.jpg', length: '3:07', genre:'relax', index: '1'},
    {songName: 'Fireside', artist: 'Some Artist', src: 'music/fireside.mp3', cover: 'covers/fireside.jpg', length: '2:34', genre:'relax', index: '2'},
    {songName: 'Future', artist: 'Forgot', src: 'music/future.mp3', cover: 'covers/future.jpg', length: '3:20', genre:'cry', index: '3'},
    {songName: 'Garden', artist: 'Unknown Artist', src: 'music/garden.mp3', cover: 'covers/garden.jpg', length: '2:17', genre:'relax', index: '4'},
    {songName: 'Jpop', artist: 'Me', src: 'music/jpop.mp3', cover: 'covers/jpop.jpg', length: '3:13', genre:'play', index: '5'},
    {songName: 'Lament', artist: 'Unknown Artist', src: 'music/lament.mp3', cover: 'covers/lament.jpg', length: '3:17', genre:'cry', index: '6'},
    {songName: 'Lo-fi', artist: 'City Pop', src: 'music/lo-fi.mp3', cover: 'covers/lo-fi.jpg', length: '3:19', genre:'play', index: '7'},
    {songName: 'Reflection', artist: 'My Life', src: 'music/reflection.mp3', cover: 'covers/reflection.jpg', length: '3:07', genre:'cry', index: '8'},
    {songName: 'Samurai', artist: 'Kenshin', src: 'music/samurai.mp3', cover: 'covers/samurai.jpg', length: '2:04', genre:'play', index: '9'},
    {songName: 'Shamisen', artist: 'Brothers', src: 'music/shamisen.mp3', cover: 'covers/shamisen.jpg', length: '2:12', genre:'relax', index: '10'},
    
];

let songIndex = 0;
let audioEle = new Audio('music/chill.mp3');
let bigPlay = document.querySelector('.bigPlay');
let progressBar = document.querySelector('.progress-bar');
let songItems = Array.from(document.getElementsByClassName('song-item'));



// Event listeners

// Play/Pause click
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

 //Update seekbar
audioEle.addEventListener('timeupdate', () => {
    progress = parseInt((audioEle.currentTime/audioEle.duration) * 100);
    progressBar.value = progress;

})

progressBar.addEventListener('change', () => {
    audioEle.currentTime = progressBar.value * audioEle.duration/100;
})

//Create Playlist
songItems.forEach((element, i) => {
element.getElementsByTagName("img")[0].src = songs[i].cover;
element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
element.getElementsByClassName("songtime")[0].innerText = songs[i].length;
})