import { useResumeSelector } from "@/store/hooks";
import { Language, Skill } from "@/store/resume-store";

const ResumePreview = ({ editable = false }) => {
  const {
    name,
    title,
    location,
    email,
    phone,
    linkedin,
    github,
    summary,
    workExperiences,
    education,
    skills,
    certifications,
    projects,
    languages,
    hobbies,
    awards,
    references,
    profileImage,
  } = useResumeSelector((state) => state);

  // Helper function to filter out empty sections
  const hasContent = <T,>(arr: T[]): boolean => arr && arr.length > 0;

  // Format links as URLs
  const formatLink = (link: string) => {
    if (!link) return "";
    if (link.startsWith("http://") || link.startsWith("https://")) return link;
    return `https://${link}`;
  };

  // Get link text without https://
  const getLinkText = (link: string) => {
    if (!link) return "";
    return link.replace(/https?:\/\//i, "");
  };

  return (
    <div className="font-[arial,helvetica,sans-serif] text-black antialiased">
      <div className="grid grid-cols-4 gap-10 p-14">
        {/* Main Content - Left Side (3 columns) */}
        <div className="col-span-3">
          <div className="text-left">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              {name}
            </h1>
            <p className="text-xl text-gray-600">{title}</p>

            {/* Contact details in horizontal layout */}
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
              {email && (
                <a href={`mailto:${email}`} className="hover:text-gray-900">
                  {email}
                </a>
              )}
              {phone && <span>{phone}</span>}
              {location && <span>{location}</span>}
              {linkedin && (
                <a href={formatLink(linkedin)} className="hover:text-gray-900">
                  {getLinkText(linkedin)}
                </a>
              )}
              {github && (
                <a href={formatLink(github)} className="hover:text-gray-900">
                  {getLinkText(github)}
                </a>
              )}
            </div>
          </div>

          {/* Profile/Summary Section */}
          {summary && (
            <div className="my-10">
              <h2 className="mb-2 text-2xl font-semibold text-gray-900">
                Profile
              </h2>
              <p className="text-gray-700">{summary}</p>
            </div>
          )}

          {/* Experience Section */}
          {hasContent(workExperiences) && (
            <div className="my-10">
              <h2 className="text-2xl font-semibold text-gray-900">
                Experience
              </h2>
              <div className="mt-6">
                {workExperiences.map((experience) => (
                  <div key={experience.id} className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {experience.role} @ {experience.company}
                    </h3>
                    <p className="text-gray-600">
                      {experience.startDate} -{" "}
                      {experience.current ? "Present" : experience.endDate}
                    </p>
                    <div className="mt-2 text-gray-700">
                      <p>{experience.description}</p>
                      {experience.responsibilities &&
                        experience.responsibilities.length > 0 && (
                          <ul className="list-disc ml-5 mt-2">
                            {experience.responsibilities.map((resp, i) => (
                              <li key={i} className="mt-1">
                                {resp}
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {hasContent(projects) && (
            <div className="my-10">
              <h2 className="text-2xl font-semibold text-gray-900">Projects</h2>
              <div className="mt-6">
                {projects.map((project) => (
                  <div key={project.id} className="mb-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {project.name}
                      </h3>
                      {project.link && (
                        <a
                          href={formatLink(project.link)}
                          className="text-blue-600 hover:underline text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Project
                        </a>
                      )}
                    </div>
                    <p className="mt-2 text-gray-700">{project.description}</p>
                    {project.technologies &&
                      project.technologies.length > 0 && (
                        <div className="mt-2">
                          <span className="text-sm text-gray-600">
                            Technologies:{" "}
                          </span>
                          <span className="text-sm text-gray-700">
                            {project.technologies.join(", ")}
                          </span>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {hasContent(education) && (
            <div className="my-10">
              <h2 className="text-2xl font-semibold text-gray-900">
                Education
              </h2>
              <div className="mt-6">
                {education.map((edu) => (
                  <div key={edu.id} className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {edu.degree}, {edu.institution}
                    </h3>
                    <p className="text-gray-600">
                      {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                    </p>
                    {edu.description && (
                      <p className="mt-2 text-gray-700">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications Section */}
          {hasContent(certifications) && (
            <div className="my-10">
              <h2 className="text-2xl font-semibold text-gray-900">
                Certifications
              </h2>
              <div className="mt-6">
                {certifications.map((cert) => (
                  <div key={cert.id} className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {cert.name}
                    </h3>
                    {cert.issuer && (
                      <p className="text-gray-600">{cert.issuer}</p>
                    )}
                    {cert.date && (
                      <p className="text-gray-600 text-sm">{cert.date}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Right Side (1 column) */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          {/* Skills Section */}
          {hasContent(skills) && (
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Skills</h2>
              <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li
                    key={skill.id}
                    className="px-3 py-1 text-sm text-gray-800 bg-gray-100 rounded-full"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages Section */}
          {hasContent(languages) && (
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Languages
              </h2>
              <ul className="space-y-2">
                {languages.map((language) => (
                  <li key={language.id} className="text-gray-700">
                    <span className="font-medium">{language.name}</span>
                    <span className="text-sm text-gray-600">
                      {" "}
                      - {language.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Hobbies/Interests Section */}
          {hasContent(hobbies) && (
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Interests
              </h2>
              <ul className="flex flex-wrap gap-2">
                {hobbies.map((hobby, index) => (
                  <li
                    key={index}
                    className="px-3 py-1 text-sm text-gray-800 bg-gray-100 rounded-full"
                  >
                    {hobby}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Awards Section */}
          {hasContent(awards) && (
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Awards</h2>
              <ul className="space-y-2">
                {awards.map((award, index) => (
                  <li key={index} className="text-gray-700">
                    <div className="font-medium">{award}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
