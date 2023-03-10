import { Box } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { useContext } from 'react';

import { ConfigurationContext } from 'contexts/ConfigurationContext';
import { NotificationsContext } from 'contexts/NotificationsContext';

export type ColorColumnProps = GridRenderCellParams<any, any, any>;

export default function ColorColumn({ value, row, colDef }: ColorColumnProps) {
  const { translations } = useContext(ConfigurationContext);
  const { showAlert } = useContext(NotificationsContext);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          mr: '6px',
          width: 26,
          height: 26,
          borderRadius: 0.5,
          bgcolor: value || 'white',
          border: 'thin solid #cccccc',
          ...(!value
            ? {
                backgroundImage: `linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 50%, #ddd 50%, #ddd 75%, transparent 75%, #fff)`,
                backgroundSize: `7px 7px`,
              }
            : {
                cursor: 'pointer',
              }),
        }}
        {...(value && {
          component: 'button',
          onClick: () => {
            navigator.clipboard.writeText(value);
            showAlert(translations.copied);
          },
        })}
      />
      <Box
        component="span"
        sx={{ ...(!value && { opacity: 0.5 }), fontSize: '13px' }}
      >
        {!value ? translations.notSet : value}
      </Box>
    </Box>
  );
}
