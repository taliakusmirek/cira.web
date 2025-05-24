import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabaseClient';
import { ProductScorer } from '@/utils/scorer';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Check the enum values in Supabase (for debugging - can be removed later)
    const { data: enumData, error: enumError } = await supabase
      .from('reports')
      .select('quality, construction, durability, ethics') // Use the column names from the schema list
      .limit(1);

    if (enumError) {
      console.error('Error checking enum values:', enumError);
    } else {
      console.log('Current enum values in database:', enumData);
    }

    // Initialize the product scorer
    const scorer = new ProductScorer();

    // Analyze the product
    const analysis = await scorer.grade_product({
      url,
      brand: '', // Will be extracted from URL
      price: 0, // Will be extracted from URL
      materials: '', // Will be extracted from URL
      garment_type: '' // Will be extracted from URL
    });

    // Convert letter grades/values to specific Supabase enum values based on the image
    const qualityGradeToEnum = (grade: string) => {
      switch (grade) {
        case 'A': return 'Excellent';
        case 'B': return 'Good';
        case 'C': return 'Average';
        case 'D': return 'Fair';
        case 'F': return 'Average'; // Assuming F maps to Average quality as per quality_level enums
        default: return 'Average';
      }
    };

    const constructionGradeToEnum = (grade: string) => {
        switch (grade) {
            case 'A': return 'Premium';
            case 'B': return 'Quality';
            case 'C': return 'Standard';
            case 'D': return 'Basic';
            case 'F': return 'Basic'; // Assuming F maps to Basic construction as per construction_level enums
            default: return 'Standard';
        }
    };

    // Note: Durability in scorer is a grade (A-F), but Supabase uses ranges (e.g., '5+ Years').
    // We need to map the durability grade from the scorer to the correct durability_range enum as per the image.
    const durabilityGradeToEnum = (grade: string) => {
        switch (grade) {
            case 'A': return '5+ Years';
            case 'B': return '3-4 Years';
            case 'C': return '2-3 Years';
            case 'D': return '1-2 Years';
            case 'F': return '1-2 Years'; // Assuming F maps to the lowest range as per durability_range enums
            default: return '2-3 Years';
        }
    };

    const ethicsGradeToEnum = (grade: string) => {
        switch (grade) {
            case 'A': return 'Positive';
            case 'B': return 'Good';
            case 'C': return 'Neutral';
            case 'D': return 'Concerning';
            case 'F': return 'Concerning'; // Assuming F maps to Concerning ethics as per ethics_rating enums
            default: return 'Neutral';
        }
    };

    const qualityEnum = qualityGradeToEnum(analysis.quality);
    const constructionEnum = constructionGradeToEnum(analysis.construction);
    const durabilityEnum = durabilityGradeToEnum(analysis.durability);
    const ethicsEnum = ethicsGradeToEnum(analysis.ethics);

    console.log('Enum values being sent to Supabase:', {
      quality: qualityEnum, // Use column names from schema list
      construction: constructionEnum,
      durability: durabilityEnum,
      ethics: ethicsEnum
    });

    // Store the analysis in Supabase
    const { data, error } = await supabase
      .from('reports')
      .insert({
        url,
        brand: analysis.brand,
        overall_score: analysis.overallScore,
        quality: qualityEnum,
        construction: constructionEnum,
        durability: durabilityEnum,
        ethics: ethicsEnum,
        materials: analysis.materials,
        quality_explanation: analysis.qualityExplanation,
        construction_explanation: analysis.constructionExplanation,
        ethics_explanation: analysis.ethicsExplanation,
        overall_explanation: analysis.overallExplanation,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error storing analysis:', error);
      console.error('Values that caused the error:', {
        quality: qualityEnum,
        construction: constructionEnum,
        durability: durabilityEnum,
        ethics: ethicsEnum
      });
      return NextResponse.json(
        { error: 'Failed to store analysis' },
        { status: 500 }
      );
    }

    // Convert enum values back to letter grades for the response based on the image enums
    const qualityEnumToGrade = (level: string) => {
      switch (level) {
        case 'Excellent': return 'A';
        case 'Good': return 'B';
        case 'Average': return 'C';
        case 'Fair': return 'D';
        default: return 'C'; // Defaulting to C if unexpected
      }
    };

    const constructionEnumToGrade = (level: string) => {
        switch (level) {
            case 'Premium': return 'A';
            case 'Quality': return 'B';
            case 'Standard': return 'C';
            case 'Basic': return 'D'; // Mapping Basic to D
            default: return 'C';
        }
    };

    const durabilityEnumToGrade = (range: string) => {
        switch (range) {
            case '5+ Years': return 'A';
            case '3-4 Years': return 'B';
            case '2-3 Years': return 'C';
            case '1-2 Years': return 'D'; // Mapping 1-2 Years to D
            default: return 'C';
        }
    };

    const ethicsEnumToGrade = (rating: string) => {
        switch (rating) {
            case 'Positive': return 'A';
            case 'Good': return 'B';
            case 'Neutral': return 'C';
            case 'Concerning': return 'D'; // Mapping Concerning to D
            default: return 'C';
        }
    };

    // Return the data with letter grades for the UI
    return NextResponse.json({ 
      success: true,
      report: {
        ...data,
        quality: qualityEnumToGrade(data.quality),
        construction: constructionEnumToGrade(data.construction),
        durability: durabilityEnumToGrade(data.durability),
        ethics: ethicsEnumToGrade(data.ethics)
      }
    });

  } catch (error) {
    console.error('Error analyzing product:', error);
    return NextResponse.json(
      { error: 'Failed to analyze product' },
      { status: 500 }
    );
  }
} 