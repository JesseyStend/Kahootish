export default function generateCode() {
  const digits = "0123456789";
  const codeLength = 7;

  let code = "";
  for (let i = 0; i < codeLength; i++) {
    code += digits[Math.floor(Math.random() * digits.length)];
  }

  return code;
}
