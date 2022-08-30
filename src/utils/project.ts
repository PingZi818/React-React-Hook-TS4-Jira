import { cleanObject } from "utils"
import { useHttp } from "./http"
import {Project} from "screens/project-list/list"
import { useMutation, useQuery, useQueryClient } from "react-query"
export const useProjects =(param?: Partial<Project>)=> {
    const client = useHttp()
    // param 变化就会触发请求useQuery
    return useQuery<Project[], Error>(['projects', cleanObject(param)], () => client('projects', {
      data: cleanObject(param || {})
    }))
    // const {run, ...Result} = useAsync<Project[]>()
    // const fetchProjects = useCallback(
    //   () => client('projects', {data: cleanObject(param || {})}), [param, client]
    // )
    // useEffect(() => {
    //     run(fetchProjects(), {
    //       retry: fetchProjects
    //     })
    // }, [param, run, fetchProjects])
    // return Result
}
export const useEditProject = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(
      (params: Partial<Project>) => client(`projects/${params.id}`, {
        data: cleanObject(params || {}), method: 'PATCH'
      }),{
        onSuccess: () => queryClient.invalidateQueries('projects')
      }
    )
    // const {run, ...Result} = useAsync()
    // const mutate = (params: Partial<Project>) => {
    //   return  run(client(`projects/${params.id}`, {data: cleanObject(params || {}), method: 'PATCH'}))
    // }
    // return {mutate, ...Result}
}
export const useAddProject = () => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(
      (params: Partial<Project>) => client(`projects`, {
        data: cleanObject(params || {}), method: 'POST'
      }),
      {
        onSuccess: () => queryClient.invalidateQueries('projects')
      }
    )
    // const {run, ...Result} = useAsync()
    // const mutate = (params: Partial<Project>) => {
    //   return  run(client(`projects/${params.id}`, {data: cleanObject(params || {}), method: 'POST'}))
    // }
    // return {mutate, ...Result}
}
export const useProject =(id?: number)=> {
  const client = useHttp()
  return useQuery<Project>(['project', {id}], () => client(`projects/${id}`),
    {
      enabled: !!id //只有有id的时候才触发以上操作
    }
  )
}