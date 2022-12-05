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
  if (fromTime > toTime) $element?.remove();
}

expire({ selector: "h1", from: new Date(), to: new Date(2023, 0, 1) });
