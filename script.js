const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progressContainer = document.getElementById("progress-container");
const currenttimeEl = document.querySelector(".current-time");
const durationEl = document.querySelector(".duration");
const progress = document.getElementById("progress");
const music = document.querySelector("audio");
const preBtn = document.getElementById("previous");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army(Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Good Night,Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Chill Machine",
    artist: "Jacinto Design",
  },
];

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.src = "img/" + song.name + ".jpg";
  music.src = "music/" + song.name + ".mp3";
}

let songIndex = 0;

function preSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

loadSong(songs[songIndex]);

function updateProgressBar(e) {
  if (isplaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + "%";

    const durationmin = Math.floor(duration / 60);
    let durationsec = Math.floor(duration % 60);

    if (durationsec < 10) {
      durationsec = "0" + durationsec;
      console.log(durationsec);
    }

    if (durationsec) {
      durationEl.textContent = durationmin + "." + durationsec;
    }

    const currentmin = Math.floor(currentTime / 60);
    let currentsec = Math.floor(currentTime % 60);

    if (currentsec < 10) {
      currentsec = "0" + currentsec;
    }
    currenttimeEl.textContent = currentmin + "." + currentsec;
  }
}

function setProgressBar(e) {
  const width = this.clientWidth;
  const clientX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clientX / width) * duration;
}

let isplaying = false;

function playSong() {
  isplaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "pause");
  music.play();
}

function pauseSong() {
  isplaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");
  music.pause();
}

playBtn.addEventListener("click", () => (isplaying ? pauseSong() : playSong()));
preBtn.addEventListener("click", preSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
