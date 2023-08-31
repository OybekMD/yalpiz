document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector(".video");
  const playPauseButton = document.querySelector(".play-pause");
//   const progressInput = document.querySelector(".progress");
  const progressInput = document.querySelector(".played-portion");
  const timeText = document.querySelector(".time");
  const playBtnVideo = document.querySelector("#playBtnVideo");
  const pauseBtnVideo = document.querySelector("#pauseBtnVideo");

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
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    timeText.textContent = `${minutes}:${seconds}`;
  });

  progressInput.addEventListener("input", () => {
    video.currentTime = progressInput.value * video.duration;
  });

});
