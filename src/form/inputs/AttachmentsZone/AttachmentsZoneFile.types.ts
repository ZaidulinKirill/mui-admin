import { AttachmentsZoneFile } from './AttachmentsZoneFiles.types';

export type AttachmentsZoneFileProps = AttachmentsZoneFile & {
  source: string;
  foreignKey: string;
  foreignKeyValue: string | number;
  readOnly?: boolean;
  onChange: (newFile: AttachmentsZoneFile) => void;
  onDelete: () => void;
};
