//COMMON ABBREVATIONS: hr = hour, min = minute, sec= second

let pauseState = true;
let resetState = false;
let editState = false;
let initial;
let countDown;

let persistent = localStorage.getItem('CountDown')
let persistentInitial = localStorage.getItem('initialCountDown');

if(persistent !== null){
    $("#initialCountDown").html(persistentInitial);
    ar = [];
    ar = persistent.split(":");
    countDown = new timerObj( ar[0], ar[1], ar[2] );
    filler($("#initialCountDown").html().split(":"));
}
else{
    initial = $("#initialCountDown").html().split(":");
    countDown = new timerObj( initial[0], initial[1], initial[2] );
}

var fillerCnt;

$("#reset").attr("disabled", true);

$("#startPause").click(function(){
    pauseState = !pauseState;
    if(pauseState){
        $("#reset").attr("disabled", false);
        $(this).html("Start");
    }
    else{
        $("#reset").attr("disabled", true);
        $(this).html("Pause");
    }
})

$("#CountDown").html(countDown.getFullTime());

let timer = setInterval(function() {
    localStorage.setItem('CountDown', $("#CountDown").html());
    localStorage.setItem('initialCountDown', $("#initialCountDown").html());

    if(!pauseState && countDown.getSec() > 0)
        countDown.decrementOne();

    $("#CountDown").html(countDown.getFullTime());

    if(countDown.getFullTime() === "00:00:00"){
        $("#CountDown").css({animationName: "endof", animationDuration : "2s", animationIterationCount: "1", color: "red"});
        $("#startPause").attr("disabled", true).html("Start");
        $("#reset").attr("disabled", false);
        $("#filledPart").width("0%");
    }
    else
        $("#CountDown").css("color", "black");

    filler($("#initialCountDown").html().split(":"));
}, 1000);

function filler(str){
    fillerCnt = new timerObj( str[0], str[1], str[2] );
    $("#filledPart").width(countDown.getSec()/(fillerCnt.getSec())*100 + "%");
}

function resetting(){
    $("#CountDown").html(countDown.getFullTime());
    pauseState = true;
    resetState = false;
    $("#reset").attr("disabled", true);
    $("#startPause").attr("disabled", false)
    //$("#reset").trigger("click");
}

$("#reset").click(function(){
    initial = $("#initialCountDown").html().split(":");
    countDown.setSec(initial[0], initial[1], initial[2]);
    resetting();
    editState = false;
})

$("#edit").click(function(){
    editState = !editState;
    if(editState){
        $("#edit").html("Done");
        $("#hr, #min, #sec").attr("disabled", false);
    }
    else{
        $("#edit").html("Edit");
        $("#hr, #min, #sec").attr("disabled", true);
        countDown.setSec( $("#hr").val(), $("#min").val(), $("#sec").val() );
        $("#initialCountDown").html(countDown.getFullTime());
        resetting();
    }
    $("#inpContainer > *").val("");
})

$('#initDur').bind('keypress', function(e) {
    if(e.keyCode==13){
        $(this).change(function(){
        })
    }
});