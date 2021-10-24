import {IPyroComponent, IPyroElement} from "../typing/pyro.typing";

const $$type = Symbol("Pyro:Element")

export function element(
    element: string | IPyroComponent<any>,
    attrOrChildren?: any,
    children?: any |
        IPyroElement<any> |
        IPyroElement<any>[]
): IPyroElement<any> {
    return {
        $$type,
        type: element,
        value: (typeof children === "string" ? children : undefined),
        props: attrOrChildren || {},
        children: (typeof children !== "string" ? children : undefined)
    }
}