chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create(chrome.i18n.getMessage("local_launch_path"), {
		outerBounds: {
	      	width: Math.round(screen.width * 0.85),
	      	height: Math.round(screen.height * 0.85),
			minWidth: 750,
			minHeight: 330
	    },
	frame: "none"});
});