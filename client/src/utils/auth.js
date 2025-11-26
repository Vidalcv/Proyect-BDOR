export function esProfesor(user) {
  return user?.departamento !== undefined;
}

export function esAlumno(user) {
  return user?.carrera !== undefined;
}
