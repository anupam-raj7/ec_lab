# RC Coupled CE Amplifier - Interactive Analysis Tool

An interactive web application for analyzing RC Coupled Common Emitter (CE) Transistor Amplifier circuits. This project is designed for **Experiment 6** - analyzing frequency response, DC bias conditions, and signal handling capacity.

## 🎯 Features

- **Interactive Circuit Diagram**: Animated SVG visualization of the RC Coupled CE amplifier
- **DC Bias Measurements**: Input and validate VCE, VBE, and IC values
- **Frequency Response Analysis**: 
  - Select up to 5 frequencies from 16 options (50Hz - 4MHz)
  - Automatic gain calculation (Vout/Vin and dB)
  - Live frequency response curve plotting
  - Bandwidth calculation (f2 - f1)
- **Signal Handling Capacity**: Measure maximum input before distortion
- **Data Export**: Download results as text file
- **Beautiful UI**: Gradient backgrounds, animations, and responsive design

## 📁 Project Structure

```
rc-coupled-ce-amplifier/
├── src/
│   ├── components/
│   │   ├── CircuitDiagram.jsx    # Circuit visualization component
│   │   ├── DCBias.jsx             # DC bias measurements component
│   │   └── FrequencyResponse.jsx  # Frequency response analysis component
│   ├── App.jsx                    # Main application component
│   ├── main.jsx                   # Application entry point
│   └── index.css                  # Global styles with Tailwind
├── index.html                     # HTML template
├── package.json                   # Project dependencies
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Create the project folder and navigate to it:**
   ```bash
   mkdir rc-coupled-ce-amplifier
   cd rc-coupled-ce-amplifier
   ```

2. **Create the folder structure:**
   ```bash
   mkdir -p src/components
   ```

3. **Copy all the files** from the artifacts into their respective locations:
   - `App.jsx` → `src/App.jsx`
   - `CircuitDiagram.jsx` → `src/components/CircuitDiagram.jsx`
   - `DCBias.jsx` → `src/components/DCBias.jsx`
   - `FrequencyResponse.jsx` → `src/components/FrequencyResponse.jsx`
   - `main.jsx` → `src/main.jsx`
   - `index.css` → `src/index.css`
   - `index.html` → `index.html`
   - `package.json` → `package.json`
   - `vite.config.js` → `vite.config.js`
   - `tailwind.config.js` → `tailwind.config.js`

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser** to `http://localhost:3000`

## 🔧 Usage

### 1. Circuit Diagram Tab
- View the complete RC Coupled CE amplifier circuit
- See component values (R1=68K, R2=18K, Rc=1.2K, Re=1K)
- View capacitor values (Cin=1µF, Cout=1µF, Ce=33µF)

### 2. DC Bias Tab
- Enter VCE (expected: 3V - 9V)
- Enter VBE (expected: 0.6V - 0.7V)
- Enter IC (collector current in mA)
- Automatic validation to verify transistor is in active region

### 3. Frequency Response Tab
- **Select 5 frequencies** by checking the boxes
- Enter Vout measurements for each frequency
- View automatic calculations:
  - Voltage gain (Vout/Vin)
  - Gain in dB (20 log Vout/Vin)
- See live frequency response curve
- Get bandwidth calculation (f2 - f1)
- Enter signal handling capacity
- Download results as text file

## 📊 Circuit Specifications

- **Transistor**: BC548 (NPN)
- **Supply Voltage**: 12V DC
- **Input Signal**: 50mV peak-to-peak (constant)
- **Resistors**: R1=68KΩ, R2=18KΩ, Rc=1.2KΩ, Re=1KΩ
- **Capacitors**: Cin=1µF, Cout=1µF, Ce=33µF

## 🎨 Technologies Used

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling
- **Recharts**: Interactive graphs
- **Lucide React**: Icons

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## 🤝 Contributing

This is an educational project for electronics lab experiments. Feel free to modify and enhance!

## 📝 License

This project is created for educational purposes.

## 👨‍💻 Author

Created for Experiment 6: RC Coupled CE Transistor Amplifier Design

---

**Happy Experimenting! 🔬⚡**