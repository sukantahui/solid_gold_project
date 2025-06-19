export interface Agent {
    id?: number;
    agentCategoryId?: number;
    agentName?: string;
    shortName?: string;
    email?: string;
    phone?: string;
    address?: string;
    pinCode?: string;
    active?: boolean;
    inforce?: boolean;
    createdAt?: string | null;
    updatedAt?: string | null;
}
