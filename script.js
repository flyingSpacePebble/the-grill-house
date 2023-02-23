// console.log("hello world me");

///////Make Mobile Navigation Work

// Element Definition
const btnNavEl = document.querySelector(".btn-mobile-nav"); //Mobile Menu button
const headerEl = document.querySelector(".header"); //header element

//Add eventlistner to menu button; If button clicked, add 'nav-open' to header element if not present; remove otherwise
btnNavEl.addEventListener("click", function () {
  // Toggle 'nav-open': if class not there, add it; If there, remove it
  // NOTE: don't use 'dot' here, only name of the class
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Smooth Scrolling Animation

// Select all anchor elements with links - returns a nodelist
const allLinks = document.querySelectorAll("a:link");

// For each of the elements ('link') of the nodelist, execute the funtion with the current element assigned to 'link'
// i.e. Add add eventlistener to each of the elements
allLinks.forEach(function (link) {
  // For each link, add eventlistner; When clicked on the link, listener function will execute
  link.addEventListener("click", function (e) {
    // Prevent the default operation of scrolling to the section upon anchor click
    e.preventDefault();

    // Assign the anchor's href value to the variable 'href'
    // e.g. '#meals"
    // Link represents the button you clicked on
    const href = link.getAttribute("href");

    // '#' will scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // For all other links (i.e. links that starts with # but not only #)
    if (href !== "#" && href.startsWith("#")) {
      // Good TRICK: utilize anchor's 'href' value as the id selector to select the section that corresponds to the href value
      const sectionEl = document.querySelector(href);

      // Cannot use 'scrollTo' here as we don't know which pixel to scroll to here
      // scrollIntoView will scroll the viewport to sectionEl
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile navigation upon click of the link
    // If link (element you clicked on) has 'main-nav-link' class (i.e. one of the (mobile expanded) nav links was clicked on), execute the code
    if (link.classList.contains("main-nav-link"))
      // Remove the expanded menu if present
      // NOTE: When it's outside mobile scope, below will execute but nothing will be done because 'nav-open' isn't present outside mobile scope
      // Jonas's class uses 'toggle', but that is a bug cuz it doesn't take care of the cases outside of the mobile scope
      headerEl.classList.remove("nav-open");
  });
});

///////////////////////////////////////////////////////////
// Sticky Navigation

// Element definition: section-hero
const sectionFrontEl = document.querySelector(".section-hero");

// set up a new observer object ('obs'), which observes the hero section element
const obs = new IntersectionObserver(
  function (entries) {
    // define the intersection event as 'ent'
    const ent = entries[0]; // entries is an array, now we only use the first element
    // When observer meets threshold, below will be logged in console

    // console.log(ent); // for checking in console: the intersection event is an object

    // If event's 'isIntersecting' property is false, hero section has left the viewport, sticky header will appear
    if (ent.isIntersecting === false)
      //NOTE: Add the sticky class to the body element, so all child elements could utilize 'sticky' to add new formats (for sticky nav)
      // Since we have to move the hero section margin upon adding sticky class, we have to make sure hero section format can be changed upon adding sticky, so sticky should be added to body (which includes the hero section)
      document.body.classList.add("sticky");

    // If 'isIntersecting' property is true, hero section is scrolled into (and reaching 80px height in viewport), sticky nav will be removed
    if (ent.isIntersecting === true) document.body.classList.remove("sticky");
  },
  // Below is like a condition, if met, above will be executed
  {
    // Inside the viewport
    root: null, // Usually default, set to null meaning we observe the element inside the viewport (and not in some other element)
    threshold: 0, // Event will fire as soon as section to be observed occupies 0% of the viewport (could be from up scrolling down or opposite)
    // Adding rootMargin will add more condition to the above threshold
    rootMargin: "-80px", //Event will fire exactly now as hero-section is exactly 80px (8rem, height of header) above the threshold (i.e. when hero-section has 80px left in the viewport)
  }
);

// The intersectionObserver object is now observing the section hero
// When hero section moves in/out of viewport, IntersectionObserver object will appear in console
// As the hero section moves into the viewport, 'isIntersecting' value is false; If moves out of the viewport, 'isIntersecting' value is true;
obs.observe(sectionFrontEl);

/////////////////////////////////////////////////////////////////////////////
// Menu Elements Definition (vertical tabs)

const menuTabs = document.querySelectorAll(".btn-menu"); //node list of all menu tabs
// tabs
const menuCatContainer = document.querySelector(".menu-category-container");
// tabsContainer
const menuItemContent = document.querySelectorAll(".menu-item"); //node list of all menu items (specials, snack, tacos, etc.)
// tabsContent

menuCatContainer.addEventListener("click", function (e) {
  //Set variable for clicked element
  const clicked = e.target;

  // If click happened on one of the tabs, perform below; otherwise (if click happened in container's empty space), nothing will happen
  if (clicked.classList.contains("btn-menu")) {
    //Remove active class from all tabs, add active class to the selected tab
    menuTabs.forEach((t) => t.classList.remove("btn-menu-active"));
    clicked.classList.add("btn-menu-active");

    //Change tab content accordingly, Remove active from all content first
    menuItemContent.forEach((t) => t.classList.remove("menu-item-active"));
    //Add active to the selected content
    //Select corresponding operation content element by using element.dataset.tab
    //Remember in button element there is an attribute: 'data-tab='1' (or 2, 3)
    //'data' can be refered to using .dataset, 'tab' using .tab
    //clicked.dataset.tab will return the number corresponding to the button (i.e. 1, 2, or 3)
    //Use that number to refer to the selected content to add active class to
    // console.log(clicked.dataset.tab);
    document
      .querySelector(`.menu-item-${clicked.dataset.tab}`)
      .classList.add("menu-item-active");
  }
});

///////////////////////////////////////////////////////////
// Fade In Animations Control - dynamically add 'active' class to all animated elements
// REFERENCE: https://alvarotrigo.com/blog/css-animations-scroll/

// Fade in from Left
function fadeInLeft() {
  var fadeInLeft = document.querySelectorAll(".fade-in-left");
  for (var i = 0; i < fadeInLeft.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = fadeInLeft[i].getBoundingClientRect().top;
    var elementVisible = 20;
    if (elementTop < windowHeight - elementVisible) {
      fadeInLeft[i].classList.add("active");
    } else {
      fadeInLeft[i].classList.remove("active");
    }
  }
}

// Fade in from right
function fadeInRight() {
  var fadeInRight = document.querySelectorAll(".fade-in-right");
  for (var i = 0; i < fadeInRight.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = fadeInRight[i].getBoundingClientRect().top;
    var elementVisible = 20;
    if (elementTop < windowHeight - elementVisible) {
      fadeInRight[i].classList.add("active");
    } else {
      fadeInRight[i].classList.remove("active");
    }
  }
}

// Fade in from Top
function fadeInTop() {
  var fadeInTop = document.querySelectorAll(".fade-in-top");
  for (var i = 0; i < fadeInTop.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = fadeInTop[i].getBoundingClientRect().top;
    var elementVisible = 20;
    if (elementTop < windowHeight - elementVisible) {
      fadeInTop[i].classList.add("active");
    } else {
      fadeInTop[i].classList.remove("active");
    }
  }
}

// Fade in from bottom
function fadeInBottom() {
  var fadeInBottom = document.querySelectorAll(".fade-in-bottom");
  for (var i = 0; i < fadeInBottom.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = fadeInBottom[i].getBoundingClientRect().top;
    var elementVisible = -90;
    if (elementTop < windowHeight - elementVisible) {
      fadeInBottom[i].classList.add("active");
    } else {
      fadeInBottom[i].classList.remove("active");
    }
  }
}

// Fade in only
function fadeIn() {
  var fadeIn = document.querySelectorAll(".fade-in");
  for (var i = 0; i < fadeIn.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = fadeIn[i].getBoundingClientRect().top;
    var elementVisible = 70;
    if (elementTop < windowHeight - elementVisible) {
      fadeIn[i].classList.add("active");
    } else {
      fadeIn[i].classList.remove("active");
    }
  }
}

// Scrollling Event Listener
// On scrolling, all fadeIn functions will be called
// Whichever element falls into view according to the conditions, active class is added that element, and it will appear with transition
window.addEventListener("scroll", fadeInLeft);
window.addEventListener("scroll", fadeInRight);
window.addEventListener("scroll", fadeInTop);
window.addEventListener("scroll", fadeInBottom);
window.addEventListener("scroll", fadeIn);

// To check the scroll position on page load
fadeInLeft();
fadeInRight();
fadeInTop();
fadeInBottom();
fadeIn();

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions

/* Since some Safari browsers don't support gap property for flexbox, we have to manually add the gap properties to the flexboxes in CSS */
/* Below code when executed, will add the 'no-flexbox-gap' class to body, thus triggering the 'no-flexbox-gap' class related formats to apply (all flex gap related) */

function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  // If browser doesn't support, add below class to body
  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
