import {IPyroAtom, IPyroSubscribers} from "../typing/pyro.typing";
import {getCurrentContext, getRootContext} from "./context";

export function createAtom<T>(this: any, initialValue: T): [() => T, Function] {
    const s = {
        subscribers: [] as IPyroSubscribers[],
        value: initialValue
    }
    console.log("current", getCurrentContext() ,"root", getRootContext())
    return [() => getData<T>(s), setData.bind(s as any)]
}

const getData = function <T>(s: IPyroAtom<T>): T {
    return s.value as T
}

const setData = function <T>(this: IPyroAtom<T>) {

}