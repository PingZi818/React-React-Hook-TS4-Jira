import React, {useState} from "react";
import { useArray, useMount } from "utils";

export const TsReactTest = () => {
    const persons: { name: string; age: number}[] = [
        { name: "jack", age: 25 },
        { name: "ma", age: 22 },
    ]
    const { value, clear, removeIndex, add } = useArray(persons)
    useMount( () => {
        console.log(value.noExist)
        add({name: ""})
        removeIndex("123")
    })
}