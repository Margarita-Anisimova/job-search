
import React from "react";

export function createTextInputs(arr: { tag: string, name: string, value: string }[], handlerFunc: any) {
    let a: any[] = []
    arr.map((e) => {
        a.push(<label>{e.name}</label>)
        //  
        a.push(<input value={e.value} onChange={(element) => handlerFunc(element)} name={e.tag} type='text'></input>)
    })
    return a;
}

export function createSelect(start: number, end: number) {
    let a = [];
    for (let i = start; i <= end; i++) {
        a.push(<option>{i}</option>);
    }
    return a;
}

type DateSelect = {
    name: string;
    tag: string;
    selectNames: string[];
}

export function createSelectsContainer(dateSelect: DateSelect, handler: any) {
    const ranges = [[1950, 2022], [1, 12], [1, 31]]
    let result: any[] = []
    result.push(<label> {dateSelect.name} </label>)
    let a: any[] = []

    dateSelect.selectNames.map((e, i) => {
        a.push(
            <select onChange={(e) => handler(e)} name={e} className='dataselect'>
                {createSelect(ranges[i][0], ranges[i][1])}
            </select>)
    })
    a.reverse()
    result.push(
        <div className={dateSelect.tag}>
            {a}
        </div>
    )
    return result;
}