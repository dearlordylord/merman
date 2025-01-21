import './app.element.scss';
import 'mermaid';
import { QUERY_PARAM } from '../../../../libs/utils/src/lib/constants';
import { inflate } from '@merman/pako';
import mermaid, { MermaidConfig } from 'mermaid';

const allowedMermaidThemes: MermaidConfig['theme'][] = [
  'default', 'base', 'dark', 'forest', 'neutral', 'null'
] as const;
type AllowedMermaidTheme = typeof allowedMermaidThemes[number];
const allowedMermaidThemesS = new Set(allowedMermaidThemes);
const isAllowedMermaidTheme = (s: string | undefined): s is AllowedMermaidTheme =>
  allowedMermaidThemesS.has(s as AllowedMermaidTheme);

export class AppElement extends HTMLElement {
  public static observedAttributes = [];
  mermaid: string | null = null;

  constructor() {
    super();
    const urlParams = new URLSearchParams(window.location.search);
    const b64 = urlParams.get(QUERY_PARAM);
    if (b64 === null) return;
    this.mermaid = inflate(b64);
    const theme = urlParams.get('theme') || undefined;
    if (!isAllowedMermaidTheme(theme)) throw new Error(`panic! theme "${theme}" is not one of allowed mermaid themes: ${allowedMermaidThemes.join(', ')}`);
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
