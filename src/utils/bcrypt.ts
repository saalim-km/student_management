import bcrypt from "bcrypt";
export class Bcrypt {
    public async hashPassword(password : string) : Promise<string> {
        const hashedPassword = await bcrypt.hash(password,10);
        return hashedPassword;
    }
    public async comparePassword(passInDb : string, currPass : string) : Promise<boolean> {
        return await bcrypt.compare(passInDb , currPass);
    }
}