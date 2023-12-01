<template>
  <div class="step">
    <div class="step-list" v-for="(item, index) in stepList" :key="index">
      <div class="step-item">
        <span class="step-divider"></span>
        <div class="step-item-name" :class="{'active-text': step == item.num}">{{item.list}}</div>
        <span 
          class="step-item-position"
          :class="{'active': step == item.num}"
        >{{item.num}}</span>
      </div>
    </div>
    <div class="row"><div class="col-md-12 mt-2">&nbsp;</div></div>
  </div>  
</template>

<script>
import { useInicioStore } from '@/stores/useInicioStore'

export default {
  props: { 
    step: Number
  },
  setup(props){
    let sInicio = useInicioStore();
    let stepList = [
      { num: 1, list: 'TRÁMITE' }, 
      { num: 2, list: 'REQUISITOS' }, 
      { num: 3, list: 'DATOS ADICIONALES' }, 
      { num: 4, list: 'DOCUMENTOS' }
    ]

    return { stepList }
  }
}
</script>
