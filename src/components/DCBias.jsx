import React, { useState } from 'react';

const DCBias = () => {
  const [dcBias, setDcBias] = useState({
    vce: '',
    vbe: '',
    ic: ''
  });

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-cyan-400 mb-4">DC Bias Measurements</h2>
      <p className="text-gray-300 mb-6">
        Measure these values before connecting the capacitors to verify the transistor is in active region.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-6 rounded-xl">
          <label className="block text-green-300 font-semibold mb-2">
            VCE (Collector-Emitter Voltage)
          </label>
          <input
            type="number"
            step="0.1"
            value={dcBias.vce}
            onChange={(e) => setDcBias({...dcBias, vce: e.target.value})}
            className="w-full bg-white/10 border-2 border-green-500 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-green-300"
            placeholder="Enter VCE"
          />
          <p className="text-sm text-gray-400 mt-2">Expected: 3V - 9V (25-75% of Vcc)</p>
          {dcBias.vce && (
            <p className={`text-sm mt-2 font-semibold ${
              parseFloat(dcBias.vce) >= 3 && parseFloat(dcBias.vce) <= 9
                ? 'text-green-400' : 'text-red-400'
            }`}>
              {parseFloat(dcBias.vce) >= 3 && parseFloat(dcBias.vce) <= 9 ? '✓ Valid' : '✗ Out of range'}
            </p>
          )}
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-6 rounded-xl">
          <label className="block text-blue-300 font-semibold mb-2">
            VBE (Base-Emitter Voltage)
          </label>
          <input
            type="number"
            step="0.01"
            value={dcBias.vbe}
            onChange={(e) => setDcBias({...dcBias, vbe: e.target.value})}
            className="w-full bg-white/10 border-2 border-blue-500 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-blue-300"
            placeholder="Enter VBE"
          />
          <p className="text-sm text-gray-400 mt-2">Expected: 0.6V - 0.7V</p>
          {dcBias.vbe && (
            <p className={`text-sm mt-2 font-semibold ${
              parseFloat(dcBias.vbe) >= 0.6 && parseFloat(dcBias.vbe) <= 0.7
                ? 'text-green-400' : 'text-red-400'
            }`}>
              {parseFloat(dcBias.vbe) >= 0.6 && parseFloat(dcBias.vbe) <= 0.7 ? '✓ Valid' : '✗ Out of range'}
            </p>
          )}
        </div>

        <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-xl">
          <label className="block text-purple-300 font-semibold mb-2">
            IC (Collector Current)
          </label>
          <input
            type="number"
            step="0.1"
            value={dcBias.ic}
            onChange={(e) => setDcBias({...dcBias, ic: e.target.value})}
            className="w-full bg-white/10 border-2 border-purple-500 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-purple-300"
            placeholder="Enter IC (mA)"
          />
          <p className="text-sm text-gray-400 mt-2">Calculate: VRc / Rc</p>
          {dcBias.ic && (
            <p className="text-sm mt-2 text-green-400 font-semibold">
              ✓ Recorded: {dcBias.ic} mA
            </p>
          )}
        </div>
      </div>

      {dcBias.vce && dcBias.vbe && dcBias.ic && (
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500 rounded-xl p-6 mt-6">
          <h3 className="text-2xl font-bold text-green-300 mb-3">✓ Transistor Status</h3>
          <p className="text-lg">
            {parseFloat(dcBias.vce) >= 3 && parseFloat(dcBias.vce) <= 9 &&
             parseFloat(dcBias.vbe) >= 0.6 && parseFloat(dcBias.vbe) <= 0.7
              ? '✓ Transistor is in ACTIVE region - Ready for AC analysis'
              : '⚠ Check bias values - Transistor may not be properly biased'}
          </p>
        </div>
      )}
    </div>
  );
};

export default DCBias;