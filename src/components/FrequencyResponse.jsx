import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FrequencyResponse = () => { const [measurements, setMeasurements] = useState([ { frequency: '50Hz', vout: '896', enabled: true }, { frequency: '100Hz', vout: '1300', enabled: true }, { frequency: '500Hz', vout: '3180', enabled: true }, { frequency: '1KHz', vout: '3560', enabled: true }, { frequency: '5KHz', vout: '3840', enabled: true }, { frequency: '10KHz', vout: '3880', enabled: true}, { frequency: '20KHz', vout: '3880', enabled: true }, { frequency: '50KHz', vout: '3840', enabled: true }, { frequency: '100KHz', vout: '3880', enabled: true }, { frequency: '200KHz', vout: '3840', enabled: true }, { frequency: '500KHz', vout: '3440', enabled: true }, { frequency: '700KHz', vout: '2220', enabled: true }, { frequency: '1MHz', vout: '1570', enabled: true }, { frequency: '2MHz', vout: '1170', enabled: true }, { frequency: '3MHz', vout: '954', enabled: true }, { frequency: '4MHz', vout: '816', enabled: true }, ]);

  const [vin] = useState(50);
  const [signalCapacity, setSignalCapacity] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  const parseFrequency = (freqStr) => {
    const num = parseFloat(freqStr);
    if (freqStr.includes('MHz')) return num * 1000000;
    if (freqStr.includes('KHz') || freqStr.includes('kHz')) return num * 1000;
    if (freqStr.includes('Hz')) return num;
    return num;
  };

  const formatFrequency = (hz) => {
    if (hz >= 1000000) return `${hz / 1000000}MHz`;
    if (hz >= 1000) return `${hz / 1000}KHz`;
    return `${hz}Hz`;
  };

  const calculateResults = () => {
    return measurements
      .filter(m => m.enabled && m.vout)
      .map(m => {
        const vout = parseFloat(m.vout);
        const gain = vout / vin;
        const gainDb = 20 * Math.log10(gain);
        const freq = parseFrequency(m.frequency);
        return {
          frequency: m.frequency,
          freqHz: freq,
          vout,
          gain: gain.toFixed(2),
          gainDb: gainDb.toFixed(2)
        };
      })
      .sort((a, b) => a.freqHz - b.freqHz);
  };

  const results = calculateResults();
  const maxGainDb = Math.max(...results.map(r => parseFloat(r.gainDb)), 0);
  const cutoffGainDb = maxGainDb - 3;

  const findBandwidth = () => {
    if (results.length < 2) return null;
    const cutoffPoints = results.filter(r => parseFloat(r.gainDb) >= cutoffGainDb);
    if (cutoffPoints.length >= 2) {
      const f1 = cutoffPoints[0].freqHz;
      const f2 = cutoffPoints[cutoffPoints.length - 1].freqHz;
      return {
        f1: formatFrequency(f1),
        f2: formatFrequency(f2),
        bandwidth: formatFrequency(f2 - f1)
      };
    }
    return null;
  };

  const bandwidth = findBandwidth();

  const toggleMeasurement = (index) => {
    const newMeasurements = [...measurements];
    newMeasurements[index].enabled = !newMeasurements[index].enabled;
    setMeasurements(newMeasurements);
  };

  // ✅ Excel Upload Handler
  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const firstSheet = workbook.SheetNames[0];
      const sheet = workbook.Sheets[firstSheet];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Expecting format: [ "Frequency", "Vout" ]
      const parsed = rows.slice(1).map(row => ({
        frequency: row[0]?.toString() || '',
        vout: row[1]?.toString() || '',
        enabled: true
      })).filter(r => r.frequency && r.vout);

      if (parsed.length > 0) {
        setMeasurements(parsed);
        setUploadStatus('✅ Excel file uploaded successfully!');
      } else {
        setUploadStatus('⚠️ Invalid Excel format. Expect columns: Frequency | Vout');
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 md:px-8 py-4">
      <h2 className="text-3xl font-bold text-cyan-400 mb-4 text-center">Frequency Response Analysis</h2>

      {/* Upload Excel */}
      <div className="flex flex-col items-center justify-center bg-gray-800/50 p-4 rounded-xl border border-cyan-600">
        <p className="text-gray-300 mb-3">Upload Excel (.xlsx / .xls) with columns: <b>Frequency | Vout</b></p>
        <input 
          type="file" 
          accept=".xlsx,.xls" 
          onChange={handleExcelUpload}
          className="text-sm text-gray-300 cursor-pointer bg-gray-700 border border-cyan-500 rounded-lg p-2"
        />
        {uploadStatus && <p className="text-green-400 mt-3">{uploadStatus}</p>}
      </div>

      <div className="bg-yellow-500/20 border-2 border-yellow-500 rounded-lg p-4 mb-4 text-center">
        <p className="text-yellow-200 font-semibold">Vin = {vin} mV peak-to-peak (constant)</p>
      </div>

      {/* Measurement Table */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        {measurements.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-wrap items-center gap-3 p-3 rounded-lg ${
              m.enabled
                ? 'bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500'
                : 'bg-gray-800/30 border border-gray-600'
            }`}
          >
            <input type="checkbox" checked={m.enabled} onChange={() => toggleMeasurement(idx)} className="w-5 h-5" />
            <span className="text-cyan-300 font-semibold w-20">{m.frequency}</span>
            <input
              type="number"
              step="0.01"
              disabled={!m.enabled}
              value={m.vout}
              onChange={(e) => {
                const newMeasurements = [...measurements];
                newMeasurements[idx].vout = e.target.value;
                setMeasurements(newMeasurements);
              }}
              className="flex-1 min-w-[120px] bg-white/10 border-2 border-cyan-500 rounded-lg px-3 py-1 text-white"
              placeholder="Vout (mV)"
            />
            {m.enabled && m.vout && (
              <div className="text-sm text-right">
                <div className="text-green-300">Gain: {(parseFloat(m.vout) / vin).toFixed(2)}</div>
                <div className="text-yellow-300">{(20 * Math.log10(parseFloat(m.vout) / vin)).toFixed(2)} dB</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Graph */}
      {results.length >= 2 && (
        <div className="bg-gray-900/50 rounded-xl p-4">
          <h3 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-4 text-center">Frequency Response Curve</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={results}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="frequency" stroke="#22d3ee" />
              <YAxis stroke="#22d3ee" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="gainDb" stroke="#ec4899" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Bandwidth */}
      {bandwidth && (
        <div className="bg-green-900/30 border border-green-500 rounded-xl p-4 text-center">
          <h3 className="text-2xl font-bold text-green-300 mb-3">Bandwidth</h3>
          <p className="text-cyan-300">Lower: {bandwidth.f1}</p>
          <p className="text-cyan-300">Upper: {bandwidth.f2}</p>
          <p className="text-pink-300 mt-2">BW = {bandwidth.bandwidth}</p>
        </div>
      )}
    </div>
  );
};

export default FrequencyResponse;
