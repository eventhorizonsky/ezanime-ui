
<template>
  <v-container>
  <v-row>
    <!-- 侧边弹弹play信息栏 -->
    <v-col cols="12" md="3" v-if="bungumi!=null">
      <v-card
      class="mx-auto">
      <v-img
        :src="bungumi.imageUrl"></v-img>
      <v-card-title>
        {{bungumi.animeTitle}}
      </v-card-title>
      <v-container>
        <v-row>
           <v-chip col="6" class="mx-auto" v-for="tag  in bungumi.tags.slice(0, 2)"
            :key="tag.id"
            label>  {{ tag.name}}</v-chip>
        </v-row>
      </v-container>
      <v-expansion-panels class="pt-5">
        <v-expansion-panel>
          <v-expansion-panel-header>
            详细信息
          </v-expansion-panel-header>
          <v-expansion-panel-content>
          <p v-for="item in bungumi.metadata"
          :key="item">{{item}}</p>
           </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            番剧介绍
          </v-expansion-panel-header>
          <v-expansion-panel-content>
              <p>{{bungumi.summary }}</p>
          </v-expansion-panel-content>
        </v-expansion-panel>
       </v-expansion-panels>
  </v-card>
  </v-col>
  <!-- 搜索结果栏 -->
  <v-col  cols="12" :md=md>
      <v-card
        class="mx-auto"
        max-width="auto">
      <v-container fluid>
      <v-row>
          <!-- 标签栏 -->
        <v-col cols="12" md="8"> 
            <v-tabs
                    v-model="tab"
                    
                    color="accent"
                  >
            <v-tabs-slider color="yellow"></v-tabs-slider>
              <v-tab v-for="website in websites"
                      :key="website.name"
                    > {{ website.name}}
                </v-tab>
            </v-tabs>
          </v-col>
          <!-- 搜索框 -->
          <v-col v-if="bungumi!=null"  cols="12" md="4">
            <v-card>
              <v-text-field dense flat hide-details solo-inverted v-model="searchname" @keyup.enter="loadlist(searchname)"></v-text-field>
            </v-card>
          </v-col>
      </v-row>
    <!-- 搜索结果 -->
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="website,webindex in websites"
        :key="website.name"
      >
      <v-container fluid >
      <!-- 遮罩 -->
      <v-overlay :value="website.overlay"  :absolute=true>
          <v-progress-circular
          indeterminate
          color="amber">
        </v-progress-circular>
      </v-overlay>
      <template>
        <v-row>
          <v-col  v-for="li,animeindex in website.list"
            :key="li.id"
            :cols="6"
            :md="3">
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
            <v-expansion-panels accordion>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  更新信息
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-list
                    subheader
                    two-line
                    v-if="li.loaded"
                    >
                  <template  v-for="thesub,index in li.sub">     
                      <v-list-item
                        v-if="thesub.txt!=''"
                        :key="index" 
                        class="pa-0">
                        <v-list-item-content  >
                           <v-btn
                                color="accent"
                                text
                                @click="goplaynew(webindex,thesub.playurl)"
                              >
                               {{thesub.txt}}
                              </v-btn>
                        </v-list-item-content>
                        <v-list-item-action v-if="!thesub.loved">
                          <v-btn icon @click="love(webindex,li,index,thesub,animeindex)">
                            <v-icon>mdi-heart-outline</v-icon>
                          </v-btn>
                        </v-list-item-action>
                        <v-list-item-action v-if="thesub.loved">
                          <v-btn icon @click="unlove(webindex,li,index,thesub,animeindex)">
                            <v-icon>mdi-heart</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                      <template>
                        <v-divider  v-if="thesub!=''" :key="index+thesub"></v-divider>
                      </template>
                    </template>
                  </v-list>
                  <v-card-subtitle v-else>
                    正在加载
                    <v-progress-circular
                      indeterminate
                      color="amber"></v-progress-circular>
                  </v-card-subtitle>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
          </v-col>
        </v-row>
      </template>
      <div style="height:100px"></div>
      </v-container>
      </v-tab-item>
    </v-tabs-items>
      <v-row dense>

      </v-row>
    </v-container>
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
    md:"8",//搜索栏所占宽度，当无id查询时设置为全屏
    searchname:"",//搜索内容，用于搜索结果内的搜索框展示
    tab:null,//搜索结果标签，由json文件生成
    bungumi:null,//弹弹提供的bungumi结果
    websitesrule:null,//暂存获取的json配置文件
    websites:[]//搜索结果数据
  }),
//创建vm时执行
  created () {
    //【step1】
    //判断搜索弹弹id是否为空，为空则全屏展示搜索结果，不为空则请求弹弹play接口
    if(this.$route.query.id==null){
      this.md="12"
    }else{
      this.$axios
        .get('https://api.dandanplay.net/api/v2/bangumi/'+this.$route.query.id)
        .then(response => (this.bungumi = response.data.bangumi))
        .catch(function (error) { // 请求失败处理
          console.log(error);
        })
      }
    //【step2】
    //将从请求地址获取到的name值赋值给搜索框绑定的searchname
      this.searchname=this.$route.query.name
    //【step3】
    //获取搜索配置json文件，并加载搜索结果
      this.$axios
        .get('/websites.json')
        .then(
        response => {
          this.websitesrule = response.data.websites
          this.loadlist(this.$route.query.name);
        }).catch(function (error) { // 请求失败处理
          console.log(error);
        });
     
  }, 
  //监听
  watch:{
    //监听地址栏的name是否变化，如变化则重新搜索结果
	'$route.query.name': {
		handler(newVal,oldVal){
		loadlist(newVal)
	},
	deep: true
}},
  //方法
  methods:{
    goplaynew(webindex,playurl){
      var url=this.websitesrule[webindex].homeUrl+playurl
      window.open(url)
    },
    //点击搜索结果跳转到对应的详情地址
    gourl(id,website){
      var url=this.websitesrule[website].homeUrl+this.websitesrule[website].dtUrlIdR
      url=url.replace("(\\S+)",id)
      window.open(url)
    },
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
  },
    //取消追番
    unlove(webindex,li,index,thesub,animeindex){
    
      var bh='"bh":'+'"'+li.id+"-"+(index+1)+'"'
      var bungumi=li.id+"-"+(index+1)
      var localbungumi= JSON.parse(localStorage.getItem(this.websitesrule[webindex].name))
      if(JSON.stringify(localbungumi).indexOf(bh)!=-1){
      localbungumi.bungumi=this.delereformlocal(bungumi,localbungumi.bungumi)
      localStorage.setItem(this.websitesrule[webindex].name, JSON.stringify(localbungumi))
      this.snaptext="取消追番成功"
      }else{this.snaptext="bungumi内不包含此番剧"}
      this.websites[webindex].list[animeindex].sub[index].loved=false
      this.snackbar=true
    },
    //添加喜欢的番剧
    love(webindex,li,index,thesub,animeindex){
      var dturl="/"+this.websitesrule[webindex].name+this.websitesrule[webindex].dtUrlIdR
      dturl=dturl.replace("(\\S+)",li.id)
      var playurl=this.websitesrule[webindex].homeUrl+this.websitesrule[webindex].playurl
      playurl=playurl.replace("(\\S+)",li.id).replace("(\\S2+)",index+1).replace("(\\S3+)",thesub.lastsub)
      var bungumi={id:li.id,pic:li.pic,dturl:dturl,bh:li.id+"-"+(index+1),subnode:index+1,name:li.name,lastsub:thesub.lastsub,subtxt:thesub.txt,read:true,playurl:thesub.playurl}
      var init={bungumi:[]}
      if(localStorage.getItem(this.websitesrule[webindex].name)==null||localStorage.getItem(this.websitesrule[webindex].name)=="{}"){localStorage.setItem(this.websitesrule[webindex].name, JSON.stringify(init))}
      var localbungumi= JSON.parse(localStorage.getItem(this.websitesrule[webindex].name))
      localbungumi.bungumi.push(bungumi)
      localStorage.setItem(this.websitesrule[webindex].name, JSON.stringify(localbungumi))
      this.websites[webindex].list[animeindex].sub[index].loved=true  
      this.snaptext="追番成功"
      this.snackbar=true
    },
    //通过关键字搜索番剧
    loadlist(name){
      //初始化搜索结果
      this.websites=[]
      //开始遍历搜索规则，并展开搜索
      for(let j = 0; j < this.websitesrule.length; j++ ){
        //初始化一个站源的搜索结果，并开启搜索中的遮罩
        this.websites.push({name:this.websitesrule[j].name,list:[],overlay:true})
        //拼接搜索url
        var searchurl="/"+this.websitesrule[j].name+this.websitesrule[j].searchUrl.replace("{wd}",name)
        //发起搜索请求，并解析搜索结果
        this.$axios.get(searchurl).then(response => {
            //当搜索规则设定为xpath时
            if(this.websitesrule[j].scVodNode.indexOf("//")!= -1){
              //将搜索结果转为htmldocument
              let htmlDom = $(response.data).get(0)
              //拼接各项的xpath规则
              var scVodId=this.websitesrule[j].scVodNode+this.websitesrule[j].scVodId
              var scVodImg=this.websitesrule[j].scVodNode+this.websitesrule[j].scVodImg
              var scVodName=this.websitesrule[j].scVodNode+this.websitesrule[j].scVodName
              //获取搜索结果节点
              var bug=this.eval(this.websitesrule[j].scVodNode,htmlDom)
              //获取各项的数组
              var  scVodImglist=this.eval(scVodImg,htmlDom)
              var  scVodIdlist=this.eval(scVodId,htmlDom)
              var  scVodNamelist=this.eval(scVodName,htmlDom)
              //遍历节点
              for(let i = 0; i < bug.length; i++){
                  //初始化搜索结果，sub为最新剧集情况
                  var listitem={name:null,id:null,pic:null,sub:[],loaded:false}
                  //根据规则，抽取id
                    //获取规则中(\\S+)的位置
                    var idrstart= this.websitesrule[j].scVodIdR.indexOf("(")
                    var idrend=this.websitesrule[j].scVodIdR.length-this.websitesrule[j].scVodIdR.lastIndexOf(")")-1
                    //抽取id并赋值给搜索结果
                    if(idrend==0){
                      listitem.id= scVodIdlist[i].value.slice(idrstart)
                    }else{
                      listitem.id= scVodIdlist[i].value.slice(idrstart,-idrend)
                    }
                  //抽取img地址和name，并赋值给搜索结果
                  listitem.pic= scVodImglist[i].value
                  listitem.name=scVodNamelist[i].value
                  //将解析好的数据传给对应站源的搜索结果
                  this.websites[j].list.push(listitem)
              }
            }//若搜索规则为json 
            if(this.websitesrule[j].scVodNode.indexOf("json")!= -1){
              var scnode=this.websitesrule[j].scVodNode.replace("json:","")
              //遍历搜索结果的数据，并传递给对应站源
              for(let i= 0; i < response.data[scnode].length; i++ ){
                var listitem={name:null,id:null,pic:null,sub:[],loaded:false}
                listitem.id = response.data[scnode][i][this.websitesrule[j].scVodId]
                listitem.name = response.data[scnode][i][this.websitesrule[j].scVodName]
                listitem.pic = response.data[scnode][i][this.websitesrule[j].scVodImg]
                this.websites[j].list.push(listitem)
              }
            }
          //关闭对应站源的搜索遮罩
          this.websites[j].overlay = !this.websites[j].overlay
          //开始加载对应站源每个搜索结果的最新剧集
          this.loadnew(j)
      }).catch(function (error) { // 请求失败处理
        console.log(error);
      })
    }},
    //根据xpath规则和htmldocument返回对应的节点
    eval(rule,dom){
      var xresult = document.evaluate(rule, dom, null, XPathResult.ANY_TYPE, null);
      var xnodes = [];
      var xres;
      while (xres = xresult.iterateNext()) {
        xnodes.push(xres);
      }return xnodes;
    },
    //加载对应站源(index是站源的索引)的搜索结果的最新剧集
    loadnew(index){
      //遍历对应站源的搜索结果列表
      for(let j = 0; j < this.websites[index].list.length; j++ ){
        //拼接详情页url
        var dturl="/"+this.websitesrule[index].name+this.websitesrule[index].dtUrlIdR.replace("(\\S+)",this.websites[index].list[j].id)
        //向详情页发起请求
        this.$axios.get(dturl).then(response => {
          //获取播放列表的规则
          let dtUrlNode= this.websitesrule[index].dtUrlNode
          //获取剧集列表的规则
          let dtUrlSubNode=this.websitesrule[index].dtUrlSubNode
          //当详情站源规则为xpath时
          if(dtUrlNode.indexOf("//")!= -1){
            //获取htmlducument
            let htmlDom = $(response.data).get(0);
            //获取播放列表节点
            var dtUrlNodelist=this.eval(dtUrlNode,htmlDom)
            //遍历每个播放列表
            for(let i=1;i<=dtUrlNodelist.length;i++){
              //获取对应播放列表的最新剧集，并推送给搜索结果的数据
              var subnode=$(this.eval(dtUrlNode+"["+i+"]"+dtUrlSubNode,htmlDom))
              //初始化追番标记
              var love=false;
              //检测本地数据中是否有此番的追番数据
              if(localStorage.getItem(this.websitesrule[index].name)!=null){
                var localdata=localStorage.getItem(this.websitesrule[index].name)
                var bh='"bh":'+'"'+this.websites[index].list[j].id+"-"+i+'"'
                if(localdata.indexOf(bh)!=-1){love=true
                }
              }
              //获取最新播放页
              var playurl=""
              var last=subnode.slice(-1).text()
              if(last!=""){playurl=$(this.eval(dtUrlNode+"["+i+"]"+dtUrlSubNode+this.websitesrule[index].playurl,htmlDom)).slice(-1)[0].value}
              console.log(playurl)
              var sublast={lastsub:subnode.length,txt:last,loved:love,playurl:playurl}
              this.websites[index].list[j].sub.push(sublast)
            }
            //设置该站源对应搜索结果为已加载
            this.websites[index].list[j].loaded=true
          }
          if(dtUrlNode.indexOf("json")!= -1){
          //当详情页为json规则时，有这种站源的时候再写吧
          }
        }).catch(function (error) { // 请求失败处理
            console.log(error)
        })
      }
    }
  }
}
</script>
