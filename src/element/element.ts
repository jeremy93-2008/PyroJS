import {IPyroComponent, IPyroElement} from "../typing/pyro.typing";
import {cleanCurrentInstance, setNewCurrentInstance} from "../app/context";

const $$typeElement = Symbol("Pyro.Element")
const $$typeComponent = Symbol("Pyro.Component")

export function element(
    element: string | IPyroComponent<any>,
    attrOrChildren?: any,
    children?: any |
        IPyroElement<any> |
        IPyroElement<any>[] |
        Function |
        Function[]
): IPyroElement<any> {
    const renderElement = {
        $$type: typeof element === "function" ? $$typeComponent : $$typeElement ,
        type: element,
        props: attrOrChildren || {}
    } as Partial<IPyroElement<any>>
    setNewCurrentInstance(renderElement as unknown as IPyroElement<any>, "html")
    const renderChildren = getRenderChildren(children)
    cleanCurrentInstance()
    renderElement.value = (typeof renderChildren === "string" ? renderChildren : undefined)
    renderElement.children = (typeof renderChildren !== "string" ? renderChildren : undefined)
    return renderElement as IPyroElement<any>
}

function getRenderChildren(children: any |
    IPyroElement<any> |
    IPyroElement<any>[] |
    Function |
    Function[]) {
    if(!children) return
    if(!Array.isArray(children)) {
        return executeChild(children)
    }
    return children.map((child: Function | IPyroElement<any>) => executeChild(child))
}

function executeChild(child: Function | IPyroElement<any>) {
    return typeof child === "function" ? child() : child
}