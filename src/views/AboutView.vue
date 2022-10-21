<template>
  <v-container>
  <v-row>
  <v-col cols="12" md="3" v-if="bungumi!=null">
     <v-card
    class="mx-auto"
  >
    <v-img
      :src="bungumi.imageUrl"
    ></v-img>
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
    <v-expansion-panel
    >
      <v-expansion-panel-header>
        详细信息
      </v-expansion-panel-header>
      <v-expansion-panel-content>
             <p v-for="item in bungumi.metadata"
      :key="item">
        {{item}}</p>
      </v-expansion-panel-content>
    </v-expansion-panel>
        <v-expansion-panel
    >
      <v-expansion-panel-header>
        番剧介绍
      </v-expansion-panel-header>
      <v-expansion-panel-content>
             <p>
        {{bungumi.summary }}</p>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>




  </v-card>
  </v-col>
  <v-col  cols="12" :md=md>
      <v-card
    class="mx-auto"
    max-width="auto"
  >
  <v-container fluid>
    <v-row><v-col cols="12" md="8">
  <v-tabs
          v-model="tab"
          align-with-title
          color="accent"
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>
     <v-tab
            v-for="website in websites"
            :key="website.name"
          >
            {{ website.name}}
          </v-tab>
          </v-tabs>
          </v-col>
          <v-col v-if="bungumi!=null"  cols="12" md="4">
               <v-card>
        
            <v-text-field dense flat hide-details solo-inverted v-model="searchname" @keyup.enter="loadlist(searchname)"></v-text-field>
         
        </v-card>
          </v-col>
</v-row>
  
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="website,index in websites"
        :key="index"
      >
               <v-container fluid >
                
                <v-overlay :value="overlay"  :absolute="true">    <v-progress-circular
      indeterminate
      color="amber"
    ></v-progress-circular></v-overlay>
        <template>
          <v-row>
        <v-col  v-for="li in website.list"
        :key="li.id"
          :cols="6"
          :md="3"
        >
          <v-card
          >
          <v-card @click="gourl(li.id,index)">
            <v-img
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              :src="li.pic"
              class="white--text align-end"
              height="200px"
            >
             <v-card-title class="pb-0" v-text="li.name">
      
    </v-card-title>
            </v-img>
</v-card>
                  <v-spacer></v-spacer>
                      <v-expansion-panels accordion>
    <v-expansion-panel
    >
      <v-expansion-panel-header>
        更新信息
      </v-expansion-panel-header>
      <v-expansion-panel-content>




  <v-list
        subheader
        two-line
         v-if="website.loaded"
      >

   <template  v-for="thesub,index in li.sub"
          >
         
        <v-list-item
        v-if="thesub!=''"
         :key="index" 
         class="pa-0"
        >

             
          <v-list-item-content  >

        <span
         
        >更新至{{thesub}}</span>



          </v-list-item-content>
  
          <v-list-item-action>
                <v-btn icon>
                <v-icon>mdi-heart-outline</v-icon>
              </v-btn>
          </v-list-item-action>
            
    
        </v-list-item>
        <template>
         
            <v-divider  v-if="thesub!=''" :key="index"></v-divider>
         
        </template>
          
          
           
         
  </template>
     
      </v-list>


                <v-card-subtitle v-else>正在加载    <v-progress-circular
      indeterminate
      color="amber"
    ></v-progress-circular></v-card-subtitle>


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

  </v-container>
</template>

<script>
export default {
  
  data: () => ({

   md:"8",
    overlay:false,
    searchname:"",
    tab:null,
   bungumi:null,
   omolist:null,
   websitesrule:null,
   loaded:{
    omo:false
   },
   websites:[{name:"omofun",list:[]},{name:"age动漫",list:[]},{name:"555影视",list:[]}]
  }),

  created () {
    if(this.$route.query.id==null){

      this.md="12"
    }else{
    this.$axios
      .get('https://api.dandanplay.net/api/v2/bangumi/'+this.$route.query.id)
      .then(response => (this.bungumi = response.data.bangumi))
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });}
      this.searchname=this.$route.query.name
      this.$axios
      .get('/websites.json')
      .then(response => {this.websitesrule = response.data.websites
      this.loadlist(this.$route.query.name);})
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
     
  }, watch:{
	'$route.query.name': {
		handler(newVal,oldVal){
		loadlist(newVal)
	},
	deep: true
}},methods:{
    gourl(id,website){
      var url=this.websitesrule[website].homeUrl+this.websitesrule[website].dtUrlIdR
      url=url.replace("(\\S+)",id)
      window.open(url)
    },
    loadlist(name){
      this.overlay = !this.overlay
      this.websites=[]
      for(let j = 0; j < this.websitesrule.length; j++ ){
        this.websites.push({name:this.websitesrule[j].name,list:[]})
        var searchurl="/"+this.websitesrule[j].name+this.websitesrule[j].searchUrl.replace("{wd}",name)
       this.$axios
      .get(searchurl)
      .then(response => {

      if(this.websitesrule[j].scVodNode.indexOf("//")!= -1){
        let htmlDom = $(response.data).get(0)

      var scVodId=this.websitesrule[j].scVodNode+this.websitesrule[j].scVodId
      var scVodImg=this.websitesrule[j].scVodNode+this.websitesrule[j].scVodImg
        var scVodName=this.websitesrule[j].scVodNode+this.websitesrule[j].scVodName
         var bug=this.eval(this.websitesrule[j].scVodNode,htmlDom)
        
    
     var scVodImglist=this.eval(scVodImg,htmlDom)
      var  scVodIdlist=this.eval(scVodId,htmlDom)
      var  scVodNamelist=this.eval(scVodName,htmlDom)
      for(let i = 0; i < bug.length; i++){
       var listitem={name:null,id:null,pic:null,sub:[],loaded:false}
      var idrstart= this.websitesrule[j].scVodIdR.indexOf("(")
      var idrend=this.websitesrule[j].scVodIdR.length-this.websitesrule[j].scVodIdR.lastIndexOf(")")-1
      if(idrend==0){listitem.id= scVodIdlist[i].value.slice(idrstart)}else{listitem.id= scVodIdlist[i].value.slice(idrstart,-idrend)}
      listitem.pic= scVodImglist[i].value
       
      listitem.name=scVodNamelist[i].value
      console.log(listitem)
       this.websites[j].list.push(listitem)
       }
      
       } if(this.websitesrule[j].scVodNode.indexOf("json")!= -1){
      var scnode=this.websitesrule[j].scVodNode.replace("json:","")
       for(let i= 0; i < response.data[scnode].length; i++ ){
          var listitem={name:null,id:null,pic:null,sub:[],loaded:false}
          listitem.id = response.data[scnode][i][this.websitesrule[j].scVodId]
          listitem.name = response.data[scnode][i][this.websitesrule[j].scVodName]
          listitem.pic = response.data[scnode][i][this.websitesrule[j].scVodImg]
          this.websites[j].list.push(listitem)
       }
       
        console.log(scnode)
      }
this.overlay = !this.overlay
      this.loadnew(j)
    }
      )
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });}
    },eval(rule,dom){
var xresult = document.evaluate(rule, dom, null, XPathResult.ANY_TYPE, null);
    var xnodes = []; var xres;  while (xres = xresult.iterateNext()) {
        xnodes.push(xres);
    }  return xnodes; 
    },
    loadnew(index){
    for(let j = 0; j < this.websites[index].list.length; j++ ){
      var dturl="/"+this.websitesrule[index].name+this.websitesrule[index].dtUrlIdR.replace("(\\S+)",this.websites[index].list[j].id)
        this.$axios
      .get(dturl)
      .then(response => {
        let htmlDom = $(response.data).get(0);
      
         let dtUrlNode= this.websitesrule[index].dtUrlNode
         let dtUrlSubNode=this.websitesrule[index].dtUrlSubNode
         if(dtUrlNode.indexOf("//")!= -1){
           
         var dtUrlNodelist=this.eval(dtUrlNode,htmlDom)
        console.log(index+":"+dtUrlNodelist.length)
       
         for(let i=1;i<=dtUrlNodelist.length;i++){
         
       var last= $(this.eval(dtUrlNode+"["+i+"]"+dtUrlSubNode,htmlDom).slice(-1)).text()
       this.websites[index].list[j].sub.push(last)
    
         }
          
       
    console.log(this.websites[index].list[j],"sub","更新至"+dtUrlNode[-1])
        
      this.websites[index].loaded=true
         }
         if(dtUrlNode.indexOf("json")!= -1){alert("是json")}
       // var nodes = response.data.evaluate("div[class='module-play-list']", document, null, XPathResult.ANY_TYPE, null);
   
      })
      .catch(function (error) { // 请求失败处理
        console.log(error)
        //this.$set(this.websites[index].list[j],"sub","加载失败，该番剧可能无法在网页端播放")
      });
    }}
    }
  }
</script>
