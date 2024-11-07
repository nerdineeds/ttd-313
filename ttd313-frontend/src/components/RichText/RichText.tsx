import React from 'react';

// Define TypeScript interfaces for props
interface RichTextChild {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  type: 'text';
}

interface RichTextElement {
  type: 'paragraph' | 'heading' | 'list' | 'link'; // Extend with other types if needed
  level?: number; // For headings
  children: RichTextChild[];
}

interface RichTextProps {
  content: RichTextElement[];
}

const RichText: React.FC<RichTextProps> = ({ content }) => {
  return (
    <div>
      {content.map((element, index) => {
        switch (element.type) {
          case 'paragraph':
            return (
              <p key={index}>
                {element.children.map((child, i) => (
                  <RichTextChildComponent key={i} child={child} />
                ))}
              </p>
            );

          case 'heading':
            const HeadingTag = `h${
              element.level || 1
            }` as keyof JSX.IntrinsicElements;
            return (
              <HeadingTag key={index}>
                {element.children.map((child, i) => (
                  <RichTextChildComponent key={i} child={child} />
                ))}
              </HeadingTag>
            );

          case 'list':
            return (
              <ul key={index}>
                {element.children.map((child, i) => (
                  <li key={i}>
                    <RichTextChildComponent child={child} />
                  </li>
                ))}
              </ul>
            );

          case 'link':
            return (
              <a
                key={index}
                href={element.children[0]?.text} // assuming link URL is in `text`
                target="_blank"
                rel="noopener noreferrer"
              >
                {element.children.map((child, i) => (
                  <RichTextChildComponent key={i} child={child} />
                ))}
              </a>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

// Child component to handle formatting of text within rich text elements
const RichTextChildComponent: React.FC<{ child: RichTextChild }> = ({
  child,
}) => {
  let content = child.text;

  // Apply styles based on the formatting flags
  if (child.bold) content = <strong>{content}</strong>;
  if (child.italic) content = <em>{content}</em>;
  if (child.underline) content = <u>{content}</u>;

  return <>{content}</>;
};

export default RichText;
