

const isoTimeFormat = (datetime) => {
  const date = new Date(datetime);

  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  const localTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return localTime;
};

export default isoTimeFormat;
