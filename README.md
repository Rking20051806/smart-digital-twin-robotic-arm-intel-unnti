<p align="center">
  <img src="https://img.shields.io/badge/Industry_4.0-Digital_Twin-00f2ff?style=for-the-badge&logo=robotframework&logoColor=white" alt="Digital Twin" />
  <img src="https://img.shields.io/badge/React_19-TypeScript-3178C6?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/AI_Powered-Predictive_Maintenance-a855f7?style=for-the-badge&logo=openai&logoColor=white" alt="AI" />
  <img src="https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

<h1 align="center">🤖 Smart Digital Twin — Robotic Arm</h1>

<p align="center">
  <strong>An Industry 4.0 predictive maintenance platform for a 2-DOF robotic arm featuring real-time Reduced Order Model (ROM) simulation, AI-driven fault detection, and an interactive digital twin dashboard.</strong>
</p>

<p align="center">
  <a href="https://smart-digital-twin-robotic-arm-inte.vercel.app/#/dashboard"><strong>🌐 Live Demo →</strong></a>
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Deployment](#-live-deployment)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Pages & Modules](#-pages--modules)
- [Technical Stack](#-technical-stack)
- [Project Structure](#-project-structure)
- [Core Mechanisms](#-core-mechanisms)
- [Getting Started](#-getting-started)
- [Configuration](#-configuration)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔍 Overview

**Smart Digital Twin — Robotic Arm** is a comprehensive web-based platform that creates a real-time digital replica of a **2-DOF (Two Degrees of Freedom) robotic manipulator**. The system combines physics-based simulation with AI/ML-powered predictive analytics to monitor system health, forecast component failures, and optimize maintenance scheduling.

The platform implements **Reduced Order Modeling (ROM)** techniques to compress a high-dimensional physics model into a lightweight surrogate that runs in real-time on the browser, enabling instantaneous kinematic synchronization between the physical twin and its digital counterpart.

### What is a Digital Twin?

A Digital Twin is a virtual representation of a physical system that receives real-time data, mirrors the system's behavior, and uses AI models to predict future states. This project demonstrates the concept applied to industrial robotics — a domain where unplanned downtime can cost thousands of dollars per minute.

---

## 🌐 Live Deployment

| Environment | URL |
|-------------|-----|
| **Production** | [https://smart-digital-twin-robotic-arm-inte.vercel.app](https://smart-digital-twin-robotic-arm-inte.vercel.app/#/dashboard) |
| **Framework** | Vite + React 19 |
| **Hosting** | Vercel Edge Network |

---

## ✨ Key Features

### 🔴 Real-Time Digital Twin Dashboard
- **Live telemetry streaming** with 200ms sensor update intervals
- **Twin Synchronicity indicator** showing real-time sync percentage (99.8%)
- System health score computation based on vibration, temperature, and current draw
- Interactive **SVG/Canvas robotic arm visualization** with thermal stress coloring
- Glowing link rendering with real-time joint angle feedback

### ⚙️ Physics Simulation Engine
- **Double-pendulum kinematics** for 2-DOF arm with coupled joint dynamics
- Full Model vs. ROM comparison with reconstruction error tracking
- Adjustable simulation speed (1x–5x) with play/pause controls
- **Phase Portrait visualization** — angular position vs. velocity limit cycles
- Real-time solver epoch counter and stability analysis panel
- Compression efficiency metrics (state reduction up to 67%)

### 🧠 AI-Powered Predictions
- **Four ML model architectures** benchmarked side-by-side:
  - **LSTM** (Long Short-Term Memory) — Sequential pattern recognition
  - **Random Forest** — Ensemble decision tree classification
  - **Autoencoder** — Anomaly detection via reconstruction error
  - **Gradient Boosting** — High-precision fault classification
- Per-model metrics: Accuracy, Precision, Recall, F1 Score
- AI-generated alerts with severity levels (Low → Critical)
- **Remaining Useful Life (RUL)** estimation in days
- One-click "Run AI Analysis" to sweep all components

### 🔧 Maintenance Scheduling
- Full CRUD task management (Create, Read, Update, Complete)
- Status tracking: Scheduled → In Progress → Completed / Overdue
- Priority levels: Low, Medium, High, Urgent
- AI-triggered maintenance flag for ML-generated tasks
- Component-level task assignment (Motors, Joints, End Effector, Control System)
- Duration estimation and scheduling calendar

### 📊 Advanced Visualizations
- **Vibration Spectrum (FFT)** — Synthetic frequency-domain analysis with harmonic peaks (ISO 10816)
- **ROM Comparison Chart** — Full model vs. reduced order model kinematic overlay
- **Phase Current (RMS)** — Time-series motor current monitoring
- **Sensor Gauges** — Radial gauge cards for health, load, temperature, vibration
- **Phase Portrait** — Scatter plot of angular position vs. velocity for both joints

### 🛠️ System Configuration
- Adjustable physical parameters: link masses (kg) and lengths (m)
- Model architecture tuning: Full model states, ROM reduction states
- AI engine settings: model type selection, prediction confidence threshold
- Real-time order reduction percentage calculation
- Save/Reset with instant deployment to edge instances

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
│  ┌─────────┐ ┌──────────┐ ┌───────────┐ ┌───────────────┐   │
│  │Dashboard │ │Simulation│ │Predictions│ │  Maintenance   │   │
│  └────┬─────┘ └────┬─────┘ └─────┬─────┘ └──────┬────────┘   │
│       │            │             │               │            │
│  ┌────▼────────────▼─────────────▼───────────────▼────────┐  │
│  │              COMPONENT LIBRARY (16 Components)         │  │
│  │  RoboticArmViz │ SensorChart │ PhasePortrait │ Gauges  │  │
│  │  VibrationFFT  │ ROMCompare  │ ModelCompare  │ Alerts  │  │
│  └────────────────────────────┬───────────────────────────┘  │
│                               │                              │
├───────────────────────────────┼──────────────────────────────┤
│                     DATA & STATE LAYER                       │
│  ┌────────────────────────────▼───────────────────────────┐  │
│  │           TanStack React Query (Cache + Sync)          │  │
│  └────────────────────────────┬───────────────────────────┘  │
│  ┌────────────────────────────▼───────────────────────────┐  │
│  │          base44Client (LocalStorage Persistence)       │  │
│  │   Entities: SensorReading │ Prediction │ Task │ Config │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                     SIMULATION ENGINE                        │
│  ┌──────────────────┐  ┌──────────────────────────────────┐  │
│  │ Double Pendulum   │  │  Reduced Order Model (ROM)       │  │
│  │ Kinematics        │  │  - State compression (12→4)      │  │
│  │ - Joint angles    │  │  - Phase offset approximation    │  │
│  │ - Velocities      │  │  - Reconstruction error tracking │  │
│  │ - Accelerations   │  │  - Real-time comparison overlay  │  │
│  └──────────────────┘  └──────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 📄 Pages & Modules

### 1. Dashboard (`/dashboard`)
The central command center providing a holistic view of the robotic arm's operational state.

| Section | Description |
|---------|-------------|
| **System Health Cards** | Four top-level KPI cards — Health Score (%), Drive Load (kN), Surface Temperature (°C), Peak Vibration (g-rms) |
| **Robotic Arm Canvas** | Real-time 2D canvas rendering of the 2-DOF arm with thermal-reactive link coloring and glow effects |
| **Twin Correlation Overlay** | Live chart comparing Full Model vs. ROM kinematics for both joints |
| **Vibration Spectrum** | FFT bar chart showing frequency-domain vibration analysis with ISO 10816 color coding |
| **Phase Current Chart** | Time-series RMS current draw for motor diagnostics |
| **AI Diagnostics Feed** | Real-time prediction alerts from the ML pipeline |
| **Sensor Gauges** | Radial gauges for motor current, joint angles, velocity, and vibration |

### 2. Simulation (`/simulation`)
Interactive physics simulation with full control over the solver.

| Section | Description |
|---------|-------------|
| **Solver Metrics** | Source dimension (full states), ROM embedding (reduced modes), and solve efficiency (% reduction) |
| **Stability Analysis** | Live reconstruction error with compression progress bar |
| **Arm Visualization** | Canvas-rendered robotic arm driven by ROM-predicted joint angles |
| **Scientific Visualizer** | Tabbed view — ROM vs. Full Model comparison chart and Phase Portrait (position-velocity scatter) |
| **Model Comparison** | Side-by-side Full Model vs. ROM stats — states, latency (ms), memory (KB), accuracy |
| **Simulation Controls** | Play/Pause, speed slider (1x–5x), and reset functionality |

### 3. Predictions (`/predictions`)
AI/ML prediction management and model performance benchmarking.

| Section | Description |
|---------|-------------|
| **Active/Resolved Tabs** | Toggle between open alerts and dismissed predictions |
| **Prediction Cards** | Each card shows: severity badge, type, confidence %, component name, description, recommended action, and estimated RUL |
| **Run AI Analysis** | One-click button to execute a simulated ML sweep and generate new predictions |
| **AI Model Metrics** | Switchable view across 4 models (LSTM, Random Forest, Autoencoder, Gradient Boosting) with Accuracy, Precision, Recall, F1 |
| **Training Metrics** | Sample count and hyperparameter details per model |

### 4. Maintenance (`/maintenance`)
Maintenance task lifecycle management with AI integration.

| Section | Description |
|---------|-------------|
| **Status Dashboard** | Four stat cards — Scheduled, In Progress, Completed, Overdue counts |
| **Task Form** | Full form to schedule new tasks — title, component, priority, date, duration, notes |
| **Upcoming Operations** | Filterable list of pending/in-progress maintenance cards |
| **Completed History** | Archive of resolved maintenance tasks |
| **AI-Triggered Flag** | Visual indicator when a task was auto-generated by the prediction engine |

### 5. System Configuration (`/config`)
Fine-grained control over the digital twin's physics and AI parameters.

| Section | Description |
|---------|-------------|
| **Physical Parameters** | Adjustable sliders for Link 1/2 mass (0.5–5 kg) and length (0.2–1 m) |
| **Model Architecture** | Full model state count (6–24) and ROM reduction states (2–8) with live reduction % |
| **AI Engine Settings** | Model type selector (LSTM/RF/AE/GB) and prediction confidence threshold slider |
| **Save/Reset** | Persist to localStorage or reset to factory defaults |

---

## 🛠️ Technical Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | React 19.2 with TypeScript |
| **Build Tool** | Vite 6.2 (ESBuild + Rollup) |
| **Routing** | React Router DOM 7.11 (HashRouter for SPA) |
| **State Management** | TanStack React Query 5.90 (server-state caching) |
| **Charts & Graphs** | Recharts 3.6 (LineChart, BarChart, ScatterChart, AreaChart) |
| **Icons** | Lucide React 0.562 (50+ icons used) |
| **Styling** | Tailwind CSS (CDN) with custom dark theme |
| **Typography** | Inter (Google Fonts — 300–700 weights) |
| **Date Utilities** | date-fns 4.1 |
| **Data Persistence** | LocalStorage-based entity store (`base44Client`) |
| **Deployment** | Vercel (Edge Network, automatic CI/CD) |

---

## 📁 Project Structure

```
smart-digital-twin---robotic-arm/
├── index.html                    # Entry HTML with Tailwind CDN & custom scrollbar styles
├── index.tsx                     # React DOM root mount point
├── App.tsx                       # HashRouter with 5 route definitions
├── types.ts                      # TypeScript interfaces (SensorReading, Prediction, Task, Config)
├── vite.config.ts                # Vite config with env loading and path aliases
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── metadata.json                 # Project metadata
│
├── api/
│   └── base44Client.ts           # LocalStorage CRUD engine with seeded initial data
│
├── components/
│   ├── Layout.tsx                # App shell — sidebar navigation + header + mobile drawer
│   ├── RoboticArmVisualization.tsx  # Canvas-based 2-DOF arm renderer with thermal effects
│   ├── SystemHealthCard.tsx      # KPI card with trend indicator and status coloring
│   ├── SensorGauge.tsx           # Radial gauge visualization component
│   ├── SensorChart.tsx           # Time-series line chart for sensor data
│   ├── AlertsList.tsx            # AI prediction alert feed
│   ├── VibrationSpectrum.tsx     # FFT bar chart with color-coded frequency bins
│   ├── ROMComparisonChart.tsx    # Full model vs ROM kinematic overlay chart
│   ├── PhasePortraitChart.tsx    # Position-velocity scatter plot (limit cycles)
│   ├── ModelComparison.tsx       # Side-by-side Full vs ROM stat cards
│   ├── SimulationControls.tsx    # Play/Pause, speed slider, reset controls
│   ├── AIModelStats.tsx          # ML model performance metrics (Acc/Prec/Recall/F1)
│   └── MaintenanceCard.tsx       # Task card with priority badge and status actions
│
└── pages/
    ├── Dashboard.tsx             # Real-time operational overview
    ├── Simulation.tsx            # Physics simulation with ROM comparison
    ├── Predictions.tsx           # AI predictions & model benchmarking
    ├── Maintenance.tsx           # Task scheduling & lifecycle management
    └── SystemConfigPage.tsx      # Physics & AI parameter configuration
```

---

## ⚙️ Core Mechanisms

### 1. Reduced Order Modeling (ROM)

The platform implements a simplified ROM technique where the full physics model (12 state variables) is compressed to a reduced representation (4 modes). The ROM approximation introduces:

- **Phase offset** (`Δt ≈ 0.02–0.05s`) to simulate computational delay
- **Amplitude attenuation** (`~0.2–0.5%`) to model truncation error
- **Gaussian noise injection** to simulate sensor/discretization noise
- **Real-time reconstruction error** computed as Euclidean distance between full and ROM states

```
Reconstruction Error = √[(θ₁_full − θ₁_rom)² + (θ₂_full − θ₂_rom)²]
```

### 2. Coupled Double-Pendulum Kinematics

Joint positions are computed using coupled sinusoidal dynamics:

```
θ₁(t) = 45° + sin(ωt) × 25° + cos(0.5ωt) × 5°
θ₂(t) = −30° + cos(0.8ωt) × 20° + sin(1.2ωt) × 8°
```

Velocities are derived as time-derivatives, and the Canvas renderer performs forward kinematics to compute end-effector position.

### 3. Health Score Computation

The system health score is a composite metric:

```
H(t) = 98.2 − penalty(vibration) − penalty(temperature) − noise
where:
  penalty(vib)  = 8   if vibration > 4.5 g-rms
  penalty(temp) = 12  if temperature > 42°C
  noise         = rand() × 0.5
```

### 4. Vibration Spectral Analysis (FFT Simulation)

The VibrationSpectrum component generates synthetic frequency bins (10 Hz–150 Hz) with:
- Base noise floor proportional to vibration level
- **Primary motor harmonic** at 30 Hz (3rd bin)
- **Secondary harmonic** at 70 Hz (7th bin)
- Color coding per **ISO 10816** vibration severity standards

### 5. AI Model Benchmarking

Four ML architectures are benchmarked with pre-computed metrics:

| Model | Accuracy | Precision | Recall | F1 Score | Key Hyperparameter |
|-------|----------|-----------|--------|----------|--------------------|
| LSTM | 94.7% | 93.2% | 95.1% | 94.1% | 150 Epochs |
| Random Forest | 91.2% | 89.4% | 90.5% | 89.9% | 500 Estimators |
| Autoencoder | 93.1% | 92.5% | 91.8% | 92.1% | 16 Latent Dim |
| Gradient Boosting | 92.8% | 93.1% | 91.5% | 92.3% | 12 Max Depth |

### 6. Data Persistence Layer

The `base44Client` implements a full CRUD API backed by `localStorage`:

- **Entities**: `SensorReading`, `Prediction`, `MaintenanceTask`, `SystemConfig`
- **Operations**: `list()`, `create()`, `update()`, `get()` (for singleton config)
- **Seeded data**: 3 initial predictions, 4 sample maintenance tasks, default configuration
- **Buffer management**: Sensor readings capped at 50 entries (FIFO)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/Rking20051806/smart-digital-twin-robotic-arm-intel-unnti.git

# Navigate to the project directory
cd smart-digital-twin-robotic-arm-intel-unnti

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000/`.

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_api_key_here
```

### System Defaults

The default physical configuration can be modified via the Configuration page or by editing the seed data in `api/base44Client.ts`:

| Parameter | Default | Range |
|-----------|---------|-------|
| System Name | 2-DOF Robotic Arm | — |
| Link 1 Mass | 2.5 kg | 0.5–5.0 kg |
| Link 2 Mass | 1.5 kg | 0.5–5.0 kg |
| Link 1 Length | 0.5 m | 0.2–1.0 m |
| Link 2 Length | 0.4 m | 0.2–1.0 m |
| Full Model States | 12 | 6–24 |
| ROM States | 4 | 2–8 |
| AI Model Type | LSTM | LSTM / RF / AE / GB |
| Prediction Threshold | 0.75 | 0.0–1.0 |

---

## 📸 Screenshots

| Dashboard | Simulation |
|-----------|-----------|
| Real-time sensor telemetry, robotic arm canvas, health KPIs, and AI diagnostics feed | Physics solver with ROM comparison, phase portraits, and model benchmarks |

| Predictions | Maintenance |
|------------|-------------|
| AI-generated alerts with severity, RUL estimation, and multi-model metrics | Task lifecycle management with priority levels and AI-triggered flags |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">
  <strong>Built with ❤️ for Industry 4.0</strong><br/>
  <sub>Smart Digital Twin — Robotic Arm | Predictive Maintenance Platform</sub>
</p>
