import createRoutes from '../index'

describe('routes', () => {
  it('root route', () => {
    const files = [
      'pages/root.route.js',
      'pages/404.route.js',
      'pages/about/about.$.route.js',
      'pages/about/$me.route.js',
      'pages/about/long.route.path.route.js',
    ]
    expect(createRoutes( files, 'pages',
      {
        handler: f => f,
        suffix: 'route'
      })).toEqual([
      {
        element: `pages/root.route.js`,
        path: '/',
        children: [
          { element: `pages/404.route.js`, path: '*' },
          {
            children: [
              { element: `pages/about/$me.route.js`, path: ':me' },
              { element: `pages/about/long.route.path.route.js`, path: 'long/route/path' },
            ],
            element: `pages/about/about.$.route.js`,
            path: 'about/*',
          },
        ]
      }
    ])
  })
  it('layout route', () => {
    const files = [
      './__layout/__layout.route.js',
      './__layout/about/about.route.js',
      './__layout/about/phone.route.js',
    ]
    expect(createRoutes( files, '.', {
      handler: f => f,
      suffix: 'route'
    } )).toEqual([
      {
        element: `./__layout/__layout.route.js`,
        children: [
          {
            element: `./__layout/about/about.route.js`,
            path: 'about',
            children: [
              { element: `./__layout/about/phone.route.js`, path: 'phone' },
            ]
          },
        ]
      },
    ])
  })
  it('index route', () => {
    const files = [
      './__layout/__layout.route.js',
      './__layout/about/about.route.js',
      './__layout/about/index.route.js',
      './__layout/about/phone.route.js',
    ]
    expect(createRoutes( files, '.', {
      handler: f => f,
      suffix: 'route'
    } )).toEqual([
      {
        element: `./__layout/__layout.route.js`,
        children: [
          {
            element: `./__layout/about/about.route.js`,
            path: 'about',
            children: [
              { element: `./__layout/about/index.route.js`, index: true },
              { element: `./__layout/about/phone.route.js`, path: 'phone' },
            ]
          },
        ]
      },
    ])
  })
  it('separate route', () => {
    const files = [
      'routes/$info/one.route.js',
      'routes/$info/two.route.js',
      'routes/$info/three.route.js',
    ]
    expect(createRoutes( files, 'routes', {
      handler: f => f,
      suffix: 'route'
    } )).toEqual([
      { element: 'routes/$info/one.route.js', path: ':info/one' },
      { element: 'routes/$info/two.route.js', path: ':info/two' },
      { element: 'routes/$info/three.route.js', path: ':info/three' },
    ])
  })
})
