import { useResumeSelector, useResumeActions } from "@/store/hooks";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PersonalInfoForm = () => {
  const { name, title, location, email, phone, linkedin, github } =
    useResumeSelector((state) => state);
  const { updatePersonalInfo } = useResumeActions();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="John Doe"
            className="bg-gray-700/30 border-gray-600"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Professional Title *</Label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="Frontend Developer"
            className="bg-gray-700/30 border-gray-600"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location *</Label>
        <Input
          id="location"
          name="location"
          value={location}
          onChange={handleChange}
          placeholder="New York, NY"
          className="bg-gray-700/30 border-gray-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="johndoe@example.com"
            className="bg-gray-700/30 border-gray-600"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
            className="bg-gray-700/30 border-gray-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            name="linkedin"
            value={linkedin}
            onChange={handleChange}
            placeholder="linkedin.com/in/johndoe"
            className="bg-gray-700/30 border-gray-600"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            name="github"
            value={github}
            onChange={handleChange}
            placeholder="github.com/johndoe"
            className="bg-gray-700/30 border-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
