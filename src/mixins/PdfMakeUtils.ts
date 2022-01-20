import { Content, ContentTable, TableCell, TDocumentDefinitions } from "pdfmake/interfaces";
import { RopeDataSheet } from "@/model/RopeDataSheet";
import { DateTime } from "luxon";

export const createCellDescription = (upperDescr: string, lowerDescr: string): TableCell => ({
  text: ["\n", upperDescr, "\n", { text: lowerDescr, italics: true }, "\n\n"],
});

export const createCellValue = (value: Content, colSpan?: number): TableCell => ({
  text: "\n" + value,
  colSpan: colSpan,
  alignment: "left",
  margin: [10, 7, 0, 0],
});

export const getRopeDataSheet = (ropeDataSheet: RopeDataSheet): TDocumentDefinitions => ({
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
            createCellDescription("Manufacturer  or Supplier", "Fabbricante o Fornitore"),
            createCellValue(ropeDataSheet.manufacturer, 3),
            {},
            {},
          ],
          [createCellDescription("Purchaser", "Committente"), createCellValue(ropeDataSheet.purchaser, 3)],
          [
            createCellDescription("Order No.", "Ordine N."),
            createCellValue(ropeDataSheet.orderNumber),
            createCellDescription("Intended for", "Destinazione"),
            createCellValue(ropeDataSheet.intendedFor),
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
            createCellDescription("Material (type of fiber)", "Materiale (tipo di fibra)"),
            createCellValue(ropeDataSheet.ropeSpec.materialType, 3),
            {},
            {},
          ],
          [
            createCellDescription("Length (m)", "Lunghezza"),
            createCellValue(ropeDataSheet.ropeLength + " mt."),
            createCellDescription("Mass of the rope", "Massa del cavo"),
            createCellValue(ropeDataSheet.ropeMass + " kg"),
          ],
          [
            createCellDescription("Linear mass (g/m)", "Massa lineare"),
            createCellValue(ropeDataSheet.linearMass + " g/m"),
            createCellDescription("Diameter", "Diametro"),
            createCellValue(ropeDataSheet.ropeSpec.diameter + " mm"),
          ],
          [
            createCellDescription("Number and yarn type", "Numero e tipo dei fili"),
            createCellValue(ropeDataSheet.yarnsNumberAndType),
            createCellDescription("Number of strands", "Numero dei legnoli"),
            createCellValue(ropeDataSheet.strandsNumber.toString()),
          ],
          [
            createCellDescription("Lay", "Senso di avvolgimento"),
            createCellValue(ropeDataSheet.lay),
            createCellDescription("Minimum breaking strength", "Carico di rottura minimo"),
            createCellValue(ropeDataSheet.minimumBreakingStrength + " kN"),
          ],
        ],
      },
      style: "spacer",
    } as ContentTable,
    {
      alignment: "justify",
      columns: [
        {
          text: "Rossiglione, " + new Date().toLocaleString("it-IT", { year: "numeric", month: "2-digit", day: "2-digit" }),
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
});
