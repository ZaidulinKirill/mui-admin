import { Skeleton, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useMemo } from 'react';

import FileAvatar from './AttachmentsZoneFile';
import {
  AttachmentsZoneFile,
  AttachmentsZoneFilesProps,
} from './AttachmentsZoneFiles.types';

export default function AttachmentsZoneFiles({
  files,
  isLoading,
  showSections,
  foreignKey,
  foreignKeyValue,
  attachmentsTypes,
  source,
  readOnly,
  onFileChange,
  onFileDelete,
}: AttachmentsZoneFilesProps) {
  const skeletonFiles = [...new Array(2).keys()].map((id) => ({
    id,
    name: null,
    extension: null,
  })) as unknown as AttachmentsZoneFile[];

  const sections = useMemo(
    () =>
      Object.entries(
        (isLoading ? skeletonFiles : files).reduce((acc, item) => {
          acc[item.attachmentType] = acc[item.attachmentType] || [];
          acc[item.attachmentType].push(item);

          return acc;
        }, {} as Record<string, AttachmentsZoneFile[]>),
      ).map(([title, items]) => ({ title, items })),
    [files, isLoading, skeletonFiles],
  );

  return (
    <Grid container spacing={1}>
      {sections.map((section) => (
        <Grid xs={12} key={section.title}>
          {showSections && (
            <Typography variant="subtitle2" mb={1} sx={{ opacity: 0.8 }}>
              {isLoading ? (
                <Skeleton width={150} />
              ) : (
                <span>
                  {attachmentsTypes.find((x) => x.value === section.title)
                    ?.text ?? section.title}
                </span>
              )}
            </Typography>
          )}
          <Grid container spacing={2}>
            {section.items.map((file) => (
              <Grid key={file.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <FileAvatar
                  key={file.id}
                  {...file}
                  foreignKey={foreignKey}
                  foreignKeyValue={foreignKeyValue}
                  source={source}
                  readOnly={readOnly}
                  onChange={(newFile) => {
                    onFileChange(newFile, file);
                  }}
                  onDelete={() => {
                    onFileDelete(file);
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
