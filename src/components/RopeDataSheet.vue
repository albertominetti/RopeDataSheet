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
              label="Diametro(mm)"
              dense
              outlined
              @change="onDiameterChange()"
            >
            </v-select>
          </v-col>
          <v-col>
            <v-select
              :items="material"
              label="Materiale(tipo di fibra)"
              dense
              outlined
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="ropeLength"
              type="number"
              label="Lunghezza(m)"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="linearMass"
              type="number"
              label="Massa Lineare(g/m)"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="ropeMass"
              type="number"
              label="Massa del cavo(kg)"
              dense
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="yarnsNumberAndType"
              label="Numero e tipo dei fili"
              dense
              outlined
              readonly
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="minimumBreakingStrength"
              label="Carico di rottura minimo(kN)"
              dense
              outlined
              readonly
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

@Component
export default class RopeDataSheet extends Vue {
  private purchaser = "";
  private orderNumber = "";
  private intenderFor = "";
  private diameters: number[] = [22, 23, 24];
  private material: string[] = ["SISAL", "POLYPROPYLENE", "POLIESTERE"];
  private ropeLength = 200;
  private linearMass = 0;
  private yarnsNumberAndType = "";
  private minimumBreakingStrength = "";

  onDiameterChange(): void {
    console.log("Diameter changed.");
  }

  generateAndDownloadPDF(): void {
    alert("Not Implemented yet!");
  }

  get ropeMass(): number {
    return (this.ropeLength * this.linearMass) / 1000;
  }

  set ropeMass(ropeMass: number) {
    console.log("Rope Mass value: ", ropeMass);
  }
}
</script>

<style scoped></style>
