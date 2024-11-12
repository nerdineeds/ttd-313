import React from 'react';

// Define TypeScript interfaces for props
interface RichTextChild {
  text: string;
  type: 'text'; // Ensure the 'type' property is included
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export interface RichTextElement {
  type: 'paragraph' | 'heading' | 'list' | 'link';
  level?: number; // For headings
  children: RichTextChild[];
}

interface RichTextProps {
  content: RichTextElement[];
  paragraphClassName?: string;
  headingClassName?: string;
  listClassName?: string;
  linkClassName?: string;
}

// Main RichText component
const RichText: React.FC<RichTextProps> = ({
  content,
  paragraphClassName = 'mb-2',
  headingClassName = 'font-bold text-2xl',
  listClassName = 'list-disc pl-5 mb-4',
  linkClassName = 'text-blue-500 underline',
}) => {
  return (
    <div>
      {content.map((element, index) => {
        if (!element.children || element.children.length === 0)
          return null;

        switch (element.type) {
          case 'paragraph':
            return (
              <p key={index} className={paragraphClassName}>
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
              <HeadingTag key={index} className={headingClassName}>
                {element.children.map((child, i) => (
                  <RichTextChildComponent key={i} child={child} />
                ))}
              </HeadingTag>
            );

          case 'list':
            return (
              <ul key={index} className={listClassName}>
                {element.children.map((child, i) => (
                  <li key={i}>
                    <RichTextChildComponent child={child} />
                  </li>
                ))}
              </ul>
            );

          case 'link':
            // Ensure the link has a valid href
            const linkHref = element.children[0]?.text || '#';
            return (
              <a
                key={index}
                href={linkHref}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
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

// Helper component to apply inline styles for rich text child elements
const RichTextChildComponent: React.FC<{ child: RichTextChild }> = ({
  child,
}) => {
  if (!child.text) return null;

  let content: React.ReactNode = child.text;

  if (child.bold) content = <strong>{content}</strong>;
  if (child.italic) content = <em>{content}</em>;
  if (child.underline) content = <u>{content}</u>;

  return <>{content}</>;
};

export default RichText;
