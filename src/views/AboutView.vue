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

        <v-expansion-panels>
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
  <v-col  cols="12" md="9">
      <v-card
    class="mx-auto"
    max-width="auto"
  >
  <v-container fluid>
  <v-tabs
          v-model="tab"
          align-with-title
          color="accent"
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>
     <v-tab
            v-for="website in websites"
            :key="website"
          >
            {{ website}}
          </v-tab>
          </v-tabs>
      <v-row dense>
        <v-container fluid>
        <template>
          
        <v-col
          :cols="6"
          :md="3"
        >
          <v-card  v-for="li in omolist"
        :key="li.id"
          >
          <v-card @click="gourl(li.id)">
            <v-img
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              :src="li.pic"
              class="white--text align-end"
              height="300px"
            >
             <v-card-title class="pb-0" v-text="li.name">
      
    </v-card-title>
            </v-img>
</v-card>
    
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-card-subtitle v-if="loaded.omo">{{li.sub}}</v-card-subtitle>
                <v-card-subtitle v-else>加载番剧详情...</v-card-subtitle>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

            </v-card-actions>
          </v-card>
          
        </v-col>
      </template>
      </v-container>
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
   bungumi:null,
   omolist:null,
   loaded:{
    omo:false
   },
   websites:["omofun","age动漫","555影视"]
  }),beforeCreate () {
    this.$axios
      .get('https://api.dandanplay.net/api/v2/bangumi/'+this.$route.query.id)
      .then(response => (this.bungumi = response.data.bangumi))
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
        this.$axios
      .get('/omofun/index.php/ajax/suggest?mid=1&wd='+this.$route.query.name)
      .then(response => (this.omolist = response.data.list))
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
  }, methods:{
    gourl(id){
      window.open('https://omofun.tv/vod/detail/id/'+id+'.html')
    }
  },watch:{
    omolist(){
      for(let j = 0; j < this.omolist.length; j++ ){
        this.$axios
      .get('/omofun/vod/detail/id/'+this.omolist[j].id+'.html')
      .then(response => {
        let htmlDom = $(response.data);
         let dtUrlNode= "//div[@class='module-play-list']/div"
         let dtUrlSubNode="/a"
         if(dtUrlNode.indexOf("//")!= -1){
          dtUrlNode=dtUrlNode+dtUrlSubNode
        dtUrlNode=  dtUrlNode.replace("//","/")
         dtUrlNode=  dtUrlNode.replace("@","")
        dtUrlNode=   dtUrlNode.split("/")
        let x=""
        
      for(let i = 0; i < dtUrlNode.length; i++){
        x=x+" "+ dtUrlNode[i]
       }
       console.log(x)
      let subList= htmlDom.find(x)
        this.$set(this.omolist[j],"sub","更新至"+subList.last().text())
       this.$set(this.loaded,"omo",true)
       //alert(htmlDom.toString)
       console.log(subList.html())
         }
         if(dtUrlNode.indexOf("json")!= -1){alert("是json")}
       // var nodes = response.data.evaluate("div[class='module-play-list']", document, null, XPathResult.ANY_TYPE, null);
   
      })
      .catch(function (error) { // 请求失败处理
        this.$set(this.omolist[j],"sub","加载失败，该番剧可能无法在网页端播放")
      });
    }}
  }
    
  }
</script>