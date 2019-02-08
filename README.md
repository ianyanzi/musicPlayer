# musicPlayer

<br/>
<br/>
### 本次实战的项目是一个简单的音乐播放器，具有音乐播放器简单的功能，有播放、暂停、下一首、上一首的按钮。

##### 用到的技术和知识点：

1. ajax
2. DOM
3. 事件相关操作
4. 音乐相关的API

##### 在制作音乐播放器需要解决的问题点：

1. 音乐数据，音乐数据从何而来
2. 音乐标题、作者、图片和地址如何修改
3. 音乐如何播放（时间、暂停、播放）

通过本次项目的学习到了音频相关的属性和方法，不明白可以去MDN查阅

<br/>

audioObject音频对象

两种方法可以创建audio对象

1. 
        <audio id="music" src="http://cloud.hunger-valley.com/music/玫瑰.mp3">你的浏览器不支持喔！</audio>
        <script>
        var audioObject = document.querySelector('#music')
        </script>

2. 
        var audioObject = new Audio('http://cloud.hunger-valley.com/music/玫瑰.mp3')

相关属性：

<br/>
autoplay

布尔属性；如果指定（默认值为"false"！）；指定后，音频会马上自动开始播放，不会停下来等着数据载入结束。

<br/>
loop

布尔属性；如果指定，将循环播放音频。

<br/>
src

设置或者获取音乐地址

<br/>
volume

音频的音量大小。值从0.0 (无声) 到 1.0 (最大声).

<br/>
duration

获取音乐长度，单位为秒

<br/>
currentTime

设置或者获取播放时间

<br/>
相关方法：

<br/>
play：播放

pause：暂停

<br/>
相关事件：

playing

当音乐开始播放，暂停后重新开始播放，设置currentTime后开始播放时触发

<br/>
pause

当音乐暂停时和结束时触发

<br/>
ended

当音乐结束时触发

<br/>
timeupdate

当currentTime更新时会触发timeupdate事件,这个事件的触发频率由系统决定，但是会保证每秒触发4-66次（前提是每次事件处理不会超过250ms.

<br/>
volumechange

当音量改变时触发

<br/>

#### 总结和收获：

通过此实战的学习，制作了一个简易的播放器，学习到HTML5与音乐相关的属性和方法
