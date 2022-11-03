<template>
    <v-container>
      
        <v-row>
            <v-col md="12">
             <v-card
        class="mx-auto"
        max-width="auto">
        
         <v-container>
             
        <v-row >
   <template v-for="webname,webindex in bungumi">
            
          <v-col  v-for="li,liindex in webname.list"
            :key="webname.name+li.bh"
            :cols="6"
            :md="2">
          <v-card>
            <v-card @click="gourl(li.id,webindex)">
              <v-img
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                :src="li.pic"
                class="white--text align-end"
                height="200px">
                <v-card-title class="pb-0" v-text="li.name"></v-card-title>
                
              </v-img>
            </v-card>
            <v-spacer></v-spacer>

     <v-card-actions v-if="!li.read">
      <v-btn
        color="red"
        text
        @click="goplaynew(webindex,li.playurl)"
      >
        更新至{{li.subtxt}}
      </v-btn>
        <v-btn
        
        icon
        @click="read(webindex,li.bh,liindex)"
      >
      <v-icon> mdi-email-off</v-icon>
     
      </v-btn>
    </v-card-actions>
      <v-card-actions v-if="li.read">
      <v-btn
        color="accent"
        text
         @click="goplaynew(webindex,li.playurl)"
      >
        更新至{{li.subtxt}}
      </v-btn>
      <v-btn
        
        icon
        @click="unlove(webindex,li.bh,liindex)"
      >
      <v-icon>mdi-heart</v-icon>
     
      </v-btn>
    </v-card-actions>
          </v-card>
          
          </v-col>
          
          </template>
        </v-row></v-container>
               </v-card>
               </v-col>
        </v-row>
  <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ snaptext }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          关闭
        </v-btn>
      </template>
    </v-snackbar>
        </v-container>
</template>
<script>
export default {
  
  data: () => ({
    snackbar:false,
    timeout:2000,
    snaptext:"",
    websitesrule:null,//暂存获取的json配置文件
    bungumi:[],
  }),
  created () {
     this.$axios
        .get('/websites.json')
        .then(
        response => {
          this.websitesrule = response.data.websites
          for(var i=0;i<response.data.websites.length;i++){
            var init={bungumi:[]}
      if(localStorage.getItem(this.websitesrule[i].name)==null||localStorage.getItem(this.websitesrule[i].name)=="{}"){localStorage.setItem(this.websitesrule[i].name, JSON.stringify(init))}
      
            var localdata=JSON.parse(localStorage.getItem(response.data.websites[i].name))
            if(localdata!=null&&localdata!="{}"){var bungumi= localdata.bungumi
           var obj={name:response.data.websites[i].name,list:bungumi}
            this.bungumi.push(obj)}
           
          }
          this.loadnew()
        }).catch(function (error) { // 请求失败处理
          console.log(error);
        });
        
  },methods:{
     //从数组中删除指定编号的番剧
    delereformlocal(_obj,_arr){
    var length=_arr.length
    for (var i = 0; i <length; i++) {
        if (_arr[i].bh ==_obj) {
            if (i == 0) {
                _arr.shift(); //删除并返回数组的第一个元素
                return _arr;
            }
            else if (i == length - 1) {
                _arr.pop();  //删除并返回数组的最后一个元素
                return _arr;
            }
            else {
                _arr.splice(i, 1); //删除下标为i的元素
                return _arr;
            }
        }}
  },unlove(webindex,bh,liindex){
      var bungumi=bh
      var bh='"bh":"'+bh+'"'
      var localbungumi= JSON.parse(localStorage.getItem(this.websitesrule[webindex].name))
      console.log(bh)
      console.log(localbungumi)
      if(JSON.stringify(localbungumi).indexOf(bh)!=-1){
      localbungumi.bungumi=this.delereformlocal(bungumi,localbungumi.bungumi)
      
      localStorage.setItem(this.websitesrule[webindex].name, JSON.stringify(localbungumi))
      this.bungumi[webindex].list=this.delereformlocal(bungumi,this.bungumi[webindex].list)
      this.snaptext="取消追番成功"
      }else{this.snaptext="bungumi内不包含此番剧"}
      this.snackbar=true
  },
    read(webindex,bh,liindex){
        var localbungumi= JSON.parse(localStorage.getItem(this.websitesrule[webindex].name))
                for(var k = 0; k <localbungumi.bungumi.length; k++){
                    if(localbungumi.bungumi[k].bh==bh){
                            localbungumi.bungumi[k].read=true
                            this.bungumi[webindex].list[liindex].read=true
                    }
                }
                localStorage.setItem(this.websitesrule[webindex].name, JSON.stringify(localbungumi))
    },
    gourl(id,website){
      var url=this.websitesrule[website].homeUrl+this.websitesrule[website].dtUrlIdR
      url=url.replace("(\\S+)",id)
      window.open(url)
    },
    goplaynew(website,playurl){
        var url=this.websitesrule[website].homeUrl+playurl
      window.open(url)
    },
     //根据xpath规则和htmldocument返回对应的节点
    eval(rule,dom){
      var xresult = document.evaluate(rule, dom, null, XPathResult.ANY_TYPE, null);
      var xnodes = [];
      var xres;
      while (xres = xresult.iterateNext()) {
        xnodes.push(xres);
      }return xnodes;
    },
    loadnew(){
       
         
        for(let i = 0; i < this.bungumi.length; i++ ){
            
        for(let j = 0; j < this.bungumi[i].list.length; j++ ){
            
         this.$axios.get(this.bungumi[i].list[j].dturl).then(response => {
          //获取播放列表的规则
          let dtUrlNode= this.websitesrule[i].dtUrlNode
          //获取剧集列表的规则
          let dtUrlSubNode=this.websitesrule[i].dtUrlSubNode
          //当详情站源规则为xpath时
          if(dtUrlNode.indexOf("//")!= -1){
            //获取htmlducument
            let htmlDom = $(response.data).get(0);        
              //获取对应播放列表的最新剧集，并推送给搜索结果的数据
              var subnode=$(this.eval(dtUrlNode+"["+this.bungumi[i].list[j].subnode+"]"+dtUrlSubNode,htmlDom))
              var last=subnode.slice(-1).text()
              console.log("!!!!!")
              if(this.bungumi[i].list[j].lastsub!=subnode.length){
                 var localbungumi= JSON.parse(localStorage.getItem(this.websitesrule[i].name))
                var playurl=$(this.eval(dtUrlNode+"["+this.bungumi[i].list[j].subnode+"]"+dtUrlSubNode+this.websitesrule[i].playurl,htmlDom)).slice(-1)[0].value
                this.bungumi[i].list[j].read=false
                this.bungumi[i].list[j].subtxt=last
               this.bungumi[i].list[j].playurl=playurl
                for(var k = 0; k <localbungumi.bungumi.length; k++){
                    if(localbungumi.bungumi[k].bh==this.bungumi[i].list[j].bh){
                            localbungumi.bungumi[k].read=false
                            localbungumi.bungumi[k].subtxt=last
                            localbungumi.bungumi[k].lastsub=subnode.length
                            localbungumi.bungumi[k].playurl=playurl
                    }
                }
                localStorage.setItem(this.websitesrule[i].name, JSON.stringify(localbungumi))
              }
            
          }
          if(dtUrlNode.indexOf("json")!= -1){
          //当详情页为json规则时，有这种站源的时候再写吧
          }
        }).catch(function (error) { // 请求失败处理
            console.log(error)
        })
    }}}
  }
  
  }
</script>