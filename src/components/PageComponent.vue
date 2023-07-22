<template lang="pug">
.page
  ImageComponent(:src="props.imageUrl")
</template>

<script setup lang="ts">
import ImageComponent from "@/components/ImageComponent.vue" // @ is an alias to /src

let props = defineProps<{
  imageUrl: string
}>()

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.page
  width: 100%
</style>
