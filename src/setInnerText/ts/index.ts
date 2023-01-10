interface Data {
  innerText: string | number;
  selector: string;
}

function errorMessage(elementName: string) {
  console.error(`The element '${elementName}' does not exist!`);
  return false;
}

function setInnerText({ innerText = "", selector = "" }: Data): boolean {
  const strData = innerText?.toString();
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

setInnerText({
  innerText: "TEST",
  selector: ".testing",
});

setInnerText({
  innerText: "Content",
  selector: `[name="content"]`,
});

setInnerText({
  innerText: "Title",
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
    setInnerText({ innerText: obj.name, selector: `.name` });
    setInnerText({ innerText: obj.productId, selector: `.productId` });
    setInnerText({ innerText: obj.price, selector: `.price` });
    setInnerText({ innerText: obj.quantity, selector: `.quantity` });
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

    setInnerText({ innerText: newData, selector: errorSelector });

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
