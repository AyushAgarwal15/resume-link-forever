import { useState, useEffect } from "react";
import { useResumeSelector } from "@/store/hooks";
import { Progress } from "@/components/ui/progress";
import { CircleCheck, Info } from "lucide-react";

const ATSScoreCard = () => {
  const resumeData = useResumeSelector((state) => state);
  const [score, setScore] = useState(0);
  const [scoreDetails, setScoreDetails] = useState<{
    contentScore: number;
    formatScore: number;
    structureScore: number;
    keywordScore: number;
  }>({
    contentScore: 0,
    formatScore: 0,
    structureScore: 0,
    keywordScore: 0,
  });

  // Calculate ATS score based on various factors
  useEffect(() => {
    const calculateScore = () => {
      // Content Score (40% of total): based on completeness of all sections
      const contentScore = calculateContentScore();

      // Format Score (30% of total): based on proper formatting for ATS readability
      const formatScore = calculateFormatScore();

      // Structure Score (20% of total): based on clear section hierarchy
      const structureScore = calculateStructureScore();

      // Keyword Score (10% of total): based on industry-related keywords
      const keywordScore = calculateKeywordScore();

      // Calculate weighted total score
      const totalScore = Math.round(
        contentScore * 0.4 +
          formatScore * 0.3 +
          structureScore * 0.2 +
          keywordScore * 0.1
      );

      setScore(totalScore);
      setScoreDetails({
        contentScore,
        formatScore,
        structureScore,
        keywordScore,
      });
    };

    calculateScore();
  }, [resumeData]);

  // Calculate content score based on completeness of sections
  const calculateContentScore = () => {
    let score = 0;
    const maxScore = 100;

    // Basic Information (20 points)
    if (resumeData.name) score += 4;
    if (resumeData.title) score += 4;
    if (resumeData.email) score += 4;
    if (resumeData.phone) score += 4;
    if (resumeData.location) score += 4;

    // Professional Summary (15 points)
    if (resumeData.summary) {
      const summaryLength = resumeData.summary.length;
      if (summaryLength > 300) score += 15;
      else if (summaryLength > 200) score += 12;
      else if (summaryLength > 100) score += 8;
      else if (summaryLength > 50) score += 5;
      else score += 3;
    }

    // Work Experience (30 points)
    const workExperiences = resumeData.workExperiences.length;
    if (workExperiences >= 3) score += 15;
    else if (workExperiences >= 2) score += 10;
    else if (workExperiences >= 1) score += 5;

    // Check for detailed responsibilities
    let hasDetailedResponsibilities = false;
    let responsibilitiesCount = 0;

    resumeData.workExperiences.forEach((exp) => {
      responsibilitiesCount += exp.responsibilities.length;
      exp.responsibilities.forEach((resp) => {
        if (resp.length > 40) hasDetailedResponsibilities = true;
      });
    });

    if (responsibilitiesCount >= 10) score += 10;
    else if (responsibilitiesCount >= 5) score += 7;
    else if (responsibilitiesCount >= 3) score += 4;

    if (hasDetailedResponsibilities) score += 5;

    // Education (10 points)
    if (resumeData.education.length > 0) score += 10;

    // Skills (15 points)
    const skillsCount = resumeData.skills.length;
    if (skillsCount >= 10) score += 15;
    else if (skillsCount >= 7) score += 12;
    else if (skillsCount >= 5) score += 9;
    else if (skillsCount >= 3) score += 6;
    else if (skillsCount > 0) score += 3;

    // Additional sections (10 points)
    let additionalSections = 0;
    if (resumeData.certifications.length > 0) additionalSections++;
    if (resumeData.projects.length > 0) additionalSections++;
    if (resumeData.languages.length > 0) additionalSections++;
    if (resumeData.hobbies.length > 0) additionalSections++;
    if (resumeData.awards.length > 0) additionalSections++;

    if (additionalSections >= 3) score += 10;
    else if (additionalSections >= 2) score += 7;
    else if (additionalSections >= 1) score += 4;

    return Math.min(score, maxScore);
  };

  // Calculate format score based on proper formatting for ATS readability
  const calculateFormatScore = () => {
    // Since we're controlling the format in the preview, this should be high
    return 90; // Using static value since the format is ATS-friendly by design
  };

  // Calculate structure score based on clear section hierarchy
  const calculateStructureScore = () => {
    // Since we're controlling the structure in the preview, this should be high
    return 95; // Using static value since the structure is ATS-friendly by design
  };

  // Calculate keyword score based on industry-related keywords
  const calculateKeywordScore = () => {
    // This would ideally be based on job-specific keywords, but for now,
    // we'll use a simplified calculation based on skills and work descriptions

    const skillKeywords = resumeData.skills.map((skill) =>
      skill.name.toLowerCase()
    );

    // Common action verbs that ATS systems look for
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
      "streamlined",
      "implemented",
      "coordinated",
      "generated",
      "launched",
    ];

    // Check for action verbs in responsibilities
    let actionVerbCount = 0;
    resumeData.workExperiences.forEach((exp) => {
      exp.responsibilities.forEach((resp) => {
        const lowerResp = resp.toLowerCase();
        actionVerbs.forEach((verb) => {
          if (lowerResp.includes(verb)) actionVerbCount++;
        });
      });
    });

    // Calculate score based on skills count and action verb usage
    let score = 0;

    // Skills keywords (max 60 points)
    if (skillKeywords.length >= 12) score += 60;
    else if (skillKeywords.length >= 8) score += 45;
    else if (skillKeywords.length >= 5) score += 30;
    else if (skillKeywords.length > 0) score += 15;

    // Action verbs (max 40 points)
    if (actionVerbCount >= 12) score += 40;
    else if (actionVerbCount >= 8) score += 30;
    else if (actionVerbCount >= 4) score += 20;
    else if (actionVerbCount > 0) score += 10;

    return Math.min(score, 100);
  };

  const getScoreColor = () => {
    if (score >= 85) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreLabel = () => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Fair";
    return "Needs Improvement";
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">ATS Compatibility Score</h3>
        <div className={`text-2xl font-bold ${getScoreColor()}`}>
          {score}/100
        </div>
      </div>

      <div className="mb-3">
        <Progress value={score} className="h-2" />
        <div className="flex justify-between mt-1 text-xs text-gray-400">
          <span>Poor</span>
          <span>Excellent</span>
        </div>
      </div>

      <div className="text-sm mb-2 flex items-center gap-1">
        <span className={`font-medium ${getScoreColor()}`}>
          {getScoreLabel()}
        </span>
        {score >= 85 && <CircleCheck className="h-4 w-4 text-green-500" />}
      </div>

      <div className="space-y-2 pt-2 border-t border-gray-700 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Content</span>
          <span className="font-medium">{scoreDetails.contentScore}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Format</span>
          <span className="font-medium">{scoreDetails.formatScore}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Structure</span>
          <span className="font-medium">{scoreDetails.structureScore}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Keywords</span>
          <span className="font-medium">{scoreDetails.keywordScore}%</span>
        </div>
      </div>
    </div>
  );
};

export default ATSScoreCard;
