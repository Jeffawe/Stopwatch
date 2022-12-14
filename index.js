let timeisPaused = false;
let timeLeft = 0;
let stopInterval = false;

const TimerClass = {
    start: StartCounter = () => {
        var hourValue = parseInt(document.getElementById('hourInput').value);
        var minValue = parseInt(document.getElementById('minInput').value);
        var secValue = parseInt(document.getElementById('secInput').value);

        hourValue = CheckIfNull(hourValue);
        minValue = CheckIfNull(minValue);
        secValue = CheckIfNull(secValue);

        var myDate = new Date()
        // Set hours
        myDate.setHours(myDate.getHours() + hourValue);
        // Then set minutes
        myDate.setMinutes(myDate.getMinutes() + minValue);
        // Then set seconds
        myDate.setSeconds(myDate.getSeconds() + secValue);
        myDate = myDate.getTime()
        document.getElementById("show_hide").style.display = "none";
        document.getElementById("button_start").style.display = "none";
        document.getElementById("countdownTime").style.display = "flex";
        document.getElementById("button_stop").style.display = "flex";

        setInterval(() => {
            if (!stopInterval) {
                ReduceTime(myDate)
            }
        }, 1000);
    },

    pause: PauseCounter = () => {
        if (!timeisPaused) {
            timeisPaused = true;
            document.getElementById("button_pause").innerHTML = "Play";
            stopInterval = true;
            
        } else {
            timeisPaused = false;
            document.getElementById("button_pause").innerHTML = "Pause";
            currentDate = new Date().getTime();
            myDate = new Date(currentDate + timeLeft);
            setInterval(() => {
                if (!timeisPaused) {
                    ReduceTime(myDate)
                }
            }, 1000);
            
        }
    },

    stop: StopCounter = () => {
        location.reload()
    },
}

const ReduceTime = (myDate) => {
    //Gets the Current Time
    var currentTime = new Date()

    //Minuses the current time from the given time
    timeLeft = myDate - currentTime.getTime();


    //Converts the answer to hours, minutes and seconds and makes them two digit values
    var hoursTimeLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toLocaleString('en-US', { minimumIntegerDigits: 2 });
    var minutesTimeLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)).toLocaleString('en-US', { minimumIntegerDigits: 2 });;
    var secondsTimeLeft = Math.floor((timeLeft % (1000 * 60)) / 1000).toLocaleString('en-US', { minimumIntegerDigits: 2 });;


    if (timeLeft <= 0) {
        document.getElementById("time").innerHTML = "Time is Up";
        TimerClass.stop()
    } else {
        document.getElementById("time").innerHTML = hoursTimeLeft + ": " + minutesTimeLeft + ": " + secondsTimeLeft;
    }
}

const CheckIfNull = (val) => {
    if (!isNaN(val)) {
        val = val;
        return val
    } else {
        val = 0;
        return val;
    }
}


