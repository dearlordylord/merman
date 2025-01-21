import './app.element.scss';
import 'mermaid';
import { QUERY_PARAM } from '../../../../libs/utils/src/lib/constants';
import { deflate, inflate } from '@merman/pako';


export class AppElement extends HTMLElement {
  public static observedAttributes = [];
  mermaid: string | null = null;

  constructor() {
    super();
    const urlParams = new URLSearchParams(window.location.search);
    const b64 = urlParams.get(QUERY_PARAM);
    if (b64 === null) return;
    this.mermaid = inflate(b64);
  }

  connectedCallback() {
    this.innerHTML = this.mermaid ? `<pre class="mermaid">${this.mermaid}</pre>` : `<p>no "${QUERY_PARAM}" query param found</p>`;
  }
}
customElements.define('merman-root', AppElement);
