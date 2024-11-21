export const shortenAddress = (address: string): string => {
  if (!address) return '';
  if (address.length <= 10) return address;
  
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
};
export const formatTimestamp=(timestamp:string) =>{
    const timestampMs = parseInt(timestamp) / 1000;
    const date = new Date(timestampMs);
  
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
  
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
  