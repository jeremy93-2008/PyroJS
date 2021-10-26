import {IPyroComponent, IPyroComponentContext, IPyroElement} from "../typing/pyro.typing";
import {element} from "../element/element";

export let __rootContext: IPyroComponentContext = createContext()
export let __currentContext: IPyroComponentContext = __rootContext

export function setCurrentContext (ctx: IPyroComponentContext) {
    __currentContext = ctx
}

export function setRootContext (ctx: IPyroComponentContext) {
    __rootContext = ctx
}

export function getCurrentContext () {
    return __currentContext
}

export function getRootContext() {
    return __rootContext
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

export function setNewCurrentInstance(fn: Function | IPyroElement<any>, type: "html" | "effect" | "atom" | "memo" | "callback") {
    const currentContext = getCurrentContext()
    currentContext.state.currentInstance = { fn, type }
    return { fn, type }
}

export function cleanCurrentInstance() {
    const currentContext = getCurrentContext()
    currentContext.state.currentInstance = undefined
}