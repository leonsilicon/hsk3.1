export interface Hsk31ExportFileSummary {
  name: string;
  size_bytes: number;
  sha256: string;
  content: unknown;
}

export interface Hsk31ExportManifest {
  source_directory: string;
  total_files: number;
  files: Hsk31ExportFileSummary[];
}

declare const data: Hsk31ExportManifest;
export default data;
