export type IPyroComponent<T> = (props: T) => IPyroElement<T>

export interface IPyroElement<T> {
    $$type: Symbol,
    type: string | IPyroComponent<any>,
    props: T,
    children?: IPyroElement<T> |IPyroElement<T>[]
    value?: string
    node?: HTMLElement
}
