import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface UseApiOptions {
  endpoint: string;
  options?: RequestInit;
  method?: HttpMethod;
  body?: object | null;
}

export function useGetApi<T>(endpoint: string, options?: RequestInit) {
    return useApi<T>({endpoint, options});
}

export function usePostApi<T>(endpoint: string, body: object, options?: RequestInit) {
    return useApi<T>({endpoint, options, method: 'POST', body});
}

export function usePutApi<T>(endpoint: string, body: object, options?: RequestInit) {
    return useApi<T>({endpoint, options, method: 'PUT', body});
}

export function useDeleteApi<T>(endpoint: string, options?: RequestInit) {
    return useApi<T>({endpoint, options, method: 'DELETE'});
}

function useApi<T>({endpoint, options = {}, method = 'GET', body = null}: UseApiOptions): 
    { data: T | null; setData: Function, isLoading: boolean; error: string | null } {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        let result: T;
        switch (method) {
          case 'POST':
            result = await apiService.post<T>(endpoint, body as object, options);
            break;
          case 'PUT':
            result = await apiService.put<T>(endpoint, body as object, options);
            break;
          case 'DELETE':
            result = await apiService.delete<T>(endpoint, options);
            break;
          default:
            result = await apiService.get<T>(endpoint, options);
        }
        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [endpoint, method, body]);

  return { data, isLoading, error, setData };
}