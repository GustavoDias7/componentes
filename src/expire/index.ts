interface Options {
  selector: string;
  from: Date;
  to: Date;
}

function expire({
  selector = "",
  from = new Date(),
  to = new Date(),
}: Options) {
  const fromTime = from.getTime();
  const toTime = to.getTime();
  const $element = document.querySelector(selector);
  if ($element && $element instanceof HTMLElement) {
    if (fromTime > toTime) $element.remove();
    else $element.style.display = "block";
  }
}

expire({ selector: "h1", from: new Date(), to: new Date(2023, 0, 1) });
