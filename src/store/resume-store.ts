
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

const initialState = {
  // Personal Information
  name: '',
  title: '',
  location: '',
  email: '',
  phone: '',
  linkedin: '',
  github: '',
  
  // Professional Summary
  summary: '',
  
  // Sections
  workExperiences: [],
  education: [],
  skills: [],
  certifications: [],
  projects: [],
  languages: [],
  hobbies: [],
  awards: [],
  references: [],
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
