class ValidationHelpers {
  emailValidation(email: string) {
    const emailLength = email.length;

    let err = '';

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailHasValidPatterns = Boolean(emailPattern.test(email));

    if (!isEmailHasValidPatterns) err = 'Email is not valid';

    if (emailLength > 30) err = 'Email is too long';

    if (emailLength < 6) err = 'Email is too short';

    if (!emailLength) err = 'Email is required';

    return err;
  }

  passwordValidation(password: string) {
    const passwordLength = password.length;

    let err = '';

    if (passwordLength > 18) err = 'Password is too long';

    if (passwordLength < 6) err = 'Password is too short';

    if (!passwordLength) err = 'Password is required';

    return err;
  }
}

export default new ValidationHelpers();
