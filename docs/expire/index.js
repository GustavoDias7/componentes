function expire(_a) {
    var _b = _a.selector, selector = _b === void 0 ? "" : _b, _c = _a.from, from = _c === void 0 ? new Date() : _c, _d = _a.to, to = _d === void 0 ? new Date() : _d;
    var fromTime = from.getTime();
    var toTime = to.getTime();
    var $element = document.querySelector(selector);
    if (fromTime > toTime)
        $element === null || $element === void 0 ? void 0 : $element.remove();
}
expire({ selector: "h1", from: new Date(), to: new Date(2023, 0, 1) });
