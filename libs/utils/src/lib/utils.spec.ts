import * as fc from 'fast-check';
import { uint8ToB64, b64ToUint8 } from './utils';

describe('Base64 conversion', () => {
  const sampleStrings = fc.base64String();

  test('round-trip property: String -> B64 -> String', () => {
    fc.assert(
      fc.property(
        sampleStrings,
        (original) => {
          const uints = b64ToUint8(original);
          // because AA== and AB== are the same etc
          const back = uint8ToB64(uints);
          const uintsAgain = b64ToUint8(back);
          expect(uintsAgain).toEqual(uints);
        }
      )
    );
  });

});
