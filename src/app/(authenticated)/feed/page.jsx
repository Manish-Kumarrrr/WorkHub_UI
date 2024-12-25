"use client";

import { useEffect, useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { TaskList } from "@/components/custom/TaskList";
import Loading from "@/components/custom/Loading";
import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 8;

export default function Feed() {
  const user = userStore((state) => state.user);

  const router = useRouter();
  
  const fetchTasks = async ({ pageParam = 0}) => {
  
    console.log("Fetching tasks")
    const response = await axios.get(
      `http://localhost:8085/v1/task/all`,
      {
        params: {
          pageNumber: pageParam,
          sortDir: "desc",
          pageSize: ITEMS_PER_PAGE,
          sortBy: "createdDate",
        },
      }
    );
    return response.data;
  };
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    getNextPageParam: (lastPage) => {
      return lastPage.lastPage ? undefined : lastPage.pageNumber + 1;
    },
    enabled:!!user.email,
  });

  const intObserver = useRef(null);
  const lastTaskRef = useCallback(
    (task) => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((tasks) => {
        if (tasks[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (task) intObserver.current.observe(task);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center text-red-500 text-xl mt-8">
        Error: {error.message}
      </div>
    );
  }

  const tasks = data?.pages.flatMap((page) => page.content) || [];
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      {tasks.length > 0 ? (
        <TaskList tasks={tasks} lastTaskRef={lastTaskRef} />
      ) : (
        <Loading/>
      )}
      {isFetchingNextPage && (
        <div className="text-center mt-4">
          <div className="inline-block animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
}
