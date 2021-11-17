<template>
  <v-container>
    <v-card class="pa-2">
      <v-card-title>Rope Data Sheet</v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col :xl="4" :lg="4" :md="12" :sm="12" cols="12">
            <v-text-field
              v-model="purchaser"
              label="Committente"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col :xl="4" :lg="4" :md="12" :sm="12" cols="12">
            <v-text-field
              v-model="orderNumber"
              label="Numero Ordine"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col :xl="4" :lg="4" :md="12" :sm="12" cols="12">
            <v-text-field
              v-model="intenderFor"
              label="Destinazione"
              dense
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-autocomplete
              v-model="selectedRopeSpec"
              :items="aggregatedRopeSpecs"
              :item-text="prettyRopeSpec"
              @change="onRopeSpecChange"
              label="Specifiche ruota"
              return-object
              outlined
              dense
            >
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col :xl="4" :lg="4" :md="12" :sm="12" cols="12">
            <v-text-field
              v-model="ropeLength"
              type="number"
              label="Lunghezza(m)"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col :xl="4" :lg="4" :md="12" :sm="12" cols="12">
            <v-text-field
              v-model="linearMass"
              type="number"
              label="Massa Lineare(g/m)"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col :xl="4" :lg="4" :md="12" :sm="12" cols="12">
            <v-text-field
              v-model="ropeMass"
              type="number"
              label="Massa del cavo(kg)"
              dense
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col :xl="6" :lg="6" :md="12" :sm="12" cols="12">
            <v-text-field
              v-model="yarnsNumberAndType"
              label="Numero e tipo dei fili"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col :xl="6" :lg="6" :md="12" :sm="12" cols="12">
            <v-text-field
              v-model="minimumBreakingStrength"
              type="number"
              label="Carico di rottura minimo(kN)"
              dense
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="generateAndDownloadPDF()" color="primary"
          >Genera & Scarica PDF
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { httpClient } from "@/mixins/HttpClient";
import { RopeSpec } from "@/model/RopeSpec";
import _ from "lodash";
import { jsPDF } from "jspdf";
import { DateTime } from "luxon";

@Component
export default class RopeDataSheet extends Vue {
  private manufacturer = "CORDERIA E STOPPIFICIO DI MINETTI G. E C. S.A.S.";
  private purchaser = "";
  private orderNumber = "";
  private intenderFor = "";
  private ropeLength = 200;
  private ropeMass = 0;
  private linearMass = 0;
  private yarnsNumberAndType = "";
  private minimumBreakingStrength = "";
  private lay = "Right/Destro";
  private strandsNumber = 3;

  private ropeSpecs: RopeSpec[] = [];
  private selectedRopeSpec: RopeSpec | null = null;
  private imageTemplate: string | null = null;

  async mounted(): Promise<void> {
    this.ropeSpecs = await this.getRopeSpecs();
    this.imageTemplate = await this.getImageTemplate();
  }

  private async getRopeSpecs(): Promise<RopeSpec[]> {
    let response = await httpClient.get("static/data/rope-specs.json");
    return response.data.ropeSpecs as RopeSpec[];
  }

  private async getImageTemplate(): Promise<string> {
    let response = await httpClient.get("static/images/template.jpg", {
      responseType: "arraybuffer",
    });
    return Buffer.from(response.data, "binary").toString("base64");
  }

  onRopeSpecChange(ropeSpec: RopeSpec): void {
    this.ropeLength = ropeSpec.length;
    this.ropeMass = ropeSpec.weight;
    let gravityAcceleration = 98;
    let minimumBreakingStrengthKN =
      ropeSpec.minimumBreakingStrength / gravityAcceleration;
    this.minimumBreakingStrength = minimumBreakingStrengthKN.toFixed(1);
    this.linearMass = (this.ropeMass * 1000) / this.ropeLength;
  }

  prettyRopeSpec(ropeSpec: RopeSpec): string {
    return `ø${ropeSpec.diameter} mm ${ropeSpec.materialType} - Peso: ${ropeSpec.weight} Kg - Lunghezza: ${ropeSpec.length} m`;
  }

  async generateAndDownloadPDF(): Promise<void> {
    const pdf = new jsPDF({ orientation: "p", unit: "px", format: "a4" });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    if (this.imageTemplate == null)
      throw new Error("Image Template not available.");

    pdf.addImage(this.imageTemplate, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.setFontSize(10);
    pdf.text(this.manufacturer, 150, 116);
    pdf.text(this.purchaser, 150, 196);
    pdf.text(this.orderNumber, 150, 238);
    pdf.text(this.intenderFor, 290, 238);
    const materialType =
      this.selectedRopeSpec != null ? this.selectedRopeSpec.materialType : "";
    pdf.text(materialType, 150, 303);
    pdf.text(this.ropeLength.toString() + " mt.", 150, 345);
    pdf.text(this.ropeMass.toString() + " Kg", 342, 345);
    pdf.text(this.linearMass.toString() + " g/m", 150, 387);
    const diameter =
      this.selectedRopeSpec != null
        ? this.selectedRopeSpec.diameter.toString() + " mm"
        : "";
    pdf.text(diameter, 342, 387);
    pdf.text(this.yarnsNumberAndType, 150, 429);
    pdf.text(this.strandsNumber.toString(), 342, 429);
    pdf.text(this.lay, 150, 470);
    pdf.text(this.minimumBreakingStrength + " kN", 342, 470);
    pdf.setFontSize(11);
    pdf.text(DateTime.now().toLocaleString(), 97, 521);
    pdf.save("rope_data_sheet.pdf");
  }

  get aggregatedRopeSpecs(): any {
    let ropeSpecsByMaterial = _.groupBy(this.ropeSpecs, "materialType");

    return Object.keys(ropeSpecsByMaterial).flatMap((materialType) => {
      let ropeSpecs = ropeSpecsByMaterial[materialType] as any;

      ropeSpecs.unshift({
        header: materialType,
      });

      return ropeSpecs;
    });
  }
}
</script>

<style scoped></style>
