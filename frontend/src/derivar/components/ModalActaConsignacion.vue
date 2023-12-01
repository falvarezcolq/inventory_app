<template>
    <div>ModalActaConsignacion</div>
</template>
<script>
import { ref } from "vue";
export default {
    props:{
        id:String
    },
    setup(props, context){
        const idE=ref(0);
        idE.value=props.id;
        console.log("id",idE.value);
        return{
            idE
        }
    }
}
</script>