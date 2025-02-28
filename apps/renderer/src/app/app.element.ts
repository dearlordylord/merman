import './app.element.scss';
import 'mermaid';
import {
  allowedMermaidThemes,
  B64String,
  PAN_ZOOM_VARIANTS,
  PANZOOM_QUERY_PARAM,
  QUERY_PARAM,
  THEME_QUERY_PARAM
} from '@merman/utils';
import { inflate } from '@merman/pako';
import mermaid from 'mermaid';
import { isAllowedMermaidTheme } from '@merman/utils';
import { ENCODER_URL } from './env';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];
  data: null | {
    mermaid: string;
    b64: B64String;
  } = null;

  panZoomEnabled: boolean = false;

  constructor() {
    super();

    const urlParams = new URLSearchParams(window.location.search);

    this.panZoomEnabled = PAN_ZOOM_VARIANTS.includes(urlParams.get(PANZOOM_QUERY_PARAM) || 'no');

    const b64 = urlParams.get(QUERY_PARAM);
    if (b64 === null) return;
    this.data = {
      mermaid: inflate(b64),
      b64
    };
    const theme = urlParams.get(THEME_QUERY_PARAM) || undefined;
    if (!isAllowedMermaidTheme(theme))
      throw new Error(`panic! ${THEME_QUERY_PARAM} "${theme}" is not one of allowed mermaid themes: ${allowedMermaidThemes.join(', ')}`);
    mermaid.initialize({
      securityLevel: 'loose', /*we're iframe anyways*/
      theme,
    });
  }

  // adds a zipped diagram to encoder url; e.g. for decode / edit / encode flow; QoL
  getEncoderUrlWithYank() {
    if (!ENCODER_URL || !this.data) return '';
    const urlObj = new URL(ENCODER_URL);
    urlObj.searchParams.set(QUERY_PARAM, this.data.b64);
    return urlObj.toString();
  }

  connectedCallback() {
    const id = "diagram";
    this.innerHTML = this.data ? `<div><pre id=${id}>${this.data.mermaid}</pre>${ENCODER_URL ? `
    <div style="display: none"><a href="${this.getEncoderUrlWithYank()}">want to generate another iframe? use the encoder website</a></div>` : ''}</div>` :
      `<p>no "${QUERY_PARAM}" query param found; you can generate an url on ${ENCODER_URL ? `<a href="${ENCODER_URL/*no yank possible*/}">[the encoder website] (click!)</a>` : `the encoder website (no url provided in env)` }</p>`;
    const node = document.getElementById(id)!;
    mermaid.run({
      nodes: [node],
      postRenderCallback: (id) => {
        if (!this.panZoomEnabled) return;
        const svg = document.getElementById(id)!;
        import('svg-pan-zoom').then(lib => lib.default(svg)).then(() => {
          svg.classList.add('full-window');
        }).catch(e => {
          console.error('panic! error during panZoom init', e);
        });
      }
    }).then(() => {
      console.log('mermaid render complete');
    }).catch(e => {
      console.error('mermaid render error', e);
    })


  }
}
customElements.define('merman-root', AppElement);
