
import { useResumeStore } from "@/store/resume-store";
import { ExternalLink } from "lucide-react";

const ResumePreview = () => {
  const {
    name, title, location, email, phone, linkedin, github,
    summary,
    workExperiences,
    education,
    skills,
    certifications,
    projects,
    languages,
    hobbies,
    awards,
    references
  } = useResumeStore();
  
  // Helper function to filter out empty sections
  const hasContent = (arr: any[]) => arr && arr.length > 0;
  
  // Get hard and soft skills
  const hardSkills = skills.filter(skill => skill.type === 'hard');
  const softSkills = skills.filter(skill => skill.type === 'soft');
  
  // Format links as URLs
  const formatLink = (link: string) => {
    if (!link) return '';
    if (link.startsWith('http://') || link.startsWith('https://')) return link;
    return `https://${link}`;
  };
  
  // Get link text without https://
  const getLinkText = (link: string) => {
    if (!link) return '';
    return link.replace(/https?:\/\//i, '');
  };

  return (
    <div className="font-[arial,helvetica,sans-serif] text-black p-6 antialiased text-sm">
      {/* Header - Name and Contact Info */}
      <header className="mb-1">
        <h1 className="text-2xl font-bold text-center mb-1">{name}</h1>
        
        <div className="text-center text-sm">
          <span>{location}</span> | 
          <span> {phone}</span> | 
          <a href={`mailto:${email}`} className="text-blue-600 hover:underline"> Email</a> | 
          <a href="#" className="text-blue-600 hover:underline"> Portfolio</a> | 
          <a href={formatLink(linkedin)} className="text-blue-600 hover:underline"> LinkedIn</a> | 
          <a href={formatLink(github)} className="text-blue-600 hover:underline"> Github</a>
        </div>
      </header>

      <hr className="border-t border-black mb-2" />

      {/* Experience Section */}
      <section className="mb-2">
        <h2 className="font-bold uppercase text-sm mb-1">Experience</h2>
        
        {workExperiences.map((exp, index) => (
          <div key={exp.id} className={index !== workExperiences.length - 1 ? "mb-2" : ""}>
            <div className="mb-1">
              <a href="#" className="font-bold text-blue-600 hover:underline">{exp.company.split('(')[0].trim()}</a>
              {exp.company.includes('(') && (
                <span> ({exp.company.split('(')[1].replace(')', '')})</span>
              )}
            </div>
            
            <div className="flex justify-between">
              <span className="font-bold">{exp.role}</span>
              <span className="text-right">{exp.description}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
            </div>
            
            <ul className="list-disc pl-5 mb-1">
              {exp.responsibilities.map((resp, i) => (
                <li key={i} className={i !== exp.responsibilities.length - 1 ? "mb-1" : ""}>
                  {resp}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      
      <hr className="border-t border-black mb-2" />

      {/* Skills Section */}
      <section className="mb-2">
        <h2 className="font-bold uppercase text-sm mb-1">Skills</h2>
        
        <ul className="list-disc pl-5">
          <li className="mb-1">
            <span className="font-bold">Frontend Development:</span> HTML, CSS, JavaScript, React.js, Next.js, TypeScript, Tailwind CSS, Redux, React Query, Bootstrap, Responsive Web Design, Performance Optimization.
          </li>
          <li className="mb-1">
            <span className="font-bold">Programming Languages:</span> JavaScript, Core Java, Python, C/C++.
          </li>
          <li>
            <span className="font-bold">Version Control:</span> Git, GitHub.
          </li>
        </ul>
      </section>
      
      <hr className="border-t border-black mb-2" />

      {/* Projects Section */}
      <section className="mb-2">
        <h2 className="font-bold uppercase text-sm mb-1">Projects</h2>
        
        {projects.map((project, index) => (
          <div key={project.id} className={index !== projects.length - 1 ? "mb-1" : ""}>
            <div>
              <span className="mr-1">{index + 1}. <span className="font-bold">{project.name}</span></span>
              {project.link && (
                <a href={formatLink(project.link)} className="text-blue-600 hover:underline float-right">Github Live</a>
              )}
            </div>
            <ul className="list-disc pl-5 mb-1">
              <li className="mb-1">{project.description}</li>
              <li><span className="font-bold">Tech Stack:</span> {project.technologies.join(', ')}</li>
            </ul>
          </div>
        ))}
      </section>
      
      <hr className="border-t border-black mb-2" />

      {/* Certifications & Achievements */}
      <section className="mb-2">
        <h2 className="font-bold uppercase text-sm mb-1">Certification & Achievements</h2>
        
        <ul className="list-disc pl-5">
          {certifications.map((cert, index) => (
            <li key={cert.id} className={index !== certifications.length - 1 ? "mb-0.5" : ""}>
              <a href="#" className="text-blue-600 hover:underline">{cert.name}</a>
            </li>
          ))}
        </ul>
      </section>
      
      <hr className="border-t border-black mb-2" />

      {/* Education */}
      <section>
        <h2 className="font-bold uppercase text-sm mb-1">Education</h2>
        
        {education.map((edu) => (
          <div key={edu.id} className="flex justify-between">
            <div>
              <span>{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</span>
              <span className="ml-4 font-bold">{edu.degree}</span>
            </div>
            <div>
              <span>{edu.institution}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ResumePreview;
