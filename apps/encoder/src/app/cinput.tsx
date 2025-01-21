import React, { useCallback, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { toast } from 'react-toastify';

const CopyableInput = ({ value = '', placeholder = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback((e: Pick<MouseEvent, 'preventDefault'>) => {
    e.preventDefault();
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      toast('copied')
    }).catch((e) => {
      toast.warn('not copied automatically, copy manually and see error log');
      console.error('error copying automatically', e);
    });
    setTimeout(() => setCopied(false), 2000);
  }, [value]);

  return (
    <div
      onClick={handleCopy}
      className="relative w-full max-w-md cursor-pointer transition-opacity hover:opacity-80"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCopy(e);
        }
      }}
    >
      <input
        placeholder={placeholder}
        type="text"
        readOnly
        value={value}
        className="w-full px-4 py-2 pr-10 bg-gray-50 border rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={(e) => e.preventDefault()}
      />
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
        {copied ? (
          <Check className="h-5 w-5 text-green-500" />
        ) : (
          <Copy className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
        )}
      </div>
      <span className="sr-only">Click to copy: {value}</span>
    </div>
  );
};

export default CopyableInput;
