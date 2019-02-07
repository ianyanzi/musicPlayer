var currentIndex = 0
var musicList = []
var audio = new Audio()
var clock
audio.autoplay = true

function $(selector){
    return document.querySelector(selector)
}

getMusicList(function(list){
    musicList = list
    loadMusic(list[currentIndex])
})


audio.addEventListener('timeupdate',function(){
    $('.progress-now').style.width = (this.currentTime / this.duration) * 100 + '%'
})

audio.onplay = function(){
    clock = setInterval(function(){
        var min = Math.floor(audio.currentTime / 60)
        var sec = Math.floor(audio.currentTime) % 60 + ''
        sec = sec.length === 2 ? sec : '0' + sec
        $('.time').innerText = min + ':' + sec
    },1000)
}

audio.onpause = function(){
    clearInterval(clock)
}

audio.onended = function(){
    currentIndex = (++currentIndex) % musicList.length
    loadMusic(musicList[currentIndex])
}

$('.musicbox .forward').onclick = function(){
    currentIndex = (++currentIndex) % musicList.length
    loadMusic(musicList[currentIndex])
}

$('.musicbox .back').onclick = function(){
    currentIndex = (musicList.length + (--currentIndex)) % musicList.length
    loadMusic(musicList[currentIndex])
}

$('.progress .bar').onclick = function(event){
    var percent = event.offsetX / parseInt(getComputedStyle(this).width)
    audio.currentTime = audio.duration * percent
}



$('.musicbox .play').onclick = function(){
    if(audio.paused){
        audio.play()
        this.querySelector('.iconfont').classList.remove('icon-bofang')
        this.querySelector('.iconfont').classList.add('icon-zanting')
    }else {
        audio.pause()
        this.querySelector('.iconfont').classList.remove('icon-zanting')
        this.querySelector('.iconfont').classList.add('icon-bofang')
    }
}


function getMusicList(calback){
    var xhr = new XMLHttpRequest()
    xhr.open('GET','../music.json',true)
    xhr.onload = function(){
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304){
            calback(JSON.parse(this.responseText))
        }else {
            console.log('连接失败')
        }
    }
    
    xhr.onerror = function(){
        console.log('网络异常')
    }
    xhr.send()
}

function loadMusic(musicObj){
    audio.src = musicObj.src
    $('.musicbox .title').innerText = musicObj.title
    $('.musicbox .auther').innerText = musicObj.auther
    $('.cover').style.backgroundImage = 'url('+ musicObj.img + ')'
}
