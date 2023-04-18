import {
  DobComplaint,
  DobVacateOrder,
  DobViolation,
  HpdComplaint,
  HpdLitigation,
  HpdVacateOrder,
  HpdViolation,
  PlutoData,
} from "@/pages/api/house_data";
import { Column, DefaultSortTypes } from "react-table";
import { HouseData } from "@/pages/api/house_data";
import { DateTime } from "luxon";
import Link from "next/link";
import {
  HpdComplaintProblem,
  HpdComplaintProblems,
} from "@/pages/api/hpd_complaint_problems";
import { dobComplaintCodeToDescAndPriorityMap } from "./DobComplaintCodes";

const DATE_MIN_VALUE = -8640000000000000;

export enum DataSources {
  PLUTO = "pluto",
  HPD_VIOLATIONS = "hpd_violations",
}

enum ColumnDataTypes {
  STRING = "string",
  NUMBER = "number",
  DATE = "date",
}

function columnDataTypeToSortType(dataType: ColumnDataTypes): DefaultSortTypes {
  switch (dataType) {
    case ColumnDataTypes.NUMBER:
      return "basic";
    case ColumnDataTypes.DATE:
      return "datetime";
    case ColumnDataTypes.STRING:
    default:
      return "alphanumeric";
  }
}

type ColumnMetadata<T extends object> = {
  Header: string;
  dataType: ColumnDataTypes;
} & Column<T>;

const plutoColumnMetadata: Map<
  keyof PlutoData,
  ColumnMetadata<PlutoData>
> = new Map([
  ["ownername", { Header: "Owner", dataType: ColumnDataTypes.STRING }],
  ["numfloors", { Header: "# floors", dataType: ColumnDataTypes.NUMBER }],
  ["unitstotal", { Header: "# units", dataType: ColumnDataTypes.NUMBER }],
  ["yearbuilt", { Header: "Year built", dataType: ColumnDataTypes.NUMBER }],
]);

const hpdViolationColumnMetadata: Map<
  keyof HpdViolation,
  ColumnMetadata<HpdViolation>
> = new Map([
  ["violationid", { Header: "Violation ID", dataType: ColumnDataTypes.NUMBER }],
  [
    "inspectiondate",
    { Header: "Inpsection date", dataType: ColumnDataTypes.DATE },
  ],
  [
    "novdescription",
    { Header: "Description", dataType: ColumnDataTypes.STRING },
  ],
  ["violationstatus", { Header: "Status", dataType: ColumnDataTypes.STRING }],
]);

const hpdComplaintColumnMetadata: Map<
  keyof HpdComplaint,
  ColumnMetadata<HpdComplaint>
> = new Map([
  [
    "complaintid",
    {
      Header: "Complaint ID",
      dataType: ColumnDataTypes.NUMBER,

      Cell: ({ cell: { value } }: any) => (
        <Link href={`/hpdcomplaint/${value}`}>{value}</Link>
      ),
    },
  ],
  ["apartment", { Header: "Apartment", dataType: ColumnDataTypes.STRING }],
  ["receiveddate", { Header: "Received date", dataType: ColumnDataTypes.DATE }],
  ["status", { Header: "Status", dataType: ColumnDataTypes.STRING }],
]);

const hpdLitigationsColumnMetadata: Map<
  keyof HpdLitigation,
  ColumnMetadata<HpdLitigation>
> = new Map([
  [
    "litigationid",
    { Header: "Complaint ID", dataType: ColumnDataTypes.NUMBER },
  ],
  ["casetype", { Header: "Apartment", dataType: ColumnDataTypes.STRING }],
  ["casestatus", { Header: "Status", dataType: ColumnDataTypes.STRING }],
  ["caseopendate", { Header: "Opened", dataType: ColumnDataTypes.DATE }],
  ["penalty", { Header: "Penalty", dataType: ColumnDataTypes.STRING }],
  [
    "findingofharassment",
    {
      Header: "Finding of harassment",
      dataType: ColumnDataTypes.STRING,
    },
  ],
]);

const hpdVacateOrdersColumnMetadata: Map<
  keyof HpdVacateOrder,
  ColumnMetadata<HpdVacateOrder>
> = new Map([
  [
    "vacateordernumber",
    { Header: "Vacate order number", dataType: ColumnDataTypes.NUMBER },
  ],
  [
    "vacateeffectivedate",
    { Header: "Effective date", dataType: ColumnDataTypes.DATE },
  ],
  ["vacatetype", { Header: "Type", dataType: ColumnDataTypes.STRING }],
  [
    "primaryvacatereason",
    { Header: "Reason", dataType: ColumnDataTypes.STRING },
  ],
  ["rescinddate", { Header: "Rescind date", dataType: ColumnDataTypes.DATE }],
  [
    "numberofvacatedunits",
    { Header: "# units", dataType: ColumnDataTypes.NUMBER },
  ],
]);

const dobViolationsColumnMetadata: Map<
  keyof DobViolation,
  ColumnMetadata<DobViolation>
> = new Map([
  ["number", { Header: "Number", dataType: ColumnDataTypes.STRING }],
  ["issuedate", { Header: "Issue date", dataType: ColumnDataTypes.DATE }],
  ["violationnumber", { Header: "Number", dataType: ColumnDataTypes.STRING }],
  [
    "violationtypecode",
    { Header: "Violation type code", dataType: ColumnDataTypes.STRING },
  ],
  [
    "violationcategory",
    { Header: "Violation category", dataType: ColumnDataTypes.STRING },
  ],
  [
    "violationtype",
    { Header: "Violation type", dataType: ColumnDataTypes.STRING },
  ],
  ["description", { Header: "Description", dataType: ColumnDataTypes.STRING }],
]);

const dobComplaintsColumnMetadata: Map<
  keyof DobComplaint,
  ColumnMetadata<DobComplaint>
> = new Map([
  [
    "complaintnumber",
    {
      Header: "Number",
      dataType: ColumnDataTypes.NUMBER,
    },
  ],
  [
    "complaintcategory",
    {
      Header: "Category",
      dataType: ColumnDataTypes.STRING,
      accessor: (row: DobComplaint) => {
        const complaintDesc = dobComplaintCodeToDescAndPriorityMap.get(
          row.complaintcategory ?? ""
        );

        if (!complaintDesc) {
          return row.complaintcategory;
        }

        return `${row.complaintcategory} - ${complaintDesc[0]}`;
      },
    },
  ],
  ["status", { Header: "Status", dataType: ColumnDataTypes.STRING }],
  ["dateentered", { Header: "Date entered", dataType: ColumnDataTypes.DATE }],
]);

const dobVacateOrdersColumnMetadata: Map<
  keyof DobVacateOrder,
  ColumnMetadata<DobVacateOrder>
> = new Map([
  [
    "lastdispositiondate",
    { Header: "Last disposition date", dataType: ColumnDataTypes.DATE },
  ],
  [
    "lastdispositioncodedescription",
    {
      Header: "Last disposition description",
      dataType: ColumnDataTypes.STRING,
    },
  ],
  [
    "complaintcategorydescription",
    {
      Header: "Complaint category description",
      dataType: ColumnDataTypes.STRING,
    },
  ],
]);

const hpdComplaintProblemsColumnMetadata: Map<
  keyof HpdComplaintProblem,
  ColumnMetadata<HpdComplaintProblem>
> = new Map([
  ["problemid", { Header: "Problem ID", dataType: ColumnDataTypes.NUMBER }],
  ["unittype", { Header: "Unit type", dataType: ColumnDataTypes.STRING }],
  ["spacetype", { Header: "Space type", dataType: ColumnDataTypes.STRING }],
  [
    "majorcategory",
    { Header: "Major category", dataType: ColumnDataTypes.STRING },
  ],
  [
    "minorcategory",
    { Header: "Minor category", dataType: ColumnDataTypes.STRING },
  ],
  ["code", { Header: "Code", dataType: ColumnDataTypes.STRING }],
  ["status", { Header: "Status", dataType: ColumnDataTypes.STRING }],
  ["statusdescription", { Header: "Status", dataType: ColumnDataTypes.STRING }],
  ["statusdate", { Header: "Status date", dataType: ColumnDataTypes.DATE }],
]);

const dataSourceToHeaders = new Map<
  keyof HouseData | keyof HpdComplaintProblems,
  Map<string, ColumnMetadata<any>>
>([
  ["plutoData", plutoColumnMetadata],
  ["hpdViolations", hpdViolationColumnMetadata],
  ["hpdComplaints", hpdComplaintColumnMetadata],
  ["hpdLitigations", hpdLitigationsColumnMetadata],
  ["hpdVacateOrders", hpdVacateOrdersColumnMetadata],
  ["dobViolations", dobViolationsColumnMetadata],
  ["dobComplaints", dobComplaintsColumnMetadata],
  ["dobVacateOrders", dobVacateOrdersColumnMetadata],
  ["hpdComplaintProblems", hpdComplaintProblemsColumnMetadata],
]);

export function getSectionMetadataForDataSource(
  dataSource: keyof HouseData | keyof HpdComplaintProblems
): {
  title: string;
  noDataDescription: string;
} {
  switch (dataSource) {
    case "plutoData":
      return {
        title: "PLUTO data",
        noDataDescription: "No PLUTO data found for this address",
      };
    case "hpdViolations":
      return {
        title: "HPD violations",
        noDataDescription: "No HPD violations found for this address",
      };
    case "hpdComplaints":
      return {
        title: "HPD complaints",
        noDataDescription: "No HPD complaints found for this address",
      };
    case "hpdLitigations":
      return {
        title: "HPD litigations",
        noDataDescription: "No HPD litigations found for this address",
      };
    case "hpdVacateOrders":
      return {
        title: "HPD vacate orders",
        noDataDescription: "No HPD vacate orders found for this address",
      };
    case "dobViolations":
      return {
        title: "DOB violations",
        noDataDescription: "No DOB violations found for this address",
      };
    case "dobComplaints":
      return {
        title: "DOB complaints",
        noDataDescription: "No DOB complaints found for this address",
      };
    case "dobVacateOrders":
      return {
        title: "DOB vacate orders",
        noDataDescription: "No DOB vacate orders found for this address",
      };
    case "hpdComplaintProblems":
      return {
        title: "HPD complaint problems",
        noDataDescription:
          "No HPD complaint problems found for this complaint ID",
      };
    default:
      return { title: "", noDataDescription: "" };
  }
}

export function getColumnsForDataSource(
  dataSource: keyof HouseData | keyof HpdComplaintProblems
): Column<any>[] {
  const headers = dataSourceToHeaders.get(dataSource);
  if (!headers) {
    throw new Error(`No headers found for data source ${dataSource}`);
  }

  // @ts-ignore
  return Array.from(headers).map(([key, { dataType, ...rest }]) => ({
    accessor:
      dataType === ColumnDataTypes.DATE
        ? (row: any) => getDateAccessor(row, key)
        : key,
    sortType: columnDataTypeToSortType(dataType),
    ...(dataType === ColumnDataTypes.DATE && {
      Cell: ({ cell: { value } }) => <div>{formatDate(value)}</div>,
    }),
    ...rest,
  }));
}

function getDateAccessor(row: any, accessor: string): Date {
  const value = row[accessor] as Date | null;
  if (!value) {
    return new Date(DATE_MIN_VALUE);
  }

  return value;
}

function formatDate(date: Date | null): string {
  if (!date || date.getTime() <= DATE_MIN_VALUE) {
    return "";
  }

  return DateTime.fromJSDate(date).toUTC().toFormat("yyyy-MM-dd");
}
