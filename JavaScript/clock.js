const myLabel = document.getElementById("myLabel");
function update() {
    let date = new Date();
    myLabel.innerHTML = formatTime(date);
    
    function formatTime(date) {
        let hours = formatZeroes(date.getHours());
        let minutes = formatZeroes(date.getMinutes());
        let seconds = formatZeroes(date.getSeconds());
        let amOrPm = hours>=12 ? "pm" : "am"; // Gets am or pm from time depending on if hours >=12 or not
        if (hours!=12){
            hours = hours % 12 // Hours is in 12-hour format
        }
        return `${hours}:${minutes}:${seconds} ${amOrPm}`
    }
    function formatZeroes(time) {
        time = time.toString();
        return time.length<2 ? "0"+time : time;
    }
}
update();
setInterval(update, 1000);