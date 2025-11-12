import React from 'react';

const CircuitDiagram = () => {
  return (
    <div className="space-y-10">
      <h2 className="text-3xl font-bold text-cyan-400 mb-4 text-center">Circuit Diagram Experiment</h2>

      {/* ----------- THEORY & OBJECTIVE SECTION ----------- */}
      <div className="bg-gray-900 rounded-xl p-8 shadow-lg space-y-6">
        <h3 className="text-2xl font-semibold text-cyan-300 mb-2">Objective:</h3>
        <p className="text-sm leading-relaxed text-gray-200">
          1. Connect the circuit diagram and measure the DC Bias Conditions (V<sub>CE</sub>, V<sub>BE</sub>, I<sub>C</sub>).<br />
          2. Measure the AC Gain, Signal Handling Capacity, and Bandwidth.
        </p>

        <h3 className="text-2xl font-semibold text-cyan-300 mb-2">Equipment Required:</h3>
        <p className="text-sm leading-relaxed text-gray-200">
          1) Multimeter &nbsp;&nbsp; 2) Breadboard &nbsp;&nbsp; 3) 12V DC Power Supply &nbsp;&nbsp;
          4) Function Generator &nbsp;&nbsp; 5) DSO
        </p>

        <h3 className="text-2xl font-semibold text-cyan-300 mb-2">Components Required:</h3>
        <p className="text-sm leading-relaxed text-gray-200">
          1) Resistors (R1 = 68KΩ, R2 = 18KΩ, R<sub>C</sub> = 1.2KΩ, R<sub>E</sub> = 1KΩ)<br />
          2) Capacitors (C<sub>in</sub> = C<sub>out</sub> = 1µF, C<sub>e</sub> = 33µF)<br />
          3) Transistor: BC548 (NPN)
        </p>

        <h3 className="text-2xl font-semibold text-cyan-300 mb-2">Theory:</h3>
        <p className="text-sm leading-relaxed text-gray-200">
          An amplifier is a device that amplifies input voltage or current. The RC coupled CE transistor amplifier
          is a popular configuration for cascading amplifiers using an RC network for inter-stage coupling.
          The variation of gain with frequency is called the frequency response.
          <br /><br />
          The bandwidth of the RC amplifier equals the difference between upper and lower cut-off frequencies,
          representing the effective amplification range.
          For amplification, the transistor must be properly biased—emitter-base junction forward biased and
          collector-base junction reverse biased. The transistor’s active region operation is verified by measuring
          the DC bias conditions.
        </p>
      </div>

      {/* ----------- CIRCUIT DIAGRAM SECTION ----------- */}
<div className="bg-gray-900 rounded-xl p-8 shadow-lg">
  <h3 className="text-2xl font-semibold text-cyan-300 mb-6 text-center">
    Circuit Diagram
  </h3>
  <div className="w-full flex justify-center">
    <img
      src="https://mdashf.org/wp-content/uploads/2020/05/ce-amp.jpg?w=696"
      alt="RC Coupled CE Amplifier Circuit Diagram"
      className="w-full max-w-4xl rounded-lg shadow-lg border border-cyan-700/40"
    />
  </div>
</div>


      {/* ----------- COMPONENT LIST SECTION ----------- */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 p-4 rounded-lg">
          <h3 className="font-bold text-cyan-300 mb-2">Resistors</h3>
          <ul className="space-y-1 text-sm text-gray-200">
            <li>• R1 = 68KΩ</li>
            <li>• R2 = 18KΩ</li>
            <li>• Rc = 1.2KΩ</li>
            <li>• Re = 1KΩ</li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-4 rounded-lg">
          <h3 className="font-bold text-purple-300 mb-2">Capacitors & Transistor</h3>
          <ul className="space-y-1 text-sm text-gray-200">
            <li>• Cin = 1µF</li>
            <li>• Cout = 1µF</li>
            <li>• Ce = 33µF</li>
            <li>• Transistor: BC548 (NPN)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CircuitDiagram;
