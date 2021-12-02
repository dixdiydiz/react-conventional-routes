## React Conventional Routes
**Base on React Router,version 6.**  
**Purposely refer to [Remix](https://remix.run/docs/en/v1/api/conventions) developed by the same team.**
**cross-platform**
***

### Map of filenames with routes
- `/routes/root.tsx`  
  `Root Route`, corresponds to path '/'.
```javascript
    <Route path="/" element={<Foo />}>
      <Route />
      <Route />
    </Route>
```
- `/routes/{folder}/{folder}.tsx`  
  When a file has the same name as a folder, it will be regarded as `Nested Route`.
```javascript
    <Route path="folder" element={<Folder />}>
      <Route path="new" element={<New />}/>
    </Route>
```
- `/routes/{folder}/index.tsx`  
  file named "index" will render as `Index Route`.
```javascript
    <Route path="foo" element={<Foo />}>
      <Route
        index
        element={<div />}
      />
    </Route>
```
- `/routes/{folder}/file.$.tsx`  
  It will create a route path like `file/*`.
```javascript
    <Route path="foo/*" element={<Foo />}>
      <Route />
      <Route />
    </Route>
```
- `/routes/{folder}/$param.tsx`  
  The dollar sign denotes a Dynamic Route.
```javascript
    <Route path=":foo" element={<Foo />} />
```
- `/routes/__{folder}/__{folder}.tsx`  
  Prefixing a folder with __ will create a `Layout Route`.
```javascript
    <Route element={<PageLayout />}>
      <Route path="/foo" element={<Foo />} />
      <Route path="/bar" element={<Bar />} />
    </Route>
```
- #### Dots in route filenames  
  The . allows you to create nested URLs without needing to create a bunch of layouts.
```javascript
  // /routes/some.long.path.tsx
  <Route path="some/long/path" element={<Some />}>
```
- #### 404.tsx
  Not Found Route.
```javascript
  <Route path="*" element={<NotFound />}>
```

***
### Example
*Assuming the rules above.*  
Suppose fileName contains `route` will be registered as a route.
    - simple example
```
.
  └── routes
    ├── root.route.tsx
    ├── users
    │  ├── users.route.tsx
    │  ├── index.route.tsx
    │  ├── team.route.tsx
    │  └── $id.route.tsx
    ├── __layout
    │   ├──__layout.route.tsx
    │   └──about
    │      ├── about.$.route.tsx
    │      └── name.route.tsx
    ├── me.route.tsx
    ├── 404.route.tsx
    └── invalid.tsx
``` 
result:
```
[
  { 
    path: '/', 
    element: '<rootDir>/pages/root.route.tsx'
    children: [
      {
        path: 'users',
        element: '<rootDir>/pages/users/users.route.tsx',
        children: [
          { index: true, element: '<rootDir>/pages/users/index.route.tsx' },
          { path: 'team', element: '<rootDir>/pages/users/team.route.tsx' },
          { path: ':id', element: '<rootDir>/pages/users/$id.route.tsx' },
        ]
      },
      {
        element: '<rootDir>/pages/__layout/__layout.route.tsx',
        children: [
          { 
            path: 'about/*', 
            element: '<rootDir>/pages/about/about.$.route.tsx',
            children: [
              { path: 'name', element: '<rootDir>/pages/about/name.route.tsx' },
              { path: ':id', element: '<rootDir>/pages/users/$id.route.tsx' },
            ]
           },
        ]
       },
      { path: 'me', element: '<rootDir>/pages/me.route.tsx' },
      { path: '*', element: '<rootDir>/pages/404.route.tsx' },
    ]  
  },
]
```
