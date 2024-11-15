/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as authRegisterImport } from './routes/(auth)/register'
import { Route as authLoginImport } from './routes/(auth)/login'
import { Route as appLayoutRouteImport } from './routes/(app)/_layout/route'
import { Route as appLayoutIndexImport } from './routes/(app)/_layout/index'

// Create Virtual Routes

const appImport = createFileRoute('/(app)')()

// Create/Update Routes

const appRoute = appImport.update({
  id: '/(app)',
  getParentRoute: () => rootRoute,
} as any)

const authRegisterRoute = authRegisterImport.update({
  id: '/(auth)/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const authLoginRoute = authLoginImport.update({
  id: '/(auth)/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const appLayoutRouteRoute = appLayoutRouteImport.update({
  id: '/(app)/_layout',
  getParentRoute: () => appRoute,
} as any)

const appLayoutIndexRoute = appLayoutIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => appLayoutRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/(app)': {
      id: '/(app)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appImport
      parentRoute: typeof undefinedRoute
    }
    '/(app)/_layout': {
      id: '/(app)/_layout'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appLayoutRouteImport
      parentRoute: typeof appRoute
    }
    '/(auth)/login': {
      id: '/(auth)/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof authLoginImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/register': {
      id: '/(auth)/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof authRegisterImport
      parentRoute: typeof rootRoute
    }
    '/(app)/_layout/': {
      id: '/(app)/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appLayoutIndexImport
      parentRoute: typeof appLayoutRouteImport
    }
  }
}

// Create and export the route tree

interface appLayoutRouteRouteChildren {
  appLayoutIndexRoute: typeof appLayoutIndexRoute
}

const appLayoutRouteRouteChildren: appLayoutRouteRouteChildren = {
  appLayoutIndexRoute: appLayoutIndexRoute,
}

const appLayoutRouteRouteWithChildren = appLayoutRouteRoute._addFileChildren(
  appLayoutRouteRouteChildren,
)

interface appRouteChildren {
  appLayoutRouteRoute: typeof appLayoutRouteRouteWithChildren
}

const appRouteChildren: appRouteChildren = {
  appLayoutRouteRoute: appLayoutRouteRouteWithChildren,
}

const appRouteWithChildren = appRoute._addFileChildren(appRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof appLayoutIndexRoute
  '/login': typeof authLoginRoute
  '/register': typeof authRegisterRoute
}

export interface FileRoutesByTo {
  '/login': typeof authLoginRoute
  '/register': typeof authRegisterRoute
  '/': typeof appLayoutIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/(app)': typeof appRouteWithChildren
  '/(app)/_layout': typeof appLayoutRouteRouteWithChildren
  '/(auth)/login': typeof authLoginRoute
  '/(auth)/register': typeof authRegisterRoute
  '/(app)/_layout/': typeof appLayoutIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/login' | '/register'
  fileRoutesByTo: FileRoutesByTo
  to: '/login' | '/register' | '/'
  id:
    | '__root__'
    | '/(app)'
    | '/(app)/_layout'
    | '/(auth)/login'
    | '/(auth)/register'
    | '/(app)/_layout/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  appRoute: typeof appRouteWithChildren
  authLoginRoute: typeof authLoginRoute
  authRegisterRoute: typeof authRegisterRoute
}

const rootRouteChildren: RootRouteChildren = {
  appRoute: appRouteWithChildren,
  authLoginRoute: authLoginRoute,
  authRegisterRoute: authRegisterRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/(app)",
        "/(auth)/login",
        "/(auth)/register"
      ]
    },
    "/(app)": {
      "filePath": "(app)/_layout",
      "children": [
        "/(app)/_layout"
      ]
    },
    "/(app)/_layout": {
      "filePath": "(app)/_layout/route.tsx",
      "parent": "/(app)",
      "children": [
        "/(app)/_layout/"
      ]
    },
    "/(auth)/login": {
      "filePath": "(auth)/login.tsx"
    },
    "/(auth)/register": {
      "filePath": "(auth)/register.tsx"
    },
    "/(app)/_layout/": {
      "filePath": "(app)/_layout/index.tsx",
      "parent": "/(app)/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
