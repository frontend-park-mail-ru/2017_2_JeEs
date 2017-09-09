const mute = document.getElementById("mute");
const soundRange = document.getElementById("sound-range");
const soundBar = document.getElementById("sound-bar");
let soundValue = "0";

soundBar.addEventListener("mouseover", () => {
	soundRange.classList.remove("hidden");
}, false);

soundBar.addEventListener("mouseout", () => {
	soundRange.classList.add("hidden");
}, false);

mute.addEventListener("click", () => {
	if (!mute.hasAttribute("clicked")) {
		soundValue = soundRange.value;
		soundRange.value = 0;
		mute.setAttribute("clicked", "");
	}
	else
	{
		soundRange.value = soundValue;
		mute.removeAttribute("clicked");
	}
}, false);
