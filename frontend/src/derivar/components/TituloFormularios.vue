<template>
    <div class="row justify-content-md-center">
        <div class="col-2 mx-5">
            <img src="../../assets/escudo.png" width="120" alt="">
        </div>
        <div class="col align-self-center">
            <p class="letra">{{texto}}</p>
        </div>
        <div class="col-2">
            <img src="../../assets/logo.png" width="100" alt="">
        </div>
    </div>
</template>
<script>
export default {
    props:{
        texto:String
    }
}
</script>
<style scoped>
.margen{
    border: 3px ghostwhite solid;
    background-color: ghostwhite;
}
.letra{
    font-weight: bold;
    font-size: 15px;
}
</style>