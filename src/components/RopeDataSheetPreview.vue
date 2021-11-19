<template>
  <v-card outlined>
    <v-card-title>Preview</v-card-title>
    <v-card-text>
      <v-container>
        <pdf :src="pdfSource"></pdf>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        :href="pdfSource"
        :download="filename"
        @click="filename = createFilename()"
      >
        Download
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, PropSync, Vue, Watch } from "vue-property-decorator";
import { RopeDataSheet } from "@/model/RopeDataSheet";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { ContentTable, TDocumentDefinitions } from "pdfmake/interfaces";
import { DateTime } from "luxon";
import pdf from "vue-pdf";

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

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

  async generatePdf(): Promise<void> {
    const docDefinition: TDocumentDefinitions = {
      pageSize: "A4",
      content: [
        {
          text: "Corderia e Stoppificio di Minetti G. & Co.",
          style: ["header", "spacer"],
        },
        {
          text: "ROPE DATA SHEET - SPECIFICHE TECNICHE CORDA",
          style: ["title", "spacer"],
        },
        {
          table: {
            widths: ["auto", "*", "auto", "*"],
            body: [
              [
                {
                  text: [
                    "Manufacturer or Supplier",
                    "\n",
                    { text: "Fabbricante o Fornitore", italics: true },
                  ],
                },
                { text: this.form.manufacturer, colSpan: 3 },
                {},
                {},
              ],
              [
                {
                  text: [
                    "Work order No.",
                    "\n",
                    { text: "Commessa N.", italics: true },
                  ],
                },
                { text: "", colSpan: 3 },
                {},
                {},
              ],
              [
                {
                  text: [
                    "Purchaser",
                    "\n",
                    { text: "Committente", italics: true },
                  ],
                },
                { text: this.form.purchaser, colSpan: 3 },
              ],
              [
                {
                  text: [
                    "Order No.",
                    "\n",
                    { text: "Ordine N.", italics: true },
                  ],
                },
                { text: this.form.orderNumber },
                {
                  text: [
                    "Intender for",
                    "\n",
                    { text: "Destinazione", italics: true },
                  ],
                },
                { text: this.form.intenderFor },
              ],
            ],
          },
          style: "spacer",
        } as ContentTable,
        {
          table: {
            widths: ["auto", "*", "auto", "*"],
            body: [
              [
                {
                  text: [
                    "Material (type of fibre)",
                    "\n",
                    { text: "Materiale (tipo di fibra)", italics: true },
                  ],
                },
                { text: this.form.ropeSpec?.materialType, colSpan: 3 },
                {},
                {},
              ],
              [
                {
                  text: [
                    "Length (m)",
                    "\n",
                    { text: "Lunghezza", italics: true },
                  ],
                },
                { text: this.form.ropeLength + " mt." },
                {
                  text: [
                    "Mass of the rope",
                    "\n",
                    { text: "Massa del cavo", italics: true },
                  ],
                },
                { text: this.form.ropeMass + " kg" },
              ],
              [
                {
                  text: [
                    "Linear mass (g/m)",
                    "\n",
                    { text: "Massa lineare", italics: true },
                  ],
                },
                { text: this.form.linearMass + " g/m" },
                {
                  text: ["Diameter", "\n", { text: "Diametro", italics: true }],
                },
                { text: this.form.ropeSpec?.diameter + " mm" },
              ],
              [
                {
                  text: [
                    "Number and type of yarns",
                    "\n",
                    { text: "Numero e tipo dei fili", italics: true },
                  ],
                },
                { text: this.form.yarnsNumberAndType },
                {
                  text: [
                    "Number of strands",
                    "\n",
                    { text: "Numero dei legnoli", italics: true },
                  ],
                },
                { text: this.form.strandsNumber },
              ],
              [
                {
                  text: [
                    "Lay",
                    "\n",
                    { text: "Senso di avvolgimento", italics: true },
                  ],
                },
                { text: this.form.lay },
                {
                  text: [
                    "Minimum breaking strength",
                    "\n",
                    { text: "Carico di rottura minimo", italics: true },
                  ],
                },
                { text: this.form.minimumBreakingStrength + "kN" },
              ],
            ],
          },
          style: "spacer",
        } as ContentTable,
        {
          alignment: "justify",
          columns: [
            {
              text: "Rossiglione, " + DateTime.now().toLocaleString(),
              fontSize: 14,
            },
            {
              text: [
                "production manager",
                " / ",
                { text: "responsabile di produzione", italics: true },
                "\n\n\n",
                "________________________________________________",
              ],
              alignment: "right",
              fontSize: 10,
            },
          ],
        },
      ],
      footer: {
        columns: [
          {
            text: [
              "Corderia e Stoppificio di Minetti G. & Co. S.a.s.\n",
              "Piazza Marconi 4, Rossiglione 16010, Genova, ITALY\n",
              "Phone: (+39) 010 925 210 - (+39) 329 944 5215\n",
              {
                text: "info@corderiaminetti.it",
                link: "mailto:info@corderiaminetti.it",
              },
              { text: " | " },
              {
                text: "www.corderiaminetti.it",
                link: "www.corderiaminetti.it",
              },
            ],
            style: "footer",
          },
        ],
      },
      styles: {
        header: {
          fontSize: 12,
          alignment: "right",
          color: "grey",
        },
        footer: {
          fontSize: 12,
          alignment: "right",
          color: "grey",
          margin: [50, -45],
        },
        title: {
          fontSize: 18,
          alignment: "center",
        },
        spacer: {
          margin: [0, 0, 0, 30],
        },
      },
    };

    pdfMake
      .createPdf(docDefinition)
      .getDataUrl((url) => (this.pdfSource = url));
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
