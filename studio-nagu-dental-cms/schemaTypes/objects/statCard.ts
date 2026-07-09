import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'statCard',
  title: 'Statistics Card',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Stat Value (e.g. 15+)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Stat Label (e.g. Specialists)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Card Background Image (optional)',
      type: 'image',
    }),
  ],
})
