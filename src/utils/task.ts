import { useQuery } from "react-query";
import { Task } from "types/task";
import { cleanObject } from "utils";
import { useHttp } from "./http";

export const useTasks =(param?: Partial<Task>)=> {
    const client = useHttp()
    // param 变化就会触发请求useQuery
    return useQuery<Task[]>(["tasks", cleanObject(param)], () =>
      client("tasks", { data: param })
    );
}