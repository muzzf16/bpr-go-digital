export interface Application {
  id: string;
  title: string;
  subtitle: string | null;
  version_label: string | null;
  route_path: string;
  category: string | null;
  icon_bg_color: string;
  icon_text_color: string;
  icon_name: string;
  min_privilege: string;
  display_order: number;
  is_active: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  name: string;
  picture_url: string | null;
  prefix: string | null;
  tags: string[];
  role: {
    id: string;
    name: string;
    privileges: string[];
  } | null;
  bpr: {
    id: string;
    prefix: string;
    name: string;
    code_ojk: string | null;
    logo_url: string | null;
  } | null;
}

export interface BillingStatus {
  has_unpaid_bill: boolean;
  unpaid_count: number;
  nearest_due_date: string | null;
  is_blocked: boolean;
}
