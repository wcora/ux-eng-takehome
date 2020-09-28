const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getFormattedDateString = (dateString: string) => {
  const d = new Date(dateString);
  return `${months[d.getMonth()]} ${d.getDate()} ${d.getHours()}:00`;
};

export const getFutureDate = (dateString: string) => {
  const d = new Date(dateString);
  const today = new Date("2144-03-31T00:00:00.000Z");
  const diff = (d.getTime() - today.getTime()) / (3600*1000*24);
  return `in ${diff.toFixed(0)} day(s)`;
};


export const getDifference = (dateString: string) => {
  const d = new Date(dateString);
  const today = new Date("2144-03-31T00:00:00.000Z"); // in reality, this can be handled by diff between start time and current time
  let diff = (d.getTime() - today.getTime()) / (3600*1000*24);
  /* Reverse Scaling Model - sigmoid function
     I plan to show the events in the nearest future with high opacity & events in further future with low opacity

     a reverse sigmoid function 1/(1+e^x) scales number between -5 to 5 into a range of roughly 1-0
     Obviously, we can't leave opacity to be near 0. ideally, the range of opacity should lie between 0.5 - 1
     Thus, it is really convenient in our case to use a sigmoid function with a small amount of transformation.

     Transformation needs to adjust according to input range.
     In our case, when x = (input date - 4) * 1.5,  it scales to our dataset the best.

     In reality, there are quite a few packages that allow us to do such a conversion.
     The reason I made the calculation manually is just a sigmoid performs pretty ideal here!
  */
  diff = 1/(1+Math.exp(diff - 4) * 1.5);
  diff = Math.max(0.3, Math.min(diff, 1)); // to bound the output in case an event is 5 days or later in the future
  return diff;
}

export const scrollTo = (id: string) => {
  const target = document.querySelector(`div[data-name=${id}]`) || null;
  if (target) {
    target.scrollIntoView({behavior: 'smooth'});
  }
}
