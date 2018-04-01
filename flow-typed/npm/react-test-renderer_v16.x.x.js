// flow-typed signature: 2d946f2ec4aba5210b19d053c411a59d
// flow-typed version: 95b3e05165/react-test-renderer_v16.x.x/flow_>=v0.47.x

// Type definitions for react-test-renderer 16.x.x
// Ported from: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-test-renderer

declare module "react-test-renderer" {
  declare type ReactTestRendererJSON = {
    type: string,
    props: {[propName: string]: any},
    children: null | ReactTestRendererJSON[]
  };

  declare type ReactTestRendererTree = ReactTestRendererJSON & {
    nodeType: "component" | "host",
    instance: any,
    rendered: null | ReactTestRendererTree
  };

  declare type ReactTestInstance = {
    instance: any,
    type: string,
    props: {[propName: string]: any},
    parent: null | ReactTestInstance,
    children: Array<ReactTestInstance | string>,

    find(predicate: (node: ReactTestInstance) => boolean): ReactTestInstance,
    findByType(type: React$ComponentType<*>): ReactTestInstance,
    findByProps(props: {[propName: string]: any}): ReactTestInstance,

    findAll(
    predicate: (node: ReactTestInstance) => boolean,
    options?: {deep: boolean}
    ): ReactTestInstance[],
    findAllByType(
    type: React$ElementType,
    options?: {deep: boolean}
    ): ReactTestInstance[],
    findAllByProps(
    props: {[propName: string]: any},
    options?: {deep: boolean}
    ): ReactTestInstance[]
  };

  declare type ReactTestRenderer = {
    toJSON(): null | ReactTestRendererJSON,
    toTree(): null | ReactTestRendererTree,
    unmount(nextElement?: React$Element<any>): void,
    update(nextElement: React$Element<any>): void,
    getInstance(): null | ReactTestInstance,
    root: ReactTestInstance
  };

  declare type TestRendererOptions = {
    createNodeMock(element: React$Element<any>): any
  };

  declare function create(
  nextElement: React$Element<any>,
  options?: TestRendererOptions
  ): ReactTestRenderer;
}
