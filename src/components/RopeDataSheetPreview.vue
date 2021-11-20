<template>
  <v-card outlined>
    <v-card-title>Preview</v-card-title>
    <v-card-text>
      <v-container>
        <pdf :src="pdfSource" style="border: 1px solid"></pdf>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" :href="pdfSource" :download="filename" @click="filename = createFilename()">
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

  generatePdf(): void {
    console.log("Generating PDF...");
    const pdfDefinition = getRopeDataSheet(this.form);
    pdfMake.createPdf(pdfDefinition).getDataUrl((url) => (this.pdfSource = url));
  }

  createFilename(): string {
    return "ROPE_DATA_SHEET_" + DateTime.now().toMillis() + ".pdf";
  }

  @Watch("form", { immediate: true, deep: true })
  onFormChanged(): void {
    this.generatePdf();
  }
}
</script>

<style scoped></style>
