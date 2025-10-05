# AstroSim - Asteroid Impact Simulator

An interactive educational simulation exploring asteroid deflection physics and impact scenarios based on asteroid 101955 Bennu. Built with real NASA data and scientific calculations.

## Game Overview

The simulation challenges players to defend Earth from an asteroid impact by deploying a kinetic impactor to deflect Bennu's trajectory. Players must choose the correct deflection force to achieve a safe miss distance of at least 2,500 km.

## How to Play

### 1. Location Selection Screen
Choose between two impact scenarios:
- **Ocean Impact**: Atlantic Ocean (33°N, 65°W) - Potential tsunami effects
- **Land Impact**: Central USA (40°N, 100°W) - Crater formation and regional devastation
- - **Realistic mode**:
## Educational Content

The game includes NASA-verified fact cards:
1. **The Real Bennu**: Information about the actual asteroid
2. **Impact Energy Scale**: Comparison of impact energy
3. **Deflection Science**: How NASA's DART mission proved deflection works
4. **Planetary Defense**: Current tracking capabilities

## Win/Lose Conditions

### Victory
- Final miss distance ≥ +2,500 km when countdown reaches 0
- Shows Earth protected and 8 billion people saved

### Failure
- Final miss distance < +2,500 km
- Displays location-specific consequences:
  - **Ocean**: Tsunami waves, coastal devastation, affected cities
  - **Land**: Crater dimensions, destruction zones, agricultural losses

## Development

Built with:
- React + TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)

### Run Locally
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
```

## Scientific Accuracy

Based on:
- NASA OSIRIS-REx mission data
- NASA DART mission results
- CNEOS Impact Effects Calculator
- Planetary Defense Coordination Office research

The deflection calculations, impact energies, and consequences are derived from peer-reviewed scientific models and NASA mission data.
