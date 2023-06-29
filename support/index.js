function validateBrackets(string) {
  const stack = [];
  const verify = {
    "(": ")",
    "{": "}",
    "[": "]",
  };

  for (let i = 0; i < string.length; i++) {
    const char = string[i];

    if (verify[char]) {
      stack.push(char);
    } else if (char === ")" || char === "}" || char === "]") {
      if (verify[stack.pop()] !== char) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

console.log("(){}[]", validateBrackets("(){}[]"));
console.log("[{()}](){}", validateBrackets("[{()}](){}"));
console.log("[]{()", validateBrackets("[]{()"));
console.log("[{)]", validateBrackets("[{)]"));
