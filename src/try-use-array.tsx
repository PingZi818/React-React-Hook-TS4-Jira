import React, {useState} from "react";
import { useArray, useMount } from "utils";

export const TsReactTest = () => {
    const persons: { name: string; age: number}[] = [
        { name: "jack", age: 25 },
        { name: "ma", age: 22 },
    ]
    const { value, clear, removeIndex, add } = useArray(persons)
    // useMount( () => {
        // console.log(value)
        // add({name: "john", age: 23})
        // removeIndex(0)
        // clear()
    // })
    return <div>
        <button onClick={() => add({name: "john", age: 23})}>add john</button>
        <button onClick={() => removeIndex(0)}>remove 0</button>
        <button onClick={() => clear()}>clear</button>
    </div>
}