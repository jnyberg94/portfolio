gsap.registerPlugin(ScrollTrigger);


// ======= responsive js ========= //
function mobileBreakpoint() {
  const isDesktop = window.innerWidth
  if (isDesktop > 650) {
    return true
  }
  if (isDesktop <= 650) {
    return false
  }
}

window.addEventListener('load', () => {
  const pseudoBody = document.querySelector("body")
  pseudoBody.style.visibility = "visible"
  pagesRefresher()
})

const textBreaker = new SplitType(".text", { types: "lines" })
const heroAnim = gsap.timeline({ paused: true })
let i = 0;

function pagesRefresher() {
  if (document.querySelector(".homepage")) {
    spanText(".big-text")
    homeOnLoad()
    mobileBreakpoint()
    heroScroll()
    navUpdate()
    introTextFunc()
    chipWiper()
    selectedWorks()
    myProcess()
    skewImage()
    timeChip()
    ctaBreak()
    ctaHover()
    footer()
    if(mobileBreakpoint()){
      smoothScroll(".body-wrapper", ".viewport", ".pseudo-body", 1.2)
    }
  }

  if (document.querySelector(".contact")) {
    mobileBreakpoint()
    navUpdate()
    spanText(".big-text")
    chipWiper()
    timeChip()
    footer()
    input()
    formSubmit()
    ctaHover()
    if(mobileBreakpoint()){
      smoothScroll(".body-wrapper", ".viewport", ".pseudo-body", 1.2)
    }
  }

  if (document.querySelector(".resources")) {
    mobileBreakpoint()
    spanText()
    emailSubmit()
    ctaHover()
    imgUpdate()
    spanText(".big-text")
    footer()
  }
}


function refresher() {
  mobileBreakpoint()
  chipWiper()
  //contactResponsive()

  if (document.querySelector(".homepage")) {
    navUpdate()
    textBreaker.split()
    introTextFunc()
    selectedWorks()
    skewImage()
    ctaBreak()
  }
}

var prevWidth = window.innerWidth;
var refresherTimeout;

window.addEventListener("resize", function () {
  if (prevWidth != window.innerWidth) {
    prevWidth = window.innerWidth
    clearTimeout(refresherTimeout)
    refresherTimeout = setTimeout(refresher, 200)
  }
})


// ======== barba ======== //

function delay(n) {
  n = n || 0;
  return new Promise((done) => {
    setTimeout(() => {
      done()
    }, n)
  })
}

barba.init({
  sync: true,
  transitions: [{
    name: "homeToContact",
    async leave() {
      const done = this.async()
      pageTransition()
      await delay(1000)
      done()
    },
    async afterLeave(data) {
      data.current.container.remove()
    },
    enter() {

    },
    async beforeEnter() {
      window.scrollTo(0, 0);
      pagesRefresher()
    }
  }]
})

let clickCount = 0;
function pageTransition() {
  const varName = document.querySelector(".variable-name")
  const loadingScreen = document.querySelector(".loading-screen").getBoundingClientRect()
  const lightTransition = gsap.timeline()
  // let loadingWidth = loadingScreen.width
  // let loadingLeft = loadingScreen.left
  let windowWidth = window.innerWidth
  let xEnd, xBeg, skewX, setStart


  if (document.querySelector(".homepage")) {
    if (windowWidth > 1000) {
      skewX = -8
      xBeg = "115vw"
      xEnd = "230vw"
    } else {
      skewX = -4
      xBeg = "135vw"
      xEnd = "270vw"
    }
    varName.innerText = "contact"
  } else {
    if (windowWidth > 1000) {
      skewX = 8
      xBeg = "115vw"
      xEnd = 0
      setStart = "230vw"
    } else {
      skewX = 4
      xBeg = "135vw"
      xEnd = 0
      setStart = "270vw"
    }
    varName.innerText = "home"
    lightTransition.set(".loading-screen", { x: setStart })
  }

  gsap.set(".loading-screen", { skewX: skewX })
  lightTransition.to(".loading-screen", { x: xBeg, skewX: 0, duration: 1.5, ease: "expo.inOut" })
    .set(".loading-screen", { autoAlpha: 1 }, "<")
    .set(".loading-screen", { skewX: skewX })
    .set(".page-name-container", { skewX: -skewX })
    .to(".page-name-container", { yPercent: -120, duration: 0.4, ease: "power2.inOut" })
    .to(".loading-screen", { x: xEnd, skewX: 0, delay: 0.3, duration: 1.5, ease: "expo.inOut" })
    .set(".page-name-container", { yPercent: 0 })
    .set(".loading-screen", { autoAlpha: 0 })

  clickCount++
}

// ======= onload animations ======= //
function spanText(bigLinks) {
  const links = document.querySelectorAll(bigLinks)

  links.forEach((link) => {
    const text = link.innerText.split("")

    link.innerText = "";

    text.forEach((letter) => {
      const span = document.createElement("span")
      if (letter == " ") { span.className = "space" }
      else { span.className = "letter" }
      span.innerText = letter
      link.appendChild(span)

      if (document.querySelector(".homepage")) {
        gsap.set(".hero .letter", { opacity: 0, yPercent: 150 })
      }
    })
  })
}

function homeOnLoad() {
  const html = document.querySelector("body")
  gsap.set(".transform-container", { yPercent: 150, opacity: 0 })

  heroAnim
    .to(".image-reveal", { width: '100%', duration: 1.2, ease: 'expo.inOut' })
    .set(".image-reveal", { right: 0 })
    .set(".silhouette", { opacity: 1 })
    .set(".background", { opacity: 1 })
    .to(".image-reveal", { width: '0%', duration: 1.2, ease: 'expo.inOut' })
    .to(".silhouette", { height: "100%", duration: 1.3, ease: 'expo.inOut' }, "<")
    .to(".background", { height: "100%", duration: 1.3, ease: 'expo.inOut' }, "<")
    .to(".hero .letter", { yPercent: 0, stagger: 0.06, opacity: 1, duration: 0.8, ease: "power3.out" }, "<+=0.5")
    .to(".transform-container", { opacity: 1, yPercent: 0, duration: 0.4 })
    .to(".transform-container", { width: "100%", duration: 0.8, ease: "expo.inOut" })

  heroAnim.play()
  let duration = heroAnim.duration() * 1000
  console.log(duration)

  if (i > 0) {
    heroAnim.progress(1)
  } else {
    setTimeout(() => {
      html.classList.remove("fixed-position")
    }, duration)
  }

  i++
}

// ======== hero scrolling animation ======== //

function heroScroll() {
  const heroScrollAnim = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "10% 0%",
      end: "120% 50%",
      scrub: 1,
      //markers: true,
    }
  })

  const letters = document.querySelectorAll(".hero .letter")

  heroScrollAnim.to(".scroll-cover", { opacity: 1 })
    .to(letters, { stagger: 0.25, backgroundPositionX: "0%", duration: 0.4, ease: "none" }, "<")
    .fromTo(".transform-container", { yPercent: 0, opacity: 1 }, { yPercent: 150, opacity: 0, ease: "expo.inOut", immediateRender: false }, "<")
}

// ======= sticky nav ======= //

function navUpdate() {
  let navHeight = gsap.getProperty(".nav-container", "height");
  let maxWidth, navAnim

  if (document.querySelector(".contact") || document.querySelector(".resources")) {
    navAnim = gsap.timeline()
  } else {
    navAnim = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "bottom 50%",
        end: "bottom 50%",
        toggleActions: "play none reverse none",
        //markers: true
      }
    })
  }

  mobileBreakpoint() ? maxWidth = "500px" : maxWidth = "100%"

  navAnim.fromTo(".nav-container", { scale: 0 }, { scale: 1, duration: 0.3, ease: "power.inOut" })
    .fromTo(".nav-container", { maxWidth: navHeight }, { maxWidth: maxWidth, duration: 0.6, ease: "expo.inOut" })
    .fromTo(".logo-text", { autoAlpha: 0, xPercent: -10 }, { autoAlpha: 1, xPercent: 0, duration: 0.3 })
    .fromTo(".link-container", { autoAlpha: 0, xPercent: -6 }, { autoAlpha: 1, xPercent: 0, duration: 0.3 }, "<+=0.2")
}

// ======== intro text animation ======== //

function introTextFunc() {
  const introText = gsap.timeline({
    scrollTrigger: {
      trigger: ".intro-text",
      start: "top 65%",
      end: "bottom 75%",
      toggleActions: "play none none reverse",
      //markers: true,
    }
  })

  introText.from(".line", { stagger: 0.1, xPercent: -120, opacity: 0, duration: 1.2, ease: "power2.inOut" })
    .from(".small-text-col h5", { yPercent: 10, duration: 0.8, opacity: 0, ease: "power2.inOut" }, "<+=0.8")
    .from(".intro-text .chip", { stagger: 0.1, yPercent: 40, opacity: 0, duration: 0.7, ease: "power2.inOut" }, "<+=0.2")
}

// ======== chip hover effect ======== //

function chipWiper() {
  const chipWipe = document.querySelectorAll(".chip-wipe")
  const chips = document.querySelectorAll(".chip")
  const chipControllerDesktop = new AbortController
  const chipControllerMobile = new AbortController

  gsap.set(chipWipe, { xPercent: -108 })

  if (mobileBreakpoint()) {
    chipControllerMobile.abort()
    chipWipe.forEach((chip, index) => {
      chips[index].addEventListener("mouseenter", () => {
        gsap.to(chip, { xPercent: -4, duration: 1, ease: "expo.inOut" })
      }, { signal: chipControllerDesktop.signal })

      chips[index].addEventListener("mouseleave", () => {
        gsap.to(chip, { xPercent: 100, duration: 1, ease: "expo.inOut" })
        gsap.set(chip, { xPercent: -108, delay: 1 })
      }, { signal: chipControllerDesktop.signal })
    })
  } else {
    chipControllerDesktop.abort()
    chipWipe.forEach((chip, index) => {
      chips[index].addEventListener("click", () => {
        gsap.to(chip, { xPercent: -4, duration: 1, ease: "expo.inOut" })
        gsap.to(chip, { xPercent: 100, delay: 1.2, duration: 1, ease: "expo.inOut" })
        gsap.set(chip, { xPercent: -108, delay: 2.2 })
      })
    }, { signal: chipControllerMobile.signal })
  }
}


// ========= selected works js ======== //
function selectedWorks() {
  const cursor = document.querySelectorAll(".live-site")
  var posX = 0, posY = 0;
  var mouseX = 0, mouseY = 0;

  gsap.to({}, 0.016, {
    repeat: -1,
    onRepeat: function () {
      posX += (mouseX - posX) / 6
      posY += (mouseY - posY) / 6

      gsap.set(cursor, {
        css: {
          left: posX,
          top: posY,
        }
      })
    }
  });

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY
  })


  const pictureWrapper = document.querySelectorAll(".picture-wrapper")
  const cursorText = document.querySelectorAll(".live-text")
  const cursorIcon = document.querySelectorAll(".new-tab")
  let clickController = new AbortController

  gsap.set(cursorText, { autoAlpha: 0, xPercent: -6 })
  gsap.set(cursorIcon, { autoAlpha: 0, xPercent: -6 })
  gsap.set(cursor, { xPercent: -50, yPercent: -50 })

  const squaredAnim = gsap.timeline({ paused: true })
  const bubblAnim = gsap.timeline({ paused: true })
  let proj;
  for (let i = 0; i <= 1; i++) {
    if (i == 0) { proj = squaredAnim }
    else { proj = bubblAnim }
    proj.fromTo(cursor[i], { scale: 0 }, { scale: 1, duration: 0.6, ease: 'expo.inOut' }, "<+=0.4")
      .from(cursor[i], { width: 0, duration: 0.8, ease: 'expo.inOut' }, "<+=0.1")
      .to(cursorText[i], { autoAlpha: 1, xPercent: 0, duration: 0.2, immediateRender: false })
      .to(cursorIcon[i], { autoAlpha: 1, xPercent: 0, duration: 0.2 }, "<+=0.1")
  }

  pictureWrapper.forEach((picture, index) => {
    picture.addEventListener("mouseover", () => {
      if (!index) { squaredAnim.play() }
      else { bubblAnim.play() }
    })
    picture.addEventListener('mouseout', () => {
      if (!index) { squaredAnim.reverse() }
      else { bubblAnim.reverse() }
    })
    picture.addEventListener("click", () => {
      if (!index) { window.open("https://squared.kolejain.com", "_blank") }
      else { window.open("https://bubbl.kolejain.com", "_blank") }
    }, { signal: clickController.signal })
  })

  const displayImages = document.querySelectorAll(".display-image")
  const swipeContainer = document.querySelector(".swipe-container")
  let controller1 = new AbortController

  function checkSlider() {
    const halfWidth = window.innerWidth / 2
    if (!mobileBreakpoint()) {
      clickController.abort() //controller from above, using if statement instead of making new one
      displayImages.forEach((image, index) => {
        image.addEventListener('click', () => {
          if (!image.classList.contains("active")) {
            let leftSlide;
            index ? leftSlide = 200 : leftSlide = 0
            swipeContainer.scroll({
              left: leftSlide,
              top: 0,
              behavior: "smooth"
            })
          }
        }, { signal: controller1.signal })
      })

      setInterval(() => {
        if (document.querySelector(".homepage")) {
          let mobileSliderLocation = document.querySelector(".mobile-sliding-text").getBoundingClientRect().right
          if (mobileSliderLocation >= halfWidth) { //squared
            callSwitch(0, 1)
          }
          if (mobileSliderLocation <= halfWidth) { //bubbl
            callSwitch(1, 0)
          }
        }
      }, 500)
    }
    if (mobileBreakpoint()) {
      controller1.abort() //new
    }
  }
  checkSlider()

  function callSwitch(inactive, active) {
    displayImages[active].classList.remove('active')
    pictureWrapper[active].style.zIndex = "2"

    displayImages[inactive].classList.add("active")
    pictureWrapper[inactive].style.zIndex = "3"
  }
}


// ========= process click handler ======== //
function myProcess() {
  const steps = document.querySelectorAll(".step")
  const collapseGrid = document.querySelectorAll(".collapse-grid")
  const headers = document.querySelectorAll(".header")

  steps.forEach((step, index) => {
    let clickCounter = 0
    step.addEventListener("click", () => {
      clickCounter++
      if (headers[index].classList.contains("header-focus")) { //close sequence
        collapseGrid[index].style.gridTemplateRows = "0fr"
        headers[index].classList.remove("header-focus")
      } else { //open sequence
        collapseGrid[index].style.gridTemplateRows = "1fr"
        headers[index].classList.add("header-focus")
        for (let i = 0; i < steps.length; i++) {
          if (i != index) {
            collapseGrid[i].style.gridTemplateRows = "0fr"
            headers[i].classList.remove("header-focus")
          }
        }
      }
    })
  })
}


// ========== good design is good business ======== //
function skewImage() {
  let skewX, skewY
  const imageWarp = gsap.timeline({
    scrollTrigger: {
      trigger: ".good-design",
      start: "top 70%",
      end: "bottom 90%",
      scrub: 1,
      //markers: true
    }
  })

  gsap.set(".good-design .text-container", { yPercent: -50 })

  if (mobileBreakpoint()) {
    skewX = 20
    skewY = 7
  }
  if (!mobileBreakpoint()) {
    skewX = 12
    skewY = 4
  }

  imageWarp.to(".image-one", { skewX: -skewX, skewY: skewY })
    .to(".image-two", { skewX: skewX, skewY: -skewY }, "<")
    .to(".text-container", { yPercent: -5, opacity: 1 }, "<+=0.2")
}


// ========== time updater ========== //
function timeChip() {
  const timeSpan = document.querySelector(".time");

  const optionsTime = {
    timeZone: 'America/Edmonton',
    timeZoneName: 'short',
    hour: '2-digit',
    hour12: 'true',
    minute: 'numeric',
  };

  const formatter = new Intl.DateTimeFormat([], optionsTime);
  updateTime();
  setInterval(updateTime, 1000);

  function updateTime() {
    const dateTime = new Date();
    const formattedDateTime = formatter.format(dateTime);
    timeSpan.textContent = formattedDateTime;
  }
}


// ========= cta scroll ========= //

function ctaBreak() {

  const absMove = gsap.timeline({
    scrollTrigger: {
      trigger: ".cta",
      start: "top 50%",
      end: "bottom 70%",
      scrub: 1,
      //markers: true
    }
  })

  absMove.to(".mega-text span", { stagger: 0.1, backgroundPositionX: "0%", ease: "none" })

  if (mobileBreakpoint()) {
    gsap.killTweensOf(".headshot")
    absMove.to(".cta-btn", { top: "12%", right: "10%" }, "<")
      .to(".headshot", { bottom: "30%", left: "8%" }, "<")
  } else {
    gsap.killTweensOf(".cta-btn")
    gsap.killTweensOf(".headshot")
    gsap.set(".fade-in", { x: "-15vw", opacity: 0 })
    absMove.to(".fade-in", { stagger: 0.15, opacity: 1, x: 0 }, "<")
  }
}

function ctaHover() {
  const ctaController = new AbortController
  const ctaBtn = document.querySelector(".cta-btn")
  ctaBtn.addEventListener("mouseenter", () => {
    gsap.to(".hover-background", { xPercent: -80, yPercent: -80, duration: 0.7, ease: "expo.inOut" })
  }, { signal: ctaController.signal })

  ctaBtn.addEventListener("mouseleave", () => {
    gsap.to(".hover-background", { xPercent: -160, yPercent: -160, duration: 0.7, ease: "expo.inOut" })
    gsap.set(".hover-background", { xPercent: 0, yPercent: 0, delay: 0.7 })
  }, { signal: ctaController.signal })

  if (!mobileBreakpoint()) {
    ctaController.abort()
  }
}

// ======== async form submit ========= //
function fieldValidity() { //is already called
  const fields = document.querySelectorAll(".field")
  const errorMessage = document.querySelectorAll(".error-message")
  let isValid = true
  fields.forEach((field, index) => {
    if (!field.validity.valid) {
      errorMessage[index].classList.add('error')
      isValid = false
    } else {
      errorMessage[index].classList.remove('error')
    }
  })
  return isValid
}

function formSubmit() {
  const form = document.querySelector('form')

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (fieldValidity()) {
      fetch(form.action, {
        method: "POST",
        body: new FormData(form)
      })
        .then(response => response.json())
        .then(() => {
          window.open("contact.html", "_self")
        })
    }

  })
}

function emailSubmit() {
  const form = document.querySelector("form")
  const button = document.querySelector("button")

  form.addEventListener("submit", (e) => {
    button.disabled = true
    e.preventDefault()
    if (fieldValidity()) {
      fetch(form.action, {
        method: "POST",
        body: new FormData(form)
      })
        .then(response => response.json())
        .then(()=>{
          window.open("success.html", "_self")
        })
    } else {
      button.disabled = false
    }
  })
}

// ======= input dimming ======= //

function input() {
  const labels = document.querySelectorAll("label")
  const inputs = document.querySelectorAll(".field")

  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      if (input.value.trim() !== "") {
        labels[index].classList.add("filled");
      } else {
        labels[index].classList.remove("filled");
      }
    });
  })
}

// ========== auto image updater ========= //

function imgUpdate() {
  if(mobileBreakpoint()){
    console.log("true")
    const sideMargin = gsap.getProperty(".sign-up", "gap")
    const imgHeight = (window.innerWidth - 2 * sideMargin) * 9 / 16 + 60
    document.querySelector("#banner").style.minHeight = imgHeight + "px"
  }
  

  // The URL to your deployed Google Apps Script
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbwxK3j0_Rt9Wc36LIVvlcWUp-97UTPoEQl9tge1lO58KupnkAKrra0sGeQ9CQeKBJsIng/exec';
  // Extract the 'video' query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get('video');
  //set our hidden input to our video ID
  document.getElementById('videoId').value = videoId;
  console.log(videoId)

  // Fetch the data from Google Apps Script
  fetch(scriptUrl, {
    credentials: 'omit'
  })
    .then(response => response.json())
    .then(data => {
      const videoData = data.find(item => item.VideoID === videoId);
      if (videoData) {
        const bannerDiv = document.getElementById('banner');
        bannerDiv.innerHTML = `<img src="${videoData.ImageURL}" alt="Banner">`;
      }
    })
    .catch(error => console.error('Error fetching data:', error));

}


// ========= footer hover ======= //
function footer() {
  const footerText = document.querySelectorAll(".footer .letter")
  const footerController = new AbortController
  let fadeEffect;
  function footerHover() {
    if (mobileBreakpoint()) {
      footerText.forEach((letter) => {
        letter.addEventListener("mouseover", () => {
          gsap.set(letter, { opacity: 1, overwrite: true })
        }, { signal: footerController.signal })
        letter.addEventListener("mouseout", () => {
          fadeEffect = gsap.to(letter, { opacity: 0.5, duration: 3, ease: 'none' })
        }, { signal: footerController.signal })
      })
    }
    if (!mobileBreakpoint()) {
      footerController.abort
    }
  }
  footerHover()
}


// ========= smooth scroller ======== //

function smoothScroll(content, viewport, pseudo, smoothness) {
  const pseudoElem = document.querySelector(pseudo)

  content = gsap.utils.toArray(content)[0];
  smoothness = smoothness || 1;

  gsap.set(viewport || content.parentNode, { overflow: "hidden", position: "fixed", height: "100%", width: "100%", top: 0, left: 0, right: 0, bottom: 0 });
  gsap.set(content, { overflow: "visible", width: "100%" });

  let getProp = gsap.getProperty(content),
    setProp = gsap.quickSetter(content, "y", "px"),
    setScroll = ScrollTrigger.getScrollFunc(window),
    removeScroll = () => content.style.overflow = "visible",
    killScrub = trigger => {
      let scrub = trigger.getTween ? trigger.getTween() : gsap.getTweensOf(trigger.animation)[0]; // getTween() was added in 3.6.2
      scrub && scrub.pause();
      trigger.animation.progress(trigger.progress);
    },
    height, isProxyScrolling;

  window.refreshHeight = function () {
    height = content.clientHeight;
    content.style.overflow = "visible"
    pseudoElem.style.height = height + "px"; //document.body.style.height = height + "px";
    return height - document.documentElement.clientHeight;
  }

  ScrollTrigger.addEventListener("refresh", () => {
    removeScroll();
    requestAnimationFrame(removeScroll);
  })
  ScrollTrigger.defaults({ scroller: content });
  //ScrollTrigger.prototype.update = p => p; // works around an issue in ScrollTrigger 3.6.1 and earlier (fixed in 3.6.2, so this line could be deleted if you're using 3.6.2 or later)

  ScrollTrigger.scrollerProxy(content, {
    scrollTop(value) {
      if (arguments.length) {
        isProxyScrolling = true; // otherwise, if snapping was applied (or anything that attempted to SET the scroll proxy's scroll position), we'd set the scroll here which would then (on the next tick) update the content tween/ScrollTrigger which would try to smoothly animate to that new value, thus the scrub tween would impede the progress. So we use this flag to respond accordingly in the ScrollTrigger's onUpdate and effectively force the scrub to its end immediately.
        setProp(-value);
        setScroll(value);
        return;
      }
      return -getProp("y");
    },
    scrollHeight: () => pseudo.scrollHeight, //document.body.scrollHeight
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }
  });

  return ScrollTrigger.create({
    animation: gsap.fromTo(content, { y: 0 }, {
      y: () => document.documentElement.clientHeight - height,
      ease: "none",
      onUpdate: ScrollTrigger.update
    }),
    scroller: window,
    invalidateOnRefresh: true,
    start: 0,
    end: refreshHeight,
    refreshPriority: -999,
    scrub: smoothness,
    onUpdate: self => {
      if (isProxyScrolling) {
        killScrub(self);
        isProxyScrolling = false;
      }
    },
    onRefresh: killScrub // when the screen resizes, we just want the animation to immediately go to the appropriate spot rather than animating there, so basically kill the scrub.
  });

}







