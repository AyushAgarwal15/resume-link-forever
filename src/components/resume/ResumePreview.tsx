
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
        <h1 className="text-2xl font-bold text-center mb-1">Ayush Agarwal</h1>
        
        <div className="text-center text-sm">
          <span>Bijnor, UP, India (Relocation Possible)</span> | 
          <span> (+91) 8126749140</span> | 
          <a href="mailto:example@gmail.com" className="text-blue-600 hover:underline"> Email</a> | 
          <a href="#" className="text-blue-600 hover:underline"> Portfolio</a> | 
          <a href="https://linkedin.com/in/example" className="text-blue-600 hover:underline"> LinkedIn</a> | 
          <a href="https://github.com/example" className="text-blue-600 hover:underline"> Github</a>
        </div>
      </header>

      <hr className="border-t border-black mb-2" />

      {/* Experience Section */}
      <section className="mb-2">
        <h2 className="font-bold uppercase text-sm mb-1">Experience</h2>
        
        <div className="mb-1">
          <a href="#" className="font-bold text-blue-600 hover:underline">Mile9</a> 
          <span> (A Product Based Tech Startup)</span>
        </div>
        
        {/* First Job */}
        <div className="mb-2">
          <div className="flex justify-between">
            <span className="font-bold">Associate Software Engineer</span>
            <span className="text-right">Remote, India</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>March 2024 - Present</span>
          </div>
          
          <ul className="list-disc pl-5 mb-1">
            <li className="mb-1">
              <span className="font-bold">Portfolio Development:</span> Built a high-performance, responsive company portfolio site with Next.js, boosting user engagement by 30-40% through optimized performance and enhanced interactivity.
            </li>
            <li className="mb-1">
              <span className="font-bold">Code Optimization:</span> Refactored React components and optimized state management, reducing the codebase by 40% and improving load time by 35%.
            </li>
            <li className="mb-1">
              <span className="font-bold">Feature Enhancement:</span> Spearheaded the implementation of new features, enhancing application functionality and user experience, resulting in a 25-30% increase in user satisfaction and retention.
            </li>
            <li className="mb-1">
              <span className="font-bold">Bug Fixing & Testing:</span> Conducted thorough end-to-end testing from a developer's perspective, identifying and resolving bugs to maintain a 100% bug-free system.
            </li>
            <li>
              <span className="font-bold">Tech Stack:</span> HTML, CSS, JavaScript, React.js, Next.js, Redux, TypeScript, Tailwind CSS, Git, Github, React Query, React Table etc.
            </li>
          </ul>
        </div>
        
        {/* Second Job */}
        <div>
          <div className="flex justify-between">
            <span className="font-bold">Frontend Developer Intern</span>
            <span className="text-right">Remote, India</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>October 2023 - February 2024</span>
          </div>
          
          <ul className="list-disc pl-5 mb-1">
            <li className="mb-1">
              <span className="font-bold">Developed Core Features:</span> Implemented a comprehensive billing form system, report review comments, and patient data filtering modal, improving system functionality by 40-50% and streamlining user workflows.
            </li>
            <li className="mb-1">
              <span className="font-bold">Bug Resolution & Testing:</span> Ensured a seamless user experience by conducting rigorous debugging and QA testing, reducing bugs by 40% and enhancing overall application stability.
            </li>
            <li>
              <span className="font-bold">Tech Stack:</span> Leveraged a tech stack including React.js, Next.js, TypeScript, and Tailwind CSS to work on company projects, reducing development time by 60%.
            </li>
          </ul>
        </div>
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
        
        <div className="mb-1">
          <div>
            <span className="mr-1">1. <span className="font-bold">Social Bond</span> - A Social Media App</span>
            <a href="#" className="text-blue-600 hover:underline float-right">Github Live</a>
          </div>
          <ul className="list-disc pl-5 mb-1">
            <li className="mb-1">Developed a feature-rich social platform with secure authentication, post management, and user profiles, attracting 20+ users who praised the intuitive UI.</li>
            <li><span className="font-bold">Tech Stack:</span> React.js, Tailwind CSS, React Query, TypeScript, Appwrite.</li>
          </ul>
        </div>
        
        <div className="mb-1">
          <div>
            <span className="mr-1">2. <span className="font-bold">Hirix</span> - A Job Portal</span>
            <a href="#" className="text-blue-600 hover:underline float-right">Github Live</a>
          </div>
          <ul className="list-disc pl-5 mb-1">
            <li className="mb-1">Created a job portal that enables job listings, search & filtering, applications, and applicant tracking, attracting more than 20 active users who engaged with job listings and submitted applications.</li>
            <li><span className="font-bold">Tech Stack:</span> React.js, Tailwind CSS, Supabase (Backend), Clerk (Auth), React Hook Form.</li>
          </ul>
        </div>
        
        <div>
          <div>
            <span className="mr-1">3. <span className="font-bold">Sumit</span> - AI-Powered Article Summarizer</span>
            <a href="#" className="text-blue-600 hover:underline float-right">Github Live</a>
          </div>
          <ul className="list-disc pl-5 mb-1">
            <li className="mb-1">Implemented an AI-powered tool using OpenAI GPT-4 to convert long articles into concise summaries, with over 100 users trying the tool and benefiting from reduced article length by 70%, on average.</li>
            <li><span className="font-bold">Tech Stack:</span> React.js, Redux, Tailwind CSS, Local Storage, OpenAI API.</li>
          </ul>
        </div>
      </section>
      
      <hr className="border-t border-black mb-2" />

      {/* Certifications & Achievements */}
      <section className="mb-2">
        <h2 className="font-bold uppercase text-sm mb-1">Certification & Achievements</h2>
        
        <ul className="list-disc pl-5">
          <li className="mb-0.5"><a href="#" className="text-blue-600 hover:underline">The Frontend Developer Career Path</a></li>
          <li className="mb-0.5"><a href="#" className="text-blue-600 hover:underline">Responsive Web Design</a></li>
          <li className="mb-0.5"><a href="#" className="text-blue-600 hover:underline">Version Control</a></li>
          <li><a href="#" className="text-blue-600 hover:underline">Programming with JavaScript</a></li>
        </ul>
      </section>
      
      <hr className="border-t border-black mb-2" />

      {/* Education */}
      <section>
        <h2 className="font-bold uppercase text-sm mb-1">Education</h2>
        
        <div className="flex justify-between">
          <div>
            <span>2019 - 2023</span>
            <span className="ml-4 font-bold">Bachelor of Technology (B.Tech) in Computer Science & Engineering (CGPA: 8.14/10)</span>
          </div>
          <div>
            <span>MIIT, Meerut</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResumePreview;
