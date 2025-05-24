interface ProductData {
  url: string;
  brand: string;
  price: number;
  materials: string;
  garment_type: string;
}

interface AnalysisResult {
  overallScore: number;
  quality: string;
  construction: string;
  durability: string;
  ethics: string;
  qualityExplanation: string;
  constructionExplanation: string;
  ethicsExplanation: string;
  overallExplanation: string;
  materials: string;
  brand: string;
}

export class ProductScorer {
  private readonly qualityThresholds = {
    A: 90,
    B: 80,
    C: 70,
    D: 60,
    F: 50
  };

  private readonly materialQuality = {
    premium: ['wool', 'silk', 'cashmere', 'linen', 'organic cotton'],
    good: ['cotton', 'denim', 'leather', 'suede'],
    avoid: ['polyester', 'acrylic', 'nylon', 'spandex', 'rayon']
  };

  private readonly brandEthics = {
    high: ['Patagonia', 'Eileen Fisher', 'Reformation', 'Stella McCartney'],
    medium: ['Everlane', 'Levi\'s', 'Nudie Jeans'],
    low: ['Shein', 'Fashion Nova', 'Boohoo']
  };

  async grade_product(data: ProductData): Promise<AnalysisResult> {
    // Extract information from URL (placeholder for actual implementation)
    const extractedData = await this.extractProductInfo(data.url);
    
    // Calculate scores
    const qualityScore = this.calculateQualityScore(extractedData);
    const constructionScore = this.calculateConstructionScore(extractedData);
    const ethicsScore = this.calculateEthicsScore(extractedData);
    
    // Calculate overall score
    const overallScore = Math.round(
      (qualityScore * 0.4) + (constructionScore * 0.3) + (ethicsScore * 0.3)
    );

    // Generate explanations
    const qualityExplanation = this.generateQualityExplanation(qualityScore, extractedData);
    const constructionExplanation = this.generateConstructionExplanation(constructionScore, extractedData);
    const ethicsExplanation = this.generateEthicsExplanation(ethicsScore, extractedData);
    const overallExplanation = this.generateOverallExplanation(overallScore, extractedData);

    return {
      overallScore,
      quality: this.scoreToGrade(qualityScore),
      construction: this.scoreToGrade(constructionScore),
      durability: this.scoreToGrade(Math.round((qualityScore + constructionScore) / 2)),
      ethics: this.scoreToGrade(ethicsScore),
      qualityExplanation,
      constructionExplanation,
      ethicsExplanation,
      overallExplanation,
      materials: extractedData.materials,
      brand: extractedData.brand
    };
  }

  private async extractProductInfo(url: string): Promise<ProductData> {
    // TODO: Implement actual product info extraction
    // For now, return mock data
    return {
      url,
      brand: 'Example Brand',
      price: 199.99,
      materials: 'wool, cotton',
      garment_type: 'blazer'
    };
  }

  private calculateQualityScore(data: ProductData): number {
    let score = 75; // Base score

    // Material quality
    const materials = data.materials.toLowerCase().split(',');
    const hasPremiumMaterial = materials.some(m => 
      this.materialQuality.premium.some(p => m.includes(p))
    );
    const hasAvoidMaterial = materials.some(m => 
      this.materialQuality.avoid.some(a => m.includes(a))
    );

    if (hasPremiumMaterial) score += 15;
    if (hasAvoidMaterial) score -= 20;

    // Price quality ratio (placeholder logic)
    if (data.price > 500) score += 10;
    if (data.price < 50) score -= 10;

    return Math.min(100, Math.max(0, score));
  }

  private calculateConstructionScore(data: ProductData): number {
    let score = 75; // Base score

    // Brand reputation (placeholder logic)
    const brandLower = data.brand.toLowerCase();
    if (this.brandEthics.high.some(b => brandLower.includes(b.toLowerCase()))) {
      score += 15;
    } else if (this.brandEthics.low.some(b => brandLower.includes(b.toLowerCase()))) {
      score -= 15;
    }

    // Material quality impact
    const materials = data.materials.toLowerCase().split(',');
    const hasPremiumMaterial = materials.some(m => 
      this.materialQuality.premium.some(p => m.includes(p))
    );
    if (hasPremiumMaterial) score += 10;

    return Math.min(100, Math.max(0, score));
  }

  private calculateEthicsScore(data: ProductData): number {
    let score = 75; // Base score

    // Brand ethics
    const brandLower = data.brand.toLowerCase();
    if (this.brandEthics.high.some(b => brandLower.includes(b.toLowerCase()))) {
      score += 20;
    } else if (this.brandEthics.medium.some(b => brandLower.includes(b.toLowerCase()))) {
      score += 10;
    } else if (this.brandEthics.low.some(b => brandLower.includes(b.toLowerCase()))) {
      score -= 20;
    }

    // Material ethics
    const materials = data.materials.toLowerCase().split(',');
    const hasPremiumMaterial = materials.some(m => 
      this.materialQuality.premium.some(p => m.includes(p))
    );
    const hasAvoidMaterial = materials.some(m => 
      this.materialQuality.avoid.some(a => m.includes(a))
    );

    if (hasPremiumMaterial) score += 10;
    if (hasAvoidMaterial) score -= 15;

    return Math.min(100, Math.max(0, score));
  }

  private scoreToGrade(score: number): string {
    if (score >= this.qualityThresholds.A) return 'A';
    if (score >= this.qualityThresholds.B) return 'B';
    if (score >= this.qualityThresholds.C) return 'C';
    if (score >= this.qualityThresholds.D) return 'D';
    return 'F';
  }

  private generateQualityExplanation(score: number, data: ProductData): string {
    const grade = this.scoreToGrade(score);
    const materials = data.materials.toLowerCase().split(',');
    
    let explanation = `This product received a ${grade} for quality. `;
    
    if (grade === 'A') {
      explanation += 'The materials and construction are of exceptional quality.';
    } else if (grade === 'B') {
      explanation += 'The materials and construction are good, with room for improvement.';
    } else if (grade === 'C') {
      explanation += 'The materials and construction are average.';
    } else {
      explanation += 'The materials and construction could be improved.';
    }

    return explanation;
  }

  private generateConstructionExplanation(score: number, data: ProductData): string {
    const grade = this.scoreToGrade(score);
    
    let explanation = `This product received a ${grade} for construction. `;
    
    if (grade === 'A') {
      explanation += 'The craftsmanship and attention to detail are excellent.';
    } else if (grade === 'B') {
      explanation += 'The construction is solid with good attention to detail.';
    } else if (grade === 'C') {
      explanation += 'The construction is adequate but basic.';
    } else {
      explanation += 'The construction quality could be improved.';
    }

    return explanation;
  }

  private generateEthicsExplanation(score: number, data: ProductData): string {
    const grade = this.scoreToGrade(score);
    
    let explanation = `This product received a ${grade} for ethics. `;
    
    if (grade === 'A') {
      explanation += 'The brand demonstrates strong ethical practices and sustainability.';
    } else if (grade === 'B') {
      explanation += 'The brand shows good ethical practices with room for improvement.';
    } else if (grade === 'C') {
      explanation += 'The brand has basic ethical practices in place.';
    } else {
      explanation += 'The brand\'s ethical practices could be improved.';
    }

    return explanation;
  }

  private generateOverallExplanation(score: number, data: ProductData): string {
    const grade = this.scoreToGrade(score);
    
    let explanation = `Overall, this product received a ${grade} rating. `;
    
    if (grade === 'A') {
      explanation += 'It represents an excellent choice in terms of quality, construction, and ethics.';
    } else if (grade === 'B') {
      explanation += 'It\'s a good choice with some areas that could be improved.';
    } else if (grade === 'C') {
      explanation += 'It\'s an average choice with several areas that could be improved.';
    } else {
      explanation += 'There are better alternatives available in terms of quality, construction, and ethics.';
    }

    return explanation;
  }
} 