export const dateFormatter = (date) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formattedDate;
};

export const limitWord = (text, limit = 20) => {
  // spacing not included in the word count
  const words = text.split(" ");
  if (words.length > limit) {
    return words.slice(0, limit).join(" ") + "...";
  }
  return text;
};

export const limitText = (text, limit) => {
  // spacing included in the character count
  if (text.length > limit) {
    return text.slice(0, limit) + "...";
  }
  return text;
};

// checker for content
export const minText = (text, min) => {
  if (!text) return false;
  return text.trim().length >= min;
};
