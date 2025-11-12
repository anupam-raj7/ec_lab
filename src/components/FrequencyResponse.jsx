import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FrequencyResponse = () => {
  const [measurements, setMeasurements] = useState([
    { frequency: '50Hz', vout: '', enabled: true },
    { frequency: '100Hz', vout: '', enabled: true },
    { frequency: '500Hz', vout: '', enabled: true },
    { frequency: '1KHz', vout: '', enabled: true },
    { frequency: '5KHz', vout: '', enabled: true },
    { frequency: '10KHz', vout: '', enabled: false },
    { frequency: '20KHz', vout: '', enabled: false },
    { frequency: '50KHz', vout: '', enabled: false },
    { frequency: '100KHz', vout: '', enabled: false },
    { frequency: '200KHz', vout: '', enabled: false },
    { frequency: '500KHz', vout: '', enabled: false },
    { frequency: '700KHz', vout: '', enabled: false },
    { frequency: '1MHz', vout: '', enabled: false },
    { frequency: '2MHz', vout: '', enabled: false },
    { frequency: '3MHz', vout: '', enabled: false },
    { frequency: '4MHz', vout: '', enabled: false }
  ]);

  const [vin] = useState(50); // 50mV p-p constant
  const [signalCapacity, setSignalCapacity] = useState('');

  const parseFrequency = (freqStr) => {
    const num = parseFloat(freqStr);
    if (freqStr.includes('MHz')) return num * 1000000;
    if (freqStr.includes('KHz') || freqStr.includes('khz')) return num * 1000;
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

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-cyan-400 mb-4">Frequency Response Analysis</h2>
      
      <div className="bg-yellow-500/20 border-2 border-yellow-500 rounded-lg p-4 mb-4">
        <p className="text-yellow-200 font-semibold">
          Input: Vin = {vin} mV peak-to-peak (constant)
        </p>
        <p className="text-sm text-gray-300 mt-1">
          Select 5 frequencies and enter output voltage readings
        </p>
      </div>

      {/* Measurement Table */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        {measurements.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
              m.enabled
                ? 'bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border-2 border-cyan-500'
                : 'bg-gray-800/30 border-2 border-gray-600'
            }`}
          >
            <input
              type="checkbox"
              checked={m.enabled}
              onChange={() => toggleMeasurement(idx)}
              className="w-5 h-5"
            />
            <div className="flex-1 flex items-center gap-4">
              <span className="text-cyan-300 font-semibold w-24">{m.frequency}</span>
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
                className="flex-1 bg-white/10 border-2 border-cyan-500 rounded-lg px-4 py-2 text-white disabled:opacity-30 disabled:cursor-not-allowed"
                placeholder="Vout (mV p-p)"
              />
              {m.enabled && m.vout && (
                <div className="text-sm text-right w-32">
                  <div className="text-green-300">
                    Gain: {(parseFloat(m.vout) / vin).toFixed(2)}
                  </div>
                  <div className="text-yellow-300">
                    {(20 * Math.log10(parseFloat(m.vout) / vin)).toFixed(2)} dB
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Results Table */}
      {results.length > 0 && (
        <div className="bg-gray-900/50 rounded-xl p-6">
          <h3 className="text-2xl font-bold text-cyan-400 mb-4">Calculated Results</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-cyan-500">
                  <th className="p-3 text-cyan-300">Frequency</th>
                  <th className="p-3 text-cyan-300">Vout (mV)</th>
                  <th className="p-3 text-cyan-300">Gain (Vout/Vin)</th>
                  <th className="p-3 text-cyan-300">Gain (dB)</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, idx) => (
                  <tr key={idx} className="border-b border-gray-700">
                    <td className="p-3 text-yellow-300">{r.frequency}</td>
                    <td className="p-3">{r.vout}</td>
                    <td className="p-3 text-green-300">{r.gain}</td>
                    <td className="p-3 text-pink-300">{r.gainDb} dB</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Frequency Response Graph */}
      {results.length >= 2 && (
        <div className="bg-gray-900/50 rounded-xl p-6">
          <h3 className="text-2xl font-bold text-cyan-400 mb-4">Frequency Response Curve</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={results}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="frequency" 
                stroke="#22d3ee"
                label={{ value: 'Frequency', position: 'insideBottom', offset: -5, fill: '#22d3ee' }}
              />
              <YAxis 
                stroke="#22d3ee"
                label={{ value: 'Gain (dB)', angle: -90, position: 'insideLeft', fill: '#22d3ee' }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '2px solid #22d3ee', borderRadius: '8px' }}
                labelStyle={{ color: '#22d3ee' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="gainDb" 
                stroke="#ec4899" 
                strokeWidth={3}
                dot={{ fill: '#ec4899', r: 6 }}
                activeDot={{ r: 8 }}
                name="Gain (dB)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Bandwidth Calculation */}
      {bandwidth && (
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500 rounded-xl p-6">
          <h3 className="text-2xl font-bold text-green-300 mb-3">Bandwidth Analysis</h3>
          <div className="grid md:grid-cols-3 gap-4 text-lg">
            <div>
              <p className="text-gray-300">Lower Cutoff (f1):</p>
              <p className="text-cyan-400 font-bold text-2xl">{bandwidth.f1}</p>
            </div>
            <div>
              <p className="text-gray-300">Upper Cutoff (f2):</p>
              <p className="text-cyan-400 font-bold text-2xl">{bandwidth.f2}</p>
            </div>
            <div>
              <p className="text-gray-300">Bandwidth (f2-f1):</p>
              <p className="text-pink-400 font-bold text-2xl">{bandwidth.bandwidth}</p>
            </div>
          </div>
          <p className="text-sm text-gray-300 mt-4">
            * Cutoff frequencies determined at -3dB from maximum gain
          </p>
        </div>
      )}

      {/* Signal Handling Capacity */}
      <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 p-6 rounded-xl">
        <h3 className="text-2xl font-bold text-orange-300 mb-3">Signal Handling Capacity</h3>
        <p className="text-gray-300 mb-4">
          Maximum input voltage before output distortion occurs (measured at mid-frequency)
        </p>
        <input
          type="number"
          step="0.1"
          value={signalCapacity}
          onChange={(e) => setSignalCapacity(e.target.value)}
          className="w-full bg-white/10 border-2 border-orange-500 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-orange-300"
          placeholder="Enter maximum Vin (mV p-p)"
        />
        {signalCapacity && (
          <p className="text-green-400 font-semibold mt-3 text-lg">
            ✓ Signal Handling Capacity: {signalCapacity} mV peak-to-peak
          </p>
        )}
      </div>

      {/* Download Results */}
      {results.length > 0 && (
        <div className="text-center">
          <button
            onClick={() => {
              const data = results.map(r => 
                `${r.frequency}\t${vin}\t${r.vout}\t${r.gain}\t${r.gainDb}`
              ).join('\n');
              const header = 'Frequency\tVin(mV)\tVout(mV)\tGain\tGain(dB)\n';
              const blob = new Blob([header + data], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'frequency_response_data.txt';
              a.click();
            }}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 px-8 py-3 rounded-lg font-bold text-lg shadow-lg transition-all transform hover:scale-105"
          >
            📥 Download Results
          </button>
        </div>
      )}
    </div>
  );
};

export default FrequencyResponse;