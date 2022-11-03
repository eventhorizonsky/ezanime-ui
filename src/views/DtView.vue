<template>
    <iframe width="100%" height="100%" src="https://pro.ascepan.top/player/?url=atHiRa0nccHiMw6aLnyg9lwuYoW4uYWNnbnlhLmNvbS9kL20zdTgvMjAyMi8xMC9mdXUvZnV1ZnVpam91a29pYml0b21pbWFuMDQubTN1OAO0O0OO0O0O" frameborder="0"></iframe>
</template>
<script>
export default{
     data() {
        return {
        text:""}
     },
     created(){
        this.$axios
        .get('/acgnya/vodplay/2084-1-4/')
        .then(
        response => {
         
          this.text=response.data
          
        }).catch(function (error) { // 请求失败处理
          console.log(error);
        });
     }
}
</script>