<template>
  <rope-data-sheet></rope-data-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RopeDataSheet from "@/components/RopeDataSheet.vue";

@Component({
  components: {
    RopeDataSheet,
  },
})
export default class Home extends Vue {}
</script>
