import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page Content',
  type: 'document',
  // @ts-ignore
  __experimental_actions: ['update', 'publish'],
  groups: [
    {
      name: 'hero',
      title: 'Hero Section',
    },
    {
      name: 'story',
      title: 'Story & Journey',
    },
    {
      name: 'stats',
      title: 'Success Stats',
    },
    {
      name: 'awards',
      title: 'Awards & Honors',
    },
    {
      name: 'seo',
      title: 'SEO Settings',
    },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
      group: 'hero',
    }),
    defineField({
      name: 'storySection',
      title: 'Story / Journey Section',
      type: 'object',
      group: 'story',
      fields: [
        defineField({name: 'tag', type: 'string', title: 'Tag (e.g. A Journey of Trusted Dental Care)'}),
        defineField({name: 'title', type: 'string', title: 'Section Title'}),
        defineField({name: 'description', type: 'text', title: 'Section Description'}),
        defineField({
          name: 'gallery',
          title: 'Section Image Gallery',
          type: 'array',
          of: [{type: 'image'}],
        }),
      ],
    }),
    defineField({
      name: 'successMetrics',
      title: 'Success Stats / Quick Facts',
      type: 'array',
      group: 'stats',
      of: [{type: 'statCard'}],
    }),
    defineField({
      name: 'awardsSection',
      title: 'Awards & Recognitions',
      type: 'object',
      group: 'awards',
      fields: [
        defineField({name: 'title', type: 'string', title: 'Awards Title'}),
        defineField({
          name: 'awards',
          title: 'Award Items List',
          type: 'array',
          of: [{type: 'awardCard'}],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page Content',
      }
    },
  },
})
