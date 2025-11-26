export function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString();
}

export function formatTime(timeStr) {
  if (!timeStr) return timeStr;
  // timeStr expected 'HH:MM:SS' or 'HH:MM'
  return timeStr.slice(0,5);
}
