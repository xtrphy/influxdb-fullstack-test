export interface TrackPoint {
    time: string;
    lat: number;
    lon: number;
    event_time: number;
}

export interface SeriesPoint {
    time: string;
    value: number;
}

export interface TelemetrySeries {
    speed?: SeriesPoint[];
    main_power_voltage?: SeriesPoint[];
    [key: string]: SeriesPoint[] | undefined;
}

export interface TelemetryData {
    series: TelemetrySeries;
    track: TrackPoint[];
}