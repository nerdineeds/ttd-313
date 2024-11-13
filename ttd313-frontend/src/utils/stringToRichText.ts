import { RichTextElement } from '@/components/RichText/RichText';

export function stringToRichTextElement(
  content: string
): RichTextElement[] {
  if (!content) return [];

  return [
    {
      type: 'paragraph',
      children: [{ text: content, type: 'text' }],
    },
  ];
}
