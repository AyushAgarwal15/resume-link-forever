
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

export type CustomSection = {
  id: string;
  title: string;
  content: string;
  visible: boolean;
  order: number;
};
