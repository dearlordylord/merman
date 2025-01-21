import { useMemo, useState } from "react";
import { deflate, deflateToQueryParam } from '@merman/pako';
import CopyableInput from './cinput';
import { AllowedMermaidTheme, allowedMermaidThemes, B64String, QUERY_PARAM, THEME_QUERY_PARAM } from '@merman/utils';
import { BASE_URL } from './env';

const sample = `
graph TD
  A[Start] --> B[Process]
  B --> C[End]
  B --> D[Alternative]
  `;

const useLink = (mermaid: string, theme: AllowedMermaidTheme) => useMemo(() => {
  {
    const b64 = deflate(mermaid);
    const url = new URL(BASE_URL);
    url.searchParams.append(QUERY_PARAM, b64);
    if (theme) url.searchParams.append(THEME_QUERY_PARAM, theme);
    return url.href;
  }
}, [mermaid, theme]);

const NONE_THEME_STRING = 'None';

const Encoder = () => {
  const [v, setV] = useState('');
  const [theme, setTheme] = useState<AllowedMermaidTheme>('default');
  const link = useLink(v, theme);
  return <div>
    <p>Paste Mermaid diagram code into the textarea</p>
    <textarea value={v} onChange={(e) => setV(e.target.value)}/>
    <p>[Select a theme]</p>
    <select value={theme} onChange={(e) =>
      setTheme(e.target.value === NONE_THEME_STRING ? undefined : e.target.value as AllowedMermaidTheme)
    }>
      {allowedMermaidThemes.map(t => <option key={t || NONE_THEME_STRING} value={t}>{t || NONE_THEME_STRING}</option>)}
    </select>
    <p>Copy the resulting link</p>
    <CopyableInput value={link} placeholder={sample}/>
  </div>;
}

export default Encoder;
