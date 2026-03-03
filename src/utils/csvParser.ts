import Papa from 'papaparse';

export interface StoreItem {
    id: string;
    category: string;
    name: string;
    price_inr: number;
    original_price?: number;
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
                // Log the raw data to debug visibility issues
                console.log('Raw CSV results:', results.data);

                const transformedData: StoreItem[] = results.data
                    .filter((row: any) => row.id && row.name) // Ensure we have valid rows
                    .map((row: any) => ({
                        ...row,
                        price_inr: parseFloat(row.price_inr) || 0,
                        original_price: row.original_price ? parseFloat(row.original_price) : undefined,
                        coins: row.coins ? parseInt(row.coins) : undefined,
                        limited: String(row.limited).toLowerCase() === 'true',
                        features: row.features ? row.features.split(';').map((f: string) => f.trim()) : [],
                    }));

                console.log('Transformed store items:', transformedData);
                resolve(transformedData);
            },
            error: (error) => {
                console.error('PapaParse error:', error);
                reject(error);
            }
        });
    });
};
