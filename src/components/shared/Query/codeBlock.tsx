import { CheckIcon, CopyIcon } from "lucide-react";
import React from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import prism from 'react-syntax-highlighter/dist/cjs/styles/prism/prism';

const CustomCodeBlock: React.FC<{ children: string; language: string }> = ({
  children,
  language,
}) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative">
      <SyntaxHighlighter language={language} style={prism}>
        {children}
      </SyntaxHighlighter>
      <button onClick={handleCopy} className="absolute top-0 right-2">
        {isCopied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  );
};

export default CustomCodeBlock;
