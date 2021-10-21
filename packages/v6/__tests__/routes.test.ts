import * as path from 'path'
import factory from '../index'

describe('routes', () => {
  it('absolute path', () => {
    const files = [
      'pages/index.route.js',
      'pages/404.route.js',
      'pages/about/index.route.js',
      'pages/about/[id].route.js',
      'pages/about/deep/404.route.js',
      'pages/about/deep/_index.route.js',
      'pages/users/_index.route.js',
      'pages/users/[id].route.js',
      'pages/users/dont.special.js',
      'pages/users/[serial]/[id].route.js',
      'pages/users/deep/level.route.js',
      'pages/users/deep/404.route.js',
    ]
    expect(factory( files, (f) => f, 'pages')).toEqual([
      { element: `pages/index.route.js`, path: '/' },
      { element: `pages/about/index.route.js`, path: 'about' },
      { element: `pages/about/[id].route.js`, path: 'about/:id' },
      {
        children: [
          { element: `pages/about/deep/404.route.js`, path: '*' }
        ],
        element: `pages/about/deep/_index.route.js`,
        path: 'about/deep/*'
      },
      {
        element: `pages/users/_index.route.js`,
        path: 'users/*',
        children: [
          { element: `pages/users/[id].route.js`, path: ':id' },
          { element: `pages/users/dont.special.js`, path: 'dont' },
          {
            element: `pages/users/[serial]/[id].route.js`,
            path: ':serial/:id'
          },
          {
            element: `pages/users/deep/level.route.js`,
            path: 'deep/level'
          },
          {
            element: `pages/users/deep/404.route.js`,
            path: 'deep/*'
          }
        ]
      },
      { element: `pages/404.route.js`, path: '*' }
    ])
  })
  it('relative path', () => {
    const files = [
      './index.route.js',
      './404.route.js',
      './about/index.route.js',
      './about/[id].route.js',
      './about/deep/404.route.js',
      './about/deep/_index.route.js',
      './users/_index.route.js',
      './users/[id].route.js',
      './users/dont.special.js',
      './users/[serial]/[id].route.js',
      './users/deep/level.route.js',
      './users/deep/404.route.js',
    ]
    expect(factory( files, (f) => f, '.')).toEqual([
      { element: `./index.route.js`, path: '/' },
      { element: `./about/index.route.js`, path: 'about' },
      { element: `./about/[id].route.js`, path: 'about/:id' },
      {
        children: [
          { element: `./about/deep/404.route.js`, path: '*' }
        ],
        element: `./about/deep/_index.route.js`,
        path: 'about/deep/*'
      },
      {
        element: `./users/_index.route.js`,
        path: 'users/*',
        children: [
          { element: `./users/[id].route.js`, path: ':id' },
          { element: `./users/dont.special.js`, path: 'dont' },
          {
            element: `./users/[serial]/[id].route.js`,
            path: ':serial/:id'
          },
          {
            element: `./users/deep/level.route.js`,
            path: 'deep/level'
          },
          {
            element: `./users/deep/404.route.js`,
            path: 'deep/*'
          }
        ]
      },
      { element: `./404.route.js`, path: '*' }
    ])
  })
})
