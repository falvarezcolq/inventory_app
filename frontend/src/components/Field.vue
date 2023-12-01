<template>
  <div>
    <div class="busqueda">
      <div class="busqueda_seccion">
        <p class="title">{{titulo}}</p>
        <!--Load Content-->
        <slot></slot>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titulo: String
  },
  setup () {
    return {}
  }
}
</script>