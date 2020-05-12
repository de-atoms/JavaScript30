const keys = document.querySelectorAll(".key");

function playHelper(audio, key) {
    if (!audio) return; //This will stop the function is you press a key that is not assigned
    audio.currentTime = 0;
    audio.play();
    key.classList.add("playing");
}

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    playHelper(audio, key);
}

keys.forEach((key) => key.addEventListener("click", getDataKey));

function playSoundFromClick(data) {
    const audio = document.querySelector(`audio[data-key="${data}"]`);
    const key = document.querySelector(`.key[data-key="${data}"]`);
    playHelper(audio, key);
}

function getDataKey(e) {
    if (e.target.tagName === "BUTTON") {
        dataKey = e.target.dataset.key;
    } else {
        dataKey = e.target.parentNode.dataset.key;
    }
    playSoundFromClick(dataKey);
    // console.log(dataKey);
    return;
}

keys.forEach((key) => key.addEventListener("transitionend", removeTransition));

function removeTransition(e) {
    if (e.propertyName !== "transform") return; //Skips it if there is no transform
    this.classList.remove("playing");
}
window.addEventListener("keyup", playSound);