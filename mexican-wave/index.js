function mexicanWave(x) {
  const w = [];

  for (var i = 0; i < x.length; i++) {
    let y = x.toLowerCase();
    y = y.substring(0, i) + y.charAt(i).toUpperCase() + y.substring(i + 1);
    if (/[A-Za-z]/.test(y.charAt(i))) { w.push(y) };
  }

  return w;
}

console.log(mexicanWave("MEXICAN WAVE"));

console.log(mexicanWave("mexican wave"));

console.log(mexicanWave("mexican  ^$%@£@23   wave"));
