function smallest(number) {
  const num = String(number).split("");
  const sortAndRetainIndex = num
    .map((num, index) => {
      return [num, index];
    })
    .sort(function (a, b) {
      return a[0] - b[0];
    });
  num.splice(sortAndRetainIndex[0][1], 1);
  num.unshift(sortAndRetainIndex[0][0]);
  return [Number(num.join("")), sortAndRetainIndex[0][1], 0 ]
}

console.log(smallest(652));
