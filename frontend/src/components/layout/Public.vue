<template>
  <div class="login-bg">
      <div class="container ">
        <div class="row">
        <div class="col-12 mt-3">
         <language-changer/>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-12 mt-5">
          <div class="title login-title-vv text-center">
            <h1>{{ $t('ventanilla_virtual') }}</h1>
            <h3>DIRECCIÓN GENERAL DE MIGRACIÓN </h3>
          </div>
        </div>  

        <div class="col-12 col-md-12">
          <div id="public-content">
            <div class="content-body">
              <div class="card">
                <div class="card-body"> 
                  <router-view></router-view>
                </div>
              </div>
              <p class="credencial">DIRECCIÓN GENERAL DE MIGRACIÓN &copy; 2023<br> v1.0</p>
          </div>
          </div>
          
        </div>
      </div>

    
    </div>  
  </div>
  
</template>

<script>
import LanguageChanger from '../LanguageChanger.vue';



export default {
  components: {
    LanguageChanger
}
}
</script>

