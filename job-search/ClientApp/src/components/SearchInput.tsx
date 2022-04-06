import React from "react";
import { useState } from "react";
import './SearchInput.css';

export default function SearchInput(props: { className: string, name: string, items: { profession_id: number, profession: string }[], handler: any }) {

    const [searchInput, setSearchInput] = useState('');
    const [displayItems, setDisplayItems] = useState<{ profession_id: number, profession: string }[]>(props.items);

    function handler(e: any) {
        props.handler(0)
        setSearchInput(e.target.value)
        filterItems(e.target.value)
        if (displayItems.length == 1) {
            props.handler(displayItems[0].profession_id)
        }

    }

    function filterItems(e) {
        let r = props.items.filter(item => item.profession.startsWith(e))
        setDisplayItems(r);
    }

    function focus() {
        document.querySelectorAll('.searchItems')[0].style.display = 'block'
    }

    function blur() {
        document.querySelectorAll('.searchItems')[0].style.display = 'none'
    }

    function select(item: { profession_id: number, profession: string }) {
        setSearchInput(item.profession)
        props.handler(item.profession_id)
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
                            <li onMouseDown={(e) => select(item)}>{item.profession}</li>
                            : null
                    })}
                </ul>
            </div>

        </div >
    );
}
