import { useEffect, useState } from "react"

export const isFalsy = (value: unknown) => value === 0 ? false : !value
// 在一个函数里， 改变传入的对象本身是不好的
// 里面没有用到别的hook就函数就挺好
export const cleanObject = (object: object) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        // @ts-ignore
        const value = result[key]
        if(isFalsy(value)) {
            // @ts-ignore
            delete result[key]
        }
    })

    return result
}
/** 自定义hooks */
export const useMount = (callback: () => void) => {
    useEffect(() => {
      callback();
    }, [callback]);
  };
// const debounce = (func, delay) => {
//     let timeout;
//     return (...param) => {
//         if (timeout) {
//             clearTimeout(timeout)
//         }
//         timeout = setTimeout(() => {
//             func(...param)
//         }, delay)
//     }
// }
// const log = debounce(() => console.log('call'), 5000)
// log()
// log()
// log()
// delay可以不传不然就传number类型
// 用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
    const [debounceValue, setDebounceValue] = useState(value)
    useEffect(() => {
        // 每次在value变化以后，设置一个定时器
        const timeout = setTimeout(() => setDebounceValue(value), delay)
        // 每次在上一个useEffect处理完以后再运行
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debounceValue
}
// homework 自己写一个hook
export const useArray = <T>(initialArray: T[]) => {
    const [value, setValue] = useState(initialArray)
    return {
        value, setValue, 
        add: (item: T) => setValue([...value, item]), 
        removeIndex:(key: number) => {
            const copy = [...value]
            setValue(copy.splice(key, 1))
        },
        clear: () => setValue([])
    }
}