<template>
  <v-container>
    <v-card class="pa-2">
      <v-card-title>Rope Data Sheet</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              v-model="purchaser"
              label="Committente"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="orderNumber"
              label="Numero Ordine"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="intenderFor"
              label="Destinazione"
              dense
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              :items="diameters"
              label="Diametro (mm)"
              dense
              outlined
              @change="onDiameterChange()"
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="length"
              label="Lunghezza"
              dense
              outlined
              readonly
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="linearMass"
              label="Massa Lineare"
              dense
              outlined
              readonly
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="yarnsNumberAndType"
              label="Numero e tipo dei fili"
              dense
              outlined
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="ropeMass"
              label="Massa del cavo"
              dense
              outlined
              readonly
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="minimumBreakingStrength"
              label="Carico di rottura minimo"
              dense
              outlined
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="generateAndDownloadPDF()" color="primary"
          >Genera & Scarica PDF</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class RopeDataSheet extends Vue {
  private purchaser = "";
  private orderNumber = "";
  private intenderFor = "";
  private diameters: number[] = [22, 23, 24];
  private length = 0;
  private linearMass = 0;
  private yarnsNumberAndType = "";
  private ropeMass = 0;
  private minimumBreakingStrength = "";

  onDiameterChange(): void {
    this.length = Math.round(Math.random() * 100);
    this.linearMass = Math.round(Math.random() * 100);
    this.yarnsNumberAndType = Math.round(Math.random() * 100).toString();
    this.ropeMass = Math.round(Math.random() * 100);
    this.minimumBreakingStrength = Math.round(Math.random() * 100).toString();
  }
  generateAndDownloadPDF(): void {
    alert("Not Implemented yet!");
  }
}
</script>

<style scoped></style>
