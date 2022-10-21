<!-- 首页 -->
<template>
    <v-container>
      
        <v-row>
          <v-col cols="12" md="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item-group v-model="airDay" color="accent">
                <v-list-item
                  
                  v-for=" item,index in thedays"
                  :key="index"
                  link
                  @click="airDay=index"
                >
                  <v-list-item-content>
                    <v-list-item-title :key="index">
                      星期 {{ item }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                </v-list-item-group>
            

              </v-list>
            </v-sheet>
          </v-col>

          <v-col cols="12" md="10">
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
  <v-card
    class="mx-auto"
    max-width="auto"
  >
  <v-container fluid>
      <v-row dense>
        <template v-for="card in cards">
          
        <v-col
        v-if="card.airDay==airDay"
          :key="card.animeTitle+airDay"
          :cols="6"
          :md="3"
        >
          <v-card
          >
          <v-card @click="register('/about?id='+card.animeId+'&name='+card.animeTitle)">
            <v-img
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              :src="card.imageUrl"
              class="white--text align-end"
              height="300px"
            >
             <v-card-title class="pb-0" v-text="card.animeTitle">
      
    </v-card-title>
            </v-img>
</v-card>
    
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>

        </v-col>
      </template>
      </v-row>
    </v-container>
  </v-card>
</v-sheet>
          </v-col>
        </v-row>

      </v-container>
</template>
<script>

  export default {
    data: () => ({
      cards: null,
      thedays: ["日", "一","二","三","四","五","六"],
      airDay:new Date().getDay(),
    }),
  mounted () {
    this.$axios
      .get('https://api.dandanplay.net/api/v2/bangumi/shin?filterAdultContent=false')
      .then(response => (this.cards = response.data.bangumiList))
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });

  }, methods: {
    register(href) {

      this.$router.push(href)


    }
  }
  }
</script>