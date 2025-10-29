import type { ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownProps {
  children?: string;
}

const Markdown = ({ children }: Readonly<MarkdownProps>): ReactElement => {
  return (
    <ReactMarkdown
      components={{
        // map headers
        h1: (props) => (
          <h2 className="text-2xl font-bold sm:text-3xl" {...props} />
        ),

        h2: (props) => (
          <h2 className="text-2xl font-bold sm:text-3xl" {...props} />
        ),

        h3: (props) => (
          <h3 className="text-xl font-bold sm:text-2xl" {...props} />
        ),

        h4: (props) => (
          <h4 className="text-lg font-bold sm:text-xl" {...props} />
        ),

        h5: (props) => (
          <h5 className="text-base font-bold sm:text-lg" {...props} />
        ),

        h6: (props) => <h6 className="text-base font-bold" {...props} />,

        // quotes
        blockquote: (props) => (
          <blockquote
            className="italic px-4 border-1 border-l-16 border-neutral-700 sm:text-base"
            {...props}
          />
        ),

        // make image centered
        img: (props) => <img className="block mx-auto" {...props} />,

        // lists
        ul: (props) => <ul className="list-[circle] list-inside" {...props} />,

        ol: (props) => <ul className="list-decimal list-inside" {...props} />,

        // code block
        code(props) {
          const { children, className, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              PreTag="div"
              children={
                typeof children === "string"
                  ? String(children).replace(/\n$/, "")
                  : ""
              }
              language={match[1]}
              style={gruvboxDark}
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
