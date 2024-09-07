export const loginOtpEmailTemplate = ({email, otp}) => {
    return `
    <div>
        <h1>Make My Menu</h1>
        <h2>OTP for Login for ${email}</h2>
        <p>Your OTP for login is <b>${otp}</b></p>
        <p>OTP will expire in 5 minutes</p>
    </div>
    `;
};