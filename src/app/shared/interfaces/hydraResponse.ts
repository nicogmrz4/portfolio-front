export interface HydraResponse<T> {
    "@context": string,
    "@id": string,
    "@type": string,
    "hydra:totalItems": number,
    "hydra:member": T[],
}