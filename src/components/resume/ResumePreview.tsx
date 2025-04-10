
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
      {/* Header */}
      <header className="mb-4 text-center">
        <h1 className="text-2xl font-bold mb-1">{name || "Your Name"}</h1>
        
        <div className="flex flex-wrap justify-center gap-x-2 text-sm">
          {location && <span>{location}</span>}
          {(location && phone) && <span>|</span>}
          {phone && <span>{phone}</span>}
          {((location || phone) && email) && <span>|</span>}
          {email && <span><a href={`mailto:${email}`} className="text-blue-600 hover:underline">{email}</a></span>}
          {((location || phone || email) && github) && <span>|</span>}
          {github && <span><a href={formatLink(github)} target="_blank" className="text-blue-600 hover:underline">{getLinkText(github)}</a></span>}
          {((location || phone || email || github) && linkedin) && <span>|</span>}
          {linkedin && <span><a href={formatLink(linkedin)} target="_blank" className="text-blue-600 hover:underline">{getLinkText(linkedin)}</a></span>}
        </div>
      </header>

      <hr className="border-t border-gray-800 mb-3" />

      {/* Summary - Optional in this template */}
      {summary && (
        <>
          <section className="mb-3">
            <h2 className="font-bold uppercase text-base mb-1">Professional Summary</h2>
            <p className="text-sm">{summary}</p>
          </section>
          <hr className="border-t border-gray-800 mb-3" />
        </>
      )}

      {/* Experience */}
      {hasContent(workExperiences) && (
        <section className="mb-3">
          <h2 className="font-bold uppercase text-base mb-1">Experience</h2>
          
          <div className="space-y-4">
            {workExperiences.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <span className="font-bold">{exp.company}</span>
                    {exp.role && <span> - {exp.role}</span>}
                  </div>
                  <div className="text-right">
                    {exp.location && <div>{exp.location}</div>}
                    <div>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</div>
                  </div>
                </div>
                
                {exp.description && <p className="mb-1">{exp.description}</p>}
                
                {hasContent(exp.responsibilities) && (
                  <ul className="list-disc pl-5 space-y-1">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <hr className="border-t border-gray-800 mb-3" />
        </section>
      )}

      {/* Skills */}
      {hasContent(skills) && (
        <section className="mb-3">
          <h2 className="font-bold uppercase text-base mb-1">Skills</h2>
          
          {hasContent(hardSkills) && (
            <div className="mb-2">
              <p className="mb-1">
                <span className="font-bold">Technical Skills: </span>
                {hardSkills.map((skill, idx) => (
                  <span key={skill.id}>
                    {skill.name}{idx < hardSkills.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            </div>
          )}
          
          {hasContent(softSkills) && (
            <div>
              <p className="mb-1">
                <span className="font-bold">Soft Skills: </span>
                {softSkills.map((skill, idx) => (
                  <span key={skill.id}>
                    {skill.name}{idx < softSkills.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            </div>
          )}
          <hr className="border-t border-gray-800 mb-3" />
        </section>
      )}

      {/* Projects */}
      {hasContent(projects) && (
        <section className="mb-3">
          <h2 className="font-bold uppercase text-base mb-1">Projects</h2>
          
          <div className="space-y-2">
            {projects.map((project, idx) => (
              <div key={project.id} className="mb-2">
                <div className="flex justify-between">
                  <span className="font-bold">
                    {idx + 1}. {project.name}{' '}
                    {project.link && (
                      <a href={formatLink(project.link)} target="_blank" className="text-blue-600 hover:underline ml-1">
                        Github Live
                      </a>
                    )}
                  </span>
                </div>
                <p className="mb-1">{project.description}</p>
                
                {hasContent(project.technologies) && (
                  <p>
                    <span className="font-bold">Tech Stack: </span>
                    {project.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
          <hr className="border-t border-gray-800 mb-3" />
        </section>
      )}

      {/* Certifications & Achievements */}
      {hasContent(certifications) || hasContent(awards) ? (
        <section className="mb-3">
          <h2 className="font-bold uppercase text-base mb-1">Certification & Achievements</h2>
          
          {hasContent(certifications) && (
            <ul className="list-disc pl-5 mb-2">
              {certifications.map((cert) => (
                <li key={cert.id}>
                  <span className="font-bold">{cert.name}</span>
                  {cert.issuer && <span> - {cert.issuer}</span>}
                  {cert.date && <span> ({cert.date})</span>}
                </li>
              ))}
            </ul>
          )}
          
          {hasContent(awards) && (
            <ul className="list-disc pl-5">
              {awards.map((award, idx) => (
                <li key={idx}>{award}</li>
              ))}
            </ul>
          )}
          <hr className="border-t border-gray-800 mb-3" />
        </section>
      ) : null}

      {/* Education */}
      {hasContent(education) && (
        <section className="mb-3">
          <h2 className="font-bold uppercase text-base mb-1">Education</h2>
          
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <span className="font-bold">{edu.degree}</span>
                  {edu.institution && <span> in {edu.institution}</span>}
                </div>
                <div>
                  <span>{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Optional sections - Languages, Hobbies, References */}
      {hasContent(languages) && (
        <section className="mt-3">
          <h2 className="font-bold uppercase text-base mb-1">Languages</h2>
          <p>
            {languages.map((lang, idx) => (
              <span key={lang.id}>
                {lang.name} ({lang.level.charAt(0).toUpperCase() + lang.level.slice(1)})
                {idx < languages.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </section>
      )}

      {hasContent(hobbies) && (
        <section className="mt-3">
          <h2 className="font-bold uppercase text-base mb-1">Interests</h2>
          <p>{hobbies.join(', ')}</p>
        </section>
      )}

      {hasContent(references) && (
        <section className="mt-3">
          <h2 className="font-bold uppercase text-base mb-1">References</h2>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {references.map((ref) => (
              <div key={ref.id}>
                <p className="font-bold">{ref.name}</p>
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
