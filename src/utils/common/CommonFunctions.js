export const getSimilarObjectsFromArray = (data = [], key, value) => {
  if (data?.length === 0) {
    return null;
  } else {
    const similarObjectsInArray = data?.filter((item) => item[key] === value);
    return similarObjectsInArray;
  }
};

export const getObjectFromArrayOfObjects = (data = [], key, value) => {
  if (data?.length === 0) {
    return null;
  } else {
    const filteredData = data?.filter((item) => item[key] === value);
    return filteredData[0];
  }
};

export const isValuePresentInArray = (data = [], value) => {
  if (data?.length === 0) {
    return null;
  } else {
    const filteredData = data?.filter((item) => item === value);
    const result = filteredData[0] === value ? true : false;
    return result;
  }
};

export const getOtherObjectsFromArray = (data = [], key, value) => {
  if (data?.length === 0) {
    return null;
  } else {
    const otherObjectsFromArray = data?.filter((item) => item[key] !== value);
    return otherObjectsFromArray;
  }
};

export const convertToArrayOfValues = (array = [], key) => {
  return array.map((obj) => Number(obj[key]));
};

export const createStringFromKey = (array, key) => {
  return array.map((obj) => obj[key]).join("#");
};

export const createStringFromArray = (array) => {
  return array.join(",");
};

export const isObjectFilled = (obj) => {
  return Object.values(obj).every(
    (value) => value !== null && value !== undefined && value !== ""
  );
};

export const generateObjects = (obj, quantity) => {
  return Array.from({ length: quantity }, () => ({ ...obj }));
};

export const handleMobileNumber = (
  key,
  value,
  handleInputChange = Function
) => {
  if (/^\d{0,10}$/.test(value)) {
    handleInputChange(key, value);
  } else {
    // console.log("Error", value);
  }
};


// Convert a date string from "DD-MM-YYYY" to "YYYY-MM-DD"
export const formatDateToISO = (customDate) => {
  if (!customDate) return "";
  const [day, month, year] = customDate.split("-");
  return `${year}-${month}-${day}`;
};

// Convert a date string from "YYYY-MM-DD" to "DD-MM-YYYY"
export const formatDateToDisplay = (isoDate) => {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  return `${day}-${month}-${year}`;
};

export const getFormatedDateWithMonthText = (dateString) => {
  const dateObj = new Date(dateString);
  // Example: "Mon, 20 January"
  const options = {
    weekday: "long", // "Mon", "Tue", etc.
    day: "numeric", // "20", "23", etc.
    month: "long", // "January", "February", etc.
    year: "numeric", // 2025
  };

  // returns something like: "Mon, 20 January"
  // (the exact output can vary by browser/locale)
  const formattedDate = dateObj.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const getFormattedDateAndTime = (dateString) => {
  const unformattedDate = new Date(dateString);

  const formattedDate = `${unformattedDate.getDate()}/${
    unformattedDate.getMonth() + 1
  }/${unformattedDate.getFullYear()}`;
  const formattedTime = `${unformattedDate.getHours().toString().padStart(2, '0')}:${unformattedDate.getMinutes().toString().padStart(2, '0')}`;

  return `${formattedDate}  ${formattedTime}`;
};



export const getFormattedDate = (dateString) => {
  const unformattedDate = new Date(dateString);

  const formattedDate = `${unformattedDate.getDate()}/${
    unformattedDate.getMonth() + 1
  }/${unformattedDate.getFullYear()}`;
  const formattedTime = `${unformattedDate.getHours().toString().padStart(2, '0')}:${unformattedDate.getMinutes().toString().padStart(2, '0')}`;

  return `${formattedDate}`;
};


export const getValuesOfArrayWithoutDuplication = (data = [], value) => {
  const isValuePresent = data?.includes(value);
  if (isValuePresent === true) {
    console.log('ifdata',data)
    return data;
  } else {
    const getUpdatedArray = [...data, value];
    console.log('elsedata',getUpdatedArray)
    return getUpdatedArray;
  }
};