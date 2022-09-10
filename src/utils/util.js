export const formatDataToEnglish = ({
    nombre,
    apellido,
    direccion,
    telefono,
    id,
}) => ({
    id,
    firstName: nombre,
    lastName: apellido,
    address: direccion,
    phoneNumber: telefono,
})

export const formatDataToSpanish = ({
    firstName,
    lastName,
    address,
    phoneNumber,
    id,
}) => ({
    id,
    nombre: firstName,
    apellido: lastName,
    direccion: address,
    telefono: phoneNumber,
});