import { AuthService } from './auth.service';
declare class LoginDto {
    email: string;
    senha: string;
}
export declare class AuthController {
    private service;
    constructor(service: AuthService);
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
}
export {};
