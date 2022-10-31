// interface Modal {
//   modalContainer: string;
//   btnToActiveModal: string;
//   btnToCloseModal: string;
//   activeModalOnLoad?: boolean | undefined;
//   activeModalOnTrigger: {
//     enable: boolean;
//     elements: {
//       trigger: string;
//       target: string;
//     };
//     eventListener: string;
//   };
//   inactiveUser: { enable: boolean; maxIdleTime: number };
//   activeClass: string;
// }
// function initModal({
//   modalContainer = "",
//   btnToActiveModal = "",
//   btnToCloseModal = "",
//   activeModalOnLoad = false,
//   activeModalOnTrigger = {
//     enable: false,
//     elements: {
//       trigger: "",
//       target: "",
//     },
//     eventListener: "click",
//   },
//   inactiveUser = { enable: false, maxIdleTime: 1000 },
//   activeClass = "active",
// }): void {
//   const $btnToActiveModal = document.querySelectorAll(btnToActiveModal);
//   if (!$btnToActiveModal) return;
//   $btnToActiveModal.forEach((event: EventTarget) => {
//     event.addEventListener("click", toggleModal);
//   });
//   const $modalContainer = document.querySelector(modalContainer);
//   if (!$modalContainer) return;
//   $modalContainer.addEventListener("click", toggleModal);
//   const $btnToCloseModal = document.querySelector(btnToCloseModal);
//   if (!$btnToCloseModal) return;
//   $btnToCloseModal.addEventListener("click", toggleModal);
//   function toggleModal(event: Event) {
//     event.preventDefault();
//     if (event.target !== event.currentTarget) return;
//     $modalContainer?.classList.toggle(activeClass);
//   }
//   if (activeModalOnLoad) {
//     $modalContainer.classList.add(activeClass);
//   }
//   if (activeModalOnTrigger.enable) {
//     const $modalTrigger = document.querySelector(
//       activeModalOnTrigger.elements.trigger
//     );
//     const $modalTarget = document.querySelector(
//       activeModalOnTrigger.elements.target
//     );
//     if ($modalTrigger && $modalTarget) {
//       const eventName = activeModalOnTrigger.eventListener;
//       $modalTrigger.addEventListener(eventName, (event) => {
//         if (event.target === event.currentTarget) {
//           $modalTarget.classList.add(activeClass);
//         }
//       });
//     }
//   }
//   if (inactiveUser.enable) {
//     function displayPopup() {
//       $modalContainer?.classList.add(activeClass);
//     }
//     let timeout = setTimeout(displayPopup, inactiveUser.maxIdleTime);
//     function resetTimer() {
//       clearTimeout(timeout);
//       timeout = setTimeout(displayPopup, inactiveUser.maxIdleTime);
//     }
//     const events = ["mousemove", "mouseDown", "click", "scroll", "keypress"];
//     events.forEach((event) => window.addEventListener(event, resetTimer));
//   }
// }
// initModal({
//   modalContainer: "[data-modal-container]",
//   btnToActiveModal: "[data-modal-active]",
//   btnToCloseModal: "[data-modal-close]",
//   inactiveUser: { enable: true, maxIdleTime: 2000 },
// });
// // initModal({
// //   modalContainer: "#modal2",
// //   btnToActiveModal: "#close1",
// //   btnToCloseModal: "#close2",
// //   activeModalOnLoad: true,
// //   activeModalOnTrigger: {
// //     enable: true,
// //     elements: {
// //       trigger: "#modal1",
// //       target: "#modal2",
// //     },
// //     eventListener: "click",
// //   },
// // });
