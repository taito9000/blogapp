import React, { ReactElement } from 'react';
import { useScrollTrigger, Slide } from '@mui/material';

// ヘッダーのスクロール時に表示、非表示を切り替える
const HideOnScroll = (props: { children: ReactElement }) => {
  // コンポーネントに渡された children は、props の一部として自動的にコンポーネントに渡されるので、取得できる
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
};

export default HideOnScroll;
