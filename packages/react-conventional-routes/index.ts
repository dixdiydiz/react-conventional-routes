interface Route {
  path?: string
  index?: boolean
  element: string
  children?: Route[]
}

export interface Options {
  handler?: (file: string) => any
  suffix?: string
}

function normalizeRoutePath(
  path: string,
  suffix: string | null | undefined
): string {
  const suffixGroup = suffix ? suffix.split('.') : []
  let pathGroup = path.split('.')
  pathGroup = pathGroup.slice(0, pathGroup.length - suffixGroup.length - 1)
  return pathGroup
    .reduce((res, curr) => {
      if (/^\$$/.test(curr)) {
        return `${res}/*}`
      }
      if (/^\$/.test(curr)) {
        return `${res}/:${curr.substring(1)}`
      }
      return `${res}/${curr.substring(1)}`
    }, '')
    .substring(1)
}

function createRoute(
  files: string[],
  fullFolder: string,
  folder: string,
  options: Required<Options>
): Route[] {
  const { handler, suffix } = options
  let wrap = false
  const isRoot = fullFolder === folder
  const routes: Route[] = []
  const deepRoutes = Object.create(null)
  let selfRoute: Route | null = null
  for (let file of files) {
    const isValidPath = file.includes(fullFolder)
    if (!isValidPath) {
      continue
    }
    const standbyFile = file.substring(fullFolder.length + 1)
    if (/\//.test(standbyFile)) {
      const deepDir = standbyFile.split('/')[0]
      if (deepDir in deepRoutes) {
        deepRoutes[deepDir].push(file)
      } else {
        deepRoutes[deepDir] = [file]
      }
      continue
    }
    const routePath = normalizeRoutePath(standbyFile, suffix)
    if (isRoot && routePath === 'root') {
      wrap = true
      selfRoute = {
        path: '/',
        element: handler(file),
      }
      continue
    }
  if (routePath === folder) {
    wrap = true
    selfRoute = {
      path: folder,
      element: handler(file),
    }
    continue
  }
  if ()
    // routes.push({
    //   path: cutoutPath(netFile),
    //   element: handler(file),
    // })
    // todo delete
    if (/^_index\./.test(netFile)) {
      wrap = true
      indexElement = {
        path: isRoot ? '/' : `${cutoutPath(folder)}/*`,
        element: handler(file),
      }
      continue
    }
    if (/^index\./.test(netFile) && !indexElement) {
      indexElement = {
        path: isRoot ? '/' : cutoutPath(folder),
        element: handler(file),
      }
      continue
    }
    if (/^404\./.test(netFile)) {
      notFoundElement = {
        path: isRoot ? '*' : `${cutoutPath(folder)}/*`,
        element: handler(file),
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
      element: handler(file),
    })
  }
  for (const [dir, files] of Object.entries(deepRoutes)) {
    routes.push(
      ...factory(
        files as string[],
        handler,
        dir,
        `${fullFolder || folder}/${dir}`
      )
    )
  }
  if (wrap) {
    return [
      {
        ...indexElement,
        children: notFoundElement
          ? [...routes, { ...notFoundElement, path: '*' }]
          : [...routes],
      },
    ] as Route[]
  } else {
    return [
      indexElement,
      ...routes.map((r) => ({
        ...r,
        path: isRoot ? r.path : `${cutoutPath(folder)}/${r.path}`,
      })),
      notFoundElement,
    ].filter(Boolean) as Route[]
  }
}

export default (files: string[], root: string, options?: Options) => {
  const defaultOptions = {
    handler: (f: string) => f,
    suffix: '',
  }
  createRoute(files, root, root, Object.assign({}, defaultOptions, options))
}

// function factory(files: string[], fullFolder: string, folder: string, options): Route[] {
//   let wrap = false
//   const isRoot = fullFolder === folder
//   const routes: Route[] = []
//   const deepRoutes = Object.create(null)
//   let indexElement: Route | null = null
//   let notFoundElement: Route | null = null
//   for (let file of files) {
//     const folderIndex = file.indexOf(fullFolder)
//     const netFile = folderIndex > -1 ?  file.substring(folderIndex + fullFolder.length + 1) : file
//     if (/^_index\./.test(netFile)) {
//       wrap = true
//       indexElement = {
//         path: isRoot ? '/' : `${cutoutPath(folder)}/*`,
//         element: handler(file)
//       }
//       continue
//     }
//     if (/^index\./.test(netFile) && !indexElement) {
//       indexElement = {
//         path: isRoot ? '/' : cutoutPath(folder),
//         element: handler(file)
//       }
//       continue
//     }
//     if (/^404\./.test(netFile)) {
//       notFoundElement = {
//         path: isRoot ? '*' : `${cutoutPath(folder)}/*`,
//         element: handler(file)
//       }
//       continue
//     }
//     if (/\//.test(netFile)) {
//       const deepDir = netFile.split('/')[0]
//       if (deepRoutes[deepDir]) {
//         deepRoutes[deepDir].push(file)
//       } else {
//         deepRoutes[deepDir] = [file]
//       }
//       continue
//     }
//     routes.push({
//       path: cutoutPath(netFile),
//       element: handler(file)
//     })
//   }
//   for (const [dir, files] of Object.entries(deepRoutes)) {
//     routes.push(...factory(files as string[], handler, dir, `${fullFolder || folder}/${dir}`))
//   }
//   if (wrap) {
//     return [
//       {
//         ...indexElement,
//         children: notFoundElement
//           ? [...routes, { ...notFoundElement, path: '*' }]
//           : [...routes]
//       }
//     ] as Route[]
//   } else {
//     return [
//       indexElement,
//       ...routes.map((r) => ({
//         ...r,
//         path: isRoot ? r.path :  `${cutoutPath(folder)}/${r.path}`
//       })),
//       notFoundElement
//     ].filter(Boolean) as Route[]
//   }
// }

// export default (files: string[], handler: (f: string)=>any, currentFolder = '') =>
//   factory(files, handler, currentFolder, currentFolder)
