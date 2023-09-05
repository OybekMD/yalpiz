document.addEventListener("DOMContentLoaded", function () {
  let video = document.querySelector(".video");
  const playPauseButton = document.querySelector(".play-pause");
  const progressInput = document.querySelector(".played-portion");
  const timeText = document.querySelector(".time");
  const timeTextEnd = document.querySelector(".time-end");
  const playBtnVideo = document.querySelector("#playBtnVideo");
  const pauseBtnVideo = document.querySelector("#pauseBtnVideo");
  const volumeSlider = document.getElementById("volume-slider");
  // Video volume
  const unmuteButton = document.getElementById("unmute");
  const muteButton = document.getElementById("mute");

  playPauseButton.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      playBtnVideo.style.display = "none";
      pauseBtnVideo.style.display = "block";
    } else {
      video.pause();
      playBtnVideo.style.display = "block";
      pauseBtnVideo.style.display = "none";
    }
  });
  
  video.addEventListener("click", function () {
    if (video.paused) {
      video.play();
      playBtnVideo.style.display = "none";
      pauseBtnVideo.style.display = "block";
    } else {
      video.pause();
      playBtnVideo.style.display = "block";
      pauseBtnVideo.style.display = "none";
    }
  });

  video.addEventListener("timeupdate", () => {
    progressInput.value = video.currentTime / video.duration;
    const time = video.currentTime;
    const endtime = video.duration;
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    timeText.textContent = `${minutes}:${seconds}`;

    // Video duration info START - you can delete is if you wont this !
    const endminutes = Math.floor(endtime / 60);
    const endseconds = Math.floor(endtime % 60)
      .toString()
      .padStart(2, "0");
    timeTextEnd.textContent = `${endminutes}:${endseconds}`;
    // Video duration info End
  });

  progressInput.addEventListener("input", () => {
    video.currentTime = progressInput.value * video.duration;
  });

  // Video volume mute and unmute Start
  unmuteButton.addEventListener("click", () => {
    unmuteButton.style.display = "none";
    muteButton.style.display = "block";
    volumeSlider.value = 0.0;
    video.volume = 0;
  });

  muteButton.addEventListener("click", () => {
    unmuteButton.style.display = "block";
    muteButton.style.display = "none";
    volumeSlider.value = 5;
    video.volume = 0.5;
  });
  // Video volume mute and unmute End

  // mute and unmute hover input open Start
  muteButton.addEventListener("mouseover", () => {
    volumeSlider.style.display = "block";
  });

  unmuteButton.addEventListener("mouseover", () => {
    volumeSlider.style.display = "block";
  });

  volumeSlider.addEventListener("mouseout", () => {
    volumeSlider.style.display = "none";
  });
  // mute and unmute hover input open End

  volumeSlider.addEventListener("input", () => {
    video.volume = volumeSlider.value;
    // if (Math.floor(video.muted * 10) == 0) {
    if (Math.floor(video.volume * 10) == 0) {
      video.muted = false;
      // muteButton.textContent = 'v0';
      muteButton.style.display = "inline-block";
      unmuteButton.style.display = "none";
    } else {
      muteButton.style.display = "none";
      unmuteButton.style.display = "inline-block";
    }
  });

  // Fullscren Start
  const fullScreen = document.getElementById("fullscren");

  // Button click full scren
  fullScreen.addEventListener("click", function () {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      // Firefox
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      // Chrome, Safari (webkit)
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      // IE/Edge
      video.msRequestFullscreen();
    }
  });
  // Video double click then Full scren 
  video.addEventListener("dblclick", function () {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      // Firefox
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      // Chrome, Safari (webkit)
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      // IE/Edge
      video.msRequestFullscreen();
    }
  });
  // Fullscren End

  // Spend video time Start
  function showVolumeKeydown() {
    volumeSlider.style.display = "block";
    setTimeout(() => {
      volumeSlider.style.display = "none";
    }, 4000);
  }

  document.addEventListener("keydown", function (event) {
    if (event.code === "ArrowRight") {
      video.currentTime += 5; // Skip forward 5 seconds
    }
    if (event.code === "ArrowLeft") {
      video.currentTime -= 5; // Skip forward 5 seconds
    }
    if (event.code === "Space") {
      if (video.paused) {
        video.play();
        playBtnVideo.style.display = "none";
        pauseBtnVideo.style.display = "block";
      } else {
        video.pause();
        playBtnVideo.style.display = "block";
        pauseBtnVideo.style.display = "none";
      }
      // Prevent browsers' default spacebar behavior (e.g., page scrolling)
      event.preventDefault();
    }

    if (event.code === "ArrowUp") {
      const currentValue = parseInt(volumeSlider.value);
      const newValue = currentValue + 1;
      volumeSlider.value = newValue;
      video.volume = volumeSlider.value / 10;
      console.log(volumeSlider.value + " volumeSlider.value");
      console.log(video.volume + " video.volume");
      showVolumeKeydown();
      unmuteButton.style.display = "block";
      muteButton.style.display = "none";
      // Increase the volume
    }
    if (event.code === "ArrowDown") {
      // Decrease the volume
      volumeSlider.value = volumeSlider.value - 1;
      video.volume = volumeSlider.value / 10;
      showVolumeKeydown();
      console.log(volumeSlider.value + " volumeSlider.value");
      console.log(video.volume + " video.volume");
      if (video.volume == 0) {
        unmuteButton.style.display = "none";
        muteButton.style.display = "block";
      }
    }
  });
  // Spend video time End
});
