export interface UploadHistory {
  id: number;
  fileUpload: string;
  startDate: Date;
  endDate: Date;
  status: string;
  approvedStatus: string;
  username: string;
  totalRecords: number;
  totalNewRecords: number;
  totalErrorRecords: number;
  totalUpdateRecords: number;
  totalLand: number;
  totalLandMapping: number;
}
