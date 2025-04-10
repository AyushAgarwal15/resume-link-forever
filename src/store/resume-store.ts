import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WorkExperience = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
};

export type Education = {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
};

export type Skill = {
  id: string;
  name: string;
  level: number;
  type: 'hard' | 'soft';
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiry?: string;
  link?: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  link?: string;
  technologies: string[];
};

export type Language = {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'fluent' | 'native';
};

export type Reference = {
  id: string;
  name: string;
  company: string;
  position: string;
  email: string;
  phone?: string;
};

export interface ResumeState {
  // Personal Information
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  
  // Professional Summary
  summary: string;
  
  // Sections
  workExperiences: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  projects: Project[];
  languages: Language[];
  hobbies: string[];
  awards: string[];
  references: Reference[];
  
  // Actions
  updatePersonalInfo: (info: Partial<ResumeState>) => void;
  addWorkExperience: (experience: Omit<WorkExperience, 'id'>) => void;
  updateWorkExperience: (id: string, experience: Partial<WorkExperience>) => void;
  removeWorkExperience: (id: string) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  addCertification: (certification: Omit<Certification, 'id'>) => void;
  updateCertification: (id: string, certification: Partial<Certification>) => void;
  removeCertification: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addLanguage: (language: Omit<Language, 'id'>) => void;
  updateLanguage: (id: string, language: Partial<Language>) => void;
  removeLanguage: (id: string) => void;
  updateHobbies: (hobbies: string[]) => void;
  updateAwards: (awards: string[]) => void;
  addReference: (reference: Omit<Reference, 'id'>) => void;
  updateReference: (id: string, reference: Partial<Reference>) => void;
  removeReference: (id: string) => void;
  resetStore: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const initialState: ResumeState = {
  // Personal Information
  name: 'Ayush Agarwal',
  title: 'Associate Software Engineer',
  location: 'Bijnor, UP, India (Relocation Possible)',
  email: 'example@gmail.com',
  phone: '(+91) 8126749140',
  linkedin: 'linkedin.com/in/example',
  github: 'github.com/example',
  
  // Professional Summary
  summary: 'Experienced frontend developer with expertise in React.js, Next.js, and TypeScript. Passionate about creating high-performance, user-friendly web applications.',
  
  // Sections
  workExperiences: [
    {
      id: generateId(),
      company: 'Mile9 (A Product Based Tech Startup)',
      role: 'Associate Software Engineer',
      startDate: 'March 2024',
      endDate: '',
      current: true,
      description: 'Remote, India',
      responsibilities: [
        'Portfolio Development: Built a high-performance, responsive company portfolio site with Next.js, boosting user engagement by 30-40% through optimized performance and enhanced interactivity.',
        'Code Optimization: Refactored React components and optimized state management, reducing the codebase by 40% and improving load time by 35%.',
        'Feature Enhancement: Spearheaded the implementation of new features, enhancing application functionality and user experience, resulting in a 25-30% increase in user satisfaction and retention.',
        'Bug Fixing & Testing: Conducted thorough end-to-end testing from a developer\'s perspective, identifying and resolving bugs to maintain a 100% bug-free system.',
        'Tech Stack: HTML, CSS, JavaScript, React.js, Next.js, Redux, TypeScript, Tailwind CSS, Git, Github, React Query, React Table etc.'
      ]
    },
    {
      id: generateId(),
      company: 'Mile9 (A Product Based Tech Startup)',
      role: 'Frontend Developer Intern',
      startDate: 'October 2023',
      endDate: 'February 2024',
      current: false,
      description: 'Remote, India',
      responsibilities: [
        'Developed Core Features: Implemented a comprehensive billing form system, report review comments, and patient data filtering modal, improving system functionality by 40-50% and streamlining user workflows.',
        'Bug Resolution & Testing: Ensured a seamless user experience by conducting rigorous debugging and QA testing, reducing bugs by 40% and enhancing overall application stability.',
        'Tech Stack: Leveraged a tech stack including React.js, Next.js, TypeScript, and Tailwind CSS to work on company projects, reducing development time by 60%.'
      ]
    }
  ],
  education: [
    {
      id: generateId(),
      degree: 'Bachelor of Technology (B.Tech) in Computer Science & Engineering (CGPA: 8.14/10)',
      institution: 'MIIT, Meerut',
      startDate: '2019',
      endDate: '2023',
      current: false,
      description: ''
    }
  ],
  skills: [
    {
      id: generateId(),
      name: 'HTML',
      level: 5,
      type: 'hard' as const
    },
    {
      id: generateId(),
      name: 'CSS',
      level: 5,
      type: 'hard' as const
    },
    {
      id: generateId(),
      name: 'JavaScript',
      level: 5,
      type: 'hard' as const
    },
    {
      id: generateId(),
      name: 'React.js',
      level: 5,
      type: 'hard' as const
    },
    {
      id: generateId(),
      name: 'Next.js',
      level: 4,
      type: 'hard' as const
    },
    {
      id: generateId(),
      name: 'TypeScript',
      level: 4,
      type: 'hard' as const
    },
    {
      id: generateId(),
      name: 'Tailwind CSS',
      level: 4,
      type: 'hard' as const
    },
    {
      id: generateId(),
      name: 'Redux',
      level: 4,
      type: 'hard' as const
    },
    {
      id: generateId(),
      name: 'Git',
      level: 4,
      type: 'hard' as const
    },
    {
      id: generateId(),
      name: 'Problem Solving',
      level: 4,
      type: 'soft' as const
    },
    {
      id: generateId(),
      name: 'Communication',
      level: 4,
      type: 'soft' as const
    },
    {
      id: generateId(),
      name: 'Teamwork',
      level: 4,
      type: 'soft' as const
    }
  ],
  certifications: [
    {
      id: generateId(),
      name: 'The Frontend Developer Career Path',
      issuer: 'Scrimba',
      date: '2023',
    },
    {
      id: generateId(),
      name: 'Responsive Web Design',
      issuer: 'freeCodeCamp',
      date: '2022',
    },
    {
      id: generateId(),
      name: 'Version Control',
      issuer: 'Coursera',
      date: '2022',
    },
    {
      id: generateId(),
      name: 'Programming with JavaScript',
      issuer: 'Coursera',
      date: '2021',
    }
  ],
  projects: [
    {
      id: generateId(),
      name: 'Social Bond',
      description: 'Developed a feature-rich social platform with secure authentication, post management, and user profiles, attracting 20+ users who praised the intuitive UI.',
      link: 'github.com/example/social-bond',
      technologies: ['React.js', 'Tailwind CSS', 'React Query', 'TypeScript', 'Appwrite']
    },
    {
      id: generateId(),
      name: 'Hirix',
      description: 'Created a job portal that enables job listings, search & filtering, applications, and applicant tracking, attracting more than 20 active users who engaged with job listings and submitted applications.',
      link: 'github.com/example/hirix',
      technologies: ['React.js', 'Tailwind CSS', 'Supabase', 'Clerk', 'React Hook Form']
    },
    {
      id: generateId(),
      name: 'Sumit',
      description: 'Implemented an AI-powered tool using OpenAI GPT-4 to convert long articles into concise summaries, with over 100 users trying the tool and benefiting from reduced article length by 70%, on average.',
      link: 'github.com/example/sumit',
      technologies: ['React.js', 'Redux', 'Tailwind CSS', 'Local Storage', 'OpenAI API']
    }
  ],
  languages: [
    {
      id: generateId(),
      name: 'English',
      level: 'fluent'
    },
    {
      id: generateId(),
      name: 'Hindi',
      level: 'native'
    }
  ],
  hobbies: ['Coding', 'Reading', 'Gaming', 'Hiking'],
  awards: [],
  references: []
};

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      ...initialState,
      
      updatePersonalInfo: (info) => set((state) => ({ ...state, ...info })),
      
      addWorkExperience: (experience) => set((state) => ({
        workExperiences: [...state.workExperiences, { ...experience, id: generateId() }]
      })),
      
      updateWorkExperience: (id, experience) => set((state) => ({
        workExperiences: state.workExperiences.map((exp) => 
          exp.id === id ? { ...exp, ...experience } : exp
        )
      })),
      
      removeWorkExperience: (id) => set((state) => ({
        workExperiences: state.workExperiences.filter((exp) => exp.id !== id)
      })),
      
      addEducation: (education) => set((state) => ({
        education: [...state.education, { ...education, id: generateId() }]
      })),
      
      updateEducation: (id, education) => set((state) => ({
        education: state.education.map((edu) => 
          edu.id === id ? { ...edu, ...education } : edu
        )
      })),
      
      removeEducation: (id) => set((state) => ({
        education: state.education.filter((edu) => edu.id !== id)
      })),
      
      addSkill: (skill) => set((state) => ({
        skills: [...state.skills, { ...skill, id: generateId() }]
      })),
      
      updateSkill: (id, skill) => set((state) => ({
        skills: state.skills.map((s) => 
          s.id === id ? { ...s, ...skill } : s
        )
      })),
      
      removeSkill: (id) => set((state) => ({
        skills: state.skills.filter((s) => s.id !== id)
      })),
      
      addCertification: (certification) => set((state) => ({
        certifications: [...state.certifications, { ...certification, id: generateId() }]
      })),
      
      updateCertification: (id, certification) => set((state) => ({
        certifications: state.certifications.map((cert) => 
          cert.id === id ? { ...cert, ...certification } : cert
        )
      })),
      
      removeCertification: (id) => set((state) => ({
        certifications: state.certifications.filter((cert) => cert.id !== id)
      })),
      
      addProject: (project) => set((state) => ({
        projects: [...state.projects, { ...project, id: generateId() }]
      })),
      
      updateProject: (id, project) => set((state) => ({
        projects: state.projects.map((proj) => 
          proj.id === id ? { ...proj, ...project } : proj
        )
      })),
      
      removeProject: (id) => set((state) => ({
        projects: state.projects.filter((proj) => proj.id !== id)
      })),
      
      addLanguage: (language) => set((state) => ({
        languages: [...state.languages, { ...language, id: generateId() }]
      })),
      
      updateLanguage: (id, language) => set((state) => ({
        languages: state.languages.map((lang) => 
          lang.id === id ? { ...lang, ...language } : lang
        )
      })),
      
      removeLanguage: (id) => set((state) => ({
        languages: state.languages.filter((lang) => lang.id !== id)
      })),
      
      updateHobbies: (hobbies) => set({ hobbies }),
      
      updateAwards: (awards) => set({ awards }),
      
      addReference: (reference) => set((state) => ({
        references: [...state.references, { ...reference, id: generateId() }]
      })),
      
      updateReference: (id, reference) => set((state) => ({
        references: state.references.map((ref) => 
          ref.id === id ? { ...ref, ...reference } : ref
        )
      })),
      
      removeReference: (id) => set((state) => ({
        references: state.references.filter((ref) => ref.id !== id)
      })),
      
      resetStore: () => set(initialState)
    }),
    {
      name: 'resume-storage',
    }
  )
);
