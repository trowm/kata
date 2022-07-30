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
   * We bail early here.
   * We also don't _combine_ the checks into one if statement with an OR (||),
   * because the first check is to see if we have a string, the second is the string empty.
   * We _only_ accept a typeof string, so combining them makes no sense, we don't _know_
   * if it's a string, until we've checked it.
   *
   * Could we add a regex check here too? - that our string only contains valid brackets?
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

  let isValid = true; // This is used as our return var
  let bracketCount = 0; // This is used to increment & decrement as brackets are opened or closed

  /**
   * We loop through our input we converted to an array
   */
  for (let i = 0; i < inputToArray.length; ++i) {
    /**
     * In our switch, we only check the opening brackets against a valid list of what can follow one, never closing brackets.
     *
     * Why?:
     * 1. we've already checked our very first bracket in the array for validity, before we hit the loop. It should be an OPENING bracket, else it isn't valid.
     * 2. For those opening brackets, we're checking whether the _NEXT_ bracket is valid, not the _current_ one. That's the important part of this solution. The other part, uses the bracketCount var.
     *
     * So, for each open bracket we increment the bracketCount, for each closing, we decrement it.
     *
     * Using a switch is handy, although in this case, it seems more verbose, we have an easy way to break out of a switch,
     * so we don't have to do any more checks - we found our case, our "match"
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
         * Why is our default false? - because if _none_ of the above cases are found, then it isn't a bracket.
         */
        isValid = false;
        break;
    }
    /**
     * Handy thing about `for` loops - you can break out of them.
     * The moment we've got an isValid false boolean out of our switch statement, we bail.
     */
    if (isValid === false) break;
  }

  /**
   * Our final check - if bracketCount isn't zero, it means we're missing a matching closing brace.
   * In a way, this is the "Secret Sauce" to my solution, in our switch, we've checked the validity of the _next_ bracket
   * but by using a bracketCount, we don't have to bother with checking validity for closing everything.
   * If it isn't zero, then it isn't closed.
   * This allows us to not bother checking something like `(((((` to see if it's valid during our loop through all of our brackets, instead, we use a count.
   * It simplifies things considerably.
   * Think about it - we're only really checking if the NEXT bracket is valid, we don't care whether we're closing stuff or not. Our count does the rest for us = winning.
   */
  if (bracketCount !== 0) isValid = false;

  return isValid;
}

console.log('"" =>', areBracketsValid(""));

console.log("123 =>", areBracketsValid(123));

console.log("foo =>", areBracketsValid("foo"));

console.log("[1,2,3] =>", areBracketsValid([1, 2, 3]));

console.log("[ => ", areBracketsValid("["));

console.log("[] => ", areBracketsValid("[]"));

console.log("[} => ", areBracketsValid("[}"));

console.log("][}{)( => ", areBracketsValid("][}{)("));

console.log("[({})] => ", areBracketsValid("[({})]"));

console.log(
  "[(())(()){{{{{{[]}}}}}}]{} => ",
  areBracketsValid("[(())(()){{{{{{[]}}}}}}]{}")
);
