import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'awardCard',
  title: 'Award Card',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Award Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'organization',
      title: 'Organization (e.g. National Dental Association)',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year (e.g. 2024)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Award Badge Image',
      type: 'image',
    }),
  ],
})
