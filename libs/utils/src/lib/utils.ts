export type B64String = string; // TODO tag it

/*
TODO
function Uint8ToString(u8a){
  var CHUNK_SZ = 0x8000;
  var c = [];
  for (var i=0; i < u8a.length; i+=CHUNK_SZ) {
    c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
  }
  return c.join("");
}
// Usage
var u8 = new Uint8Array([65, 66, 67, 68]);
var b64encoded = btoa(Uint8ToString(u8));
 */
export const uint8ToB64 = (a: Uint8Array): B64String => btoa(String.fromCharCode.apply(null, [...a]));
export const b64ToUint8 = (b: B64String): Uint8Array => new Uint8Array(atob(b).split("").map(function(c) {
  return c.charCodeAt(0); }));
