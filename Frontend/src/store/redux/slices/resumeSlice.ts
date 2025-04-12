
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateId } from '../utils';
import { 
  WorkExperience, 
  Education, 
  Skill, 
  Certification, 
  Project, 
  Language, 
  Reference, 
  CustomSection 
} from '../../types';

// Initial state with sample data
const initialState = {
  // Personal Information
  name: 'Ayush Agarwal',
  title: 'Associate Software Engineer',
  location: 'Bijnor, UP, India (Relocation Possible)',
  email: 'example@gmail.com',
  phone: '(+91) 8126749140',
  linkedin: 'linkedin.com/in/example',
  github: 'github.com/example',
  profileImage: undefined as string | undefined,
  
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
  ] as WorkExperience[],
  
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
  ] as Education[],
  
  skills: [
    {
      id: generateId(),
      name: 'HTML',
      level: 5,
      type: 'hard'
    },
    {
      id: generateId(),
      name: 'CSS',
      level: 5,
      type: 'hard'
    },
    {
      id: generateId(),
      name: 'JavaScript',
      level: 5,
      type: 'hard'
    },
    {
      id: generateId(),
      name: 'React.js',
      level: 5,
      type: 'hard'
    },
    {
      id: generateId(),
      name: 'Next.js',
      level: 4,
      type: 'hard'
    },
    {
      id: generateId(),
      name: 'TypeScript',
      level: 4,
      type: 'hard'
    },
    {
      id: generateId(),
      name: 'Tailwind CSS',
      level: 4,
      type: 'hard'
    },
    {
      id: generateId(),
      name: 'Redux',
      level: 4,
      type: 'hard'
    },
    {
      id: generateId(),
      name: 'Git',
      level: 4,
      type: 'hard'
    },
    {
      id: generateId(),
      name: 'Problem Solving',
      level: 4,
      type: 'soft'
    },
    {
      id: generateId(),
      name: 'Communication',
      level: 4,
      type: 'soft'
    },
    {
      id: generateId(),
      name: 'Teamwork',
      level: 4,
      type: 'soft'
    }
  ] as Skill[],
  
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
  ] as Certification[],
  
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
  ] as Project[],
  
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
  ] as Language[],
  
  hobbies: ['Coding', 'Reading', 'Gaming', 'Hiking'],
  awards: [] as string[],
  references: [] as Reference[],
  customSections: [] as CustomSection[],
  
  // Section Visibility
  visibleSections: {
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    certifications: true,
    languages: true,
    hobbies: true,
    awards: true,
    references: true
  }
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    // Update personal information
    updatePersonalInfo: (state, action: PayloadAction<Partial<typeof initialState>>) => {
      return { ...state, ...action.payload };
    },
    
    // Work Experience
    addWorkExperience: (state, action: PayloadAction<Omit<WorkExperience, 'id'>>) => {
      state.workExperiences.push({ ...action.payload, id: generateId() });
    },
    updateWorkExperience: (state, action: PayloadAction<{ id: string; experience: Partial<WorkExperience> }>) => {
      const { id, experience } = action.payload;
      const index = state.workExperiences.findIndex(exp => exp.id === id);
      if (index !== -1) {
        state.workExperiences[index] = { ...state.workExperiences[index], ...experience };
      }
    },
    removeWorkExperience: (state, action: PayloadAction<string>) => {
      state.workExperiences = state.workExperiences.filter(exp => exp.id !== action.payload);
    },
    
    // Education
    addEducation: (state, action: PayloadAction<Omit<Education, 'id'>>) => {
      state.education.push({ ...action.payload, id: generateId() });
    },
    updateEducation: (state, action: PayloadAction<{ id: string; education: Partial<Education> }>) => {
      const { id, education } = action.payload;
      const index = state.education.findIndex(edu => edu.id === id);
      if (index !== -1) {
        state.education[index] = { ...state.education[index], ...education };
      }
    },
    removeEducation: (state, action: PayloadAction<string>) => {
      state.education = state.education.filter(edu => edu.id !== action.payload);
    },
    
    // Skills
    addSkill: (state, action: PayloadAction<Omit<Skill, 'id'>>) => {
      state.skills.push({ ...action.payload, id: generateId() });
    },
    updateSkill: (state, action: PayloadAction<{ id: string; skill: Partial<Skill> }>) => {
      const { id, skill } = action.payload;
      const index = state.skills.findIndex(s => s.id === id);
      if (index !== -1) {
        state.skills[index] = { ...state.skills[index], ...skill };
      }
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter(s => s.id !== action.payload);
    },
    
    // Certifications
    addCertification: (state, action: PayloadAction<Omit<Certification, 'id'>>) => {
      state.certifications.push({ ...action.payload, id: generateId() });
    },
    updateCertification: (state, action: PayloadAction<{ id: string; certification: Partial<Certification> }>) => {
      const { id, certification } = action.payload;
      const index = state.certifications.findIndex(cert => cert.id === id);
      if (index !== -1) {
        state.certifications[index] = { ...state.certifications[index], ...certification };
      }
    },
    removeCertification: (state, action: PayloadAction<string>) => {
      state.certifications = state.certifications.filter(cert => cert.id !== action.payload);
    },
    
    // Projects
    addProject: (state, action: PayloadAction<Omit<Project, 'id'>>) => {
      state.projects.push({ ...action.payload, id: generateId() });
    },
    updateProject: (state, action: PayloadAction<{ id: string; project: Partial<Project> }>) => {
      const { id, project } = action.payload;
      const index = state.projects.findIndex(proj => proj.id === id);
      if (index !== -1) {
        state.projects[index] = { ...state.projects[index], ...project };
      }
    },
    removeProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(proj => proj.id !== action.payload);
    },
    
    // Languages
    addLanguage: (state, action: PayloadAction<Omit<Language, 'id'>>) => {
      state.languages.push({ ...action.payload, id: generateId() });
    },
    updateLanguage: (state, action: PayloadAction<{ id: string; language: Partial<Language> }>) => {
      const { id, language } = action.payload;
      const index = state.languages.findIndex(lang => lang.id === id);
      if (index !== -1) {
        state.languages[index] = { ...state.languages[index], ...language };
      }
    },
    removeLanguage: (state, action: PayloadAction<string>) => {
      state.languages = state.languages.filter(lang => lang.id !== action.payload);
    },
    
    // Hobbies & Awards
    updateHobbies: (state, action: PayloadAction<string[]>) => {
      state.hobbies = action.payload;
    },
    updateAwards: (state, action: PayloadAction<string[]>) => {
      state.awards = action.payload;
    },
    
    // References
    addReference: (state, action: PayloadAction<Omit<Reference, 'id'>>) => {
      state.references.push({ ...action.payload, id: generateId() });
    },
    updateReference: (state, action: PayloadAction<{ id: string; reference: Partial<Reference> }>) => {
      const { id, reference } = action.payload;
      const index = state.references.findIndex(ref => ref.id === id);
      if (index !== -1) {
        state.references[index] = { ...state.references[index], ...reference };
      }
    },
    removeReference: (state, action: PayloadAction<string>) => {
      state.references = state.references.filter(ref => ref.id !== action.payload);
    },
    
    // Custom Sections
    addCustomSection: (state, action: PayloadAction<Omit<CustomSection, 'id'>>) => {
      state.customSections.push({ ...action.payload, id: generateId() });
    },
    updateCustomSection: (state, action: PayloadAction<{ id: string; section: Partial<CustomSection> }>) => {
      const { id, section } = action.payload;
      const index = state.customSections.findIndex(sect => sect.id === id);
      if (index !== -1) {
        state.customSections[index] = { ...state.customSections[index], ...section };
      }
    },
    removeCustomSection: (state, action: PayloadAction<string>) => {
      state.customSections = state.customSections.filter(sect => sect.id !== action.payload);
    },
    
    // Section Visibility
    toggleSectionVisibility: (state, action: PayloadAction<keyof typeof initialState.visibleSections>) => {
      const section = action.payload;
      state.visibleSections[section] = !state.visibleSections[section];
    },
    
    // Profile Image
    setProfileImage: (state, action: PayloadAction<string>) => {
      state.profileImage = action.payload;
    },
    
    // Reset Store
    resetStore: () => initialState
  }
});

export const resumeActions = resumeSlice.actions;
export default resumeSlice.reducer;
