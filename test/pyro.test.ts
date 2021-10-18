/**
 * @jest-environment jsdom
 */

import {mount} from "../src/app/mount";
import {element} from "../src/element/element";

describe("Pyro Component", () => {
    test("Simple Pyro Component", () => {
        function SimpleComponent() {
            //const [getData, setData] = createAtom("buenas")

            return element("div", { title: "Hola"}, [
                element("div",
                    element("span",{title: "Buenas"},[
                        element("span","Buenas al mundo")
                    ])
                ),
                element("div",
                    element("span","Hola mundo")
                )
            ])
        }
        mount(SimpleComponent, document.body)
    })
})