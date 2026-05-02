'use server';
import {signIn} from "@/auth";

export async function credentialLogin(formData) {
    try {
        return await signIn('credentials', {
            email   : formData.get('email'),
            password: formData.get('password'),
            redirect: false
        });
    } catch (e) {
        console.log('unable to Login: ', e.message);
    }
}
