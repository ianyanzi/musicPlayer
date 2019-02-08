

function $(selector){
    return document.querySelector(selector)
}

getMusicList(function(list){
    musicList = list
    loadMusic(list[currentIndex])
})



var currentIndex = 0
var audio = new Audio()
audio.autoplay = true
var clock
var musicList = []


getMusicList(function(list){
    musicList = list
    console.log(musicList)
    loadMusic(list[currentIndex])
})

function getMusicList(callback){
    var xhr = new XMLHttpRequest()
    xhr.open('GET','/music.json',true)
    xhr.onload = function(){
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304){
            callback(JSON.parse(this.responseText))
        }else{
            console.log('请求失败')
        }
    }
    xhr.onerror = function(){
        console.log('请求失败')
    }
    xhr.send()
}

function loadMusic(musicObj){
    audio.src = musicObj.src
    $('.musicbox .title').innerText = musicObj.title
    $('.musicbox .auther').innerText = musicObj.auther
    $('.cover').style.backgroundImage = 'url('+ musicObj.img + ')'
}

audio.onplay = function(){
    clock = setInterval(function(){
        var min = Math.floor(audio.currentTime / 60)
        var sec = Math.floor(audio.currentTime % 60) + ''
        if(sec.length === 2){
            sec = sec
        }else{
            sec = '0' + sec
        }
        $('.time').innerText = min + ':' + sec
    },1000)
}

audio.onpause = function(){
    clearInterval(clock)
}

audio.ontimeupdate = function(){
    $('.progress-now').style.width = this.currentTime / this.duration * 100 + '%'
}

$('.musicbox .play').onclick = function(){
    if(audio.paused){
        //判断这个音乐对象是否处于播放状态，暂停为true，播放为false
        audio.play()
        this.querySelector('.iconfont').classList.remove('icon-bofang')
        this.querySelector('.iconfont').classList.add('icon-zanting')
    }else {
        audio.pause()
        this.querySelector('.iconfont').classList.remove('icon-zanting')
        this.querySelector('.iconfont').classList.add('icon-bofang')
    }
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
    console.log(event) //获取进度条x轴上的偏移距离
    var percent = event.offsetX / parseInt(getComputedStyle(this).width)
    audio.currentTime = audio.duration * percent
}

audio.onended = function(){
    currentIndex = (++currentIndex) % musicList.length
    loadMusic(musicList[currentIndex])
}
