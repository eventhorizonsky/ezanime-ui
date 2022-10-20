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
            ></v-text-field>
          </v-responsive>
        </v-card>
        <!-- 连续的意义不明的空格 -->
        <v-spacer></v-spacer>
         <v-spacer></v-spacer>
         <!-- 功能键组合 -->
        <v-btn icon v-if="$vuetify.theme.dark==false" @click="changedark()"><v-icon>mdi-weather-night</v-icon></v-btn>
        <v-btn icon v-if="$vuetify.theme.dark==true" @click="changedark()"><v-icon>mdi-white-balance-sunny</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-bell-ring</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-cog-outline</v-icon></v-btn>
         <v-btn icon><v-icon>mdi-account</v-icon></v-btn>
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
            <v-text-field dense flat hide-details solo-inverted></v-text-field>
          </v-responsive>
        </v-card>
        <v-spacer></v-spacer>
        <!-- 功能键组合 -->
        <v-btn icon v-if="$vuetify.theme.dark==false" @click="changedark()"><v-icon>mdi-weather-night</v-icon></v-btn>
        <v-btn icon v-if="$vuetify.theme.dark==true" @click="changedark()"><v-icon>mdi-white-balance-sunny</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-bell-ring</v-icon></v-btn>
    </v-app-bar>
 <!-- 侧边栏 -->
<v-navigation-drawer v-model="drawer" absolute temporary>
  <v-list nav dense>
    <v-list-item-group v-model="group" active-class="primary--text text--accent-4">
      <v-list-item v-for="link in links"
          :key="link.name"
          text
          @click="register(link.href)" >
          {{ link.name }}
      </v-list-item>
    </v-list-item-group>
  </v-list>
  <div class="pa-2">
    <v-btn block>
      设置
    </v-btn>
  </div>
  <div class="pa-2">
    <v-btn block>
      登录
    </v-btn>
  </div>
</v-navigation-drawer>
    <v-main class="secondary">
    <!-- 主页面 -->
    <router-view></router-view>
         
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,//侧边栏开关
      group:null,//list group 话说这个是啥，忘了
      links: [
        { name:'首页',href:"/"},
        { name: '推荐', href: "/recommend" },
        { name: '追番', href: "/mylove" },
        { name: '观看历史', href: "/history" },
      ],//导航链接
  }), methods: {
      register(href) {//重定向用的

        this.$router.push(href)

      },
      changedark(){//切换白天夜间模式
        this.$vuetify.theme.dark=!this.$vuetify.theme.dark
      }
  }
  }
</script>