/**
 * @jest-environment jsdom
 */

import {mount} from "../src/app/mount";
import {element} from "../src/element/element";
import {createAtom} from "../src/app/atom";
import {component} from "../src/app/component";
import {createMemo} from "../src/app/memo";

describe("Pyro Component", () => {
    test("Simple Pyro Component", () => {
        function SimpleComponent() {

            const [getData, setData] = createAtom("buenas")

            return element("div", { title: "Hola"}, [
                element("div", {},
                    element("span",{title: "Buenas"},[
                        element("span",{},"Buenas al mundo"),
                        element("span",{}, getData())
                    ])
                ),
                element("div",{},
                    element("span",{},"Hola mundo")
                )
            ])
        }
        mount(SimpleComponent, document.body)
    })
    test("Nested Pyro Component", () => {
        function NestedComponent() {

            const [getData, setData] = createAtom("buenas")

            const memoData = createMemo(() => {
                return getData() + 10
            })

            return element("div", { title: "Hola"}, [
                element("div", {},
                    element("span",{title: "Buenas"},[
                        element("span",{},"Buenas al mundo"),
                        element("span",{}, memoData)
                    ])
                ),
                component(function NestedComponent() {
                    const [getData, setData] = createAtom("sub")
                    return element("div", {}, "Soy un subcomponente")
                }),
                element("div",{},
                    element("span",{},"Hola mundo")
                )
            ])
        }
        mount(NestedComponent, document.body)
    })
})