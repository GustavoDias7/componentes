function errorMessage(elementName) {
    console.error("The element '".concat(elementName, "' does not exist!"));
    return false;
}
function setInnerText(_a) {
    var _b = _a.data, data = _b === void 0 ? "" : _b, _c = _a.selector, selector = _c === void 0 ? "" : _c;
    var strData = data === null || data === void 0 ? void 0 : data.toString();
    var elements = document.querySelectorAll(selector);
    var hasElement = Boolean(elements.length);
    if (!hasElement)
        return errorMessage(selector);
    elements.forEach(function (element) {
        var isInput = element.tagName === "INPUT";
        if (isInput)
            element.value = strData;
        else
            element.textContent = strData;
    });
    return true;
}
setInnerText({
    data: "TEST",
    selector: ".testing"
});
setInnerText({
    data: "Content",
    selector: "[name=\"content\"]"
});
setInnerText({
    data: "Title",
    selector: "#title"
});
function setProduct() {
    var product1 = {
        name: "Notebook",
        productId: "100",
        price: "1590",
        quantity: "3"
    };
    var product2 = {
        name: "Cellphone",
        productId: "200",
        price: "2490",
        quantity: "5"
    };
    function setDatas(obj) {
        setInnerText({ data: obj.name, selector: ".name" });
        setInnerText({ data: obj.productId, selector: ".productId" });
        setInnerText({ data: obj.price, selector: ".price" });
        setInnerText({ data: obj.quantity, selector: ".quantity" });
    }
    var button1 = document.querySelector("#product1");
    var button2 = document.querySelector("#product2");
    button1 === null || button1 === void 0 ? void 0 : button1.addEventListener("click", function () { return setDatas(product1); });
    button2 === null || button2 === void 0 ? void 0 : button2.addEventListener("click", function () { return setDatas(product2); });
}
setProduct();
function validateInput() {
    var selector = "[name=\"name\"]";
    var errorSelector = "".concat(selector, " + p.error");
    var name = document.querySelector(selector);
    name === null || name === void 0 ? void 0 : name.addEventListener("input", function (e) {
        var activeError = e.target.value.length > 5;
        var newData = activeError ? "Max length" : "";
        setInnerText({ data: newData, selector: errorSelector });
        var $error = document.querySelector(errorSelector);
        $error === null || $error === void 0 ? void 0 : $error.classList[activeError ? "add" : "remove"]("active");
    });
}
var options = {
    name: {
        selector: "p",
        message: "Error Message! :/"
    }
};
validateInput();
