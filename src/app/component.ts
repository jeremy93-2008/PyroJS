import {element} from "../element/element";
import {IHTMLPyroRootElement, IPyroComponent, IPyroComponentContext, IPyroElement} from "../typing/pyro.typing";
import {
    createContext,
    createNewIndexes,
    getCurrentContext,
    getRootContext,
    setCurrentContext,
    setRootContext
} from "./context";

export function rootComponent(pyroComponent: IPyroComponent<{}>, rootNode?: IHTMLPyroRootElement) {
    if(!rootNode) throw new Error("The root where Pyro will render need to be a valid HTML Node 🔥🔥🔥")
    setRootContext(rootNode?.__pyroComponentState || createContext(pyroComponent))
    setCurrentContext(getRootContext())
    rootNode.__pyroComponentState = getRootContext()

    const rootChildren = pyroComponent({})
    setRootContext({ ...getRootContext(), indexes: createNewIndexes() })

    return element(pyroComponent, {}, rootChildren)
}

export function component(pyroComponent: IPyroComponent<{}>, props?: any) {
    const currentState = getCurrentContext()
    if(!currentState) throw new Error("You cannot call a Pyro Component outside a Pyro Root Component 🔥🔥🔥")
    const currentComponent = getCurrentComponentFromContext(currentState, pyroComponent, props);
    currentState.indexes.component++
    const pyroElements = executePyroComponent(currentComponent, pyroComponent, props);
    return element(pyroComponent, {}, pyroElements)
}

function getCurrentComponentFromContext(currentState: IPyroComponentContext, pyroComponent: (props: {}) => IPyroElement<{}>, props: any) {
    let currentComponent = currentState.children[currentState.indexes.component]
    if (!currentComponent || currentComponent.type !== pyroComponent) {
        currentState.children[currentState.indexes.component] = createContext(pyroComponent, props)
        currentComponent = currentState.children[currentState.indexes.component]
    }
    currentComponent.owner = currentState
    currentComponent.indexes = createNewIndexes()
    return currentComponent;
}

function executePyroComponent(currentComponent: IPyroComponentContext, pyroComponent: (props: {}) => IPyroElement<{}>, props: any) {
    setCurrentContext(currentComponent)
    const pyroElements = pyroComponent(props || {})
    setCurrentContext(currentComponent.owner as IPyroComponentContext)
    return pyroElements;
}