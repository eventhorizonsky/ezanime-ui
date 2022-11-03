<template>
  <v-container>
    <v-sheet rounded="lg">
  <Artplayer @get-instance="getInstance" :option="option" :style="style" />
  </v-sheet>
  </v-container>
</template>
<style>
.danmaku{font-weight: bold;}
</style>
<script>
import Artplayer from "../Artplayer.vue";
import('flv.js');

var hls = null;
let that
export default {
  data() {
    return {
      danmuku:[],
      option: {
        url: "https://iqiyi.sd-play.com/20221023/7lBIDldv/index.m3u8",
        type: 'm3u8', // 可选，但最好填上
        plugins: [artplayerPluginDanmuku({
            // 弹幕数组
            danmuku: function () {
                return new Promise((resovle) => {
                that.$axios.get('https://api.dandanplay.net/api/v2/comment/170610001?withRelated=true').then(response => {
          var comments=response.data.comments
          var danmuku=[]
          for(var i=0;i<comments.length;i++){
            var text=comments[i].m
            var p=comments[i].p.split(',')
            var time=parseFloat(p[0])
            var red=parseInt(p[2]/65536)
            var green=parseInt(p[2]/256%256)
            var blue=parseInt(p[2]%256%256)
            var color="rgb("+red+","+green+","+blue+")"
            var mode=0
            if(p[1]==1){mode=0}else{mode=1}
          var danmu=  { text: text, time: time,  color: color, border: false, mode: mode,}

          danmuku.push(danmu)
          }
        console.log(danmuku) 
        return resovle(danmuku) 
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        })
                    ;
                });
            },
            fontweight: 100,
            speed: 5, // 弹幕持续时间，单位秒，范围在[1 ~ 10]
            opacity: 1, // 弹幕透明度，范围在[0 ~ 1]
            fontSize: 25, // 字体大小，支持数字和百分比
            color: '#FFFFFF', // 默认字体颜色
            mode: 0, // 默认模式，0-滚动，1-静止
            margin: [10, '25%'], // 弹幕上下边距，支持数字和百分比
            antiOverlap: true, // 是否防重叠
            useWorker: true, // 是否使用 web worker
            synchronousPlayback: false, // 是否同步到播放速度
            filter: (danmu) => danmu.text.length < 50, // 弹幕过滤函数，返回 true 则可以发送
            lockTime: 5, // 输入框锁定时间，单位秒，范围在[1 ~ 60]
            maxLength: 100, // 输入框最大可输入的字数，范围在[0 ~ 500]
            minWidth: 200, // 输入框最小宽度，范围在[0 ~ 500]，填 0 则为无限制
            maxWidth: 400, // 输入框最大宽度，范围在[0 ~ Infinity]，填 0 则为 100% 宽度
            theme: 'dark', // 输入框自定义挂载时的主题色，默认为 dark，可以选填亮色 light
            beforeEmit: (danmu) => !!danmu.text.trim(), // 发送弹幕前的自定义校验，返回 true 则可以发送

            // 通过 mount 选项可以自定义输入框挂载的位置，默认挂载于播放器底部，仅在当宽度小于最小值时生效
            // mount: document.querySelector('.artplayer-danmuku'),
        })
    ],
    autoSize: true,
    fullscreen: true,
    fullscreenWeb: true,
    flip: true,
    playbackRate: true,
    aspectRatio: true,
    setting: true,
   customType: {
        m3u8: async function (video, url) {
            const { default: Hls } = await import('hls.js');

            // 切换地址前，要销毁上一个解码器实例
            if (hls) {
                hls.destroy();
            }

            // 播放器销毁时，也要销毁解码器实例
            this.on('destroy', () => {
                if (hls) {
                    hls.destroy();
                }
            });

            hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
        },
        flv: async function (video, url) {
            const { default: flvjs } = await import('flv.js');
        }
    
    },
      },
      style: {
        width: "1080px",
        height: "720px",
        margin: "0px auto 0",
      },
    };
  },beforeCreate(){
    that=this
  },
  created(){
 
  },
  components: {
    Artplayer,
  },
  methods: {
    getdanmu(){
        this.$axios.get('https://api.dandanplay.net/api/v2/comment/170010004?withRelated=true').then(response => {
          var comments=response.data.comments
          var danmuku=[]
          for(var i=0;i<comments.length;i++){
            var text=comments[i].m
            var p=comments[i].p.split(',')
            var time=parseInt(p[0])
            var red=parseInt(p[2]/65536)
            var green=parseInt(p[2]/256%256)
            var blue=parseInt(p[2]%256%256)
            var color="rgb("+red+","+green+","+blue+")"
            var mode=0
            if(p[1]==1){mode=0}else{mode=1}
          var danmu=  { text: text, time: time,  color: color, border: false, mode: mode,}

          danmuku.push(danmu)
          }
        console.log(danmuku)  
        return danmuku
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        })
    },
    getInstance(art) {
      console.log(art);
    },
  },
};
</script>