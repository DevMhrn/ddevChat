export interface AuthControllerInterface {
    name:string;
    email:string;
    provider:string;
    image?:string;
    oauthId:string;
}