function areBracketsValid(input) {
  if (typeof input !== "string") return false;
  if (!["[", "{", "("].includes(input[0])) return false;
  let isValid = true;
  let bracketCount = 0;
  for (let i = 0; i < input.length; ++i) {
    if (input[i] === "[") {
      isValid = ["[", "]", "(", "{"].includes(input[i + 1]);
      bracketCount++;
      continue;
    }
    if (input[i] === "{") {
      isValid = ["{", "}", "[", "("].includes(input[i + 1]);
      bracketCount++;
      continue;
    }
    if (input[i] === "(") {
      isValid = ["(", ")", "[", "{"].includes(input[i + 1]);
      bracketCount++;
      continue;
    }
    if (["]", "}", ")"].includes(input[i])) {
      bracketCount--;
      continue;
    }
    if (isValid === false) break;
  }
  if (bracketCount !== 0) isValid = false;
  return isValid;
}

console.log("\nCheck against the codewars examples:\n");

console.log("(){}[]   =>", areBracketsValid("(){}[]"));
console.log("([{}])   =>", areBracketsValid("([{}])"));
console.log("(}       =>", areBracketsValid("(}"));
console.log("[(])     =>", areBracketsValid("[(])"));
console.log("[({})](] =>", areBracketsValid("[({})](]"));

console.log("\nOther checks:\n");

console.log("NaN                        =>", areBracketsValid(NaN));

console.log("undefined                  =>", areBracketsValid(undefined));

console.log('""                         =>', areBracketsValid(""));

console.log("123                        =>", areBracketsValid(123));

console.log("foo                        =>", areBracketsValid("foo"));

console.log("[1,2,3]                    =>", areBracketsValid([1, 2, 3]));

console.log("[                          =>", areBracketsValid("["));

console.log("[]                         =>", areBracketsValid("[]"));

console.log("[}                         =>", areBracketsValid("[}"));

console.log("][}{)(                     =>", areBracketsValid("][}{)("));

console.log("[({})]                     =>", areBracketsValid("[({})]"));

console.log(
  "[(())(()){{{{{{[]}}}}}}]{} =>",
  areBracketsValid("[(())(()){{{{{{[]}}}}}}]{}")
);
