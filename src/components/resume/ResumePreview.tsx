
import { useResumeStore } from "@/store/resume-store";

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
  
  const hardSkills = skills.filter(skill => skill.type === 'hard');
  const softSkills = skills.filter(skill => skill.type === 'soft');
  
  return (
    <div className="font-[arial,helvetica,sans-serif] text-black p-8 antialiased">
      {/* Header */}
      <header className="pb-4 border-b border-gray-300">
        <h1 className="text-3xl font-bold text-center mb-1 text-gray-900">{name || "Your Name"}</h1>
        {title && <h2 className="text-xl text-center mb-2 text-gray-700">{title}</h2>}
        
        <div className="flex flex-wrap justify-center gap-x-6 text-sm text-gray-600">
          {location && <span>{location}</span>}
          {email && <span>{email}</span>}
          {phone && <span>{phone}</span>}
          {linkedin && <span>{linkedin}</span>}
          {github && <span>{github}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="py-3">
          <h2 className="text-lg font-bold mb-2 text-gray-900">Professional Summary</h2>
          <p className="text-gray-700">{summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {hasContent(workExperiences) && (
        <section className="py-3">
          <h2 className="text-lg font-bold mb-2 text-gray-900">Work Experience</h2>
          
          <div className="space-y-4">
            {workExperiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-800">{exp.role}</h3>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <h4 className="font-medium text-gray-700 mb-1">{exp.company}</h4>
                
                {exp.description && <p className="text-gray-700 mb-1">{exp.description}</p>}
                
                {hasContent(exp.responsibilities) && (
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {hasContent(education) && (
        <section className="py-3">
          <h2 className="text-lg font-bold mb-2 text-gray-900">Education</h2>
          
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                  <span className="text-sm text-gray-600">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
                <h4 className="font-medium text-gray-700 mb-1">{edu.institution}</h4>
                
                {edu.description && <p className="text-gray-700">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {hasContent(skills) && (
        <section className="py-3">
          <h2 className="text-lg font-bold mb-2 text-gray-900">Skills</h2>
          
          {hasContent(hardSkills) && (
            <div className="mb-2">
              <h3 className="font-bold text-gray-800 mb-1">Technical Skills</h3>
              <p className="text-gray-700">
                {hardSkills.map(skill => skill.name).join(', ')}
              </p>
            </div>
          )}
          
          {hasContent(softSkills) && (
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Soft Skills</h3>
              <p className="text-gray-700">
                {softSkills.map(skill => skill.name).join(', ')}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Projects (Optional) */}
      {hasContent(projects) && (
        <section className="py-3">
          <h2 className="text-lg font-bold mb-2 text-gray-900">Projects</h2>
          
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold text-gray-800 mb-1">{project.name}</h3>
                <p className="text-gray-700 mb-1">{project.description}</p>
                
                {hasContent(project.technologies) && (
                  <p className="text-gray-700">
                    <span className="font-medium">Technologies: </span>
                    {project.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications (Optional) */}
      {hasContent(certifications) && (
        <section className="py-3">
          <h2 className="text-lg font-bold mb-2 text-gray-900">Certifications</h2>
          
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-800">{cert.name}</h3>
                  <span className="text-sm text-gray-600">{cert.date}</span>
                </div>
                <p className="text-gray-700">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages (Optional) */}
      {hasContent(languages) && (
        <section className="py-3">
          <h2 className="text-lg font-bold mb-2 text-gray-900">Languages</h2>
          
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {languages.map((lang) => (
              <span key={lang.id} className="text-gray-700">
                {lang.name} ({lang.level.charAt(0).toUpperCase() + lang.level.slice(1)})
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Awards (Optional) */}
      {hasContent(awards) && (
        <section className="py-3">
          <h2 className="text-lg font-bold mb-2 text-gray-900">Awards & Recognition</h2>
          
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {awards.map((award, idx) => (
              <li key={idx}>{award}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Interests (Optional) */}
      {hasContent(hobbies) && (
        <section className="py-3">
          <h2 className="text-lg font-bold mb-2 text-gray-900">Interests</h2>
          <p className="text-gray-700">{hobbies.join(', ')}</p>
        </section>
      )}

      {/* References (Optional) */}
      {hasContent(references) && (
        <section className="py-3">
          <h2 className="text-lg font-bold mb-2 text-gray-900">References</h2>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {references.map((ref) => (
              <div key={ref.id} className="text-gray-700">
                <h3 className="font-bold">{ref.name}</h3>
                <p>{ref.position} at {ref.company}</p>
                <p>Email: {ref.email}</p>
                {ref.phone && <p>Phone: {ref.phone}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;
