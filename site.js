const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const wheelLayout = matchMedia("(min-width: 801px) and (min-height: 650px)");
const wideLayout = matchMedia("(min-width: 801px)");
const hero = document.querySelector("[data-hero]");
const heroPhone = hero.querySelector(".phone");
const launchCover = hero.querySelector(".launch-cover");
const manifesto = document.querySelector("[data-manifesto]");
const manifestoBrand = manifesto.querySelector(".manifesto-brand");
const manifestoLine = manifesto.querySelector(".manifesto-line");
const manifestoOpening = manifestoLine.textContent;
const manifestoClosing = "Рекорды начинаются здесь";
const combo = document.querySelector("[data-combo]");
const comboStage = combo.querySelector(".combo-stage");
const comboCanvas = combo.querySelector("canvas");
const comboContext = comboCanvas.getContext("2d");
const comboCards = [...combo.querySelectorAll(".combo-cards article")];
const navMenu = document.querySelector(".nav-menu");
const trainingMenu = document.querySelector(".training-menu");
const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sectionIds = new Set(sectionLinks.map(link => link.hash));
const sections = [...document.querySelectorAll("[id]")].filter(section => sectionIds.has("#" + section.id));
const clamp = value => Math.max(0, Math.min(value, 1));

const headings = [...document.querySelectorAll("[data-words]")].map(heading => {
  const text = heading.textContent;
  heading.setAttribute("aria-label", text);
  const words = text.split(/\s+/).map(word => {
    const span = document.createElement("span");
    span.textContent = word;
    span.setAttribute("aria-hidden", "true");
    return span;
  });
  heading.replaceChildren(...words.flatMap((word, index) => index ? [" ", word] : [word]));
  return { heading, words };
});

const decks = [...document.querySelectorAll("[data-deck]")].map(scene => {
  const panel = scene.querySelector(".deck-panel");
  const slides = [...panel.querySelectorAll("[data-slide]")];
  const phones = [...panel.querySelectorAll(".progress-stage figure")];
  const buttons = [...panel.querySelectorAll("[data-slide-go]")];
  const last = slides.length - 1;
  const top = 96;
  let active = -1;
  let distance = 0;

  const start = () => scene.getBoundingClientRect().top + window.scrollY - top;

  function select(index) {
    if (active === index) return;
    active = index;
    scene.style.setProperty("--slide", index);
    slides.forEach((slide, position) => {
      slide.toggleAttribute("data-selected", position === index);
      if (!phones.length) slide.inert = position !== index;
    });
    phones.forEach((phone, position) => {
      phone.toggleAttribute("data-selected", position === index);
      phone.setAttribute("aria-hidden", position !== index);
    });
    buttons.forEach((button, position) => button.setAttribute("aria-pressed", position === index));
  }

  function go(index) {
    select(index);
    window.scrollTo({ top: start() + index * distance / last, behavior: "instant" });
    schedule();
  }

  function configure(enabled) {
    scene.classList.toggle("deck-active", enabled);
    buttons.forEach(button => { button.disabled = !enabled; });
    if (enabled) {
      distance = Math.max(320, Math.round(window.innerHeight * .56));
      scene.style.setProperty("--deck-distance", distance + "px");
      scene.style.setProperty("--deck-panel-height", panel.offsetHeight + "px");
    } else {
      active = -1;
      slides.forEach(slide => { slide.inert = false; slide.removeAttribute("data-selected"); });
      phones.forEach(phone => { phone.removeAttribute("aria-hidden"); phone.removeAttribute("data-selected"); });
      buttons.forEach(button => button.removeAttribute("aria-pressed"));
    }
  }

  buttons.forEach((button, index) => button.addEventListener("click", () => go(index)));

  return {
    configure,
    sync() {
      select(Math.round(clamp((window.scrollY - start()) / distance) * last));
    },
    wheel(delta, locked) {
      const y = window.scrollY;
      const first = start();
      const end = first + distance;
      if (y < first - 2 && y + delta >= first) { go(0); return true; }
      if (y > end + 2 && y + delta <= end) { go(last); return true; }
      if (y < first - 2 || y > end + 2) return false;
      if (locked) return true;
      const direction = Math.sign(delta);
      if (direction > 0 && y >= end - 2 || direction < 0 && y <= first + 2) return false;
      go(Math.min(last, Math.max(0, active + direction)));
      return true;
    }
  };
});

let frame = 0;
let wheelTime = -Infinity;
let wheelDirection = 0;
const decksEnabled = () => wheelLayout.matches && !reduceMotion.matches;

function handleWheel(event) {
  if (!decksEnabled() || !event.cancelable || event.ctrlKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
  const delta = event.deltaY * (event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? window.innerHeight : 1);
  if (!delta) return;
  const direction = Math.sign(delta);
  const locked = direction === wheelDirection && event.timeStamp - wheelTime < 160;
  if (decks.some(deck => deck.wheel(delta, locked))) {
    event.preventDefault();
    wheelTime = event.timeStamp;
    wheelDirection = direction;
  }
}

function updateNavigation() {
  const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  const section = atEnd ? sections.at(-1) : sections.findLast(item => item.getBoundingClientRect().top < 145);
  const hash = section ? "#" + section.id : "";
  sectionLinks.forEach(link => {
    if (link.hash === hash) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  trainingMenu.toggleAttribute("data-current", !!trainingMenu.querySelector("[aria-current]"));
  navMenu.toggleAttribute("data-current", !!section);
  const activeLink = sectionLinks.find(link => link.hash === hash);
  navMenu.querySelector("summary").setAttribute("aria-label", activeLink ? "Разделы. Сейчас: " + activeLink.textContent : "Разделы");
}

// A web rendering of the striped WaveBackground from the Android Combo screen.
function updateCombo(animate) {
  const bounds = combo.getBoundingClientRect();
  if (bounds.top > window.innerHeight || bounds.bottom < 0) return;
  const padding = comboStage.offsetHeight < combo.offsetHeight
    ? parseFloat(getComputedStyle(combo).paddingTop) : 0;
  const travel = Math.max(1, bounds.height - padding - comboStage.offsetHeight);
  const progress = animate ? clamp((96 - bounds.top - padding) / travel) : 1;
  const visibility = clamp(progress / .4);
  combo.style.setProperty("--wave-visible", visibility);
  combo.style.setProperty("--combo-ink", visibility > .62 ? "#fff" : "#121318");
  comboCards.forEach((card, index) => {
    card.style.setProperty("--haze-in", clamp((progress - .27 - index * .14) / .24));
  });

  if (!comboContext) return;
  const width = Math.min(1120, comboStage.clientWidth);
  const height = Math.min(760, comboStage.clientHeight);
  if (!width || !height) return;
  if (comboCanvas.width !== width || comboCanvas.height !== height) {
    comboCanvas.width = width;
    comboCanvas.height = height;
  }
  const count = width > 600 ? 40 : width > 400 ? 30 : 22;
  const phase = progress * Math.PI * 2;
  const base = [41, 98, 255];
  const wave = [244, 67, 54];
  const strength = clamp((progress - .72) / .28) * .3;
  const mix = (a, b, value) => `rgb(${a.map((channel, i) => Math.round(channel + (b[i] - channel) * value)).join(" ")})`;
  const background = mix(base, wave, strength);
  const crest = mix(wave, base, strength);
  const middle = mix(wave, base, .29 + strength * .35);

  for (let column = 0; column < count; column++) {
    const x = Math.round(column * width / count);
    const nextX = Math.round((column + 1) * width / count);
    const pulse = Math.sin(phase + column * .3) + .5 * Math.sin(phase * 1.66 + column * .8);
    const position = Math.min(.61, Math.max(.015, (1.8 - pulse) / 6));
    const gradient = comboContext.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, background);
    gradient.addColorStop(position, crest);
    gradient.addColorStop(position + .125, middle);
    gradient.addColorStop(position + .375, background);
    gradient.addColorStop(1, background);
    comboContext.fillStyle = gradient;
    comboContext.fillRect(x, 0, nextX - x, height);
  }
}

function update() {
  frame = 0;
  updateNavigation();
  updateCombo(decksEnabled());
  if (decksEnabled()) decks.forEach(deck => deck.sync());

  if (reduceMotion.matches) {
    [heroPhone, launchCover, manifestoBrand].forEach(element => element.removeAttribute("style"));
    manifestoLine.textContent = manifestoOpening;
    headings.forEach(({ words }) => words.forEach(word => word.removeAttribute("style")));
    return;
  }

  const viewport = window.innerHeight;
  const reveal = clamp((132 - hero.getBoundingClientRect().top) / (viewport * .58));
  heroPhone.style.transform = `rotateX(${32 * (1 - reveal)}deg) translateY(${-20 * (1 - reveal)}px) scale(${.9 + reveal * .1})`;
  launchCover.style.opacity = 1 - clamp((reveal - .12) / .52);

  headings.forEach(({ heading, words }) => {
    const progress = clamp((viewport * .87 - heading.getBoundingClientRect().top) / (viewport * .4));
    words.forEach((word, index) => {
      word.style.opacity = .63 + .37 * clamp(progress * 1.8 - index / words.length * .8);
    });
  });

  const progress = clamp((viewport * .55 - manifesto.getBoundingClientRect().top) / (viewport * .92));
  const brandTravel = wideLayout.matches ? Math.max(0, manifestoLine.offsetLeft - manifestoBrand.offsetLeft - manifestoBrand.offsetWidth - 36) : 0;
  manifestoBrand.style.transform = `translateX(${brandTravel * clamp(progress / .7)}px)`;
  const erase = clamp((progress - .28) / .28);
  const type = clamp((progress - .57) / .36);
  const line = erase < 1
    ? manifestoOpening.slice(0, Math.round(manifestoOpening.length * (1 - erase)))
    : manifestoClosing.slice(0, Math.round(manifestoClosing.length * type));
  if (manifestoLine.textContent !== line) manifestoLine.textContent = line;
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(update);
}

function configure() {
  document.documentElement.classList.toggle("motion", !reduceMotion.matches);
  decks.forEach(deck => deck.configure(decksEnabled()));
  schedule();
}

sectionLinks.forEach(link => link.addEventListener("click", () => {
  navMenu.open = false;
  trainingMenu.open = false;
}));
document.addEventListener("click", event => {
  if (!trainingMenu.contains(event.target)) trainingMenu.open = false;
  if (!event.target.closest(".nav")) navMenu.open = false;
});
document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  const menu = trainingMenu.open ? trainingMenu : navMenu.open ? navMenu : null;
  if (menu) {
    menu.open = false;
    menu.querySelector("summary").focus();
  }
});

window.addEventListener("wheel", handleWheel, { passive: false });
window.addEventListener("scroll", schedule, { passive: true });
window.addEventListener("resize", configure);
reduceMotion.addEventListener("change", configure);
document.fonts.ready.then(schedule);
configure();
update();

// Original gh-pages phone composition and ScrollTrigger timeline.
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
    const cascade = document.querySelector("[data-cascade]");
    const phones = [...cascade.querySelectorAll(".vertical-phone__wrapper")];
    cascade.classList.add("original-cascade");
    const timeline = gsap.timeline({
      scrollTrigger: { trigger: cascade, start: "20% 80%", end: "bottom+=10% bottom", scrub: .5 }
    });
    phones.forEach((phone, index) => {
      const offset = index * 5;
      const angle = (5 - (index + 1)) * 1.5;
      phone.style.zIndex = phones.length - index;
      phone.style.top = (index * 35) + "vh";
      phone.style.transform = `perspective(1000px) rotateX(${40 + offset}deg) rotateY(${-4 - offset / 2}deg) rotateZ(${40 - offset}deg)`;
      timeline.to(phone, {
        y: `${-offset * 2.5}vh`,
        rotateX: `+=${angle - offset}`,
        rotateY: `+=${angle + offset}`,
        rotateZ: `+=${-angle - offset / 2}`
      }, "<");
    });
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    return () => {
      cascade.classList.remove("original-cascade");
      phones.forEach(phone => phone.removeAttribute("style"));
    };
  });
}
