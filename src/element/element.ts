import {IPyroComponent, IPyroElement} from "../typing/pyro.typing";

const $$type = Symbol("Pyro:Element")

export function element(
    element: string,
    attrOrChildren?: any | string | IPyroElement<any> | IPyroElement<any>[],
    children?: string |
        IPyroElement<any> |
        IPyroElement<any>[]
): IPyroElement<any> {
    return {
        $$type,
        type: element,
        value: (typeof children === "string" ? children :
            (typeof attrOrChildren === "string" ? attrOrChildren : undefined)),
        props: attrOrChildren.$$type === $$type || typeof attrOrChildren === "string" ? {} : attrOrChildren,
        children: children ? (typeof children !== "string" ? children : undefined) :
            attrOrChildren.$$type === $$type ? attrOrChildren : undefined
    }
}

export function createFnElement(fn: IPyroComponent<any>): IPyroElement<any> {
    return {
        $$type,
        type: fn,
        props: {},
        children: fn({})
    }
}