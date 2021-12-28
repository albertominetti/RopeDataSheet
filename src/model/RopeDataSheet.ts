import { RopeSpec } from "@/model/RopeSpec";

export interface RopeDataSheet {
  manufacturer: string;
  purchaser: string;
  orderNumber: string;
  intendedFor: string;
  ropeLength: number;
  ropeMass: number;
  linearMass: number;
  minimumBreakingStrength: number;
  yarnsNumberAndType: string;
  lay: string;
  strandsNumber: number;
  quantity: number;
  ropeSpec: RopeSpec;
}
