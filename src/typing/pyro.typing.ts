export type IPyroComponent<T> = (props: T) => IPyroElement<T>

export type IHTMLPyroRootElement = HTMLElement & { __pyroComponentState?: IPyroComponentContext }

export interface IPyroElement<T> {
    $$type: Symbol,
    type: string | IPyroComponent<any>,
    props: T,
    children?: IPyroElement<T> |IPyroElement<T>[]
    value?: string
    node?: HTMLElement
}

export interface IPyroAtom<T> {
    idx: number
    value: T
    subscribers: IPyroSubscribers[]
}

export interface IPyroComputed<T> {
    idx: number,
    fn: T,
    subscribers: IPyroSubscribers[]
}

export interface IPyroSubscribers {
    fn: Function | IPyroElement<any>
    type?: "html" | "effect" | "atom" | "memo" | "callback"
}

export type IPyroComponentContext = {
    owner: IPyroComponentContext | null,
    type: string | IPyroComponent<any>
    props: any,
    state: IPyroComponentContextState,
    indexes: IPyroComponentIndexes,
    children: IPyroComponentContext[]
}

export interface IPyroComponentContextState {
    atoms: IPyroAtom<any>[],
    effects: IPyroComputed<any>[],
    memos: IPyroComputed<any>[],
    callback: IPyroComputed<any>[],
    currentInstance?: {
        fn: Function | IPyroElement<any>,
        type: "html" | "effect" | "atom" | "memo" | "callback"
    }
}

export interface IPyroComponentIndexes {
    atom: number,
    effect: number,
    memo: number,
    callback: number,
    component: number
}