const $modals = document.querySelectorAll(".modal");
// $modals.forEach((modal) => {
//   const modalInit = initModal({
//     selector: `#${modal?.id}`,
//   });
//   if (modalInit.open && modal?.id === "modal2") modalInit.open();
// });

// const modalInit = initModal({ selector: `#modalTest` });
// if (!modalInit?.hasModal()) console.log(modalInit.message);

const modal1 = initModal({
  selector: "#modal1",
});

const modal2 = initModal({
  selector: "#modal2",
});
modal2.open && modal2.open();

const modalCallback = initModal({
  selector: `#modal3`,
  beforeOpen: (): void => {
    console.log("before open callback");
  },
  afterOpen: (): void => {
    console.log("after open callback");
  },
  beforeClose: (): void => {
    console.log("before close callback");
  },
  afterClose: (): void => {
    console.log("after close callback");
  },
});
