<template>
  <v-card class="pa-2" outlined>
    <v-card-title>Rope Data Sheet</v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col :xl="4" :lg="4" :md="12" :sm="12" cols="12">
          <v-text-field v-model="form.purchaser" label="Committente" dense outlined></v-text-field>
        </v-col>
        <v-col :xl="4" :lg="4" :md="12" :sm="12" cols="12">
          <v-text-field v-model="form.orderNumber" label="Numero Ordine" dense outlined></v-text-field>
        </v-col>
        <v-col :xl="4" :lg="4" :md="12" :sm="12" cols="12">
          <v-text-field v-model="form.intenderFor" label="Destinazione" dense outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-autocomplete
            v-model="form.ropeSpec"
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
          <v-text-field v-model="form.ropeLength" type="number" label="Lunghezza(m)" dense outlined></v-text-field>
        </v-col>
        <v-col :xl="4" :lg="4" :md="12" :sm="12" cols="12">
          <v-text-field
            v-model="form.linearMass"
            type="number"
            label="Massa Lineare(g/m)"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col :xl="4" :lg="4" :md="12" :sm="12" cols="12">
          <v-text-field v-model="form.ropeMass" type="number" label="Massa del cavo(kg)" dense outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col :xl="6" :lg="6" :md="12" :sm="12" cols="12">
          <v-text-field v-model="form.yarnsNumberAndType" label="Numero e tipo dei fili" dense outlined></v-text-field>
        </v-col>
        <v-col :xl="6" :lg="6" :md="12" :sm="12" cols="12">
          <v-text-field
            v-model="form.minimumBreakingStrength"
            type="number"
            label="Carico di rottura minimo(kN)"
            dense
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Emit, Vue, Watch } from "vue-property-decorator";
import { httpClient } from "@/mixins/HttpClient";
import { RopeSpec } from "@/model/RopeSpec";
import _ from "lodash";
import { RopeDataSheet } from "@/model/RopeDataSheet";

@Component
export default class RopeDataSheetForm extends Vue {
  public form: RopeDataSheet = {
    manufacturer: "CORDERIA E STOPPIFICIO DI MINETTI G. E C. S.A.S.",
    purchaser: "",
    orderNumber: "",
    intenderFor: "",
    ropeLength: 200,
    ropeMass: 0,
    linearMass: 0,
    yarnsNumberAndType: "",
    minimumBreakingStrength: 0,
    lay: "Right/Destro",
    strandsNumber: 3,
    ropeSpec: {
      materialType: "Example",
      diameter: 0,
      length: 0,
      weight: 0,
      minimumBreakingStrength: 0,
    } as RopeSpec,
  };

  private ropeSpecs: RopeSpec[] = [];

  async mounted(): Promise<void> {
    this.ropeSpecs = await this.getRopeSpecs();
    if (this.ropeSpecs.length > 0) this.form.ropeSpec = this.ropeSpecs[0];
  }

  private async getRopeSpecs(): Promise<RopeSpec[]> {
    let response = await httpClient.get("static/data/rope-specs.json");
    return response.data.ropeSpecs as RopeSpec[];
  }

  onRopeSpecChange(ropeSpec: RopeSpec): void {
    this.form.ropeLength = ropeSpec.length;
    this.form.ropeMass = ropeSpec.weight;
    let gravityAcceleration = 98;
    let minimumBreakingStrengthKN = ropeSpec.minimumBreakingStrength / gravityAcceleration;
    this.form.minimumBreakingStrength = parseFloat(minimumBreakingStrengthKN.toFixed(1));
    this.form.linearMass = (this.form.ropeMass * 1000) / this.form.ropeLength;
  }

  prettyRopeSpec(ropeSpec: RopeSpec): string {
    return `ø${ropeSpec.diameter} mm ${ropeSpec.materialType} - Peso: ${ropeSpec.weight} Kg - Lunghezza: ${ropeSpec.length} m`;
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

  @Watch("form", { immediate: true, deep: true })
  @Emit()
  onFormChanged(form: RopeDataSheet): RopeDataSheet {
    return form;
  }
}
</script>

<style scoped></style>
