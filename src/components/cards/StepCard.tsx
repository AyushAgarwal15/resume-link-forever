
import { LucideIcon } from "lucide-react";

interface StepProps {
  step: {
    id: number;
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
  };
}

const StepCard = ({ step }: StepProps) => {
  const { id, title, description, icon: Icon, color } = step;
  
  return (
    <div className="group glass-card p-6 rounded-xl hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 animate-on-scroll">
      <div className="flex items-start gap-4">
        <div className={`bg-gradient-to-br ${color} p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center shadow-md group-hover:shadow-glow transition-all duration-300`}>
          <div className="text-xl font-bold text-white">{id}</div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 text-white flex items-center gap-2">
            {title}
            <Icon className="h-5 w-5 text-brand-accent inline-block ml-1" />
          </h3>
          <p className="text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepCard;
