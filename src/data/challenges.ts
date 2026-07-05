// The five 2025 challenge areas (from ChallengesAreas 2025.pptx).
// `short` is used on cards/homepage; `full` on the Research page.

export interface Challenge {
  id: string;
  title: string;
  short: string;
  full: string[];
}

export const CHALLENGES: Challenge[] = [
  {
    id: 'C1',
    title: 'Urban Flow Regimes & Multi-Scale Coupling',
    short:
      'How turbulence, canopy heterogeneity and stratification interact across scales — from the ' +
      'atmospheric boundary layer down to street and indoor flow.',
    full: [
      'Understanding how turbulent structures, canopy heterogeneity and stratification interact across ' +
        'scales: from the atmospheric boundary layer to neighbourhood scales, street scales, all the way ' +
        'down to indoor environments.',
      'This work underpins parameterisations for urban LES, mesoscale coupling and reduced-order models.',
      'Understanding these regimes provides the physics base for predicting energy and momentum exchanges, ' +
        'improving urban climate modelling, and supporting resilient infrastructure and planning decisions. ' +
        'It also informs pedestrian wind and comfort, as well as the emerging application of unmanned aerial vehicles.',
    ],
  },
  {
    id: 'C2',
    title: 'Urban Energy, Heat & Buoyancy Interactions',
    short:
      'How surface energy balance, radiation and urban form drive buoyancy, turbulence and thermal ' +
      'comfort — key to heat-resilient, net-zero cities.',
    full: [
      'How the surface energy balance, radiation and buoyancy influence turbulence and stratification ' +
        'within the urban canopy.',
      'How urban form — including vegetation and materiality — influences flow, heat transfer and comfort in cities.',
      'These insights enable better thermal-comfort modelling, passive-cooling design, and heat-resilient ' +
        'urban form — essential for net-zero adaptation in a warming climate.',
    ],
  },
  {
    id: 'C3',
    title: 'Scalar Transport, Dispersion & Exposure',
    short:
      'How urban morphology controls passive and reactive scalar transport — underpinning air-quality ' +
      'management and exposure assessment.',
    full: [
      'How urban morphology controls the transport and transformation of passive and reactive scalars.',
      'Fundamental work on dispersion mechanisms and Lagrangian statistics informs model development across scales.',
      'Applications include air-quality management, exposure assessment, and the design of healthier urban ' +
        'spaces consistent with sustainability and wellbeing goals.',
    ],
  },
  {
    id: 'C4',
    title: 'Building Ventilation & Indoor–Outdoor Exchange',
    short:
      'Turbulent exchange across façades between indoor and outdoor air — for ventilation efficiency, ' +
      'pollutant ingress and low-energy design.',
    full: [
      'Building ventilation and indoor–outdoor exchange involve complex turbulent interactions between ' +
        'atmospheric flow, building geometry and pressure-driven transport across façades.',
      'Understanding these mechanisms underpins accurate prediction of ventilation efficiency, pollutant ' +
        'ingress and heat transfer.',
      'This is essential for supporting low-energy building design, improved indoor air quality, and ' +
        'resilience to heat and pollution in future sustainable cities.',
    ],
  },
  {
    id: 'C5',
    title: 'Data, Models & Digital Twins for Coupled Urban Systems',
    short:
      'Physics-based and data-driven frameworks linking observation, simulation and AI — reduced-order ' +
      'models and digital twins for coupled urban systems.',
    full: [
      'A rapidly developing area is interoperable, physics-based and data-driven frameworks that connect ' +
        'observation, simulation and AI.',
      'High-fidelity simulations and field data support reduced-order models and digital twins that resolve ' +
        'essential turbulent processes.',
      'These tools enable evidence-based policy, sustainable urban planning, and real-time management of ' +
        'heat, air quality and energy.',
    ],
  },
];
