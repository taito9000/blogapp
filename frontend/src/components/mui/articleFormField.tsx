import { TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { ArticleFormData } from 'src/lib/interfaces';

export const ArticleFormField = ({
  label,
  name,
  control,
  error,
  maxLength,
  multiline = 1,
}: {
  label: string;
  name: keyof ArticleFormData;
  control: Control<ArticleFormData>;
  error?: string;
  maxLength: number;
  multiline?: number;
}) => (
  <Controller
    name={name}
    control={control}
    rules={{
      required: `${label}は必須です`,
      maxLength: {
        value: maxLength,
        message: `${label}は${maxLength}文字以下にしてください`,
      },
    }}
    render={({ field }) => (
      <TextField
        {...field}
        value={field.value || ''}
        label={label}
        variant='outlined'
        fullWidth
        multiline={multiline > 1}
        rows={multiline}
        helperText={`${field.value?.length}/${maxLength} 文字 ${error ?? ''}`}
        error={!!error}
        sx={{ mb: 2 }}
      />
    )}
  />
);
