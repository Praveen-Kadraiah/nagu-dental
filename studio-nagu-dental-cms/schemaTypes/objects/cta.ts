import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Button Label',
      type: 'string',
      initialValue: 'Book Appointment',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Link URL (e.g. /contact.html or external)',
      type: 'string',
      initialValue: 'contact.html',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
