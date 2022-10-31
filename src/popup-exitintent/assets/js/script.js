// async function initExitIntent({
//   popup = "",
//   closeButton = "",
//   activeClass = "",
//   timesToShow = 1,
//   oneTime = true,
//   startDelay = 0,
//   mouseleave = {
//     active: false,
//     breakpoint: [769],
//   },
//   scrollSpeed = {
//     active: false,
//     breakpoint: [0, 768],
//   },
//   userInactive = {
//     active: false,
//     maxIdleTime: 10000,
//     breakpoint: [0, 768],
//   },
// }) {
//   await delay(startDelay);
//   let timesCounter: number = 0;
//   const html: HTMLElement = document.querySelector("html");
//   const deviceWidth: number = html.offsetWidth;
//   function setTimes(counter: number) {
//     timesCounter = counter;
//   }
//   if (handleBreakpoints(scrollSpeed)) {
//     setEvents("scroll", initScrollSpeed);
//   }
//   if (handleBreakpoints(mouseleave)) {
//     setEvents("mouseleave", initMouseleave);
//   }
//   let removeEvent: any;
//   function setEvents(name = "", fn = () => {}) {
//     html.addEventListener(name, fn);
//     removeEvent = () => {
//       let mustRemove = timesCounter >= timesToShow;
//       if (mustRemove) {
//         html.addEventListener(name, fn);
//       } else {
//         setTimes(timesCounter + 1);
//       }
//       return mustRemove;
//     };
//   }
//   if (handleBreakpoints(userInactive)) {
//     initUserInactive({
//       userInactive: { ...userInactive },
//       popup: popup,
//       oneTime: oneTime,
//       activeClass: activeClass,
//     });
//   }
//   const $closeButton = document.querySelector(closeButton);
//   $closeButton.addEventListener("click", hidePopup);
//   const $popup: HTMLElement = document.querySelector(popup);
//   if (!activeClass) $popup.style.display = "none";
//   function showPopup(): void {
//     if (!activeClass) $(popup).show();
//     else $(popup).addClass(activeClass);
//   }
//   function hidePopup(): void {
//     if (!activeClass) $(popup).hide();
//     else $(popup).removeClass(activeClass);
//   }
//   function initMouseleave(e): void {
//     var cordenadas = {
//       top: e.clientY,
//       left: e.clientX,
//       deviceWidth: deviceWidth,
//     };
//     if (
//       cordenadas.top < 0 ||
//       cordenadas.left < 0 ||
//       cordenadas.left > cordenadas.deviceWidth
//     ) {
//       if (!removeEvent()) {
//         showPopup();
//       };
//     }
//   }
//   async function initScrollSpeed(): Promise<void> {
//     var lastPosition = window.scrollY;
//     var speed = 320;
//     setTimeout(() => {
//       var newPosition = window.scrollY;
//       var currentSpeed = lastPosition - newPosition;
//       if (currentSpeed > speed) {
//         if (removeEvent()) return;
//         else showPopup();
//       }
//     }, 100);
//   }
// }
// async function delay(time: number) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, time);
//   });
// }
// function handleBreakpoints(props: any) {
//   const { active: string, breakpoint: number[] } = props;
//   var result = false;
//   if (!active) return result;
//   var deviceWidth = $(document).width();
//   if (breakpoint.length === 1) {
//     result = deviceWidth >= breakpoint[0];
//   } else if (breakpoint.length === 2) {
//     var greater = deviceWidth >= breakpoint[0];
//     var less = deviceWidth <= breakpoint[1];
//     result = greater && less;
//   }
//   return result;
// }
// function initUserInactive({
//   userInactive = {},
//   popup = "",
//   oneTime = true,
//   activeClass = "active",
// }): void {
//   // set events
//   var events = ["mousemove", "mousedown", "click", "scroll", "keypress"];
//   events.forEach((event) => $(document).on(event, resetTimer));
//   function createTimeout({ maxIdleTime = 0, showPopup = "" }) {
//     return () => setTimeout(showPopup, maxIdleTime);
//   }
//   var handleTimeout = createTimeout({
//     showPopup,
//     ...userInactive,
//   });
//   var timeout = handleTimeout();
//   function resetTimer() {
//     clearTimeout(timeout);
//     timeout = handleTimeout();
//   }
//   function showPopup(): void {
//     $(popup).addClass(activeClass);
//     if (oneTime) deleteEvents(events);
//   }
//   function deleteEvents(events: string[]) {
//     events.forEach((event) => $(document).off(event, resetTimer));
//   }
// }
