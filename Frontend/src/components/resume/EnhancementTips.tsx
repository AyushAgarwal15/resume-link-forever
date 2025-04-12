import { useState, useEffect } from "react";
import { useResumeSelector } from "@/store/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ScanSearch,
  AlertCircle,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

const EnhancementTips = () => {
  const resumeData = useResumeSelector((state) => state);
  const [tips, setTips] = useState<
    { text: string; type: "info" | "warning" | "tip" }[]
  >([]);

  useEffect(() => {
    const generateTips = () => {
      const newTips: { text: string; type: "info" | "warning" | "tip" }[] = [];

      // Check for missing or weak sections
      if (!resumeData.summary || resumeData.summary.length < 100) {
        newTips.push({
          text: "Your professional summary is too short or missing. Aim for 3-4 sentences that highlight your experience and skills.",
          type: "warning",
        });
      }

      if (resumeData.workExperiences.length === 0) {
        newTips.push({
          text: "Add at least one work experience entry with detailed responsibilities.",
          type: "warning",
        });
      } else {
        // Check for short responsibilities
        let hasShortResponsibilities = false;
        resumeData.workExperiences.forEach((exp) => {
          if (exp.responsibilities.some((r) => r.length < 40)) {
            hasShortResponsibilities = true;
          }
        });

        if (hasShortResponsibilities) {
          newTips.push({
            text: "Some of your work responsibilities are too short. Add more details and measurable achievements.",
            type: "warning",
          });
        }

        // Check for missing action verbs
        const actionVerbs = [
          "achieved",
          "improved",
          "trained",
          "managed",
          "created",
          "reduced",
          "increased",
          "negotiated",
          "developed",
          "led",
          "organized",
          "delivered",
        ];

        let missingActionVerbs = true;
        let genericPhrases = false;

        resumeData.workExperiences.forEach((exp) => {
          exp.responsibilities.forEach((resp) => {
            const lowerResp = resp.toLowerCase();

            // Check for action verbs
            for (const verb of actionVerbs) {
              if (lowerResp.includes(verb)) {
                missingActionVerbs = false;
                break;
              }
            }

            // Check for generic phrases
            if (
              lowerResp.includes("responsible for") ||
              lowerResp.includes("duties included") ||
              lowerResp.includes("worked on") ||
              lowerResp.includes("helped with")
            ) {
              genericPhrases = true;
            }
          });
        });

        if (missingActionVerbs) {
          newTips.push({
            text: "Use strong action verbs (managed, developed, implemented) at the beginning of bullet points.",
            type: "tip",
          });
        }

        if (genericPhrases) {
          newTips.push({
            text: "Avoid generic phrases like 'responsible for' or 'duties included'. Focus on achievements instead.",
            type: "warning",
          });
        }
      }

      // Check for skills
      if (resumeData.skills.length < 5) {
        newTips.push({
          text: "Add more relevant skills to improve keyword matching with job descriptions.",
          type: "warning",
        });
      }

      // Education section
      if (resumeData.education.length === 0) {
        newTips.push({
          text: "Add your educational background to complete your resume.",
          type: "info",
        });
      }

      // General enhancement tips based on ATS best practices
      newTips.push({
        text: "Try adding more measurable results in your work experience (e.g., 'Increased sales by 20%').",
        type: "tip",
      });

      newTips.push({
        text: "Include more keywords relevant to your desired role by analyzing job descriptions.",
        type: "tip",
      });

      // Random but useful tips (show a subset based on resume completeness)
      const additionalTips = [
        "Keep your resume to 1-2 pages for optimal ATS scanning.",
        "Use standard section headings like 'Experience', 'Education', and 'Skills'.",
        "Quantify achievements where possible (numbers, percentages, timeframes).",
        "Tailor your resume for each application by matching keywords from the job post.",
        "Spell check your resume - many ATS systems flag documents with spelling errors.",
        "Use a clean, simple format without tables, columns, or text boxes for better ATS parsing.",
      ];

      // Add 2-3 random additional tips
      const tipsToShow = Math.floor(Math.random() * 2) + 2; // 2-3 tips
      const shuffledTips = [...additionalTips].sort(() => 0.5 - Math.random());

      for (let i = 0; i < tipsToShow; i++) {
        if (shuffledTips[i]) {
          newTips.push({
            text: shuffledTips[i],
            type: "info",
          });
        }
      }

      setTips(newTips);
    };

    generateTips();
  }, [resumeData]);

  return (
    <Card className="bg-gray-800/70 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <ScanSearch className="mr-2 h-5 w-5 text-brand-teal" />
          Enhancement Tips
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="max-h-48 overflow-y-auto pr-2">
          <ul className="space-y-3">
            {tips.map((tip, index) => (
              <li key={index} className="flex text-sm">
                {tip.type === "warning" && (
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                )}
                {tip.type === "info" && (
                  <AlertCircle className="h-4 w-4 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                )}
                {tip.type === "tip" && (
                  <Lightbulb className="h-4 w-4 text-brand-teal mt-0.5 mr-2 flex-shrink-0" />
                )}
                <span className="text-gray-300">{tip.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancementTips;
