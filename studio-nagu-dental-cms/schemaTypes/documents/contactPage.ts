import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page Content',
  type: 'document',
  // @ts-ignore
  __experimental_actions: ['update', 'publish'],
  groups: [
    {
      name: 'hero',
      title: 'Hero Section',
    },
    {
      name: 'details',
      title: 'Contact Details',
    },
    {
      name: 'map',
      title: 'Map Section',
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
      name: 'contactDetailsSection',
      title: 'Contact Clinic Details',
      type: 'object',
      group: 'details',
      fields: [
        defineField({name: 'title', type: 'string', title: 'Section Title (e.g., Our Clinic Details)'}),
        defineField({name: 'address', type: 'text', title: 'Address Override'}),
        defineField({name: 'phone', type: 'string', title: 'Phone Override'}),
        defineField({name: 'email', type: 'string', title: 'Email Override'}),
        defineField({name: 'hoursText', type: 'text', title: 'Working Hours Summary'}),
      ],
    }),
    defineField({
      name: 'mapSection',
      title: 'Map Section',
      type: 'object',
      group: 'map',
      fields: [
        defineField({name: 'title', type: 'string', title: 'Map Label (e.g. Find Us)'}),
        defineField({name: 'googleMapsUrl', type: 'url', title: 'Google Maps Link'}),
        defineField({name: 'embedMapUrl', type: 'url', title: 'Google Maps Embed iframe Source URL'}),
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
        title: 'Contact Page Content',
      }
    },
  },
})
