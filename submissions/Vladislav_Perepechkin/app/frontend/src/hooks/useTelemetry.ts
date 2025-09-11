import { useEffect, useState } from "react";
import axios, { AxiosError, type CancelTokenSource } from "axios";
import type { TelemetryData } from "../types/types";

interface UseTelemetryResult {
    data: TelemetryData | null;
    loading: boolean;
    error: string | null;
}

export const useTelemetry = (imei: string, timeRange: string): UseTelemetryResult => {
    const [data, setData] = useState<TelemetryData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!imei) return;

        const source: CancelTokenSource = axios.CancelToken.source();

        const fetchTelemetry = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await axios.get<TelemetryData>('api/telemetry', {
                    params: {
                        imei,
                        start: timeRange,
                        stop: 'now()'
                    },
                    cancelToken: source.token
                });

                setData(res.data);

            } catch (err) {
                if (!axios.isCancel(err)) return;
                const axiosError = err as AxiosError;
                setError(axiosError.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTelemetry();

        return () => {
            source.cancel('Query was cancelled due to IMEI/range change');
        }

    }, [imei, timeRange]);

    return { data, loading, error };
};