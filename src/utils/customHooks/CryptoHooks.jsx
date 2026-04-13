import CryptoJS from "crypto-js";

const SECRET_KEY = "my key";

// Encrypt function
export const UseEncrypt = (value) => {
  if (!value || !SECRET_KEY) return "";
  return CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
};

// Decrypt function
export const UseDecrypt = (encryptedValue) => {
  if (!encryptedValue || !SECRET_KEY) return "";
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return "Decryption Error";
  }
};
