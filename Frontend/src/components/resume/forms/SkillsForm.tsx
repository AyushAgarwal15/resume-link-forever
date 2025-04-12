
import { useState } from "react";
import { useAppSelector, useAppDispatch, resumeActions } from "@/store/redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { Skill } from "@/store/types";

const SkillsForm = () => {
  const skills = useAppSelector(state => state.resume.skills);
  const dispatch = useAppDispatch();
  
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState(3);
  const [skillType, setSkillType] = useState<'hard' | 'soft'>('hard');
  
  const hardSkills = skills.filter(skill => skill.type === 'hard');
  const softSkills = skills.filter(skill => skill.type === 'soft');
  
  const handleAddSkill = () => {
    if (skillName.trim()) {
      dispatch(resumeActions.addSkill({
        name: skillName.trim(),
        level: skillLevel,
        type: skillType
      }));
      setSkillName('');
      setSkillLevel(3);
    }
  };
  
  const getSkillLevelText = (level: number) => {
    switch (level) {
      case 1: return 'Beginner';
      case 2: return 'Basic';
      case 3: return 'Intermediate';
      case 4: return 'Advanced';
      case 5: return 'Expert';
      default: return 'Intermediate';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[2fr,1fr] items-end">
          <div className="space-y-2">
            <Label htmlFor="skillName">Skill Name</Label>
            <Input
              id="skillName"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              placeholder="e.g. JavaScript, Project Management, etc."
              className="bg-gray-700/30 border-gray-600"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="skillType">Skill Type</Label>
            <Select 
              value={skillType} 
              onValueChange={(value) => setSkillType(value as 'hard' | 'soft')}
            >
              <SelectTrigger id="skillType" className="bg-gray-700/30 border-gray-600">
                <SelectValue placeholder="Skill Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hard">Hard Skill</SelectItem>
                <SelectItem value="soft">Soft Skill</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="skillLevel">Skill Level: {getSkillLevelText(skillLevel)}</Label>
            <span className="text-sm text-gray-400">{skillLevel}/5</span>
          </div>
          <Slider
            id="skillLevel"
            value={[skillLevel]}
            min={1}
            max={5}
            step={1}
            onValueChange={(values) => setSkillLevel(values[0])}
          />
          <div className="flex justify-between text-xs text-gray-400 px-2">
            <span>Beginner</span>
            <span>Expert</span>
          </div>
        </div>
        
        <Button 
          onClick={handleAddSkill} 
          disabled={!skillName.trim()}
          className="w-full mt-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">Hard Skills</h3>
          {hardSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {hardSkills.map((skill) => (
                <Badge 
                  key={skill.id} 
                  variant="secondary"
                  className="flex items-center gap-1 text-sm py-1.5 px-2.5"
                >
                  {skill.name} ({skill.level}/5)
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch(resumeActions.removeSkill(skill.id))}
                    className="h-5 w-5 p-0 ml-1 -mr-1"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No hard skills added yet.</p>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Soft Skills</h3>
          {softSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <Badge 
                  key={skill.id} 
                  variant="secondary"
                  className="flex items-center gap-1 text-sm py-1.5 px-2.5"
                >
                  {skill.name} ({skill.level}/5)
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch(resumeActions.removeSkill(skill.id))}
                    className="h-5 w-5 p-0 ml-1 -mr-1"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No soft skills added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
