import Toast from "react-native-toast-message";

// Success toast function
export const toastSuccess = (description, title, timeStamp) => {
  Toast.show({
    type: "success",
    text1: `${title || "Success"} 👏 `,
    text2: description,
    position: "top",
    visibilityTime: timeStamp || 2000, // Automatically hides after 3 seconds
    topOffset: 50, // Offset from the top (adjust as needed)
  });
};

// Error toast function
export const toastError = (description, title, timeStamp) => {
  Toast.show({
    type: "error",
    text1: `${title || "Error"}  `,
    text2: description,
    position: "top",
    visibilityTime: timeStamp || 2000, // Automatically hides after 3 seconds
    topOffset: 50,
  });
};

// Info toast function
export const toastInfo = (message, description, timeStamp) => {
  Toast.show({
    type: "info",
    text1: message,
    text2: description,
    position: "top",
    visibilityTime: timeStamp || 2000, // Automatically hides after 3 seconds
    topOffset: 50,
  });
};
