import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "utils"

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParam] = useSearchParams()
    return [
        useMemo(()=> keys.reduce((prev: {[key in K]: string}, key: K) => {
            return {...prev, [key]: searchParams.get(key) || ''}
         }, {} as {[key in K]: string}),
        //  eslint-disable-next-line react-hooks/exhaustive-deps
         [searchParams]
        ),
        (params : Partial<{[key in K] : unknown}> ) => {
            //  iterator
            const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit
           return setSearchParam(o)
        }
    ] as const
}

export const useSetUrlSearchParam = () => {
    const [searchParams, setSearchParam] = useSearchParams();
    return (params: { [key in string]: unknown }) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    };
  };