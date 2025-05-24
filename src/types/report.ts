export type ScoreGrade = 'A' | 'B' | 'C' | 'D' | 'F';
export type QualityLevel = 'A' | 'B' | 'C' | 'D' | 'F';
export type ConstructionLevel = 'A' | 'B' | 'C' | 'D' | 'F';
export type DurabilityRange = 'A' | 'B' | 'C' | 'D' | 'F';
export type EthicsRating = 'A' | 'B' | 'C' | 'D' | 'F';

export interface ProductReport {
    id: string;
    url: string;
    title: string;
    brand: string;
    overall_score: number;
    quality: QualityLevel;
    quality_explanation?: string;
    construction: ConstructionLevel;
    construction_explanation?: string;
    durability: DurabilityRange;
    ethics: EthicsRating;
    ethics_explanation?: string;
    overall_explanation?: string;
    cost_per_wear: string;
    created_at: string;
    materials: string;
    images?: string[];  // Array of image URLs
    description?: string;  // Product description
}
