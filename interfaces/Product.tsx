// BEGIN: ed8c6549bwf9
type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    sale_price: number;
    descuento?: number;
    tipo_coleccion?: string;
    image_1?: string;
    image_2?: string;
    image_3?: string;
    image_4?: string;
    image_5?: string;
    image_6?: string;
    image_7?: string;
    image_8?: string;
    image_9?: string;
    image_10?: string;
    tags?: string;
    user_name?: string;
    user_picture?: string;
    user_transactions?: number;
    likes?: string[];
    following?: boolean;
    handleFavorite?: (args: any) => void;
    handleShare?: (args: any) => void;
    icon_favorite?: boolean;
    certificate?: boolean;
    accept_changes?: boolean;
    city?: number;
    is_new?: boolean;
    special_title?: string;
    destacada?: boolean;
    slug?: string;
    logDetalle?: boolean;
    quantity?: number;
    user?: {
        id: number;
        name: string;
        picture: string;
    };
    apply_cashback?: boolean;
};

export default Product
