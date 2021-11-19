import { RopeSpec } from "@/model/RopeSpec";

export interface RopeDataSheet {
  manufacturer: string;
  purchaser: string;
  orderNumber: string;
  intenderFor: string;
  ropeLength: number;
  ropeMass: number;
  linearMass: number;
  minimumBreakingStrength: number;
  yarnsNumberAndType: string;
  lay: string;
  strandsNumber: number;
  ropeSpec: RopeSpec | null;
}
