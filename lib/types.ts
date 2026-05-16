export type AmazonReview = {
  stars: number;
  text: string;
  author: string;
};

export type BookStatus =
  | "idea"
  | "collecting_interest"
  | "in_production"
  | "sampler_available"
  | "launch_list_open"
  | "preorder_soon"
  | "preorder_open"
  | "available";

export type InterestType =
  | "global_launch_list"
  | "sampler_request"
  | "book_interest"
  | "preorder_reminder"
  | "theme_vote"
  | "audio_preview_interest";

export type Book = {
  sku: string;
  title: string;
  subtitle: string;
  slug: string;
  series: string;
  series_slug: string;
  price?: number | null;
  page_count?: number | null;
  age_range: string;
  lane: string;
  template: string;
  amazon_asin?: string | null;
  cover_image?: string | null;
  interior_previews: string[];
  free_sample_slugs: string[];
  amazon_reviews: AmazonReview[];
  description: string;
  keywords: string[];
  related_skus: string[];
  launch_date?: string | null;
  priority: number;
  has_ritual_bundle: boolean;
  ritual_bundle_slug?: string | null;
  status?: BookStatus;
  is_flagship?: boolean;
  purchase_url?: string | null;
  preorder_url?: string | null;
  sampler_url?: string | null;
  launch_list_url?: string | null;
  interest_count?: number | null;
  interest_cta_label?: string | null;
  launch_window?: string | null;
  confirmed_release_date?: string | null;
  pipeline_stage_label?: string | null;
  pipeline_stage_description?: string | null;
  cover_status?: "final" | "draft" | "placeholder";
  show_price?: boolean;
  audience?: string;
  theme_tags?: string[];
};

export type FAQItem = {
  q: string;
  a: string;
};

export type ColoringPage = {
  slug: string;
  title: string;
  category: string;
  difficulty: string;
  age_range: string;
  parent_book_sku: string;
  preview_image: string;
  pdf_download_url: string;
  alt_text: string;
  faq: FAQItem[];
  related_page_slugs: string[];
};

export type Collection = {
  slug: string;
  title: string;
  description: string;
  audience: string;
  book_skus: string[];
  hero_image: string;
};

export type Ritual = {
  slug: string;
  book_sku: string;
  bundle_name: string;
  playlist_spotify_uri: string;
  meditation_title: string;
  meditation_duration: string;
  meditation_file_url: string;
  journal_pdf_url: string;
  palette_pdf_url: string;
  ritual_guide_pdf_url: string;
  related_ritual_slugs: string[];
};

export type Wave = {
  wave_number: number;
  title: string;
  launch_date: string;
  status: string;
  book_skus: string[];
  exclusive_name: string;
  exclusive_description: string;
  exclusive_download_url: string;
  landing_page_slug: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  read_time: string;
  image: string;
  content: string;
};
