interface Data {
  data: any;
  selector: string;
}

function errorMessage(elementName: string) {
  console.error(`The element '${elementName}' does not exist!`);
  return false;
}

function setHTMLData({ data = "", selector = "" }: Data): boolean {
  const strData = data?.toString();
  const elements = document.querySelectorAll(selector);

  const hasElement = Boolean(elements.length);
  if (!hasElement) return errorMessage(selector);

  elements.forEach((element: Element | any) => {
    const isInput = element.tagName === "INPUT";
    if (isInput) element.value = strData;
    else element.textContent = strData;
  });

  return true;
}

setHTMLData({
  data: "TEST",
  selector: ".testing",
});

setHTMLData({
  data: "Content",
  selector: `[name="content"]`,
});

setHTMLData({
  data: "Title",
  selector: "#title",
});

function setProduct() {
  const product1 = {
    name: "Notebook",
    productId: "100",
    price: "1590",
    quantity: "3",
  };

  const product2 = {
    name: "Cellphone",
    productId: "200",
    price: "2490",
    quantity: "5",
  };

  function setDatas(obj: any) {
    setHTMLData({ data: obj.name, selector: `.name` });
    setHTMLData({ data: obj.productId, selector: `.productId` });
    setHTMLData({ data: obj.price, selector: `.price` });
    setHTMLData({ data: obj.quantity, selector: `.quantity` });
  }

  const button1 = document.querySelector("#product1");
  const button2 = document.querySelector("#product2");

  button1?.addEventListener("click", () => setDatas(product1));
  button2?.addEventListener("click", () => setDatas(product2));
}
setProduct();

function validateInput(): void {
  const selector = `[name="name"]`;
  const errorSelector = `${selector} + p.error`;
  const name = document.querySelector(selector);

  name?.addEventListener("input", (e: any) => {
    const activeError = e.target.value.length > 5;
    const newData = activeError ? "Max length" : "";

    setHTMLData({ data: newData, selector: errorSelector });

    const $error = document.querySelector(errorSelector);
    $error?.classList[activeError ? "add" : "remove"]("active");
  });
}

const options = {
  name: {
    selector: "p",
    message: "Error Message! :/",
  },
};

validateInput();
