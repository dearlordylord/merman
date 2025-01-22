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
  <iframe
    src="${link}" width="${width/*0s*/ ? `${width}px` : width}" height="${height ? `${height}px` : height}"
    sandbox="allow-scripts allow-forms"
    referrerpolicy="no-referrer"
    loading="lazy"
  />
`;

const NONE_THEME_STRING = 'None';

const useSetUInt = (cb: (v: UInt) => void) => useCallback((v: number) => cb(v < 0 ? 0 : Math.floor(v)), [cb]);

const IframePart = ({link}: {link: string}) => {
  const [width, setWidth_] = useState<number>(600);
  const [height, setHeight_] = useState<number>(600);
  const setWidth = useSetUInt(setWidth_);
  const setHeight = useSetUInt(setHeight_);
  const code = iframeCode(link, width, height);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Iframe code:</h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="width" className="text-sm font-medium text-gray-700">Width</label>
          <input
            id="width"
            type="number"
            step="1"
            min="0"
            value={width}
            onChange={e => setWidth(e.target.valueAsNumber)}
            className="w-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="height" className="text-sm font-medium text-gray-700">Height</label>
          <input
            id="height"
            type="number"
            step="1"
            min="0"
            value={height}
            onChange={e => setHeight(e.target.valueAsNumber)}
            className="w-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <CopyableInput value={code} />
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Preview</h3>
        <div dangerouslySetInnerHTML={{ __html: code }}/>
      </div>
    </div>
  );
};

const Encoder = () => {
  const [v, setV] = useState('');
  const [theme, setTheme] = useState<AllowedMermaidTheme>('default');
  const link = useLink(v, theme);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Paste Mermaid diagram code into the textarea
          </p>
          <textarea
            value={v}
            onChange={(e) => setV(e.target.value)}
            className="w-full h-40 p-3 border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Select a theme</p>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value === NONE_THEME_STRING ? undefined : e.target.value as AllowedMermaidTheme)}
            className="w-full sm:w-auto px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {allowedMermaidThemes.map(t => (
              <option key={t || NONE_THEME_STRING} value={t}>
                {t || NONE_THEME_STRING}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Copy the resulting link:</p>
          <CopyableInput value={link} placeholder={sample} />
          <div className="mt-2 text-sm text-gray-600">
            Click to copy or use <a href={link} className="text-blue-500 hover:text-blue-600">the link</a>
          </div>
        </div>

        {v && <IframePart link={link} />}
      </form>
    </div>
  );
};

export default Encoder;
