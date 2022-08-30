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
// 用url創建和管理模態框的狀態
export const useProjectModel = () => {
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
        "projectCreate",
      ]);
    const open = () => setProjectCreate({ projectCreate: true });
    const close = () => setProjectCreate({projectCreate: undefined});
    return {
        projectModalOpen: projectCreate === "true",
        open,
        close   
    }
}