document.addEventListener("DOMContentLoaded", () => {
	let $para = document.querySelector(".mq-value");
	let $container = document.querySelector(".container");
	
	function screenTest() {
		if (window.matchMedia("(max-width: 576px)").matches) {
			/* the viewport is 567 pixels wide or less */
			$para.textContent =
				"This is a narrow screen; " + window.innerWidth + "px wide.";
			$container.style.backgroundColor = "red";
		}
		if (window.matchMedia("(max-width: 768px)").matches) {
			/* the viewport is 768 pixels wide or less */
			$para.textContent =
				"This is a narrow screen; " + window.innerWidth + "px wide.";
			$container.style.backgroundColor = "tomato";
		} else if (window.matchMedia("(max-width: 992px)").matches) {
			/* the viewport is 992 pixels wide or less */
			$para.textContent =
				"This is a REALLY wide screen; " + window.innerWidth + "px wide.";
			$container.style.backgroundColor = "green";
		} else {
			/* the viewport is more than 1200 pixels wide */
			$para.textContent =
				"This is a wide screen; " + window.innerWidth + "px wide.";
			$container.style.backgroundColor = "blue";
		}
	}

	screenTest();

	document.body.onresize = screenTest;
});