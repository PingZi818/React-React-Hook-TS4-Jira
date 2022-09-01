import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { cleanObject } from "utils";
import { useHttp } from "./http";

export const useKanbans =(param?: Partial<Kanban>)=> {
    const client = useHttp()
    // param 变化就会触发请求useQuery
    return useQuery<Kanban[]>(["kanbans", cleanObject(param)], () =>
      client("kanbans", { data: param })
    );
}