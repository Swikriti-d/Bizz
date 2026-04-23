// Stats autoplay behavior: animate one stat card at a time in a continuous loop.
document.addEventListener('DOMContentLoaded', function () {
    var statsSection = document.querySelector('.stats-section');
	var statCards = Array.prototype.slice.call(document.querySelectorAll('.stat-card'));

    if (!statsSection || !statCards.length) {
		return;
	}

	var activeIndex = 0;
	var stepDurationMs = 1400;
    var intervalId = null;

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

    function startLoop() {
        if (intervalId !== null) {
            return;
        }

        activateByIndex(activeIndex);

        intervalId = window.setInterval(function () {
            activeIndex = (activeIndex + 1) % statCards.length;
            activateByIndex(activeIndex);
        }, stepDurationMs);
    }

    function stopLoop() {
        if (intervalId === null) {
            return;
        }

        window.clearInterval(intervalId);
        intervalId = null;
    }

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		activateByIndex(0);
		return;
	}

    startLoop();
});

// Signup modal behavior: open on initial load and close via cross button.
document.addEventListener('DOMContentLoaded', function () {
	var signupModal = document.getElementById('signupModal');
	var signupBackdrop = document.getElementById('signupBackdrop');
	var closeButton = document.querySelector('.btn-close-modal');

	if (!signupModal || !signupBackdrop || !closeButton) {
		return;
	}

	function openSignupModal() {
		signupModal.style.display = 'block';
		signupModal.classList.add('show');
		signupModal.setAttribute('aria-hidden', 'false');
		signupBackdrop.classList.add('show');
		document.body.classList.add('modal-open');
	}

	function closeSignupModal() {
		signupModal.classList.remove('show');
		signupModal.style.display = 'none';
		signupModal.setAttribute('aria-hidden', 'true');
		signupBackdrop.classList.remove('show');
		document.body.classList.remove('modal-open');
	}

	openSignupModal();

	closeButton.addEventListener('click', function () {
		closeSignupModal();
	});

	signupBackdrop.addEventListener('click', function () {
		closeSignupModal();
	});
});

