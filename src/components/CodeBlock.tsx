'use client';

import { useState } from 'react';

interface CodeBlockProps {
  children: string;
  className?: string;
}

export default function CodeBlock({ children, className = '', ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative group">
      <pre 
        className={`bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-6 rounded-xl overflow-x-auto mb-8 border border-gray-700 dark:border-gray-600 shadow-lg ${className}`}
        {...props}
      >
        <code>{children}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-gray-200 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Copy code to clipboard"
      >
        {copied ? (
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Copied!
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            Copy
          </span>
        )}
      </button>
    </div>
  );
}