import React, { useState } from 'react';
import { useTelemetry } from '../../hooks/useTelemetry';
import Controls from '../../components/Controls';

const Telemetry = () => {
    const [availableImeis, setAvailableImeis] = useState<string[]>([]);
    const [selectedImei, setSelectedImei] = useState<string>(availableImeis[0]);
    const [timeRange, setTimeRange] = useState<string>('-3h');

    const { data: telemetryData, loading } = useTelemetry(selectedImei, timeRange);

    return (
        <div>
            <Controls />
            {/* Карта */}
            {/* Графики */}
        </div>
    );
};

export default Telemetry;