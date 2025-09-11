import { useEffect, useState } from 'react';
import Controls from '../../components/Controls';
import MapTrack from '../../components/MapTrack';
import axios from 'axios';
import type { TelemetryData, IMEI } from '../../types/types';

const TelemetryPage = () => {
    const [availableImeis, setAvailableImeis] = useState<IMEI[]>([]);
    const [selectedImei, setSelectedImei] = useState<string>('');
    const [telemetryData, setTelemetryData] = useState<TelemetryData | null>(null);
    const [start, setStart] = useState('-6h');

    useEffect(() => {
        const fetchImeis = async () => {
            const res = await axios.get<IMEI[]>('/api/imeis');
            setAvailableImeis(res.data);
        }

        fetchImeis();
    }, []);

    useEffect(() => {
        if (availableImeis.length > 0 && !selectedImei) {
            setSelectedImei(availableImeis[0]._value);
        }
    }, [availableImeis, selectedImei]);

    useEffect(() => {
        if (!selectedImei) return;

        const fetchTelemetryData = async () => {
            const res = await axios.get<TelemetryData>('/api/telemetry', {
                params: {
                    imei: selectedImei,
                    start,
                    stop: 'now()',
                },
            });
            setTelemetryData(res.data);
        };

        fetchTelemetryData();
    }, [selectedImei, start]);

    return (
        <div className='bg-[#0b0b0b] flex flex-col items-center min-h-screen'>
            <Controls
                availableImeis={availableImeis}
                selectedImei={selectedImei}
                setSelectedImei={setSelectedImei}
                start={start}
                setStart={setStart}
            />
            {telemetryData && <MapTrack track={telemetryData.track} />}
        </div>
    );
};

export default TelemetryPage;