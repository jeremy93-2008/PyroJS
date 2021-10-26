import {IHTMLPyroRootElement, IPyroComponent, IPyroElement} from "../typing/pyro.typing";
import {rootComponent} from "./component";
import {getRootContext} from "./context";

export function mount(pyroComponent: IPyroComponent<{}>, rootNode: IHTMLPyroRootElement) {
    const pyroElement = renderPyroComponent(rootComponent(pyroComponent, rootNode))
    const a = getRootContext()
    rootNode.innerHTML = ""
    rootNode.appendChild(pyroElement.node!)
}

function renderPyroComponent(pyroComponent: IPyroElement<any>): IPyroElement<any> {
    if(typeof pyroComponent.type === "function") {
        if(!pyroComponent.children || Array.isArray(pyroComponent.children))
            throw new Error("Need a single root element 🔥🔥🔥")
        return renderPyroComponent(pyroComponent.children)
    }

    const node = document.createElement(pyroComponent.type as string)
    Object.keys(pyroComponent.props).forEach(propKey => {
        node.setAttribute(propKey, pyroComponent.props[propKey])
    })
    pyroComponent.node = node

    if(!pyroComponent.children) {
        if(pyroComponent.value) node.innerHTML = pyroComponent.value
        return pyroComponent
    }

    const children = Array.isArray(pyroComponent.children) ? pyroComponent.children : [pyroComponent.children]

    children.forEach(child => {
        const element = renderPyroComponent(child)
        pyroComponent.node!.appendChild(element.node!)
    })

    return pyroComponent
}