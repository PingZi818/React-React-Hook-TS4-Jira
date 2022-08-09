import { useEffect } from "react"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-async"
import {Project} from "screens/project-list/list"
export const useProjects =(param?: Partial<Project>)=> {
    const client = useHttp()
    const {run, ...Result} = useAsync<Project[]>()
    useEffect(() => {
        run(client('projects', {data: cleanObject(param || {})}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])
    return Result
}