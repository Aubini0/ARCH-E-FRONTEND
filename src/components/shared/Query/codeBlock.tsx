import { CheckIcon, CopyIcon } from "lucide-react";
import React from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import prism from "react-syntax-highlighter/dist/cjs/styles/prism/prism";

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
    <div className="relative darkScrollbar">
      <SyntaxHighlighter
        className={`${language == "sh" && "text-white"}`}
        language={language}
        style={prism}
      >
        {children}
      </SyntaxHighlighter>
      <button onClick={handleCopy} className="absolute top-[-6px] right-0">
        {isCopied ? <CheckIcon color="#fff" /> : <CopyIcon color="#fff" />}
      </button>
    </div>
  );
};

export default CustomCodeBlock;
