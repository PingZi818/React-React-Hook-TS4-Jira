import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "utils/use-optimistic-options";
import { Project } from "types/project";
import { cleanObject } from "utils/index";
export const useProjects =(param?: Partial<Project>)=> {
    const client = useHttp()
    // param 变化就会触发请求useQuery
    return useQuery<Project[]>(["projects", cleanObject(param)], () =>
      client("projects", { data: param })
    );
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
export const useEditProject = (queryKey: QueryKey) => {
    const client = useHttp()
    // const queryClient = useQueryClient()
    return useMutation(
      (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
      useEditConfig(queryKey)
      // {
      //   onSuccess: () => queryClient.invalidateQueries(queryKey),
      //   // 实现乐观更新
      //   async onMutate(target: Partial<Project>) {
      //     const previousItems = queryClient.getQueriesData(queryKey)
      //     queryClient.setQueriesData(queryKey, (old?: Project[]) => {
      //       return old?.map(project => project.id === target.id ? {...project, ...target} : project) || []
      //     })
      //     return {previousItems}
      //   },
      //   onError: (error: Error, newItem: Partial<Project>, context: any)=> {//context 来自上面返回的值
      //     queryClient.setQueriesData(queryKey, (context as {previousItems: Project[]}).previousItems)
      //   }
      // }
    )
    // const {run, ...Result} = useAsync()
    // const mutate = (params: Partial<Project>) => {
    //   return  run(client(`projects/${params.id}`, {data: cleanObject(params || {}), method: 'PATCH'}))
    // }
    // return {mutate, ...Result}
}
export const useAddProject = (queryKey: QueryKey) => {
    const client = useHttp()
    // const queryClient = useQueryClient()
    return useMutation(
      (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
      useAddConfig(queryKey)
    )
    // const {run, ...Result} = useAsync()
    // const mutate = (params: Partial<Project>) => {
    //   return  run(client(`projects/${params.id}`, {data: cleanObject(params || {}), method: 'POST'}))
    // }
    // return {mutate, ...Result}
}
export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useProject =(id?: number)=> {
  const client = useHttp()
  return useQuery<Project>(['project', {id}], () => client(`projects/${id}`),
    {
      enabled: !!id //只有有id的时候才触发以上操作
    }
  )
}