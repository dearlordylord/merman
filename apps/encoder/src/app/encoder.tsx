import { useCallback, useMemo, useState } from "react";
import { deflate, deflateToQueryParam, inflate } from '@merman/pako';
import CopyableInput from './cinput';
import {
  AllowedMermaidTheme,
  allowedMermaidThemes,
  B64String, PAN_ZOOM_VARIANTS,
  PANZOOM_QUERY_PARAM,
  QUERY_PARAM,
  THEME_QUERY_PARAM
} from '@merman/utils';
import { BASE_URL } from './env';
import { toast } from 'react-toastify';

const sample = `
graph TD
  A[Start] --> B[Process]
  B --> C[End]
  B --> D[Alternative]
  `;

type Url = string; // TODO brand
type HtmlString = string; // TODO brand
type UInt = number; // TODO brand

const useLink = (mermaid: string, theme: AllowedMermaidTheme, panzoom: boolean) => useMemo<Url>(() => {
  {
    const b64 = deflate(mermaid);
    const url = new URL(BASE_URL);
    url.searchParams.append(QUERY_PARAM, b64);
    if (theme) url.searchParams.append(THEME_QUERY_PARAM, theme);
    if (panzoom) url.searchParams.append(PANZOOM_QUERY_PARAM, PAN_ZOOM_VARIANTS[0]);
    return url.href;
  }
}, [mermaid, theme, panzoom]);

const iframeCode = (link: Url, width: UInt, height: UInt): HtmlString => `
<iframe
  src="${link}" width="${width/*0s*/ ? `${width}px` : width}" height="${height ? `${height}px` : height}"
  sandbox="allow-scripts allow-forms"
  referrerpolicy="no-referrer"
  loading="lazy"
/>
`.replace(/\n\s+/g, ' ');

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

// yanks mermaid diagram from url for decoding; QoL
const yankUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const yanked = urlParams.get(QUERY_PARAM) || '';
  urlParams.delete(QUERY_PARAM);
  const newUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ''}${window.location.hash}`;
  window.history.replaceState({}, '', newUrl);

  // it's still b64 so:
  const mermaid = yanked ? inflate(yanked) : ''

  return () => mermaid;
};

const mermaidFromUrl = yankUrl();

// people will try to paste url
const sanitizeDeflated = (s: string) => {
  try {
    const url = new URL(s);
    const deflated = url.searchParams.get(QUERY_PARAM);
    if (deflated) return deflated;
  } catch (e) {}
  // in case somebody copy-pastes from url
  return decodeURIComponent(s)
}

const Encoder = () => {
  const [v, setV] = useState(mermaidFromUrl);
  const [theme, setTheme] = useState<AllowedMermaidTheme>('default');
  const [panzoom, setPanZoom] = useState<boolean>(false);
  const link = useLink(v, theme, panzoom);
  const deflated = useMemo(() => deflate(v), [v]);
  const setDeflated = useCallback((deflated: B64String) => {
    // corner case
    if (deflated === '') return;
    try {
      // garbage is possible, the function is sensitive to invalid b64
      const inflated = inflate(deflated);
      setV(inflated);
    } catch (e) {
      toast.error('invalid b64 string: ' + deflated);
      console.error(e);
    }
  }, []);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            <label htmlFor="code">Paste Mermaid diagram code into the textarea</label>
          </p>
          <textarea
            id="code"
            value={v}
            onChange={(e) => setV(e.target.value)}
            className="w-full h-40 p-3 border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            <label htmlFor="zip">or convert back from the encoded version</label>
          </p>
          <input
            id="zip"
            value={deflated}
            onChange={(e) => setDeflated(sanitizeDeflated(e.target.value))}
            className="w-full h-5 p-3 border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2"><label htmlFor="theme">Select a theme</label></p>
          <select
            id="theme"
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
          <p className="text-sm font-medium text-gray-700 mb-2"><label htmlFor="panzoom">Enable pan/zoom? (zoomable vs.
            static Mermaid)</label></p>
          <input id="panzoom"
                 className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                 type="checkbox" checked={panzoom} onChange={(e) => setPanZoom(e.target.checked)}/>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Copy the resulting link:</p>
          <CopyableInput value={link} placeholder={sample}/>
          <div className="mt-2 text-sm text-gray-600">
            Click to copy or use <a target="_blank" href={link} className="text-blue-500 hover:text-blue-600">the link</a>
          </div>
        </div>

        {v && <IframePart link={link}/>}
      </form>
    </div>
  );
};

export default Encoder;
