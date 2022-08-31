import { QueryKey, useQueryClient } from "react-query";
// import { reorder } from "utils/reorder";
// import { Task } from "types/task";

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    onSettled: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      // 取消相关的获取数据逻辑（这样它们就不会覆盖我们的乐观更新）
      await queryClient.cancelQueries(queryKey);
      // 保存前一次状态的快照
      const previousItems = queryClient.getQueryData(queryKey);
      // 执行乐观更新
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        const res = callback(target, old)
        return res;
      });
      // 返回具有快照值和修改值的上下文对象
      return { previousItems };
    },
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );
export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) => old?.map((item) => item.id === target.id ? { ...item, ...target } : item) || []
  );
export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []));

// export const useReorderKanbanConfig = (queryKey: QueryKey) =>
//   useConfig(queryKey, (target, old) => reorder({ list: old, ...target }));

// export const useReorderTaskConfig = (queryKey: QueryKey) =>
//   useConfig(queryKey, (target, old) => {
//     const orderedList = reorder({ list: old, ...target }) as Task[];
//     return orderedList.map((item) =>
//       item.id === target.fromId
//         ? { ...item, kanbanId: target.toKanbanId }
//         : item
//     );
//   });
