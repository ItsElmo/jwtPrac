import {
	Query,
	Resolver,
	Mutation,
	Arg,
	ObjectType,
	Field,
	Ctx,
	UseMiddleware,
	Int,
} from 'type-graphql';

import { compare, hash } from 'bcryptjs';
import { User } from './entity/User';
import { MyContext } from './MyContext';
import { createAccessToken, createRefreshToken } from './auth';
import { isAuth } from './IsAuth';
import { sendRefreshToken } from './sendRefreshToken';
import { getConnection } from 'typeorm';
@ObjectType()
class LoginResponse {
	@Field()
	accessToken: string;
}

@Resolver()
export class UserResolver {
	@Query(() => String)
	hi() {
		return 'Hello';
	}
	@Query(() => [User])
	users() {
		return User.find();
	}
	@Query(() => String)
	@UseMiddleware(isAuth)
	bye(@Ctx() { payload }: MyContext) {
		return `your user id is: ${payload!.userId}`;
	}

	@Mutation(() => Boolean)
	async register(
		@Arg('email') email: string,
		@Arg('password') password: string
	) {
		const hashedPassword = await hash(password, 12);
		try {
			await User.insert({
				email,
				password: hashedPassword,
			});
			return true;
		} catch (err) {
			console.log(err);
			return false;
		}
	}
	@Mutation(() => Boolean)
	async revokeRefreshTokensForUser(@Arg('userId', () => Int) userId: number) {
		await getConnection()
			.getRepository(User)
			.increment({ id: userId }, 'tokenVersion', 1);

		return true;
	}
	@Mutation(() => LoginResponse)
	async login(
		@Arg('email') email: string,
		@Arg('password') password: string,
		@Ctx() { res }: MyContext
	): Promise<LoginResponse> {
		const user = await User.findOne({ where: { email } });
		if (!user) {
			throw new Error('invalid login');
		}
		const valid = compare(password, user.password);
		if (!valid) {
			throw new Error('invalid password');
		}
		//login successful
		sendRefreshToken(res, createRefreshToken(user));
		return {
			accessToken: createAccessToken(user),
		};
	}
}
