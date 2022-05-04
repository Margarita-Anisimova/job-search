import React from "react";
import { useState } from "react";
import './SearchInput.css';

export default function SearchInput(props: { home?: boolean, searchChanged: any, value: string, setValue: any, text: string, className: string, name: string, items: { id: number, name: string }[], handler: any }) {

    // const [searchInput, setSearchInput] = useState('');
    const [displayItems, setDisplayItems] = useState<{ id: number, name: string }[]>(props.items);

    function handler(e: any) {
        props.handler(0)
        props.setValue(e.target.value)
        filterItems(e.target.value)
        if (displayItems.length == 1) {
            props.handler(displayItems[0].id)
        }

    }

    function filterItems(e: string) {
        let r = props.items.filter(item => item.name.startsWith(e))
        setDisplayItems(r);
    }

    function focus() {
        (document.querySelectorAll('.' + props.name)[0] as HTMLElement).style.display = 'block'
    }

    function blur() {
        if (displayItems.length == 0) {
            let r = document.getElementsByClassName(props.className)[0]
            props.searchChanged(document.getElementsByClassName(props.className)[0].value)
        }

        (document.querySelectorAll('.' + props.name)[0] as HTMLElement).style.display = 'none'
    }

    function select(item: { id: number, name: string }) {
        props.setValue(item.name)
        props.handler(item.id)
        // blur()
    }

    return (
        <div className={props.home ? "search_container" : "cont"}>
            <input
                required
                name={props.name}
                onFocus={focus}
                onBlur={blur}
                className={props.className}
                value={props.value}
                onChange={handler}
                type="text"
                placeholder={props.text}
            />
            <div>
                <ul className={'searchItems ' + props.name}>
                    {displayItems ? displayItems.map((item, i) => {
                        return i < 5 ?
                            <li onMouseDown={(e) => select(item)}>{item.name}</li>
                            : null
                    })
                        : null}
                </ul>
            </div>

        </div >
    );
}
