function counter() {
  let counter = 0;

  function add() {
    counter += 1;
  }

  function getCounter() {
    return counter;
  }

  return {
    add,
    getCounter,
  };
}

// const myCounter = counter();
// console.log(myCounter.getCounter());
// myCounter.add();
// console.log(myCounter.getCounter());

function validate(value) {
  const isNumber = typeof value === "number";

  try {
    if (isNumber) return true;
    else throw new Error("Not a number!");
  } catch (err) {
    console.error(err);
    return false;
  }
}

function setDate({ data = "", selector = "" }) {}
setDate({});
