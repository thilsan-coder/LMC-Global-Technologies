export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    designation?: string;
    is_active?: boolean;
    roles?: string[];
    permissions?: string[];
    email_verified_at?: string;
}

export interface FlashMessage {
    success?: string | null;
    error?: string | null;
}

export interface BrandInfo {
    name: string;
    short_name: string;
    tagline: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User | null;
    };
    flash?: FlashMessage;
    brand?: BrandInfo;
};

export interface ServiceItem {
    id: number;
    name: string;
    slug: string;
    summary: string;
    description: string;
    features: string[];
    technologies: string[];
    icon: string;
    status: 'Active' | 'Inactive';
    display_order: number;
}

export interface ProductItem {
    id: number;
    name: string;
    slug: string;
    summary: string;
    description: string;
    features: string[];
    benefits: string[];
    tech_stack: string[];
    is_demo: boolean;
    status: 'Available' | 'In Development' | 'Beta';
    display_order: number;
}

export interface ReviewItem {
    id: number;
    name: string;
    email: string;
    company: string;
    role?: string;
    rating: number;
    service_or_product: string;
    review: string;
    is_verified_client: boolean;
    status: 'Pending' | 'Approved' | 'Rejected';
    admin_notes?: string;
    created_at: string;
}

export interface InternItem {
    id: number;
    intern_id: string;
    user_id?: number | null;
    name: string;
    email: string;
    phone?: string;
    university: string;
    course: string;
    department: string;
    start_date: string;
    end_date: string;
    status: 'Active' | 'Completed' | 'Terminated';
    verification_status: 'Verified' | 'Pending' | 'Revoked';
    verification_code: string;
    supervisor?: string;
    project_title?: string;
    performance_score?: number;
    notes?: string;
    attendance_percentage?: number;
    total_attendance_days?: number;
    present_days?: number;
}

export interface AttendanceItem {
    id: number;
    intern_id: number;
    intern?: {
        id: number;
        intern_id: string;
        name: string;
        department: string;
    };
    date: string;
    check_in?: string;
    check_out?: string;
    status: 'Present' | 'Absent' | 'Half-day' | 'Leave';
    notes?: string;
}

export interface CustomerItem {
    id: number;
    name: string;
    company?: string;
    email?: string;
    phone?: string;
    address?: string;
    industry?: string;
    status: 'active' | 'inactive';
    notes?: string;
    created_at: string;
}

export interface LeadItem {
    id: number;
    name: string;
    company?: string;
    email?: string;
    phone?: string;
    source: string;
    status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Won' | 'Lost';
    estimated_value?: number;
    assigned_to?: number | null;
    assigned_user?: User | null;
    notes?: string;
    created_at: string;
}

export interface TaskItem {
    id: number;
    title: string;
    description?: string;
    assigned_to?: number | null;
    assigned_user?: User | null;
    due_date?: string;
    priority: 'Low' | 'Medium' | 'High' | 'Urgent';
    status: 'Pending' | 'In Progress' | 'Completed';
}

export interface FollowUpItem {
    id: number;
    lead_id?: number | null;
    customer_id?: number | null;
    lead?: LeadItem | null;
    customer?: CustomerItem | null;
    user_id: number;
    user?: User | null;
    follow_up_date: string;
    notes: string;
    status: 'Pending' | 'Completed' | 'Cancelled';
}

export interface ContactMessageItem {
    id: number;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    status: 'Unread' | 'Read' | 'Resolved';
    created_at: string;
}
