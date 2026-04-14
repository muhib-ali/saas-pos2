export declare const AUTHORIZE_KEY = "authorize";
export interface AuthorizeMetadata {
    resource: string;
    action: string;
}
export declare const Authorize: (resource: string, action: string) => import("@nestjs/common").CustomDecorator<string>;
