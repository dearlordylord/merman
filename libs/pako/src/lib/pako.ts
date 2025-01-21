import { deflate as deflateOrig, inflate as inflateOrig } from 'pako';
import { B64String, b64ToUint8, flow, uint8ToB64 } from '@merman/utils';

export const deflate: (s: string) => B64String = flow(deflateOrig, uint8ToB64);
export const inflate: (b: B64String) => string = flow(b64ToUint8, b => inflateOrig(b, {to: 'string'}));

export const deflateToQueryParam = flow(deflate, encodeURIComponent);
