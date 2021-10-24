import {IHTMLPyroRootElement, IPyroComponent, IPyroElement} from "../typing/pyro.typing";
import {rootComponent} from "./component";

export function mount(pyroComponent: IPyroComponent<{}>, rootNode: IHTMLPyroRootElement) {
    const nodes = renderPyroComponent(rootComponent(pyroComponent, rootNode))
    console.log(nodes.outerHTML)
    rootNode.innerHTML = ""
    rootNode.appendChild(nodes)
}

function renderPyroComponent(pyroComponent: IPyroElement<any>): HTMLElement {
    if(typeof pyroComponent.type === "function") {
        if(!pyroComponent.children || Array.isArray(pyroComponent.children))
            throw new Error("Need a single root element.")
        return renderPyroComponent(pyroComponent.children)
    }

    const node = document.createElement(pyroComponent.type as string)
    Object.keys(pyroComponent.props).forEach(propKey => {
        node.setAttribute(propKey, pyroComponent.props[propKey])
    })
    pyroComponent.node = node

    if(!pyroComponent.children) {
        if(pyroComponent.value) node.innerHTML = pyroComponent.value
        return pyroComponent.node
    }

    const children = Array.isArray(pyroComponent.children) ? pyroComponent.children : [pyroComponent.children]

    children.forEach(child => {
        const childNode = renderPyroComponent(child)
        pyroComponent.node!.appendChild(childNode)
    })

    return pyroComponent.node
}