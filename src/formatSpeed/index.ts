// 500 Mega = 500
// 1 Giga = 1.000

function formatSpeed(intMega: number): string {
  function isThousand(number: number) {
    return number > 999;
  }

  function format(number: number) {
    const newNumber = isThousand(number) ? number / 1000 : number;
    const type = isThousand(number) ? "Giga" : "Mega";
    return `${newNumber} ${type}`;
  }

  return format(intMega);
}

const result = formatSpeed(100000000000000);
console.log({ result });
