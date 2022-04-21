import React from "react";
import { useState } from "react";
import './SearchInput.css';

export default function SearchInput(props: { className: string, name: string, items: { id: number, name: string }[], handler: any }) {

    const [searchInput, setSearchInput] = useState('');
    const [displayItems, setDisplayItems] = useState<{ id: number, name: string }[]>(props.items);

    function handler(e: any) {
        props.handler(0)
        setSearchInput(e.target.value)
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
        (document.querySelectorAll('.searchItems')[0] as HTMLElement).style.display = 'block'
    }

    function blur() {
        (document.querySelectorAll('.searchItems')[0] as HTMLElement).style.display = 'none'
    }

    function select(item: { id: number, name: string }) {
        setSearchInput(item.name)
        props.handler(item.id)
        // blur()
    }

    return (
        <div className="search_container">
            <input
                name={props.name}
                onFocus={focus}
                onBlur={blur}
                className={props.className}
                value={searchInput}
                onChange={handler}
                type="text"
                placeholder="Введите профессию"
            />
            <div>
                <ul className='searchItems'>
                    {displayItems.map((item, i) => {
                        return i < 5 ?
                            <li onMouseDown={(e) => select(item)}>{item.name}</li>
                            : null
                    })}
                </ul>
            </div>

        </div >
    );
}
