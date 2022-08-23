import { useCallback, useEffect } from "react"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-async"
import {Project} from "screens/project-list/list"
export const useProjects =(param?: Partial<Project>)=> {
    const client = useHttp()
    const {run, ...Result} = useAsync<Project[]>()
    const fetchProjects = useCallback(
      () => client('projects', {data: cleanObject(param || {})}), [param, client]
    )
    useEffect(() => {
        run(fetchProjects(), {
          retry: fetchProjects
        })
    }, [param, run, fetchProjects])
    return Result
}
export const useEditProject = () => {
    const client = useHttp()
    const {run, ...Result} = useAsync()
    const mutate = (params: Partial<Project>) => {
      return  run(client(`projects/${params.id}`, {data: cleanObject(params || {}), method: 'PATCH'}))
    }
    return {mutate, ...Result}
}
export const useAddProject = () => {
    const client = useHttp()
    const {run, ...Result} = useAsync()
    const mutate = (params: Partial<Project>) => {
      return  run(client(`projects/${params.id}`, {data: cleanObject(params || {}), method: 'P'}))
    }
    return {mutate, ...Result}
}