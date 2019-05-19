var clipboardBtn=document.querySelector(".fa-clipboard-list");
var slidemenu=document.querySelector(".slide_menu");
var seeMenu=false;

clipboardBtn.addEventListener("click",(e)=>{
    if(!seeMenu){
    console.log(event)
    console.log(slidemenu)
    slidemenu.style.transform="translateX(0)"
    seeMenu=true;
    }
    else if(seeMenu === true){
        slidemenu.style.transform="translateX(101%) rotate(180deg)"
        seeMenu=false;

    }
})

var timerBtns=document.querySelectorAll('.timer-container button');
var choiceBtns=document.querySelectorAll(".choice-container button");
var play=document.querySelector(".play");
var video=document.querySelector(".video-container video")
var song=document.querySelector('.song');
var timer=document.querySelector(".timer");
var circle=document.querySelector(".track_outline circle");
var totalLength=circle.getTotalLength();
console.log(totalLength)
var fakeDuration=60;
timer.textContent=`${Math.floor(60/60)}:${Math.floor(60%60)}`

circle.style.strokeDashoffset=totalLength;
circle.style.strokeDasharray=totalLength;

play.addEventListener("click",()=>{
    checkPlay(song)
})

function checkPlay(song){
    if(song.paused){
        song.play()
        video.play()
        play.src="./svg/pause.svg"
    }
    else{
        song.pause()
        video.pause()
        play.src="./svg/play.svg"
    }
}

timerBtns.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        fakeDuration=e.target.attributes.getNamedItem('data-timer').value
        console.log(fakeDuration)
    })
})

choiceBtns.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        video.src=e.target.parentElement.attributes.getNamedItem('data-video').value;
        song.src=e.target.parentElement.attributes.getNamedItem('data-sound').value;

        console.log(video)
        console.log(song)
    })
})

song.ontimeupdate=function(){
    var {currentTime} = song
    var elapsed=fakeDuration-currentTime;
    var minutes=Math.floor(elapsed/60)
    var seconds=Math.floor(elapsed%60);
    timer.textContent=`${minutes}:${seconds}`
    var progress=totalLength-(elapsed/fakeDuration) * totalLength;
    circle.style.strokeDashoffset=progress

    if(currentTime > fakeDuration){
        song.pause()
        video.pause()
        currentTime=0;
    }
}


