
import { useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import SummaryForm from "./forms/SummaryForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import CertificationsForm from "./forms/CertificationsForm";
import ProjectsForm from "./forms/ProjectsForm";
import LanguagesForm from "./forms/LanguagesForm";
import OptionalSectionsForm from "./forms/OptionalSectionsForm";

const ResumeForm = () => {
  const [activeTab, setActiveTab] = useState("basics");
  
  return (
    <div className="h-full overflow-y-auto pr-2" style={{ maxHeight: 'calc(100vh - 240px)' }}>
      <Tabs defaultValue="basics" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="basics">Basics</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="extras">Extras</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basics" className="space-y-4 animate-fade-in">
          <Collapsible defaultOpen className="border border-gray-700 rounded-lg overflow-hidden">
            <CollapsibleTrigger className="flex w-full items-center justify-between bg-gray-700/50 p-4 text-left font-medium">
              <span>Personal Information</span>
              <ChevronDown className="h-5 w-5 text-gray-400 transition-transform ui-open:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-2 bg-gray-800/30">
              <PersonalInfoForm />
            </CollapsibleContent>
          </Collapsible>
          
          <Collapsible defaultOpen className="border border-gray-700 rounded-lg overflow-hidden">
            <CollapsibleTrigger className="flex w-full items-center justify-between bg-gray-700/50 p-4 text-left font-medium">
              <span>Professional Summary</span>
              <ChevronDown className="h-5 w-5 text-gray-400 transition-transform ui-open:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-2 bg-gray-800/30">
              <SummaryForm />
            </CollapsibleContent>
          </Collapsible>
          
          <Collapsible defaultOpen className="border border-gray-700 rounded-lg overflow-hidden">
            <CollapsibleTrigger className="flex w-full items-center justify-between bg-gray-700/50 p-4 text-left font-medium">
              <span>Skills</span>
              <ChevronDown className="h-5 w-5 text-gray-400 transition-transform ui-open:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-2 bg-gray-800/30">
              <SkillsForm />
            </CollapsibleContent>
          </Collapsible>
        </TabsContent>
        
        <TabsContent value="experience" className="space-y-4 animate-fade-in">
          <Collapsible defaultOpen className="border border-gray-700 rounded-lg overflow-hidden">
            <CollapsibleTrigger className="flex w-full items-center justify-between bg-gray-700/50 p-4 text-left font-medium">
              <span>Work Experience</span>
              <ChevronDown className="h-5 w-5 text-gray-400 transition-transform ui-open:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-2 bg-gray-800/30">
              <WorkExperienceForm />
            </CollapsibleContent>
          </Collapsible>
          
          <Collapsible defaultOpen className="border border-gray-700 rounded-lg overflow-hidden">
            <CollapsibleTrigger className="flex w-full items-center justify-between bg-gray-700/50 p-4 text-left font-medium">
              <span>Education</span>
              <ChevronDown className="h-5 w-5 text-gray-400 transition-transform ui-open:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-2 bg-gray-800/30">
              <EducationForm />
            </CollapsibleContent>
          </Collapsible>
          
          <Collapsible defaultOpen className="border border-gray-700 rounded-lg overflow-hidden">
            <CollapsibleTrigger className="flex w-full items-center justify-between bg-gray-700/50 p-4 text-left font-medium">
              <span>Projects</span>
              <ChevronDown className="h-5 w-5 text-gray-400 transition-transform ui-open:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-2 bg-gray-800/30">
              <ProjectsForm />
            </CollapsibleContent>
          </Collapsible>
        </TabsContent>
        
        <TabsContent value="extras" className="space-y-4 animate-fade-in">
          <Collapsible defaultOpen className="border border-gray-700 rounded-lg overflow-hidden">
            <CollapsibleTrigger className="flex w-full items-center justify-between bg-gray-700/50 p-4 text-left font-medium">
              <span>Certifications</span>
              <ChevronDown className="h-5 w-5 text-gray-400 transition-transform ui-open:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-2 bg-gray-800/30">
              <CertificationsForm />
            </CollapsibleContent>
          </Collapsible>
          
          <Collapsible defaultOpen className="border border-gray-700 rounded-lg overflow-hidden">
            <CollapsibleTrigger className="flex w-full items-center justify-between bg-gray-700/50 p-4 text-left font-medium">
              <span>Languages</span>
              <ChevronDown className="h-5 w-5 text-gray-400 transition-transform ui-open:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-2 bg-gray-800/30">
              <LanguagesForm />
            </CollapsibleContent>
          </Collapsible>
          
          <Collapsible defaultOpen className="border border-gray-700 rounded-lg overflow-hidden">
            <CollapsibleTrigger className="flex w-full items-center justify-between bg-gray-700/50 p-4 text-left font-medium">
              <span>Optional Sections</span>
              <ChevronDown className="h-5 w-5 text-gray-400 transition-transform ui-open:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-2 bg-gray-800/30">
              <OptionalSectionsForm />
            </CollapsibleContent>
          </Collapsible>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeForm;
