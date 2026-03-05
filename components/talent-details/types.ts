export interface TalentExperience {
  id: number;
  image: string;
  role: string;
  organization: string;
  description: string;
  likes: number;
  comments: number;
  rating: number;
}

export interface TalentDetailsData {
  id: number;
  coverImage: string;
  avatar: string;
  name: string;
  verified: boolean;
  role: string;
  organization: string;
  university: string;
  location: string;
  tags: string[];
  about: string;
  experiences: TalentExperience[];
}

export interface PersonYouMayNeed {
  id: number;
  avatar: string;
  name: string;
  verified: boolean;
  role: string;
  level: string;
  organization: string;
  description: string;
}
