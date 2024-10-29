import React from 'react';
import { Button, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

interface LinkIconButtonProps {
  icon: React.ReactNode;
  text: string;
  buttonLink?: string;
  onClick?: () => void;
}

export const LinkIconButton: React.FC<LinkIconButtonProps> = ({
  buttonLink,
  text,
  icon,
  onClick,
}) => {
  return (
    <Tooltip title={text || null}>
      <Button
        to={buttonLink ?? ''}
        startIcon={icon}
        component={Link}
        onClick={onClick}
        variant='contained'
        size='large'
        aria-label={text}
        sx={{ color: 'white', fontWeight: 'bold' }}
      >
        {text}
      </Button>
    </Tooltip>
  );
};
