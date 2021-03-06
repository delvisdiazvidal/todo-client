
export enum ErrorMesagge {
    required = 'Esta información es Requerida',
    minLength = 'No ha alcanzado la longitud mínima requerida',
    maxLength = 'Ha sobrepasado la longitud máxima permitida',
    validCI = 'Número de Carnet de Identidad incorrecto',
    usedCI = 'Número de Carnet de Identidad en Uso',
    usedID = 'Número de Identificador en Uso',
    email = 'Correo electrónico incorrecto',
    pattern = 'Este campo sólo admite Números',
    userPattern = 'El usuario sólo admite caracteres alfanuméricos, o sea letras y números, no tildes, no espacios, no caracteres especiales.',
    alphanumeric = 'Este campo sólo admite caracteres alfanuméricos',
    extension = 'Extensión de Fichero no Permitida (Formatos permitidos: .pdf .png .jpg)',
    pdfExtension = 'Extensión de Fichero no Permitida (Sólo se permiten .pdf)',
    size = 'El Fichero excede el tamaño permitido',
    nonZero = 'Solo se permiten números mayores que 0.',
    minSelectedCheckboxes = 'Debe seleccionar al menos una opción.',
    requiredPass = 'La Contraseña es Requerida.',
    currentPass = 'No puede usar la Contraseña actual.',
    notCurrentPass = 'Contraseña actual Incorrecta.',
    strongPass = 'La Contraseña no cumple con los estándares de seguridad. Debe incluir mayúsculas, minúsculas, números y caracteres especiales.',
    confirmPass = 'La Contraseña y su Confirmación deben coincidir',
    oldPass = 'La Contraseña actual es incorrecta',
    usedPass = 'La Contraseña ha sido utilizada recientemente.',
    usedUser = 'El nombre de usuario está en uso.',
    text = 'No se permiten caracteres especiales.',
    generic = 'Caracter no permitido.',
    higherThat = 'No cumple con el mínimo establecido.',
    lowerThat = 'No cumple con el máximo establecido.',
    notPermit = 'La acción no es permitida.',
}
