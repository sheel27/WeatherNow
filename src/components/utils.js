    export const formatTime = (timeString) => {
    const date = new Date(timeString);
    
    if (isNaN(date)) {
      // Handle invalid time strings
      return "Invalid time";
    }
    
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    // Convert hours to 12-hour format
    const formattedHours = hours > 12 ? hours - 12 : hours;
    
    // Add leading zero to minutes if necessary
    const formattedMinutes = String(minutes).padStart(2, "0");
    
    // Determine AM or PM
    const amPm = hours >= 12 ? "PM" : "AM";
    
    return `${formattedHours}:${formattedMinutes} ${amPm}`;
  };
  
