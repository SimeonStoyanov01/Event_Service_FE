export const truncateText = (text, maxWords) => {
    const wordsArray = text.split(' ');
    if (wordsArray.length <= maxWords) return text;
    return wordsArray.slice(0, maxWords).join(' ') + '...';
  };
    