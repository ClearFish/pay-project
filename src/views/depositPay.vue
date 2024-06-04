<template>
    <div style="width:100%;height:100%">
        <iframe :src="link" frameborder="0" style="width:100%;height:100%"></iframe>
    </div>
</template>
<script setup>
import {ref} from "vue"
let link = ref('')
link.value = window.location.href.split("link=")[1]
</script>
<style lang="scss" scoped>

</style>