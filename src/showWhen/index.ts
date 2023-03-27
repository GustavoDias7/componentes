interface DateRange {
  from: Date;
  to: Date;
}

interface Option {
  dates: DateRange[];
}

function showWhen({ dates }: Option): boolean {
  const now = new Date().getTime();

  const isShow = dates.some((date) => {
    return now >= date.from.getTime() && now <= date.to.getTime();
  });

  return isShow;
}

const showToday = showWhen({
  dates: [
    {
      from: new Date("February 07, 2023 00:00:00"),
      to: new Date("February 07, 2023 23:59:59"),
    },
    {
      from: new Date("February 09, 2023 00:00:00"),
      to: new Date("February 10, 2023 23:59:59"),
    },
  ],
});

console.log({ showToday });
