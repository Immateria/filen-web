import worker from "@/lib/worker"
import { useQuery } from "@tanstack/react-query"

export async function isServiceWorkerOnline(): Promise<boolean> {
	return await worker.httpHealthCheck({
		url: `${window.origin}/sw/ping`,
		expectedStatusCode: 200,
		method: "GET",
		timeout: 5000,
		expectedBodyText: "OK"
	})
}

export default function useIsServiceWorkerOnline(): boolean {
	const query = useQuery({
		queryKey: ["useIsServiceWorkerOnline"],
		queryFn: () => isServiceWorkerOnline(),
		refetchInterval: 15000,
		refetchIntervalInBackground: true,
		refetchOnMount: true,
		refetchOnReconnect: true,
		refetchOnWindowFocus: true
	})

	return query.isSuccess ? query.data : false
}