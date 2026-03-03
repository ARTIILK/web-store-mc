import Papa from 'papaparse';

export interface StoreItem {
    id: string;
    category: string;
    name: string;
    price_inr: number;
    coins?: number;
    description: string;
    image: string;
    badge?: string;
    limited: boolean;
    features: string[];
}

export const parseCSV = async (filePath: string): Promise<StoreItem[]> => {
    return new Promise((resolve, reject) => {
        Papa.parse(filePath, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const transformedData: StoreItem[] = results.data.map((row: any) => ({
                    ...row,
                    price_inr: parseFloat(row.price_inr) || 0,
                    coins: row.coins ? parseInt(row.coins) : undefined,
                    limited: row.limited?.toLowerCase() === 'true',
                    features: row.features ? row.features.split(';').map((f: string) => f.trim()) : [],
                }));
                resolve(transformedData);
            },
            error: (error) => {
                reject(error);
            }
        });
    });
};
