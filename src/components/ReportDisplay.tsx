import React from 'react';
import { motion } from 'framer-motion';

type Grade = 'A' | 'B' | 'C' | 'D' | 'F';

interface ReportDisplayProps {
  report: {
    quality: Grade;
    construction: Grade;
    durability: Grade;
    ethics: Grade;
    quality_explanation: string;
    construction_explanation: string;
    ethics_explanation: string;
    overall_explanation: string;
    materials: string;
    brand: string;
  };
}

const gradeColors: Record<Grade, string> = {
  A: 'bg-green-500',
  B: 'bg-green-400',
  C: 'bg-yellow-400',
  D: 'bg-orange-400',
  F: 'bg-red-500'
};

export const ReportDisplay: React.FC<ReportDisplayProps> = ({ report }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6">Product Analysis Report</h2>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Quality</h3>
            <div className={`inline-block px-3 py-1 rounded-full text-white font-bold ${gradeColors[report.quality]}`}>
              {report.quality}
            </div>
            <p className="mt-2 text-gray-600">{report.quality_explanation}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Construction</h3>
            <div className={`inline-block px-3 py-1 rounded-full text-white font-bold ${gradeColors[report.construction]}`}>
              {report.construction}
            </div>
            <p className="mt-2 text-gray-600">{report.construction_explanation}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Durability</h3>
            <div className={`inline-block px-3 py-1 rounded-full text-white font-bold ${gradeColors[report.durability]}`}>
              {report.durability}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Ethics</h3>
            <div className={`inline-block px-3 py-1 rounded-full text-white font-bold ${gradeColors[report.ethics]}`}>
              {report.ethics}
            </div>
            <p className="mt-2 text-gray-600">{report.ethics_explanation}</p>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-2">Overall Assessment</h3>
        <p className="text-gray-600">{report.overall_explanation}</p>
      </div>
      
      <div className="mt-6 text-sm text-gray-500">
        <p>Brand: {report.brand}</p>
        <p>Materials: {report.materials}</p>
      </div>
    </motion.div>
  );
}; 