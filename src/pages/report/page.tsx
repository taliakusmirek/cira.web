'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { useSearchParams } from "next/navigation";

// Connect to Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ReportPage() {
  const searchParams = useSearchParams();
  const url = searchParams?.get("url") ?? null;
  const [report, setReport] = useState<Report | null>(null);

  interface Report {
    id: string; // uuid as string
    url: string;
    brand: string;
    overall_score: number;
    quality: string;
    construction: string;
    durability: string;
    materials: string;
    ethics: string;
    cost_per_wear: string;
    created_at: string; // or `Date` if you parse it
  }
  
  useEffect(() => {
    if (url) {
      (async () => {
        const { data, error } = await supabase
          .from("reports")
          .select("*")
          .eq("url", url)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (!error) setReport(data);
      })();
    }
  }, [url]);

  if (!report) return <p className="text-center mt-20">Loading your report...</p>;

  return (
    <div className="max-w-4xl w-full mx-auto grid md:grid-cols-2 gap-8 items-start mt-16 p-4">
      {/* Image placeholder */}
      <div className="relative">
        <Image 
          src="/blazer.png"  // TODO: dynamically update with real item image if available
          alt="CIRA Analysis" 
          className="w-full h-auto rounded-lg"
          width={500}
          height={500}
        />
      </div>

      {/* Report Summary */}
      <div className="rounded-xl shadow-lg p-8 bg-white">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              CIRA Integrity Report
            </h3>
            <p className="text-sm text-gray-500">Analyzed just now</p>
          </div>
          <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
            Verified from {report.brand}
          </span>
        </div>

        <div className="space-y-8">
          {/* Score */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Overall Score</span>
              <span className="text-lg font-semibold text-[#3b3bfa]">{report.overall_score}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className="bg-[#3b3bfa] h-3 rounded-full transition-all duration-500"
                style={{ width: `${report.overall_score}%` }}
              />
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <MetricBox label="Quality" value={report.quality} />
            <MetricBox label="Construction" value={report.construction} />
            <MetricBox label="Durability" value={report.durability} />
            <MetricBox label="Human Impact" value={report.ethics === 'A' ? "Positive" : report.ethics} />
          </div>

          {/* Quick Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
            <span>{report.cost_per_wear && `Cost/Wear: ${report.cost_per_wear}`}</span>
            <span>{report.materials || "100% Wool"}</span>
            <span>Fully Lined</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricBox({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="text-sm text-gray-500 mb-1">{label}</div>
      <div className="text-lg font-semibold text-gray-900">{value}</div>
    </div>
  );
}