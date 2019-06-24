export const slotWidget = {
  componentName: 'SlotWidget',
  displayName: 'Slot widget',
  props: [
    {
      name: 'smallTitle',
      displayName: 'small title',
      type: 'string'
    },
    {
      name: 'bigTitle',
      displayName: 'big title',
      type: 'string'
    },
    {
      name: 'image',
      displayName: 'image',
      type: 'image'
    },
    {
      name: 'linkUrl',
      displayName: 'link url',
      type: 'string'
    },
    {
      name: 'ribbon',
      displayName: 'ribbon',
      type: 'string'
    },
    // {
    //   name: 'showAsterisk',
    //   displayName: 'show asterisk',
    //   type: 'boolean',
    //   defaultValue: true
    // },
    {
      name: 'farecacheDeparture',
      displayName: 'farecache departure',
      type: 'string'
    },
    {
      name: 'farecacheDestination',
      displayName: 'farecache destination',
      type: 'string'
    },
    // {
    //   name: 'showDate',
    //   displayName: 'show date',
    //   type: 'date'
    // },
    // {
    //   name: 'hideDate',
    //   displayName: 'hide date',
    //   type: 'date'
    // },
    {
      name: 'sizes',
      displayName: 'sizes',
      type: 'string',
      defaultValue: 'tiny-100 small-100 medium-50 large-33 xlarge-33'
    }
  ]
};

export const headerOffer = {
  componentName: 'headerOffer',
  displayName: 'Header offer',
  props: [
    // {
    //   name: 'background',
    //   displayName: 'background',
    //   type: 'image'
    // },
    // {
    //   name: 'campaignLogo',
    //   displayName: 'campaign logo',
    //   type: 'campaignImage'
    // },
    {
      name: 'smallTitle',
      displayName: 'small title',
      type: 'string'
    },
    {
      name: 'bigTitle',
      displayName: 'big title',
      type: 'string'
    },
    {
      name: 'priceCaption',
      displayName: 'price caption',
      type: 'string'
    },
    {
      name: 'linkUrl',
      displayName: 'link url',
      type: 'string'
    },
    // {
    //   name: 'showApplePayCampaign',
    //   displayName: 'show apple pay campaign',
    //   type: 'boolean',
    //   defaultValue: true
    // },
    // {
    //   name: 'showAsterisk',
    //   displayName: 'show asterisk',
    //   type: 'boolean',
    //   defaultValue: true
    // },
    {
      name: 'farecacheDeparture',
      displayName: 'farecache departure',
      type: 'string'
    },
    {
      name: 'farecacheDestination',
      displayName: 'farecache destination',
      type: 'string'
    },
    // {
    //   name: 'showDate',
    //   displayName: 'show date',
    //   type: 'date'
    // },
    // {
    //   name: 'hideDate',
    //   displayName: 'hide date',
    //   type: 'date'
    // }
  ]
};

export const meta = {
  componentName: 'Meta',
  displayName: 'Meta information',
  props: [
    {
      name: 'title',
      displayName: 'title',
      type: 'string'
    },
    {
      name: 'metaTags',
      displayName: 'meta tags',
      type: 'string'
    },
    {
      name: 'slogan',
      displayName: 'Slogan',
      type: 'string'
    }
  ]
};

export const testData = {
  blocks: [
    {
      data: {
        metaTags: '12',
        slogan: '123',
        title: '1'
      },
      type: 'metaWidget'
    },
    {
      data: {
        metaTags: '1',
        slogan: '1',
        title: '1'
      },
      type: 'metaWidget'
    }
  ],
  time: 1560960103483,
  version: '2.14.0'
};
