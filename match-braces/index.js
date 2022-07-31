/**
 * Kata - Valid Braces
 * https://www.codewars.com/kata/5277c8a221e209d3f6000b56
 */

/**
 * Define some basic validity arrays for each bracket type.
 * These are used to check the _next_ bracket, not the current one
 * So, note the first two values for each - they are the close AND the end for
 * that bracket type. The other bracket types are only ever the _opening_ type.
 *
 * Note: The order of items in these arrays is irrelevant, I just put the open/close
 * for each bracket type first as a cognitive indicator.
 */
const validSquareBrackets = ["[", "]", "(", "{"];
const validRoundBrackets = ["(", ")", "[", "{"];
const validCurlyBrackets = ["{", "}", "[", "("];

/**
 * Define valid start brackets
 */
const validStartBrackets = ["[", "{", "("];

/**
 * @param {*} input
 * @returns boolean
 */
function areBracketsValid(input) {
  /**
   * Some super basic checks - is it a string, is it empty?
   * I bail early here.
   * I also don't _combine_ the checks into one if statement with an OR (||),
   * because the first check is to see if I have a string, the second is the string empty.
   * I _only_ accept a typeof string, so combining them makes no sense, I don't _know_
   * if it's a string, until I've checked it.
   *
   * Could I add a regex check here too? - that the string only contains valid brackets?
   * Sure - that's also a quick way to bail early.
   */
  if (typeof input !== "string") return false;
  if (input === "") return false;

  /**
   * split the input into an array
   * Do a check of the first character, does it have a valid start bracket?
   */
  const inputToArray = input.split("");
  if (!validStartBrackets.includes(inputToArray[0])) return false;

  let isValid = true; // This is used as the return var
  let bracketCount = 0; // This is used to increment & decrement as brackets are opened or closed

  /**
   * I loop through the input that was converted to an array
   */
  for (let i = 0; i < inputToArray.length; ++i) {
    /**
     * In the switch, I only check the opening brackets against a valid list of what can follow one, not closing brackets.
     *
     * Why?:
     * 1. I've already checked the very first bracket in the array for validity, before I hit the loop.
     *    It should be an OPENING bracket, else it isn't valid.
     * 2. For those opening brackets, I'm checking whether the _NEXT_ bracket is valid, not the _current_ one. 
     *    That's one important part of this solution. 
     *    A string of just opening brackets, or just closing brackets, will always be valid in checking the _next_
     *    bracket. You could flip this logic and check the validity of closing brackets against the bracket _before_ it,
     *    same idea, the bracketCount handles the rest of this.
     *
     * So, for each open bracket I increment the bracketCount, for each closing, I decrement it.
     *
     * Using a switch is handy, although in this case, it seems more verbose, but as there is an easy way to break
     * out of a switch, I don't need to keep traversing through the other cases - I love a good switch!
     * 
     * The same can be done with a for loop, using `continue`
     */
    switch (inputToArray[i]) {
      case "[":
        isValid = validSquareBrackets.includes(inputToArray[i + 1]);
        bracketCount++;
        break;
      case "{":
        isValid = validCurlyBrackets.includes(inputToArray[i + 1]);
        bracketCount++;
        break;
      case "(":
        isValid = validRoundBrackets.includes(inputToArray[i + 1]);
        bracketCount++;
        break;
      case "]":
        bracketCount--;
        break;
      case "}":
        bracketCount--;
        break;
      case ")":
        bracketCount--;
        break;
      default:
        /**
         * Why is the default false? - because if _none_ of the above cases are found, then it isn't a bracket.
         */
        isValid = false;
        break;
    }
    /**
     * Handy thing about `for` loops - you can break out of them.
     * The moment isValid is false, I bail out.
     */
    if (isValid === false) break;
  }

  /**
   * The final check - if bracketCount isn't zero, it means I'm missing a matching closing brace.
   * In a way, this is the "Secret Sauce" to my solution, in the switch, I've checked the validity of the _next_ bracket
   * but by using a bracketCount, I don't have to bother with checking validity for closing everything.
   * If it isn't zero, then it isn't closed.
   * This allows me to not bother checking something like `(((((` to see if it's valid during the loop through
   * all of the brackets, instead, I use a count.
   * It simplifies things considerably.
   * Think about it - this is only really checking if the NEXT bracket is valid,
   * I don't care whether I'm closing stuff or not. The count does all that for me = winning.
   */
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

console.log('NaN                        =>', areBracketsValid(NaN));

console.log('undefined                  =>', areBracketsValid(undefined));

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
