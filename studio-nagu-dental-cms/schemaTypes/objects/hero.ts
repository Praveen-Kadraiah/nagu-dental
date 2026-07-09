import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paragraph',
      title: 'Paragraph Text',
      type: 'text',
    }),
    defineField({
      name: 'cta',
      title: 'CTA Action',
      type: 'cta',
    }),
    defineField({
      name: 'backgroundImages',
      title: 'Background Images (for Carousel/Header)',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
  ],
})
