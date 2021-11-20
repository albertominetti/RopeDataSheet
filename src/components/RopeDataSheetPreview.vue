<template>
  <v-card outlined>
    <v-card-title>Preview</v-card-title>
    <v-card-text>
      <v-container>
        <v-overlay absolute :value="pdfGenerationTimer.seconds > 0">
          <v-alert type="info" icon="mdi-timer-sand" shaped>
            PDF preview in {{ pdfGenerationTimer.seconds }} seconds...
            <v-progress-linear color="white" indeterminate></v-progress-linear>
          </v-alert>
        </v-overlay>
        <pdf :src="pdfSource" style="border: 1px solid"></pdf>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" :href="pdfSource" :download="filename" @click="filename = createFilename(form)">
        Download
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, PropSync, Vue, Watch } from "vue-property-decorator";
import { RopeDataSheet } from "@/model/RopeDataSheet";
import { DateTime } from "luxon";
import { getRopeDataSheet } from "@/mixins/PdfMakeUtils";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import pdf from "vue-pdf";
import HumanTimer from "human-timer";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  components: {
    pdf,
  },
})
export default class RopeDataSheetPreview extends Vue {
  @PropSync("ropeForm")
  form!: RopeDataSheet;
  pdfSource = "";
  filename = "document.pdf";
  pdfGenerationTimer = new HumanTimer({
    seconds: 2,
    zeroes: false,
    onEnd: () => this.generatePdf(),
  });

  generatePdf(): void {
    console.log("Generating PDF...");
    const pdfDefinition = getRopeDataSheet(this.form);
    pdfMake.createPdf(pdfDefinition).getDataUrl((url) => (this.pdfSource = url));
  }

  createFilename(form: RopeDataSheet): string {
    return "Rope_Data_Sheet_" + form.orderNumber + "_" + form.purchaser + "_" + DateTime.now().toISODate() + ".pdf";
  }

  @Watch("form", { immediate: true, deep: true })
  onFormChanged(): void {
    this.pdfGenerationTimer.restart();
  }
}
</script>

<style scoped></style>
