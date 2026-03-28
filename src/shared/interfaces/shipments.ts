export interface IShipmentsResponse {
    id: number;
    orderId: number;
    status: string;
    carrier: string;
    trackingId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IShipment {
    id: number;
    orderId: number;
    status: string;
    carrier: string;
    trackingId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IShipmentUpdate {
    status: string;
    updatedAt: Date;
}


export interface IShipmentParams {
  trackingId: string;
}


export interface ICreateShipmentResult {
    success: boolean;
    message: string;
    trackingId?: string;
    created?: boolean;
}