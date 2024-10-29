import { useState } from 'react';
import { Message } from 'src/lib/interfaces';

export const useMessage = () => {
  const [message, setMessage] = useState<Message | null>(null);

  const clearMessage = () => {
    setMessage(null);
  };

  return { message, setMessage, clearMessage };
};
