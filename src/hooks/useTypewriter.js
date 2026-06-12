import { useEffect, useState } from 'react';

export function useTypewriter(text, enabledKey) {
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    setTyped(0);
    if (!text) return undefined;

    const timer = setInterval(() => {
      setTyped((current) => {
        const next = current + 1;
        if (next >= text.length) {
          clearInterval(timer);
          return text.length;
        }
        return next;
      });
    }, 52);

    return () => clearInterval(timer);
  }, [text, enabledKey]);

  return {
    typedText: text.slice(0, typed),
    isTyping: typed < text.length,
  };
}
