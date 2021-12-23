const TIME_VAL = 60

class timerObj {
    sec;
    seconds = () => {return Math.floor((this.sec % TIME_VAL**2) % TIME_VAL)};
    minutes = () => {return Math.floor((this.sec % TIME_VAL**2) / TIME_VAL)};
    hours = () => {return Math.floor(this.sec / TIME_VAL**2)};

    constructor(hr, min, sec){
        if( hr === "" ) hr = 0;
        if( min === "" ) min = 0;
        if( sec === "" ) sec = 0;
        this.sec = Math.floor(parseInt(sec) + parseInt(min) * TIME_VAL + parseInt(hr) * TIME_VAL**2);
    }

    setSec(hr, min, sec) {
        if( hr === "" ) hr = 0;
        if( min === "" ) min = 0;
        if( sec === "" ) sec = 0;
        this.sec = Math.floor(parseInt(sec) + parseInt(min) * TIME_VAL + parseInt(hr) * TIME_VAL**2);
    }

    getSec(){
        return Math.floor(this.sec);
    }

    getFullTime(){
        var addZero = (num) => {
            //num = parseInt(num)
            if(num > 9) 
                return num + ""; 
            else 
                return "0" + num;
        }; // returns string always

        return addZero(this.hours()) + ":" + addZero(this.minutes()) + ":" + addZero(this.seconds());
    }

    decrementOne(){
        this.sec--;
    }
}