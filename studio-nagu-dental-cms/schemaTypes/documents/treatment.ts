import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'treatment',
  title: 'Treatment / Service',
  type: 'document',
  groups: [
    {
      name: 'info',
      title: 'General Info',
    },
    {
      name: 'hero',
      title: 'Hero Presentation',
    },

  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'info',
      description: 'The name of the treatment (e.g. Cosmetic Dentistry)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'info',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Heading Override',
      type: 'string',
      group: 'hero',
      description: 'Heading displayed inside the page hero banner',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      group: 'hero',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'info',
      description: 'Detailed description of this dental treatment',
    }),

  ],
})
