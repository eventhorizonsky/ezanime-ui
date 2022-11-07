<template>
       <v-container>
        <v-row>
            <v-col md="12">
             <v-card
        class="mx-auto"
        max-width="auto">
        
         <v-container>
            <h1 style="text-align: center">设置</h1>
            <v-divider></v-divider>
            <v-spacer class="mx-auto mt-8"></v-spacer>
        <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="accent"
          dark
          v-bind="attrs"
          v-on="on"
        >
       清除本地数据
        </v-btn>
      </template>

      <v-card>
      
         <v-card-title class="text-h5 grey lighten-2">
          提示
        </v-card-title>
        <v-card-text>
        这将删除你本地存储的所有追番数据，确定删除吗
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="accent"
            text
            @click="dialog = false"
          >
            取消
          </v-btn>
          <v-btn
            color="accent"
            text
            @click="deleteall()"
          >
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
      <v-icon  v-bind="attrs"
          v-on="on">mdi-information-outline</v-icon>
      </template>
      <span>这将清除你本地存储的所有数据</span>
    </v-tooltip>{{usesize}}
    <h1 style="text-align: center">关于 </h1>
     <v-divider></v-divider>
    <v-container id="markdown"> </v-container>
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
          color="accent"
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
import { marked }  from 'marked'
export default {
  name: '',
  data () {
   return {
    attrs:false,
     snackbar:false,
    timeout:2000,
    snaptext:"",
    usesize:"",
    dialog:false
   }
  },
  created(){
        this.getUseSize()
             this.$axios
        .get('https://cdn.jsdelivr.net/gh/eventhorizonsky/ezanime-ui/README.md')
        .then(
        response => {
            $("#markdown").append(marked.parse(response.data))
          
          
        }).catch(function (error) { // 请求失败处理
          console.log(error);
        });
  },
  methods:{
    deleteall(){
        localStorage.clear()
        this.dialog = false
        this.snaptext="删除成功"
        this.snackbar=true
    },
    getUseSize() {
  var size = 0;
  for(var item in localStorage) {
    if(window.localStorage.hasOwnProperty(item)) {
      size += localStorage.getItem(item).length;
    }
  }
  this.usesize='使用：' +  (size / 1024).toFixed(2) + 'KB'
}

  }
}
</script>

<style>
#markdown img{ width: -webkit-fill-available;}
#markdown li{list-style:none}
</style>