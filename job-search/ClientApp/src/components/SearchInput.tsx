import React from "react";
import { useState } from "react";
import './SearchInput.css';

export default function SearchInput(props: { className: string, name: string, items: string[], handler: any }) {

    const [searchInput, setSearchInput] = useState('');
    const [displayItems, setDisplayItems] = useState(props.items);

    function handler(e: any) {
        setSearchInput(e.target.value)
        props.handler(e)
        filterItems(e.target.value)
    }

    function filterItems(e) {
        let r = props.items.filter(item => item.startsWith(e))
        setDisplayItems(r);
    }

    function focus() {
        document.querySelectorAll('.searchItems')[0].style.display = 'block'
    }

    function blur() {
        document.querySelectorAll('.searchItems')[0].style.display = 'none'
    }

    function select(item) {
        setSearchInput(item)
        props.handler({ name: props.name, value: item })
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
                placeholder="Город"
            />
            <div>
                <ul className='searchItems'>
                    {displayItems.map((item, i) => {
                        return i < 5 ?
                            <li onMouseDown={(e) => select(item)}>{item}</li>
                            : null
                    })}
                </ul>
            </div>

        </div >
    );
}
