import axios from 'axios';
import { sign } from 'jsonwebtoken';
import auth from '../../config/auth';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IAccessTokenResponse {
    access_token: string;
}

interface IUserResponse {
    avatar_url: string;
    login: string;
    id: number;
    name: string;
}

class AuthenticateUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(code: string) {
        const url = 'https://github.com/login/oauth/access_token';

        const { data: accessTokenResponse } =
            await axios.post<IAccessTokenResponse>(url, null, {
                params: {
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code,
                },
                headers: {
                    Accept: 'application/json',
                },
            });

        const response = await axios.get<IUserResponse>(
            'https://api.github.com/user',
            {
                headers: {
                    authorization: `Bearer ${accessTokenResponse.access_token}`,
                },
            }
        );
        const { login, id, avatar_url, name } = response.data;

        const user = (await this.userRepository.verifyByGithubId(id))
            ? await this.userRepository.findByGithubId(id)
            : await this.userRepository.save({
                  login,
                  github_id: id,
                  avatar_url,
                  name,
              });

        const token = sign(
            {
                user: {
                    name: user.name,
                    avatar_url: user.avatar_url,
                    id: user.id,
                },
            },
            auth.secret,
            { subject: user.id, expiresIn: auth.tokenExpiryTimeInSeconds }
        );

        return { token, user };
    }
}

export { AuthenticateUserUseCase };
