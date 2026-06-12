import type { CategoryMeta } from '../data/wordBank';

export function CategoryIcon({ meta, active }: { meta: CategoryMeta; active: boolean }) {
  const color = active ? meta.color : '#6b6350';

  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {meta.paths.map((d) => <path key={d} d={d} />)}
    </svg>
  );
}

export function AvatarIcon({ width = 48, height = 50 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 48 50" aria-hidden="true">
      <circle cx="24" cy="19" r="11" fill="#9b8f6c" />
      <path d="M5 50c0-12 9-19 19-19s19 7 19 19z" fill="#9b8f6c" />
    </svg>
  );
}

export function PaperclipIcon() {
  return (
    <svg width="22" height="40" viewBox="0 0 22 40" fill="none" stroke="#9a9483" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M6 11v18a5 5 0 0 0 10 0V8a3 3 0 0 0-6 0v20a1 1 0 0 0 2 0V11" />
    </svg>
  );
}
