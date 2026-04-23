// Stats autoplay behavior: animate one stat card at a time in a continuous loop.
document.addEventListener('DOMContentLoaded', function () {
	var statCards = Array.prototype.slice.call(document.querySelectorAll('.stat-card'));

	if (!statCards.length) {
		return;
	}

	var activeIndex = 0;
	var stepDurationMs = 1400;

	function setActive(cardEl, isActive) {
		if (isActive) {
			cardEl.classList.add('is-active');
			return;
		}

		cardEl.classList.remove('is-active');
	}

	function activateByIndex(index) {
		statCards.forEach(function (cardEl, cardIndex) {
			setActive(cardEl, cardIndex === index);
		});
	}

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		activateByIndex(0);
		return;
	}

	activateByIndex(activeIndex);

	window.setInterval(function () {
		activeIndex = (activeIndex + 1) % statCards.length;
		activateByIndex(activeIndex);
	}, stepDurationMs);
});

