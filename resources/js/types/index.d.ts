export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    is_admin: boolean;
    profile?: Profile;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };

    errors: Record<string, string>;
    flash?: {
        success?: string;
        error?: string;
    };
};

export interface Profile {
    id: number;
    user_id: number;
    user?: User;
    graduation_year: number;
    bio: string | null;
    avatar: string | null;
    class_name: string | null;
    quote: string | null;
    interests: string[] | null;
    memories?: Memory[];
}

export interface Memory {
    id: number;
    user_id: number;
    profile_id: number;
    content: string;
    created_at: string;
    user?: User;
}