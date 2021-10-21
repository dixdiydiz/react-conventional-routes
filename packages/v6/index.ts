export interface Route {
  path: string
  element: string
  children?: Route[]
}

function cutoutPath(way: string): string {
  const matchs = way.match(/(?<=\[)[^\[\]]*(?=\])/g)
  if (matchs) {
    return matchs.reduce((res, curr) => `${res}${res ? '/' : ''}:${curr}`, '')
  }
  return way.split('.')[0]
}

function factory(files: string[], handler: (f: string)=>any, folder: string, fullFolder: string): Route[] {
  let wrap = false
  const isRoot = fullFolder === folder
  const routes: Route[] = []
  const deepRoutes = Object.create(null)
  let indexElement: Route | null = null
  let notFoundElement: Route | null = null
  for (let file of files) {
    const folderIndex = file.indexOf(fullFolder)
    const netFile = folderIndex > -1 ?  file.substring(folderIndex + fullFolder.length + 1) : file
    if (/^_index\./.test(netFile)) {
      wrap = true
      indexElement = {
        path: isRoot ? '/*' : `${cutoutPath(folder)}/*`,
        element: handler(file)
      }
      continue
    }
    if (/^index\./.test(netFile) && !indexElement) {
      indexElement = {
        path: isRoot ? '/' : cutoutPath(folder),
        element: handler(file)
      }
      continue
    }
    if (/^404\./.test(netFile)) {
      notFoundElement = {
        path: isRoot ? '*' : `${cutoutPath(folder)}/*`,
        element: handler(file)
      }
      continue
    }
    if (/\//.test(netFile)) {
      const deepDir = netFile.split('/')[0]
      if (deepRoutes[deepDir]) {
        deepRoutes[deepDir].push(file)
      } else {
        deepRoutes[deepDir] = [file]
      }
      continue
    }
    routes.push({
      path: cutoutPath(netFile),
      element: handler(file)
    })
  }
  for (const [dir, files] of Object.entries(deepRoutes)) {
    routes.push(...factory(files as string[], handler, dir, `${fullFolder || folder}/${dir}`))
  }
  if (wrap) {
    return [
      {
        ...indexElement,
        children: notFoundElement
          ? [...routes, { ...notFoundElement, path: '*' }]
          : [...routes]
      }
    ] as Route[]
  } else {
    return [
      indexElement,
      ...routes.map((r) => ({
        ...r,
        path: isRoot ? r.path :  `${cutoutPath(folder)}/${r.path}`
      })),
      notFoundElement
    ].filter(Boolean) as Route[]
  }
}

export default (files: string[], handler: (f: string)=>any, currentFolder = '') =>
  factory(files, handler, currentFolder, currentFolder)