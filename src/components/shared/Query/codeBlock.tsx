import { CheckIcon, CopyIcon } from "lucide-react";
import React from "react";

const CustomCodeBlock: React.FC<{ children: string; language: string }> = ({
  children,
  language,
}) => {
  const [isCopied, setIsCopied] = React.useState(false);
  //   const styleRef = React.useRef("");

  //   React.useEffect(() => {
  //     const loadSyntaxHighlighter = async () => {
  //       const { default: prism } = await import(
  //         "react-syntax-highlighter/dist/esm/styles/prism/prism"
  //       );
  //       styleRef.current = prism;
  //     };
  //     loadSyntaxHighlighter();
  //   }, [styleRef.current]);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative">
      <pre>{children}</pre>
      <button onClick={handleCopy} className="absolute top-0 right-2">
        {isCopied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  );
};

export default CustomCodeBlock;
