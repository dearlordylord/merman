import * as fc from 'fast-check';
import { deflate, inflate } from './pako';

describe('Base64 conversion', () => {
  const sampleStrings = fc.oneof(
    fc.string(),
    fc.constant(`
graph TD
  A[Start] --> B[Process]
  B --> C[End]
  B --> D[Alternative]
  `)
  );

  test('round-trip property: String -> B64 -> String', () => {
    fc.assert(
      fc.property(
        sampleStrings,
        (original) => {
          const b64 = deflate(original);

          const backToNormal = inflate(b64);
          expect(backToNormal).toBe(original);
        }
      )
    );
  });

});
