document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector(".video");
  const playPauseButton = document.querySelector(".play-pause");
  const progressInput = document.querySelector(".played-portion");
  const timeText = document.querySelector(".time");
  const timeTextEnd = document.querySelector(".time-end");
  const playBtnVideo = document.querySelector("#playBtnVideo");
  const pauseBtnVideo = document.querySelector("#pauseBtnVideo");
  const volumeSlider = document.getElementById('volume-slider');
  // Video volume
  const unmuteButton = document.getElementById('unmute');
  const muteButton = document.getElementById('mute');

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
    const endseconds = Math.floor(endtime % 60).toString().padStart(2, "0");
    timeTextEnd.textContent = `${endminutes}:${endseconds}`;
    // Video duration info End 
  });

  
  progressInput.addEventListener("input", () => {
    video.currentTime = progressInput.value * video.duration;
  });


  // Video volume
  unmuteButton.addEventListener('click', () => {
    unmuteButton.style.display = "none"
    volumeSlider.value = 0
  })

  // muteButton.addEventListener('click', () => {
  //   if (!video.muted) {
  //     video.muted = true;
  //     muteButton.textContent = 'Unmute';
  //   } else {
  //     video.muted = false;
  //     muteButton.textContent = 'Mute';
  //   }
  // });

  volumeSlider.addEventListener('input', () => {
    video.volume = volumeSlider.value;
    console.log(Math.floor(video.volume * 10) == 0);
    // if (Math.floor(video.muted * 10) == 0) {
    if (Math.floor(video.volume * 10) == 0) {
      video.muted = false;
      // muteButton.textContent = 'v0';
      muteButton.style.display = "inline-block"
      unmuteButton.style.display = "none"
    } else {
      muteButton.style.display = "none"
      unmuteButton.style.display = "inline-block"
    }
  });

});
