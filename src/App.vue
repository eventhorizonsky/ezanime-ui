<template>
  <v-app id="inspire">
    <!-- 宽屏显示的appbar -->
    <v-app-bar
      app
      color="primary"
      flat
       v-if="$vuetify.breakpoint.mdAndUp" 
    >
      <v-container class="py-0 fill-height">
        <!-- 意义不明的头像 -->
        <v-avatar
          class="mr-10"
          size="32" >
          <img alt="Avatar" src="https://www.ezsky.xyz/wp-content/uploads/2020/07/blackhole.png"   >
        </v-avatar>  
        <!-- 导航栏 -->
        <v-btn
          v-for="link in links"
          :key="link.name"
          text
          @click="register(link.href)">
          {{ link.name }}
        </v-btn>
        <!-- 意义不明的空格 -->
        <v-spacer></v-spacer>
        <!-- 搜索框 -->
        <v-card>
          <v-responsive max-width="600" min-width="300">
            <v-text-field
            dense
            flat
            hide-details
            solo-inverted
            v-model="searchname" @keyup.enter="gosearch()"
            ></v-text-field>
          </v-responsive>
        </v-card>
        <!-- 连续的意义不明的空格 -->
        <v-spacer></v-spacer>
         <v-spacer></v-spacer>
         <!-- 功能键组合 -->
        <v-btn icon v-if="$vuetify.theme.dark==false" @click="changedark()"><v-icon>mdi-weather-night</v-icon></v-btn>
        <v-btn icon v-if="$vuetify.theme.dark==true" @click="changedark()"><v-icon>mdi-white-balance-sunny</v-icon></v-btn>
        <v-menu
      bottom
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          icon
        >
      <v-icon>mdi-bell-ring</v-icon>
        </v-btn>
      </template>

      <v-list> 
        <v-list-item
          >
            <v-list-item-title >番剧更新</v-list-item-title>

            <v-list-item-icon>
              <v-btn @click="register('/mylove')" icon> <v-icon>mdi-dots-horizontal</v-icon></v-btn>
            </v-list-item-icon>
          </v-list-item>
      
        <template  v-for="li,newindex in newanime">
         
          <v-divider v-if="newanime.length!=0"
          :key="newindex"></v-divider>
          
  
          <v-list-item
            v-if="newanime.length!=0"
          :key="newindex"
        > 
        <v-list-item-content >
          <v-list-item-title>{{ li.name }}</v-list-item-title>
          <v-list-item-subtitle>更新至{{ li.last }}</v-list-item-subtitle>
        </v-list-item-content>
           <v-list-item-icon>
          <v-btn @click="goplaynew(li.webindex,li.playurl)" icon><v-icon>mdi-menu-right-outline</v-icon></v-btn> 
        </v-list-item-icon>
        
        </v-list-item>
      
      </template>
     
       
         <v-list-item
         v-if="newanime.length==0"
        >
          <v-list-item-title >暂无更新</v-list-item-title>
          
        </v-list-item>
      </v-list>
    </v-menu>
        <v-btn icon @click="register('/setting')"><v-icon>mdi-cog-outline</v-icon></v-btn>
         <v-btn icon @click="outurl('https://github.com/eventhorizonsky/ezanime-ui')"><v-icon>mdi-github</v-icon></v-btn>
      </v-container>
    </v-app-bar>
    <!-- 窄屏appbar -->
    <v-app-bar app color="primary" flat v-if="$vuetify.breakpoint.smAndDown">
      <!-- 侧边栏开关 -->
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    <!-- 意义不明的空格 -->
        <v-spacer></v-spacer>
    <!-- 搜索框 -->
        <v-card>
          <v-responsive max-width="260">
            <v-text-field  v-model="searchname" @keyup.enter="register('about?name='+searchname)" dense flat hide-details solo-inverted></v-text-field>
          </v-responsive>
        </v-card>
        <v-spacer></v-spacer>
        <!-- 功能键组合 -->
        <v-btn icon v-if="$vuetify.theme.dark==false" @click="changedark()"><v-icon>mdi-weather-night</v-icon></v-btn>
        <v-btn icon v-if="$vuetify.theme.dark==true" @click="changedark()"><v-icon>mdi-white-balance-sunny</v-icon></v-btn>
             <v-menu
      bottom
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          icon
        >
      <v-icon>mdi-bell-ring</v-icon>
        </v-btn>
      </template>

      <v-list> 
        <v-list-item
          >
            <v-list-item-title >番剧更新</v-list-item-title>

            <v-list-item-icon>
              <v-btn @click="register('/mylove')" icon> <v-icon>mdi-dots-horizontal</v-icon></v-btn>
            </v-list-item-icon>
          </v-list-item>
      
        <template  v-for="li,newindex in newanime">
         
          <v-divider v-if="newanime.length!=0"
          :key="newindex"></v-divider>
          
  
          <v-list-item
            v-if="newanime.length!=0"
          :key="newindex"
        > 
        <v-list-item-content >
          <v-list-item-title>{{ li.name }}</v-list-item-title>
          <v-list-item-subtitle>更新至{{ li.last }}</v-list-item-subtitle>
        </v-list-item-content>
           <v-list-item-icon>
          <v-btn @click="goplaynew(li.webindex,li.playurl)" icon><v-icon>mdi-menu-right-outline</v-icon></v-btn> 
        </v-list-item-icon>
        
        </v-list-item>
      
      </template>
     
       
         <v-list-item
         v-if="newanime.length==0"
        >
          <v-list-item-title >暂无更新</v-list-item-title>
          
        </v-list-item>
      </v-list>
    </v-menu>
    </v-app-bar>
 <!-- 侧边栏 -->
<v-navigation-drawer v-model="drawer" temporary fixed>
  <v-list nav dense>
    <v-list-item-group  active-class="accent">
      <v-list-item v-for="link in links"
          :key="link.name"
          text
          @click="register(link.href)" >
          {{ link.name }}
      </v-list-item>
    </v-list-item-group>
  </v-list>

  
</v-navigation-drawer>

    <v-main class="secondary pb-14">
    <!-- 主页面 -->
    <router-view></router-view>
                     <v-btn
                     @click="refresh()"
  color="accent"
  dark
               
                bottom
                fixed
                class="mb-14"
                right
                fab
><v-icon>mdi-refresh </v-icon></v-btn>
    </v-main>
    
  <v-bottom-navigation v-if="$vuetify.breakpoint.smAndDown" color="accent" fixed  grow>
    <v-btn  icon @click="register('/')">
      <span>首页</span>

      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn icon @click="register('/mylove')">
      <span>追番</span>

      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-btn icon @click="register('/setting')" >
      <span>设置</span>

      <v-icon>mdi-tune</v-icon>
    </v-btn>

    
  </v-bottom-navigation>
  </v-app>


</template>

<script>
  export default {
    data: () => ({
      searchname:"",
      drawer: false,//侧边栏开关
      websitesrule:null,//暂存获取的json配置文件
      bungumi:[],
      newanime:[],
      links: [
        { name:'首页',href:"/"},
        { name: '推荐', href: "/recommend" },
        { name: '追番', href: "/mylove" },
        { name: '观看历史', href: "/history" },
      ],//导航链接
  }), 
  created(){
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
          this.loadunread()
        }).catch(function (error) { // 请求失败处理
          console.log(error);
        });
  }
  ,methods: {
    outurl(url){
 window.open(url)
    },
      register(href) {//重定向用的

        this.$router.push(href)

      },refresh() {
      window.location.reload();
    },
      gosearch(){
window.location.href='about?name='+this.searchname
      },
      changedark(){//切换白天夜间模式
        this.$vuetify.theme.dark=!this.$vuetify.theme.dark
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
    loadunread(){
       for(let i = 0; i < this.bungumi.length; i++ ){
            
        for(let j = 0; j < this.bungumi[i].list.length; j++ ){
          if(this.bungumi[i].list[j].read==false){
            var obj={webindex:i,name:this.bungumi[i].list[j].name,last:this.bungumi[i].list[j].subtxt,playurl:this.bungumi[i].list[j].playurl}
            this.newanime.push(obj)}
        }}
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