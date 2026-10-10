import { createCn } from 'cn/config'

// The Stitch type scale (text-label-sm, text-body-md, ...) must be known as font sizes,
// otherwise tailwind-merge mistakes them for text colors and drops real color classes.
export const cn = createCn({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'display-hero',
            'display-hero-mobile',
            'headline-xl',
            'headline-xl-mobile',
            'headline-lg',
            'headline-lg-mobile',
            'headline-md',
            'headline-sm',
            'title-sm',
            'body-lg',
            'body-md',
            'body-sm',
            'label-md',
            'label-sm',
            'label-caps',
            'mono-data',
          ],
        },
      ],
    },
  },
})
