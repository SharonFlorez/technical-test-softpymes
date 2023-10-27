export class ErrorsFirebaseHelper {
  public static getError(code: string) {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Usuario ya registrado';
      case 'auth/invalid-email':
        return 'Formato de email invalido';
      case 'auth/invalid-login-credentials':
        return 'Email y/o password invalidos';
      case 'auth/missing-email':
        return 'Debes indicar un correo';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 8 caracteres';
      case 'auth/missing-password':
        return 'Debes indicar una contraseña de al menos 8 caracteres';
      default:
        return 'Ocurrio un error en el servidor';
    }
  }
}
