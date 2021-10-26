import {getCurrentContext} from "./context";

export function createMemo<T>(memoFn: T) {
    const currentContext = getCurrentContext()
    currentContext.state.currentInstance = {
        fn: memoFn as unknown as Function,
        type: "memo"
    }
    currentContext.indexes.memo++
    return (memoFn as unknown as Function)()
}