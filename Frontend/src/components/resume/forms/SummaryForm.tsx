
import { useAppSelector, useAppDispatch, resumeActions } from "@/store/redux";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const SummaryForm = () => {
  const summary = useAppSelector(state => state.resume.summary);
  const dispatch = useAppDispatch();
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(resumeActions.updatePersonalInfo({ summary: e.target.value }));
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={summary}
          onChange={handleChange}
          placeholder="Write a 3-4 sentence summary that highlights your experience, skills, and career goals..."
          className="bg-gray-700/30 border-gray-600 min-h-[120px]"
        />
        <p className="text-xs text-gray-400 mt-1">
          Pro tip: Keep your summary concise and focused on your most relevant skills and accomplishments.
          Aim for 3-4 sentences or about 50-100 words.
        </p>
      </div>
    </div>
  );
};

export default SummaryForm;
