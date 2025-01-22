import { useCallback, useMemo, useState } from "react";
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

type Url = string; // TODO brand
type HtmlString = string; // TODO brand
type UInt = number; // TODO brand

const useLink = (mermaid: string, theme: AllowedMermaidTheme) => useMemo<Url>(() => {
  {
    const b64 = deflate(mermaid);
    const url = new URL(BASE_URL);
    url.searchParams.append(QUERY_PARAM, b64);
    if (theme) url.searchParams.append(THEME_QUERY_PARAM, theme);
    return url.href;
  }
}, [mermaid, theme]);

const iframeCode = (link: Url, width: UInt, height: UInt): HtmlString => `
  <iframe src="${link}" width="${width/*0s*/ ? `${width}px` : width}" height="${height ? `${height}px` : height}" />
`;

const NONE_THEME_STRING = 'None';

const useSetUInt = (cb: (v: UInt) => void) => useCallback((v: number) => cb(v < 0 ? 0 : Math.floor(v)), [cb]);

const IframePart = ({link}: {link: Url}) => {
  const [width, setWidth_] = useState<UInt>(600);
  const [height, setHeight_] = useState<UInt>(600);
  const setWidth = useSetUInt(setWidth_);
  const setHeight = useSetUInt(setHeight_);
  const code = iframeCode(link, width, height);
  return (
    <div>
      <h3>Iframe code:</h3>
      <label htmlFor="width">Width</label>
      <input id="width" type="number" step="1" min="0" value={width}
             onChange={e => setWidth(e.target.valueAsNumber)}/>
      <label htmlFor="height">Height</label>
      <input id="height" type="number" step="1" min="0" value={height}
             onChange={e => setHeight(e.target.valueAsNumber)}/>
      <CopyableInput value={code} />
      <h3>Preview</h3>
      <div dangerouslySetInnerHTML={{
        __html: code
      }}/>
    </div>
  )
}

const Encoder = () => {
  const [v, setV] = useState('');
  const [theme, setTheme] = useState<AllowedMermaidTheme>('default');

  const link = useLink(v, theme);
  return <div>
    <form onSubmit={(e) => e.preventDefault()}>
      <p>Paste Mermaid diagram code into the textarea</p>
      <textarea value={v} onChange={(e) => setV(e.target.value)}/>
      <p>Select a theme</p>
      <select value={theme} onChange={(e) =>
        setTheme(e.target.value === NONE_THEME_STRING ? undefined : e.target.value as AllowedMermaidTheme)
      }>
        {allowedMermaidThemes.map(t => <option key={t || NONE_THEME_STRING} value={t}>{t || NONE_THEME_STRING}</option>)}
      </select>
      <p>Copy the resulting link:</p>
      <CopyableInput value={link} placeholder={sample}/>
      <div>Click to copy or use <a href={link}>the link</a></div>
      {v ? <IframePart link={link} /> : null}
    </form>
  </div>;
}

export default Encoder;
