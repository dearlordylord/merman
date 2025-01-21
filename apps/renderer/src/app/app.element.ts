import './app.element.scss';
import 'mermaid';
import { allowedMermaidThemes, QUERY_PARAM, THEME_QUERY_PARAM } from '@merman/utils';
import { inflate } from '@merman/pako';
import mermaid from 'mermaid';
import { isAllowedMermaidTheme } from '@merman/utils';



export class AppElement extends HTMLElement {
  public static observedAttributes = [];
  mermaid: string | null = null;

  constructor() {
    super();
    const urlParams = new URLSearchParams(window.location.search);
    const b64 = urlParams.get(QUERY_PARAM);
    if (b64 === null) return;
    this.mermaid = inflate(b64);
    const theme = urlParams.get(THEME_QUERY_PARAM) || undefined;
    if (!isAllowedMermaidTheme(theme))
      throw new Error(`panic! ${THEME_QUERY_PARAM} "${theme}" is not one of allowed mermaid themes: ${allowedMermaidThemes.join(', ')}`);
    mermaid.initialize({
      securityLevel: 'loose',
      theme,
    });
  }

  connectedCallback() {
    this.innerHTML = this.mermaid ? `<pre class="mermaid">${this.mermaid}</pre>` : `<p>no "${QUERY_PARAM}" query param found</p>`;
  }
}
customElements.define('merman-root', AppElement);
