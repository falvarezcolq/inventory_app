<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default{
  setup(){
    let { currentRoute } = useRouter();
    let layout = computed( () => `${currentRoute.value.meta.layout}-layout`)

    return { layout }
  }
}

</script>
