import { useMemo, useState } from "react";
import { deflateToQueryParam } from '@merman/pako';
import CopyableInput from './cinput';


const Encoder = () => {
  const [v, setV] = useState('');
  const deflated = useMemo(() => deflateToQueryParam(v), [v])
  return <div>
    <textarea value={v} onChange={(e) => setV(e.target.value)}/>
    <CopyableInput value={deflated} />
  </div>;
}

export default Encoder;
