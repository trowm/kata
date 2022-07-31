 function areBracketsValid(input) {
   if (typeof input !== "string") return false; 
   const inputToArray = input.split("");
   if (!["[", "{", "("].includes(inputToArray[0])) return false; 
   let isValid = true;
   let bracketCount = 0;
   for (let i = 0; i < inputToArray.length; ++i) {
     switch (inputToArray[i]) {
       case "[":
         isValid = ["[", "]", "(", "{"].includes(inputToArray[i + 1]);
         bracketCount++;
         break;
       case "{":
         isValid = ["{", "}", "[", "("].includes(inputToArray[i + 1]);
         bracketCount++;
         break;
       case "(":
         isValid = ["(", ")", "[", "{"].includes(inputToArray[i + 1]);
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
         isValid = false;
         break;
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
 