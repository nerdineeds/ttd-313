import { RichTextElement } from '@/components/RichText/RichText';

// Utility function to convert a string into a RichTextElement[]
export function stringToRichTextElement(
  content: string
): RichTextElement[] {
  return content
    ? [
        {
          type: 'paragraph',
          children: [
            {
              text: content,
              type: 'text', // Add the 'type' property here
            },
          ],
        },
      ]
    : [];
}
