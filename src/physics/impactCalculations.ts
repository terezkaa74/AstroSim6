import { BENNU_DATA } from './bennuData';

export interface SimulationParams {
  diameter: number;
  velocity: number;
  deflectionForce: number;
}

export interface ImpactConsequences {
  energyMegatons: number;
  fireballRadius: number;
  severeDamageRadius: number;
  moderateDamageRadius: number;
  affectedArea: number;
  craterDiameter: number;
  craterDepth: number;
  ejectaBlanket: number;
  earthquakeMagnitude: number;
  strongShakingRadius: number;
  feltRadius: number;
  tsunamiInitialHeight?: number;
  tsunamiCoastalHeight?: number;
  coastalInundation?: number;
  ejectedThickness10km?: number;
  ejectedThickness30km?: number;
  vegetationIgnition?: number;
}

export interface ImpactResult {
  willImpact: boolean;
  missDistance: number;
  impactEnergy: number;
  consequences?: ImpactConsequences;
  locationType?: 'ocean' | 'inland';
  outcome: string;
  details: string[];
}

export function calculateImpactEnergy(mass: number, velocity: number): number {
  return 0.5 * mass * Math.pow(velocity * 1000, 2);
}

export function energyToMegatons(joules: number): number {
  return joules / 4.184e15;
}

export function calculateMass(diameter: number, density: number = BENNU_DATA.density): number {
  const radius = (diameter / 2) * 1000;
  const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
  return volume * density;
}

export function calculateImpactConsequences(
  energy: number,
  isOcean: boolean = false
): ImpactConsequences {
  const megatons = energyToMegatons(energy);

  const craterDiameter = 0.0001 * Math.pow(energy, 0.294) / 1000;
  const craterDepth = 0.33 * craterDiameter;
  const ejectaBlanket = 5 * craterDiameter;

  const fireballRadius = 3.8;
  const severeDamageRadius = 45;
  const moderateDamageRadius = 95;
  const affectedArea = 6300;

  const magnitude = 0.67 * Math.log10(energy) - 5.87;
  const strongShakingRadius = Math.pow(10, (0.5 * magnitude - 2));
  const feltRadius = 500;

  const consequences: ImpactConsequences = {
    energyMegatons: megatons,
    fireballRadius,
    severeDamageRadius,
    moderateDamageRadius,
    affectedArea,
    craterDiameter,
    craterDepth,
    ejectaBlanket,
    earthquakeMagnitude: magnitude,
    strongShakingRadius,
    feltRadius
  };

  if (isOcean) {
    consequences.tsunamiInitialHeight = 500;
    consequences.tsunamiCoastalHeight = 15;
    consequences.coastalInundation = 10;
  } else {
    consequences.ejectedThickness10km = 10;
    consequences.ejectedThickness30km = 1;
    consequences.vegetationIgnition = 100;
  }

  return consequences;
}

export function calculateDeflection(
  force: number,
  timeBeforeImpact: number
): number {
  const deltaV = force / 100;
  const timeSeconds = timeBeforeImpact * 365.25 * 24 * 3600;
  const displacement = deltaV * timeSeconds;
  return displacement / 1000;
}

export function simulateImpact(params: SimulationParams, timeBeforeImpact: number = 10): ImpactResult {
  const mass = calculateMass(params.diameter);
  const deflectionDistance = calculateDeflection(params.deflectionForce, timeBeforeImpact);

  const baseTrajectory = 0;
  const finalMissDistance = baseTrajectory + deflectionDistance;

  const SAFE_MISS_DISTANCE = 2500;
  const willImpact = finalMissDistance < SAFE_MISS_DISTANCE;
  const impactEnergy = calculateImpactEnergy(mass, params.velocity);
  let outcome = '';
  let details: string[] = [];

  if (!willImpact) {
    outcome = `EARTH SAVED! Bennu will miss by ${finalMissDistance.toFixed(0)} km`;
    details = [
      `Deflection force of ${params.deflectionForce.toFixed(2)} cm/s successfully altered trajectory`,
      `Total displacement: ${deflectionDistance.toFixed(0)} km over ${timeBeforeImpact} years`,
      `Population protected: 8 billion people`,
      `Civilization preserved - asteroid continues safely through solar system`
    ];

    return {
      willImpact: false,
      missDistance: finalMissDistance,
      impactEnergy,
      outcome,
      details
    };
  }

  const isOceanImpact = Math.random() > 0.3;
  const impactLocationType = isOceanImpact ? 'ocean' : 'inland';
  const consequences = calculateImpactConsequences(impactEnergy, isOceanImpact);

  if (isOceanImpact) {
    outcome = `IMPACT EVENT - Deep Ocean Impact`;
    details = [
      `Location: Atlantic Ocean (33°N, 65°W) - between New York and Bermuda`,
      `Water depth: 5,000-6,000 meters`,
      `Total energy release: ${consequences.energyMegatons.toFixed(0)} megatons TNT equivalent`,
      `Initial tsunami wave: ${consequences.tsunamiInitialHeight} meters at impact point`,
      `Coastal wave height: ${consequences.tsunamiCoastalHeight} meters (amplified 20-50x)`,
      `Coastal inundation: ${consequences.coastalInundation} km inland`,
      `Fireball radius: ${consequences.fireballRadius} km - complete vaporization`,
      `Seismic magnitude: ${consequences.earthquakeMagnitude.toFixed(1)} on Richter scale`,
      `Affected coastlines: Eastern US, Caribbean, Western Europe, West Africa`
    ];
  } else {
    outcome = `IMPACT EVENT - Inland Catastrophe`;
    details = [
      `Location: Central United States (40°N, 100°W) - agricultural heartland`,
      `Total energy release: ${consequences.energyMegatons.toFixed(0)} megatons TNT equivalent`,
      `Crater: ${consequences.craterDiameter.toFixed(1)} km wide, ${consequences.craterDepth.toFixed(0)} m deep`,
      `Fireball radius: ${consequences.fireballRadius} km - complete vaporization`,
      `Severe damage zone: ${consequences.severeDamageRadius} km radius - 100% fatalities`,
      `Moderate damage zone: ${consequences.moderateDamageRadius} km radius - building collapse`,
      `Total destroyed area: ${consequences.affectedArea.toFixed(0)} km²`,
      `Ejecta blanket: ${consequences.ejectaBlanket.toFixed(0)} km from impact`,
      `Ejecta thickness: ${consequences.ejectedThickness10km}m at 10km, ${consequences.ejectedThickness30km}m at 30km`,
      `Vegetation ignition: ${consequences.vegetationIgnition} km radius from atmospheric heating`,
      `Seismic magnitude: ${consequences.earthquakeMagnitude.toFixed(1)} - felt ${consequences.feltRadius} km away`
    ];
  }

  return {
    willImpact: true,
    missDistance: finalMissDistance,
    impactEnergy,
    consequences,
    locationType: impactLocationType,
    outcome,
    details
  };
}
