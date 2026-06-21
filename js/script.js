const intro = document.querySelector("#intro");
const answerButton = document.querySelector("#answerCall");
const shell = document.querySelector("#siteShell");
const shouldBypassIntro = window.location.hash && intro && shell;

if (shouldBypassIntro) {
  document.body.classList.add("connected");
  intro.remove();
  shell.removeAttribute("aria-hidden");
  window.requestAnimationFrame(() => {
    document.querySelector(window.location.hash)?.scrollIntoView({ block: "start" });
  });
} else if (answerButton && intro) {
  answerButton.addEventListener("click", () => {
    intro.classList.add("connecting");
    window.setTimeout(() => {
      document.body.classList.add("connected");
      intro.classList.add("is-open");
      shell?.removeAttribute("aria-hidden");
    }, 1450);
    window.setTimeout(() => {
      intro.remove();
    }, 2600);
  });
}

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach(item => revealObserver.observe(item));

const pollRows = document.querySelectorAll(".poll-row");
pollRows.forEach(row => {
  const value = Number(row.dataset.value) || 0;
  row.style.setProperty("--value", `${value}%`);
});

const beyondSection = document.querySelector("#beyond");
const pollCards = document.querySelectorAll(".poll-card");

if (beyondSection && pollCards.length) {
  let hasScrollIntent = false;
  let isBeyondSubstantiallyVisible = false;

  const startPollAnimation = () => {
    if (!hasScrollIntent || !isBeyondSubstantiallyVisible) return;
    pollCards.forEach(card => card.classList.add("in-view"));
    pollObserver?.disconnect();
    window.removeEventListener("wheel", markScrollIntent);
    window.removeEventListener("touchmove", markScrollIntent);
    window.removeEventListener("keydown", markScrollIntentFromKey);
  };

  const markScrollIntent = () => {
    hasScrollIntent = true;
    startPollAnimation();
  };

  const markScrollIntentFromKey = event => {
    if (!["ArrowDown", "PageDown", "End", " "].includes(event.key)) return;
    markScrollIntent();
  };

  let pollObserver;

  if ("IntersectionObserver" in window) {
    pollObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          isBeyondSubstantiallyVisible = entry.isIntersecting && entry.intersectionRatio >= 0.45;
          startPollAnimation();
        });
      },
      { threshold: [0.45, 0.5] }
    );

    window.addEventListener("wheel", markScrollIntent, { passive: true });
    window.addEventListener("touchmove", markScrollIntent, { passive: true });
    window.addEventListener("keydown", markScrollIntentFromKey);
    pollObserver.observe(beyondSection);
  } else {
    isBeyondSubstantiallyVisible = true;
    window.addEventListener("wheel", markScrollIntent, { passive: true, once: true });
    window.addEventListener("touchmove", markScrollIntent, { passive: true, once: true });
    window.addEventListener("keydown", markScrollIntentFromKey);
  }
}

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav__links a[href^='#']")];
const activeObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { threshold: 0.45 }
);
sections.forEach(section => activeObserver.observe(section));

const carousel = document.querySelector("#projectCarousel");
if (carousel) {
  let isDown = false;
  let didDrag = false;
  let startX = 0;
  let scrollLeft = 0;
  let activePointerId = null;
  let activeCard = null;

  carousel.addEventListener("pointerdown", event => {
    if (event.button !== 0) return;
    isDown = true;
    didDrag = false;
    activePointerId = event.pointerId;
    activeCard = event.target.closest(".project-card");
    carousel.classList.add("dragging");
    carousel.setPointerCapture(event.pointerId);
    startX = event.clientX;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener("pointermove", event => {
    if (!isDown) return;
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 14) {
      didDrag = true;
      carousel.scrollLeft = scrollLeft - delta;
    }
  });

  carousel.addEventListener("click", event => {
    if (didDrag) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);

  const resetDrag = event => {
    isDown = false;
    carousel.classList.remove("dragging");
    if (event?.pointerId && carousel.hasPointerCapture(event.pointerId)) {
      carousel.releasePointerCapture(event.pointerId);
    }
    activePointerId = null;
    activeCard = null;
  };

  const endDrag = event => {
    if (event?.pointerId && activePointerId !== event.pointerId) return;
    const cardAtRelease = document.elementFromPoint(event.clientX, event.clientY)?.closest(".project-card");
    const isModifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    const shouldOpenCard = activeCard?.href && cardAtRelease === activeCard && !didDrag && !isModifiedClick;
    const activeCardHref = activeCard?.href;

    resetDrag(event);

    if (shouldOpenCard) {
      window.location.assign(activeCardHref);
      return;
    }

    window.setTimeout(() => {
      didDrag = false;
    }, 0);
  };

  carousel.addEventListener("pointerup", endDrag);
  carousel.addEventListener("pointercancel", resetDrag);
  carousel.addEventListener("mouseleave", resetDrag);

  document.querySelector(".carousel-arrow--prev")?.addEventListener("click", () => {
    carousel.scrollBy({ left: -carousel.clientWidth * 0.72, behavior: "smooth" });
  });

  document.querySelector(".carousel-arrow--next")?.addEventListener("click", () => {
    carousel.scrollBy({ left: carousel.clientWidth * 0.72, behavior: "smooth" });
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", event => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
