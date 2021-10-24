import {IPyroComponent, IPyroComponentContext} from "../typing/pyro.typing";
import {element} from "../element/element";

export let ComponentContext: IPyroComponentContext = createContext()
export let currentContext: IPyroComponentContext = ComponentContext

export function setCurrentContext (ctx: IPyroComponentContext) {
    currentContext = ctx
}

export function setRootContext (ctx: IPyroComponentContext) {
    ComponentContext = ctx
}

export function getCurrentContext () {
    return currentContext
}

export function getRootContext() {
    return ComponentContext
}

export function createContext(fn?: IPyroComponent<any>, props?: any): IPyroComponentContext {
    return {
        owner: null,
        type: fn || ((props) => element("div", {})),
        props: props || {},
        state: {
            atoms: [],
            callback: [],
            memos: [],
            effects: []
        },
        indexes: createNewIndexes(),
        children: []
    }
}

export function createNewIndexes() {
    return {
        atom: 0,
        effect: 0,
        memo: 0,
        callback: 0,
        component: 0
    }
}