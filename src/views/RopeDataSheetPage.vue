<template>
  <v-container>
    <v-row>
      <v-col cols="12" xl="6" lg="6" md="12" sm="12">
        <rope-data-sheet-form @on-form-changed="form = $event"></rope-data-sheet-form>
      </v-col>
      <v-col cols="12" xl="6" lg="6" md="12" sm="12">
        <rope-data-sheet-preview v-if="form != null" :rope-form.sync="form"></rope-data-sheet-preview>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RopeDataSheetForm from "@/components/RopeDataSheetForm.vue";
import RopeDataSheetPreview from "@/components/RopeDataSheetPreview.vue";
import { RopeDataSheet } from "@/model/RopeDataSheet";

@Component({
  components: {
    RopeDataSheetPreview,
    RopeDataSheetForm,
  },
})
export default class RopeDataSheetPage extends Vue {
  form: RopeDataSheet | null = null;
}
</script>
