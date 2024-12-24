export const checkValidData = (email, password, username = null) => {
    if (!email) return "Email is required";
    if (!password) return "Password is required";

    const isEmailValid = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!#$%&? "@])[A-Za-z\d!#$%&? "@]{8,}$/.test(password);
    const isUsernameValid = username === null || /^(?=.{4,32}$)(?![_.-])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/.test(username);

    if (!isEmailValid) return "Please enter a valid email address";
    if (!isPasswordValid) return "Password is incorrect";
    if (username !== null && !isUsernameValid) return "Username is not valid";

    return null;
};



