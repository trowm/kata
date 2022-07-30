/**
 * Define some basic validity arrays for each bracket type.
 * These are used to check the _next_ bracket, not the current one
 * So, note the first two values for each - they are the close AND the end for
 * that bracket type. The other bracket types are only ever the _opening_ type.
 * Note: The order of these arrays is irrelevant, I just put the open/close
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
   */
  if (typeof input !== "string") return false;
  if (input === "") return false;

  /**
   * split the input into an array
   * Do a check of the first character, does it have a valid start bracket?
   */
  const inputToArray = input.split("");
  if (!validStartBrackets.includes(inputToArray[0])) return false;

 
  let valid = true; // This is our return value
  let bracketCount = 0; // This is used to increment, decrement, as brackets are opened or closed

  /**
   * We loop through our input we converted to an array
   */
  for (let i = 0; i < inputToArray.length; ++i) {
    /**
     * In our switch, we only care about checking the current open bracket value in our array against a list of valid
     * brackets for the bracket _after_ it.
     * 
     * Why?:
     * 1. we've already _checked_ our very first bracket in the array for validity, before we hit the loop.
     * 2. we're checking whether the next bracket is valid, not the _current_ one.
     * 
     * Finally, for each open bracket we increment the bracketCount, for each closing, we decrement it.
     * 
     * Using a switch is handy, although in this case, it seems more verbose, we have an easy way to break out of a switch,
     * so we don't have to do any more checks - we found our case, our "match"
     */
    switch (inputToArray[i]) {
      case "[":
        valid = validSquareBrackets.includes(inputToArray[i+1]);
        bracketCount++;
        break;
      case "{":
        valid = validCurlyBrackets.includes(inputToArray[i+1]);
        bracketCount++;
        break;
      case "(":
        valid = validRoundBrackets.includes(inputToArray[i+1]);
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
        valid = false;
        break;
    }
    /**
     * Handy thing about `for` loops - you can break out of them.
     * The moment we've got a valid of false out of our switch statement, for a loop iteration, we bail.
     */
    if (valid === false) break;
  }

  /**
   * Our final check - if bracketCount isn't zero, it means we're missing a matching close brace.
   */
  if (bracketCount !== 0) valid = false;

  return valid;
}

console.log('[ => ', areBracketsValid('['));

console.log('[] => ', areBracketsValid('[]'));

console.log('[} => ', areBracketsValid('[}'));

console.log('[(())(()){{{{{{[]}}}}}}]{} => ', areBracketsValid('[(())(()){{{{{{[]}}}}}}]{}'));