export interface IMEI {
    result: string;
    table: number;
    _value: string;
}

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

export interface SelectImeiButtonProps {
    availableImeis: { _value: string }[];
    selectedImei: string;
    setSelectedImei: (imei: string) => void;
}

export interface SelectStartButtonProps {
    setStart: (time: string) => void;
    start: string;
}