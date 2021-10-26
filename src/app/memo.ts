import {getCurrentContext, setNewCurrentInstance} from "./context";

export function createMemo<T>(memoFn: T) {
    const currentContext = getCurrentContext()
    setNewCurrentInstance(memoFn as unknown as Function, "memo")
    currentContext.indexes.memo++
    return (memoFn as unknown as Function)()
}