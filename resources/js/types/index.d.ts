export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
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
}