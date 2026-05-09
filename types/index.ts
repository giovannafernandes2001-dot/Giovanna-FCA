export interface Devotional {
  id: string
  title: string
  sermon_date: string
  reflection_phrase: string
  bible_reference: string
  bible_text: string
  puc_summary: string
  reflection_questions: string[]
  closing_type: 'prayer' | 'song'
  closing_content: string
  youtube_url: string | null
  published: boolean
  created_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  devotional_id: string
  completed_at: string
}

export interface YouTubeLive {
  id: string
  title: string
  youtube_url: string
  live_date: string
  is_live: boolean
}

export interface UserProfile {
  id: string
  email: string
  role: 'member' | 'admin'
}

export interface Profile {
  id: string
  username: string
  full_name: string
  phone: string | null
  birth_date: string | null
  congregation: string | null
  created_at: string
}
