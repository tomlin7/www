export interface Project {
    id: string;
    title: string;
    description: string;
    position: [number, number, number];
    color: string;
    details?: string;
}

export const projects: Project[] = [
    {
        id: 'tesla-sim',
        title: 'Tesla Simulator',
        description: 'Autonomous driving simulation using neural networks.',
        position: [20, 0, -15],
        color: '#ff4444',
    },
    {
        id: 'agentic-ai',
        title: 'Agentic AI',
        description: 'Full-stack development using autonomous agents.',
        position: [-20, 0, -30],
        color: '#44ff44',
    },
    {
        id: 'physics-engine',
        title: 'Rapier 3D Physics',
        description: 'High-performance physics in the browser.',
        position: [0, 0, -50],
        color: '#4444ff',
    },
]
