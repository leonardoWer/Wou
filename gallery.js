const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const viewer = document.querySelector(".gallery-viewer");
const viewerImage = viewer.querySelector("img");
const viewerCaption = viewer.querySelector("#viewer-caption");

viewer.addEventListener("click", event => {
  if (event.target === viewer) viewer.close();
});
viewer.addEventListener("close", () => {
  viewerImage.removeAttribute("src");
  viewerImage.alt = "";
});

document.querySelectorAll("[data-gallery]").forEach(group => {
  const track = group.querySelector(".gallery-track");
  const slides = [...track.children];
  const previous = group.querySelector("[data-prev]");
  const next = group.querySelector("[data-next]");

  function update() {
    const max = track.scrollWidth - track.clientWidth;
    group.classList.toggle("gallery-scrolls", max > 2);
    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max - 2;
  }

  function move(direction) {
    const step = slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth;
    track.scrollBy({ left: direction * step, behavior: reduceMotion.matches ? "instant" : "smooth" });
  }

  previous.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));
  track.addEventListener("scroll", update, { passive: true });
  track.addEventListener("keydown", event => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    move(event.key === "ArrowLeft" ? -1 : 1);
  });
  new ResizeObserver(update).observe(track);
  previous.hidden = false;
  next.hidden = false;

  slides.forEach(slide => {
    const link = slide.querySelector(".gallery-image");
    link.addEventListener("click", event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const caption = slide.querySelector("figcaption").textContent;
      viewerImage.src = link.href;
      viewerImage.alt = caption;
      viewerCaption.textContent = caption;
      viewer.showModal();
    });
  });
  update();
});
