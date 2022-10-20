<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="primary"
      flat
       v-if="$vuetify.breakpoint.mdAndUp" 
    >
      <v-container class="py-0 fill-height">
        <v-avatar
          class="mr-10"
          size="32"
          
        ><img
            alt="Avatar"
            src="https://www.ezsky.xyz/wp-content/uploads/2020/07/blackhole.png"
          ></v-avatar>
          
        
        <v-btn
        
          v-for="link in links"
          :key="link.name"
          text
          @click="register(link.href)"
        >
          {{ link.name }}
        </v-btn>

        <v-spacer></v-spacer>
        <v-card>
        <v-responsive max-width="600" min-width="300">
          <v-text-field
            dense
            flat
            hide-details
            
            solo-inverted
          ></v-text-field>
        </v-responsive></v-card>
        <v-spacer></v-spacer>
         <v-spacer></v-spacer>
        <v-btn icon v-if="$vuetify.theme.dark==false" @click="changedark()"><v-icon>mdi-weather-night</v-icon></v-btn>
        <v-btn icon v-if="$vuetify.theme.dark==true" @click="changedark()"><v-icon>mdi-white-balance-sunny</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-bell-ring</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-cog-outline</v-icon></v-btn>
        
         <v-btn icon><v-icon>mdi-account</v-icon></v-btn>
        
      </v-container>
    </v-app-bar>
<v-app-bar app color="primary" flat v-if="$vuetify.breakpoint.smAndDown">
<v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
<v-spacer></v-spacer>
<v-card>
<v-responsive max-width="260">
  <v-text-field dense flat hide-details solo-inverted></v-text-field>
</v-responsive></v-card>
<v-spacer></v-spacer>
        <v-btn icon v-if="$vuetify.theme.dark==false" @click="changedark()"><v-icon>mdi-weather-night</v-icon></v-btn>
        <v-btn icon v-if="$vuetify.theme.dark==true" @click="changedark()"><v-icon>mdi-white-balance-sunny</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-bell-ring</v-icon></v-btn>
</v-app-bar>
<v-navigation-drawer v-model="drawer" absolute temporary>

  <v-list nav dense>
    <v-list-item-group v-model="group" active-class="primary--text text--accent-4">
      <v-list-item v-for="link in links"
          :key="link.name"
          text
          @click="register(link.href)"
        >
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
    
              <router-view></router-view><!--  -->
         
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      group:null,
      links: [
        { name:'首页',href:"/"},
        { name: '推荐', href: "/recommend" },
        { name: '追番', href: "/mylove" },
        { name: '观看历史', href: "/history" },
      ],
  }), methods: {
      register(href) {


        this.$router.push(href)


      },
      changedark(){
        this.$vuetify.theme.dark=!this.$vuetify.theme.dark
      },
      back(){
        this.$router.go(-1)
      }

  }
  }
</script>