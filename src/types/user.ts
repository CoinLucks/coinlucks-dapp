export type User = {
    id: string; // wallet address
    // address: string; // wallet address
    name?: string;
    avatar?: string;
    verify?: boolean;
    refCode?: string;
    referrer?: string;
    createdAt?: string; // join date
    x?: string;
    tg?: string;
    discord?: string;
    token?: string;
};