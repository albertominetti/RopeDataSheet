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
              readonly
            ></v-text-field>
          </v-col>
          <v-col :xl="6" :lg="6" :md="12" :sm="12" cols="12">
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
import { httpClient } from "@/mixins/HttpClient";
import { RopeSpec } from "@/model/RopeSpec";
import _ from "lodash";

@Component
export default class RopeDataSheet extends Vue {
  private purchaser = "";
  private orderNumber = "";
  private intenderFor = "";
  private selectedRopeSpec: RopeSpec | null = null;
  private ropeLength = 200;
  private ropeMass = 0;
  private linearMass = 0;
  private yarnsNumberAndType = "";

  private minimumBreakingStrength = "";
  private allRopeSpecs: RopeSpec[] = [];

  async mounted(): Promise<void> {
    let response = await httpClient.get("data/rope-specs.json");
    this.allRopeSpecs = response.data.ropeSpecs;
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

  generateAndDownloadPDF(): void {
    alert("Not Implemented yet!");
  }

  get aggregatedRopeSpecs(): any {
    let ropeSpecsByMaterial = _.groupBy(this.allRopeSpecs, "materialType");

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
