import {IPyroAtom, IPyroSubscribers} from "../typing/pyro.typing";
import {getCurrentContext, getRootContext} from "./context";

export function createAtom<T>(initialValue: T): [() => T, Function] {
    const currentContext = getCurrentContext()
    const s = {
        idx: currentContext.indexes.atom,
        subscribers: [] as IPyroSubscribers[],
        value: initialValue
    }
    currentContext.indexes.atom++
    return [() => getData<T>(s), (value: T) => setData(s, value)]
}

const getData = function <T>(s: IPyroAtom<T>): T {
    const currentContext = getCurrentContext()
    if(!currentContext.state.currentInstance) throw new Error("Atom Get Function need to be in a Pyro Component 🔥🔥🔥")

    let currentAtomSubscribers = currentContext.state.atoms.find(atom => atom.idx === s.idx)
    if(!currentAtomSubscribers) {
        currentContext.state.atoms.push(s)
        currentAtomSubscribers = s
    }

    if(!(currentAtomSubscribers.subscribers.find(subscriber => subscriber.fn
        === currentContext.state.currentInstance!.fn))) {
        currentAtomSubscribers.subscribers.push({
            fn: currentContext.state.currentInstance.fn,
            type: currentContext.state.currentInstance.type
        })
    }

    return currentAtomSubscribers.value as T
}

const setData = function <T>(s: IPyroAtom<T>, value: T) {
    const currentContext = getCurrentContext()
    s.value = value
    const currentAtom = currentContext.state.atoms.find(at => at.idx === s.idx)
    if(!currentAtom) return
    currentAtom.subscribers.forEach(sub => typeof sub.fn === "function" ? sub.fn() : {})
}