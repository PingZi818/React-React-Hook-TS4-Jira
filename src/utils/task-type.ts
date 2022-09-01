import { useQuery } from "react-query";
import { TaskType } from "types/task-type";
import { useHttp } from "./http";

export const useTaskTypes = ()=> {
    const client = useHttp()
    // param 变化就会触发请求useQuery
    return useQuery<TaskType[]>(["taskTypes"], () =>
      client("taskTypes")
    );
}