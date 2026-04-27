export function timeAgo(date: Date | string | undefined): string {
  if (!date) return '';
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  if (years > 0) return `${years}y`;
  if (months > 0) return `${months}m`;
  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}hr`;
  return `${minutes}min`;
}

export function dataImportance(date: Date | string | undefined): string {
  if (!date) return '';
  const dataTrans = new Date(date);
  const diff = Date.now() - dataTrans.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  if (years > 0) return `${dataTrans.getFullYear()}-${dataTrans.getMonth() + 1}`;
  if (months > 0) return `${dataTrans.getFullYear()}-${dataTrans.getMonth() + 1}-${dataTrans.getDate()}`;
  if (days > 0) return `${dataTrans.getFullYear()}-${dataTrans.getMonth() + 1}-${dataTrans.getDate()}T${dataTrans.getHours()}`;
  if (hours > 0) return `${dataTrans.getFullYear()}-${dataTrans.getMonth() + 1}-${dataTrans.getDate()} ${dataTrans.getHours()}:${dataTrans.getMinutes()}`;
  
  return dataTrans.toLocaleString();

  
  
}